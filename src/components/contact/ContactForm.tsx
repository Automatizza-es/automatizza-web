"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { contactServices, validateContact, type ContactErrors, type ContactField } from "@/lib/contact/validation";
import { trackContactResult } from "@/lib/analytics/browser";
import styles from "./ContactForm.module.css";

type Props = { enabled: boolean; testMode?: boolean; privacyReady: boolean; policyVersion: string; controller: string; rightsEmail: string };
type Status = "idle" | "sending" | "success" | "error";

// getRandomValues also works in local HTTP previews on the same Wi-Fi.
function submissionId() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 15) | 64;
  bytes[8] = (bytes[8] & 63) | 128;
  const hex = [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function ContactForm({ enabled, testMode = false, privacyReady, policyVersion, controller, rightsEmail }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [feedback, setFeedback] = useState("");
  const pending = useRef(false);
  const attempt = useRef<{ fingerprint: string; id: string } | null>(null);
  const isSending = status === "sending";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled || pending.current) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    const data = { name: fields.get("name"), email: fields.get("email"), service: fields.get("service"), message: fields.get("message"), privacy: fields.get("privacy") === "on" };
    const validation = validateContact(data, testMode);
    setErrors(validation.errors);
    setFeedback("");
    if (!validation.value) {
      setStatus("error");
      setFeedback("Revisa los campos indicados antes de enviar.");
      const first = Object.keys(validation.errors)[0] as ContactField;
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    pending.current = true;
    setStatus("sending");
    try {
      const fingerprint = JSON.stringify(validation.value);
      if (attempt.current?.fingerprint !== fingerprint) attempt.current = { fingerprint, id: submissionId() };
      const response = await fetch("/api/contacto", {
        method: "POST", headers: { "Content-Type": "application/json" }, signal: AbortSignal.timeout(20000),
        body: JSON.stringify({ ...validation.value, companyWebsite: fields.get("companyWebsite") ?? "", submissionId: attempt.current.id, policyVersion }),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) {
        if (result.errors && typeof result.errors === "object") setErrors(result.errors);
        setStatus("error");
        setFeedback(typeof result.error === "string" ? result.error : "No se ha podido confirmar el envío. Inténtalo de nuevo más tarde.");
        return;
      }
      trackContactResult({ responseOk: response.ok, result, submissionId: attempt.current.id, testMode });
      form.reset();
      attempt.current = null;
      setStatus("success");
      setFeedback(testMode ? "Prueba enviada. Revisa el buzón de contacto de Automatizza." : "Mensaje enviado. Gracias por contarnos tu idea.");
    } catch {
      setStatus("error");
      setFeedback("No se ha podido confirmar el envío. El texto sigue aquí para que puedas volver a intentarlo.");
    } finally { pending.current = false; }
  }

  function errorFor(field: ContactField) {
    return errors[field] ? <span id={`contact-${field}-error`} className={styles.fieldError}>{errors[field]}</span> : null;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate aria-label="Formulario de contacto" aria-busy={isSending} aria-describedby={testMode ? "contact-test-mode" : !enabled ? "contact-availability" : undefined}>
      {testMode && <p className={styles.availability} id="contact-test-mode">Modo de prueba local: el email se envía de verdad. Usa solo datos ficticios. El formulario publicado sigue desactivado y la política está pendiente de revisión.</p>}
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="contact-name">Nombre <span aria-hidden="true">*</span></label>
          <input id="contact-name" name="name" autoComplete="name" required maxLength={100} disabled={isSending} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} />
          {errorFor("name")}
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-email">Email <span aria-hidden="true">*</span></label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} disabled={isSending} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} />
          {errorFor("email")}
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor="contact-service">¿En qué podemos ayudarte?</label>
        <select id="contact-service" name="service" defaultValue="" disabled={isSending} aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? "contact-service-error" : undefined}>
          <option value="">Selecciona una opción (opcional)</option>
          {contactServices.map((service) => <option key={service}>{service}</option>)}
        </select>
        {errorFor("service")}
      </div>
      <div className={styles.field}>
        <label htmlFor="contact-message">Cuéntanos tu idea <span aria-hidden="true">*</span></label>
        <textarea id="contact-message" name="message" rows={4} required maxLength={5000} disabled={isSending} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} />
        {errorFor("message")}
      </div>
      <div className={styles.honeypot} aria-hidden="true" inert>
        <label htmlFor="contact-website">Deja este campo vacío</label>
        <input id="contact-website" name="companyWebsite" tabIndex={-1} autoComplete="off" />
      </div>
      <div className={styles.privacy}>
        <input id="contact-privacy" name="privacy" type="checkbox" required disabled={isSending || !enabled} aria-invalid={Boolean(errors.privacy)} aria-describedby={errors.privacy ? "contact-privacy-error" : undefined} />
        <label htmlFor="contact-privacy">{testMode ? "Confirmo que uso solo datos ficticios y quiero enviar una prueba técnica." : <>He leído y acepto la <Link href="/politica-de-privacidad">política de privacidad</Link> y consiento el tratamiento de mis datos para responder a mi consulta.</>} <span aria-hidden="true">*</span></label>
      </div>
      {errorFor("privacy")}
      {testMode ? <p className={styles.privacySummary}>Esta prueba no registra consentimiento real. <Link href="/politica-de-privacidad">Consultar el borrador de privacidad</Link>.</p> : <div className={styles.privacySummary}>
        <p><strong>Responsable:</strong> {controller || "pendiente de identificar en el borrador"}. <strong>Finalidad:</strong> atender tu consulta. <strong>Base:</strong> consentimiento o medidas precontractuales solicitadas por ti.</p>
        <p><strong>Destinatarios:</strong> proveedores de alojamiento y correo {privacyReady ? "detallados en la política" : "pendientes de validar en la política"}. <strong>Derechos:</strong> acceso, rectificación y supresión, entre otros, en <a href={`mailto:${rightsEmail}`}>{rightsEmail}</a>. No te añadiremos a listas comerciales.</p>
      </div>}
      {!enabled && <p className={styles.availability} id="contact-availability">{privacyReady ? "El formulario no está disponible temporalmente. Puedes escribirnos por email." : "El envío está desactivado mientras revisamos y completamos la política de privacidad. Puedes escribirnos por email."}</p>}
      <button className={styles.submit} type="submit" disabled={!enabled || isSending}>{isSending ? "Enviando…" : "Enviar mensaje"} <span aria-hidden="true">→</span></button>
      <p className={styles.feedback} role={status === "error" ? "alert" : "status"} aria-live={status === "error" ? "assertive" : "polite"}>{feedback}</p>
      <noscript><p>Necesitas JavaScript para usar el formulario. Puedes escribirnos por email.</p></noscript>
    </form>
  );
}
