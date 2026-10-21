"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { consentKey, encodeConsent, readConsent, type AnalyticsChoice } from "@/lib/analytics/consent";
import { stopAnalytics, trackPage } from "@/lib/analytics/browser";
import styles from "./CookieConsent.module.css";

const changeEvent = "automatizza-consent-change";
const serverSnapshot = () => "server";
const memoryChoices = new Map<string, string>();
function snapshot(key: string) {
  let raw: string | null;
  try { raw = localStorage.getItem(key); } catch { raw = memoryChoices.get(key) ?? null; }
  return readConsent(raw) ? raw : null;
}
function subscribe(notify: () => void) {
  window.addEventListener("storage", notify);
  window.addEventListener("focus", notify);
  window.addEventListener(changeEvent, notify);
  return () => {
    window.removeEventListener("storage", notify);
    window.removeEventListener("focus", notify);
    window.removeEventListener(changeEvent, notify);
  };
}

export function CookieConsent({ measurementId, containerId, enabled, preview, tagAssistant = false }: { measurementId: string; containerId: string; enabled: boolean; preview: boolean; tagAssistant?: boolean }) {
  // A synthetic preview choice must never become consent for live measurement.
  const storageKey = preview ? `${consentKey}-preview` : consentKey;
  const raw = useSyncExternalStore(subscribe, () => snapshot(storageKey), serverSnapshot);
  const choice = readConsent(raw);
  const decision = choice?.analytics;
  const expiresAt = choice?.expiresAt;
  const path = usePathname();
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const lastPage = useRef("");
  const available = enabled || preview || tagAssistant;

  useEffect(() => {
    // Hydration has not read the saved choice yet; do not erase cookies from a
    // visitor who already consented before their next snapshot is available.
    if (raw === "server") return;
    if (!available || preview) {
      if (lastPage.current) stopAnalytics(measurementId);
      lastPage.current = "";
      return;
    }
    if (decision !== "granted") {
      stopAnalytics(measurementId);
      lastPage.current = "";
      return;
    }
    if (lastPage.current !== path) {
      trackPage({ measurementId, containerId, localDebug: tagAssistant }, path, decision);
      lastPage.current = path;
    }
  }, [available, containerId, decision, measurementId, path, preview, raw, tagAssistant]);

  useEffect(() => {
    if (!expiresAt || !available) return;
    // Browser timers have a 32-bit limit; periodically recheck long preferences.
    let timer: number;
    function checkExpiry() {
      if (expiresAt! > Date.now()) { schedule(); return; }
      try { localStorage.removeItem(storageKey); } catch { memoryChoices.delete(storageKey); }
      if (!preview) stopAnalytics(measurementId);
      window.dispatchEvent(new Event(changeEvent));
    }
    function schedule() { timer = window.setTimeout(checkExpiry, Math.min(Math.max(0, expiresAt! - Date.now()), 2_000_000_000)); }
    schedule();
    return () => window.clearTimeout(timer);
  }, [available, expiresAt, measurementId, preview, raw, storageKey]);

  useEffect(() => {
    if (settings) dialog.current?.showModal();
    else dialog.current?.close();
  }, [settings]);

  function save(value: AnalyticsChoice) {
    const stored = encodeConsent(value);
    try { localStorage.setItem(storageKey, stored); } catch { memoryChoices.set(storageKey, stored); }
    // Persist before unloading GTM on withdrawal; disable before React updates.
    if (value === "denied" && !preview) stopAnalytics(measurementId);
    window.dispatchEvent(new Event(changeEvent));
    setSettings(false);
  }

  function openSettings() {
    setAnalytics(decision === "granted");
    setSettings(true);
  }

  if (!available || raw === "server") return null;
  return (
    <>
      {!decision && <aside className={styles.banner} aria-label="Preferencias de cookies">
        <div><h2>Cookies</h2>
          <p>Utilizamos cookies de Google Analytics para entender cómo se usa nuestra web, solo si las aceptas. Puedes rechazarlas y seguir navegando. Guardamos tu elección para recordarla. <Link href="/politica-de-cookies">Política de cookies</Link>.</p>
          {preview && <p className={styles.preview}>Vista de prueba local: no envía datos a Google.</p>}
          {tagAssistant && <p className={styles.preview}>Prueba local de Tag Assistant: solo al aceptar se cargará Google y se enviarán datos reales de navegación. La analítica pública sigue desactivada.</p>}
        </div>
        <div className={styles.actions}>
          <button type="button" onClick={() => save("denied")}>Rechazar cookies</button>
          <button type="button" onClick={() => save("granted")}>Aceptar cookies</button>
          <button type="button" className={styles.settings} onClick={openSettings}>Configurar</button>
        </div>
      </aside>}
      {decision && <button type="button" className={styles.reopen} onClick={openSettings}>Configurar cookies</button>}
      <dialog ref={dialog} className={styles.dialog} aria-labelledby="cookie-settings-title" onCancel={() => setSettings(false)}>
        <h2 id="cookie-settings-title">Preferencias de cookies</h2>
        <p>Las necesarias recuerdan tu elección. La analítica es opcional y puedes cambiarla cuando quieras.</p>
        <label className={styles.option}><input type="checkbox" checked disabled /> Necesarias <span>Siempre activas</span></label>
        <label className={styles.option}><input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} /> Google Analytics</label>
        {preview && <p className={styles.preview}>Vista de prueba local: no envía datos a Google.</p>}
        {tagAssistant && <p className={styles.preview}>Prueba local de Tag Assistant con Google real. Publicidad siempre denegada.</p>}
        <p><Link href="/politica-de-cookies">Consultar la política de cookies</Link></p>
        <div className={styles.actions}>
          <button type="button" onClick={() => save("denied")}>Rechazar analítica</button>
          <button type="button" onClick={() => save(analytics ? "granted" : "denied")}>Guardar preferencias</button>
          <button type="button" className={styles.settings} onClick={() => setSettings(false)}>Cerrar</button>
        </div>
      </dialog>
    </>
  );
}
