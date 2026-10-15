import { createHmac, randomBytes } from "node:crypto";
import { isIP } from "node:net";

import { isPrivacyPolicyReady, privacyPolicy } from "../../content/privacy";
import { isEmail, validateContact } from "./validation";

type Environment = Record<string, string | undefined>;
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const windowMs = 15 * 60 * 1000;
const maxBodyBytes = 32 * 1024;

export function getContactConfig(env: Environment = process.env, policyReady = isPrivacyPolicyReady()) {
  const apiKey = env.RESEND_API_KEY?.trim() ?? "";
  const verifyKey = env.RESEND_VERIFY_API_KEY?.trim() || apiKey;
  const from = env.RESEND_FROM_EMAIL?.trim() ?? "";
  const to = env.CONTACT_TO_EMAIL?.trim() ?? "";
  const domainId = env.RESEND_DOMAIN_ID?.trim() ?? "";
  const origins = (env.CONTACT_ALLOWED_ORIGINS ?? "").split(",").map((origin) => origin.trim().replace(/\/$/, "")).filter(Boolean);
  const validOrigins = origins.every((origin) => {
    try { const url = new URL(origin); return url.origin === origin && (url.protocol === "https:" || (env.NODE_ENV !== "production" && url.protocol === "http:")); }
    catch { return false; }
  });
  const configured = Boolean(apiKey && verifyKey && isEmail(from) && isEmail(to) && uuid.test(domainId) && validOrigins && (env.NODE_ENV !== "production" || origins.length));
  // Explicit local testing never approves the draft policy or enables Vercel.
  const testMode = env.NODE_ENV === "development" && env.VERCEL !== "1" && env.CONTACT_FORM_TEST_MODE === "true";
  return { apiKey, verifyKey, from, to, domainId, origins, configured, testMode, ready: configured && (testMode || (policyReady && env.CONTACT_FORM_ENABLED === "true")) };
}

function json(status: number, data: object, extra: Record<string, string> = {}) {
  return Response.json(data, { status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", ...extra } });
}

class RequestTooLarge extends Error {}
async function readBody(request: Request) {
  if (Number(request.headers.get("content-length")) > maxBodyBytes) throw new RequestTooLarge();
  if (!request.body) throw new Error("Missing body");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBodyBytes) { await reader.cancel(); throw new RequestTooLarge(); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)) as unknown;
}

type Dependencies = {
  environment?: () => Environment;
  policyReady?: () => boolean;
  fetch?: typeof fetch;
  now?: () => number;
};

