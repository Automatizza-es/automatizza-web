import { resolveRoute } from "./i18n/routes";

const maxBytes = 16_384;
const maxReportsPerMinute = 30;
const directives = new Set([
  "default-src", "script-src", "script-src-elem", "script-src-attr",
  "style-src", "style-src-elem", "style-src-attr", "img-src", "font-src",
  "connect-src", "media-src", "frame-src", "worker-src", "object-src",
  "base-uri", "form-action", "frame-ancestors", "manifest-src",
]);
type SafeReport = { directive: string; blocked: string; page: string; disposition: "report" | "enforce" };

function blockedSource(value: unknown) {
  if (typeof value !== "string") return "unknown";
  if (["inline", "eval", "wasm-eval", "self", "data", "blob"].includes(value)) return value;
  try {
    const url = new URL(value);
    if (url.protocol === "data:" || url.protocol === "blob:") return url.protocol.slice(0, -1);
    if (!["http:", "https:"].includes(url.protocol)) return "other";
    // No query, path, fragment or credentials; never log script samples.
    return url.origin.slice(0, 180);
  } catch { return "unknown"; }
}

export function sanitizeCspReport(value: unknown): SafeReport | null {
  if (!value || typeof value !== "object") return null;
  const report = value as Record<string, unknown>;
  const body = report["csp-report"] ?? (report.type === "csp-violation" ? report.body : undefined);
  if (!body || typeof body !== "object") return null;
  const data = body as Record<string, unknown>;
  const directive = data["effective-directive"] ?? data.effectiveDirective;
  if (typeof directive !== "string" || !directives.has(directive)) return null;
  let page = "unknown";
  try {
    const raw = data["document-uri"] ?? data.documentURL;
    if (typeof raw === "string") {
      const url = new URL(raw);
      // Only known routes, never personal values in unknown paths or queries.
      if (resolveRoute(url.pathname)) page = url.pathname;
    }
  } catch { /* Invalid report URLs are not evidence. */ }
  return { directive, blocked: blockedSource(data["blocked-uri"] ?? data.blockedURL), page, disposition: data.disposition === "enforce" ? "enforce" : "report" };
}

export function createCspReportHandler(log: (report: SafeReport) => void = report => console.warn("csp-violation (untrusted browser report)", JSON.stringify(report)), now = Date.now) {
  let windowStart = now();
  let requests = 0;
  return async function POST(request: Request) {
    const headers = { "Cache-Control": "no-store" };
    const empty = () => new Response(null, { status: 204, headers });
    // Bounded, per-instance log amplification protection. Not a distributed WAF.
    if (now() - windowStart >= 60_000) { windowStart = now(); requests = 0; }
    if (++requests > maxReportsPerMinute) { await request.body?.cancel(); return empty(); }
    const type = request.headers.get("content-type")?.split(";", 1)[0].trim();
    if (!["application/csp-report", "application/reports+json"].includes(type ?? "")) return new Response(null, { status: 415, headers });
    if (Number(request.headers.get("content-length")) > maxBytes) return new Response(null, { status: 413, headers });
    try {
      const reader = request.body?.getReader();
      if (!reader) return empty();
      const chunks: Uint8Array[] = [];
      let size = 0;
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > maxBytes) { await reader.cancel(); return new Response(null, { status: 413, headers }); }
        chunks.push(value);
      }
      const bytes = new Uint8Array(size);
      let offset = 0;
      for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
      const parsed: unknown = JSON.parse(new TextDecoder().decode(bytes));
      const reports = Array.isArray(parsed) ? parsed.slice(0, 10) : [parsed];
      for (const report of reports) { const safe = sanitizeCspReport(report); if (safe) log(safe); }
    } catch { /* Discard malformed/spoofed reports; do not log raw input. */ }
    return empty();
  };
}
