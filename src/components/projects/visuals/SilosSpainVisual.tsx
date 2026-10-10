"use client";

import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { Catamaran } from "next/font/google";

import { usePlayOnView } from "@/components/projects/usePlayOnView";

// Silos Spain's own typeface, so the CRM on screen looks like the real app.
const catamaran = Catamaran({ variable: "--font-catamaran", subsets: ["latin"], display: "swap" });

const at = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

type IconName = "inbox" | "doc" | "mail" | "user" | "send";

const iconPaths: Record<IconName, ReactNode> = {
  inbox: (
    <>
      <path d="M4 13.5 6.5 5h11l2.5 8.5V19H4Z" />
      <path d="M4 13.5h4.5l1.2 2.2h4.6l1.2-2.2H20" />
    </>
  ),
  doc: (
    <>
      <path d="M6.5 3.5h7.5l4 4v13h-11.5Z" />
      <path d="M13.5 3.5V8h4.5M9.5 12h5M9.5 15.5h5" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
    </>
  ),
  send: <path d="M20.5 3.5 10.5 13.5M20.5 3.5l-6.5 17-3.5-7-7-3.5 17-6.5Z" />,
};

function Icon({ name }: { name: IconName }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {iconPaths[name]}
    </svg>
  );
}

// Fictitious figures, real CRM labels (lib/i18n/es.ts of the Silos Spain CRM).
const kpis = [
  { label: "Solicitudes", value: "14", fill: 0.64, detail: "3 por revisar · 2 por entregar" },
  { label: "Contactos", value: "52", fill: 0.82, detail: "34 leads · 18 clientes" },
  { label: "Oportunidades", value: "9", fill: 0.5, detail: "Pipeline 412.000 €" },
  { label: "Presupuestos", value: "7", fill: 0.71, detail: "5 enviados · 2 en borrador" },
];

const funnel = [
  { label: "Recibidas", value: 14 },
  { label: "Revisadas", value: 12 },
  { label: "Entregadas", value: 10 },
  { label: "Con oportunidad", value: 9 },
  { label: "Presupuesto enviado", value: 5 },
];

const waiting = [
  { label: "Solicitudes por revisar", value: 3 },
  { label: "Presupuestos en borrador", value: 2 },
  { label: "Ventas por registrar en Ekon", value: 1 },
];

const activity: { icon: IconName; title: string; time: string; highlight?: boolean }[] = [
  { icon: "mail", title: "Acuse enviado al cliente", time: "Hoy, 09:12" },
  { icon: "user", title: "Asignada al comercial", time: "Hoy, 09:30" },
  { icon: "doc", title: "Presupuesto enviado por email", time: "Hoy, 12:05", highlight: true },
];

function CrmDashboard() {
  return (
    <div className="ss-app">
      <div className="ss-topbar">
        <Image className="ss-logo" src="/projects/silos-spain/logo.png" alt="" width={360} height={173} />
        <nav className="ss-nav">
          <span>Inicio</span>
          <span className="is-active">CRM</span>
          <span>Administración</span>
          <span>Equipo</span>
        </nav>
        <span className="ss-user">
          Avisos <b>Marta</b>
        </span>
      </div>

      <div className="ss-page">
        <div className="ss-subnav">
          <span className="is-active">Dashboard</span>
          <span>Solicitudes</span>
          <span>Bandeja</span>
          <span>Contactos</span>
          <span>Oportunidades</span>
          <span>Presupuestos</span>
        </div>
        <h4 className="ss-title">Dashboard</h4>
        <p className="ss-subtitle">El ciclo comercial de un vistazo: de la solicitud a la venta.</p>

        <div className="ss-kpis">
          {kpis.map((kpi, index) => (
            <div className="ss-kpi fx-in" style={at(650 + index * 110)} key={kpi.label}>
              <small>{kpi.label}</small>
              <b>{kpi.value}</b>
              <i>
                <span className="fx-grow" style={{ ...at(900 + index * 110), width: `${kpi.fill * 100}%` }} />
              </i>
              <em>{kpi.detail}</em>
            </div>
          ))}
        </div>

        <div className="ss-lower">
          <div className="ss-panel fx-in" style={at(1000)}>
            <strong>Embudo comercial</strong>
            {funnel.map((step, index) => (
              <div className="ss-funnel-row" key={step.label}>
                <span>{step.label}</span>
                <i>
                  <span className="fx-grow" style={{ ...at(1150 + index * 90), width: `${(step.value / 14) * 100}%` }} />
                </i>
                <b>{step.value}</b>
              </div>
            ))}
          </div>
          <div className="ss-panel fx-in" style={at(1100)}>
            <strong>Espera acción</strong>
            {waiting.map((item) => (
              <div className="ss-wait-row" key={item.label}>
                <span>{item.label}</span>
                <b>{item.value}</b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SilosSpainVisual() {
  const ref = usePlayOnView<HTMLDivElement>();

  return (
    <div className={`ss-scene ${catamaran.variable}`} ref={ref}>
      <div className="ss-laptop">
        <div className="ss-lid">
          <div className="ss-screen">
            <CrmDashboard />
          </div>
        </div>
        <div className="ss-base" />
      </div>

      <div className="ss-float ss-float-request" style={at(1500)}>
        <div className="ss-float-head">
          <span className="ss-chip">
            <Icon name="inbox" />
          </span>
          <div>
            <strong>Nueva solicitud</strong>
            <small>Web · hace 5 min</small>
          </div>
        </div>
        <p className="ss-person">
          Javier Ortega <span>AgroNorte S.L.</span>
        </p>
        <dl className="ss-field">
          <dt>Producto de interés</dt>
          <dd>Nave 500 m²</dd>
        </dl>
      </div>

      <div className="ss-float ss-float-quote" style={at(2300)}>
        <div className="ss-float-head">
          <span className="ss-chip">
            <Icon name="doc" />
          </span>
          <div>
            <strong>Presupuesto</strong>
            <small>P-0412 · v2</small>
          </div>
        </div>
        <p className="ss-quote-title">Nave 500 m² — Francia</p>
        <div className="ss-quote-total">
          <b>48.300 €</b>
          <span className="ss-pill ss-pill-sent">
            <Icon name="send" />
            Enviado
          </span>
        </div>
      </div>

      <div className="ss-float ss-float-activity" style={at(3100)}>
        <strong className="ss-activity-title">Actividad</strong>
        <ol>
          {activity.map((item, index) => (
            <li className={`fx-in${item.highlight ? " is-highlight" : ""}`} style={at(3550 + index * 300)} key={item.title}>
              <span className="ss-dot">
                <Icon name={item.icon} />
              </span>
              <div>
                <b>{item.title}</b>
                <small>{item.time}</small>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