// Server-only callers. Dependencies are injected exclusively by isolated tests;
// HTTP input can never change the provider URL, recipient or privacy approval.
export function createContactHandler(dependencies: Dependencies = {}) {
  const environment = dependencies.environment ?? (() => process.env);
  const policyReady = dependencies.policyReady ?? isPrivacyPolicyReady;
  const providerFetch = dependencies.fetch ?? globalThis.fetch;
  const now = dependencies.now ?? Date.now;
  const fallbackSecret = randomBytes(32);
  const buckets = new Map<string, { count: number; resetAt: number }>();

  function consume(key: string, limit: number, time: number) {
    for (const [storedKey, bucket] of buckets) if (bucket.resetAt <= time) buckets.delete(storedKey);
    let bucket = buckets.get(key);
    if (!bucket) {
      if (buckets.size >= 2000) return Math.ceil(windowMs / 1000);
      bucket = { count: 0, resetAt: time + windowMs };
      buckets.set(key, bucket);
    }
    if (bucket.count >= limit) return Math.max(1, Math.ceil((bucket.resetAt - time) / 1000));
    bucket.count += 1;
    return 0;
  }

  return async function handleContact(request: Request) {
    const env = environment();
    const config = getContactConfig(env, policyReady());
    const origin = request.headers.get("origin");
    const localOrigins: string[] = [];
    if (env.NODE_ENV !== "production") {
      const url = new URL(request.url);
      localOrigins.push(url.origin);
      // Next's dev server can normalize the URL to 0.0.0.0. Keep the browser's
      // actual host available locally; production always uses the allowlist.
      const host = request.headers.get("host");
      if (host && !/[\\/@?#\s]/.test(host)) {
        try { localOrigins.push(new URL(`${url.protocol}//${host}`).origin); }
        catch { /* Invalid Host is never an allowed origin. */ }
      }
    }
    const allowedOrigins = config.origins.length ? config.origins : localOrigins;
    if (!origin || !allowedOrigins.includes(origin) || request.headers.get("sec-fetch-site") === "cross-site") return json(403, { error: "No se ha podido validar la solicitud." });
    if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") return json(415, { error: "Formato de solicitud no válido." });

    // Trust forwarded IPs only behind Vercel or an explicitly configured proxy.
    // Otherwise use one shared bucket, rather than trusting spoofable headers.
    const forwarded = env.VERCEL === "1" ? request.headers.get("x-vercel-forwarded-for") : env.CONTACT_TRUST_PROXY === "true" ? request.headers.get("x-forwarded-for") : null;
    const candidate = forwarded?.split(",")[0].trim() ?? "";
    const client = isIP(candidate) ? candidate : "shared";
    const secret = config.apiKey || fallbackSecret;
    const hash = (value: string) => createHmac("sha256", secret).update(value).digest("hex");
    const time = now();
    const wait = consume("global", 30, time) || consume(`ip:${hash(client)}`, 5, time);
    if (wait) return json(429, { error: "Has enviado varias solicitudes. Espera unos minutos antes de volver a intentarlo." }, { "Retry-After": String(wait) });
    if (!config.ready) return json(503, { error: "El formulario no está disponible temporalmente. Puedes escribirnos por email." });

    let body: unknown;
    try { body = await readBody(request); }
    catch (error) { return json(error instanceof RequestTooLarge ? 413 : 400, { error: "No se ha podido leer la solicitud. Revisa su contenido." }); }
    if (!body || typeof body !== "object" || Array.isArray(body)) return json(400, { error: "Revisa los datos del formulario." });
    const data = body as Record<string, unknown>;
    if (typeof data.companyWebsite !== "string" || data.companyWebsite.trim()) return json(400, { error: "No se ha podido validar la solicitud." });
    const validation = validateContact(data, config.testMode);
    if (!validation.value) return json(400, { error: "Revisa los campos indicados.", errors: validation.errors });
    if (typeof data.submissionId !== "string" || !uuid.test(data.submissionId) || data.policyVersion !== privacyPolicy.version) return json(400, { error: "Actualiza la página antes de volver a enviar el mensaje." });
    const emailWait = consume(`email:${hash(validation.value.email.toLowerCase())}`, 3, time);
    if (emailWait) return json(429, { error: "Espera unos minutos antes de volver a enviar otro mensaje." }, { "Retry-After": String(emailWait) });

    try {
      const domainResponse = await providerFetch(`https://api.resend.com/domains/${config.domainId}`, {
        headers: { Authorization: `Bearer ${config.verifyKey}` }, cache: "no-store", signal: AbortSignal.timeout(5000),
      });
      if (!domainResponse.ok) return json(503, { error: "No podemos enviar tu mensaje ahora. Inténtalo de nuevo más tarde." });
      const domain = await domainResponse.json();
      if (domain.id !== config.domainId || domain.name?.toLowerCase() !== config.from.split("@")[1].toLowerCase() || domain.status !== "verified" || domain.capabilities?.sending !== "enabled") return json(503, { error: "No podemos enviar tu mensaje ahora. Inténtalo de nuevo más tarde." });

      const { name, email, service, message } = validation.value;
      const response = await providerFetch("https://api.resend.com/emails", {
        method: "POST", cache: "no-store", signal: AbortSignal.timeout(10000),
        headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json", "Idempotency-Key": `contact/${data.submissionId}` },
        body: JSON.stringify({
          from: `Automatizza <${config.from}>`, to: [config.to], reply_to: email,
          subject: `${config.testMode ? "[PRUEBA LOCAL] " : ""}Nueva consulta web · ${service || "Sin área especificada"}`,
          text: [config.testMode ? "Prueba técnica del formulario de Automatizza · Datos ficticios" : "Nueva solicitud desde el formulario de Automatizza", "", `Nombre: ${name}`, `Email: ${email}`, `Área: ${service || "No especificada"}`, "", "Mensaje:", message, "", config.testMode ? "Prueba con datos ficticios confirmada. La política sigue pendiente; no se registra consentimiento real." : "Privacidad: aceptada expresamente", `Versión de la política: ${privacyPolicy.version}`].join("\n"),
        }),
      });
      if (!response.ok) return json(502, { error: "No se ha podido enviar tu mensaje. Puedes volver a intentarlo o escribirnos por email." });
      const result = await response.json();
      if (typeof result.id !== "string" || !uuid.test(result.id)) return json(502, { error: "No hemos podido confirmar el envío. Inténtalo de nuevo más tarde." });
      return json(202, { ok: true });
    } catch {
      return json(502, { error: "No hemos podido confirmar el envío. Conservamos el texto en pantalla para que puedas volver a intentarlo." });
    }
  };
}
