"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";

import { Container } from "@/components/layout/Container";

// Delay (ms) for an element's step in its card's entrance sequence.
const at = (ms: number, extra?: Record<string, string>) =>
  ({ "--d": `${ms}ms`, ...extra }) as CSSProperties;

type IconName =
  | "mail"
  | "users"
  | "layers"
  | "chart"
  | "sparkle"
  | "user"
  | "building"
  | "doc"
  | "check"
  | "calendar"
  | "send"
  | "folder"
  | "invoice"
  | "tasks"
  | "form"
  | "plus"
  | "lead"
  | "home";

const iconPaths: Record<IconName, ReactNode> = {
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19c.6-3 2.8-4.8 5.5-4.8s4.9 1.8 5.5 4.8" />
      <path d="M15.5 5.8a3 3 0 0 1 0 5.4M17.5 14.6c1.6.6 2.7 2.1 3 4.4" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3.5 8.5 4.5-8.5 4.5L3.5 8 12 3.5Z" />
      <path d="m3.5 12 8.5 4.5 8.5-4.5M3.5 16l8.5 4.5 8.5-4.5" />
    </>
  ),
  chart: <path d="M5.5 20v-7M10 20V7.5M14.5 20v-4.5M19 20V4.5" />,
  sparkle: (
    <path d="M11 3.5c.6 4.2 2.3 5.9 6.5 6.5-4.2.6-5.9 2.3-6.5 6.5-.6-4.2-2.3-5.9-6.5-6.5 4.2-.6 5.9-2.3 6.5-6.5ZM18.5 15c.3 1.6.9 2.2 2.5 2.5-1.6.3-2.2.9-2.5 2.5-.3-1.6-.9-2.2-2.5-2.5 1.6-.3 2.2-.9 2.5-2.5Z" />
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
    </>
  ),
  building: (
    <>
      <path d="M5.5 20.5v-16h8.5v16M14 9.5h4.5v11" />
      <path d="M8.5 8h2.5M8.5 11.5h2.5M8.5 15h2.5M3.5 20.5h17" />
    </>
  ),
  doc: (
    <>
      <path d="M6.5 3.5h7.5l4 4v13h-11.5Z" />
      <path d="M13.5 3.5V8h4.5M9.5 12h5M9.5 15.5h5" />
    </>
  ),
  check: <path d="m5.5 12.5 4 4 9-9" />,
  calendar: (
    <>
      <rect x="4" y="5.5" width="16" height="14.5" rx="2" />
      <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
    </>
  ),
  send: <path d="M20.5 3.5 10.5 13.5M20.5 3.5l-6.5 17-3.5-7-7-3.5 17-6.5Z" />,
  folder: (
    <path d="M3.5 7A1.5 1.5 0 0 1 5 5.5h4.5l2 2.5H19a1.5 1.5 0 0 1 1.5 1.5V18a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 18Z" />
  ),
  invoice: (
    <>
      <path d="M6 3.5h12v17l-3-2-3 2-3-2-3 2Z" />
      <path d="M9 8.5h6M9 12h6M9 15.5h3" />
    </>
  ),
  tasks: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  form: (
    <>
      <rect x="4.5" y="3.5" width="15" height="17" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </>
  ),
  plus: <path d="M12 6.5v11M6.5 12h11" />,
  lead: (
    <>
      <circle cx="10" cy="8.5" r="3.5" />
      <path d="M3.5 20c.8-3.6 3.4-5.5 6.5-5.5 1.3 0 2.5.3 3.5.9M17.5 14v6M14.5 17h6" />
    </>
  ),
  home: <path d="M4 10.5 12 4l8 6.5V20h-5.5v-5.5h-5V20H4Z" />,
};

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  );
}

// The "Zz" from the Automatizza wordmark.
function BrandMark({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M7 3h20L15 18.5h3.5L15 23H2L14 8H3Z" />
      <path d="M19 14.4h10.5L19.5 24.6H30L26.5 29h-16L21 18.3h-4.5Z" />
    </svg>
  );
}

type ChangeCardProps = {
  wide?: boolean;
  icon: IconName;
  title: ReactNode;
  punchline: string;
  className: string;
  children: ReactNode;
};

function ChangeCard({ wide = false, icon, title, punchline, className, children }: ChangeCardProps) {
  return (
    <article
      className={`change-card ${wide ? "change-card-wide" : "change-card-half"} ${className}`}
      data-reveal
    >
      <div className="change-copy">
        <span className="change-chip">
          <Icon name={icon} size={21} />
        </span>
        <h3>{title}</h3>
        <Link className="change-punchline" href="#contacto">
          {punchline}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div className="change-visual" aria-hidden="true">
        {children}
      </div>
    </article>
  );
}

function Connector({ delay }: { delay: number }) {
  return (
    <span className="inbox-connector fx-draw" style={at(delay)}>
      <svg viewBox="0 0 40 20" fill="none">
        <path d="M2 10h34" />
        <path d="m31 5 5 5-5 5" />
      </svg>
    </span>
  );
}

const extracted: { icon: IconName; label: string; value: string }[] = [
  { icon: "user", label: "Nombre", value: "Marta López" },
  { icon: "building", label: "Empresa", value: "Control Digital S.L." },
  { icon: "mail", label: "Email", value: "marta@controldigital.es" },
  { icon: "doc", label: "Solicitud", value: "50 uds. · Modelo X" },
];

function InboxFlow() {
  return (
    <div className="inbox-flow">
      <div className="ui-light mail-panel fx-in" style={at(0)}>
        <div className="mail-head">
          <span className="mail-app">
            <Icon name="mail" size={15} />
          </span>
          <strong>Nuevo email</strong>
          <time>09:41</time>
        </div>
        <dl className="mail-meta">
          <div>
            <dt>De</dt>
            <dd>
              <mark className="fx-mark" style={at(900)}>
                marta@controldigital.es
              </mark>
            </dd>
          </div>
          <div>
            <dt>Asunto</dt>
            <dd>Solicitud de presupuesto</dd>
          </div>
        </dl>
        <p className="mail-body">
          Hola, soy{" "}
          <mark className="fx-mark" style={at(500)}>
            Marta López
          </mark>
          , de{" "}
          <mark className="fx-mark" style={at(700)}>
            Control Digital S.L.
          </mark>{" "}
          Necesitamos presupuesto para{" "}
          <mark className="fx-mark" style={at(1100)}>
            50 unidades del modelo X
          </mark>
          .
        </p>
      </div>

      <Connector delay={1250} />

      <div className="ui-accent extract-panel">
        <div className="extract-head fx-in" style={at(1350)}>
          <Icon name="sparkle" size={15} />
          Datos extraídos
        </div>
        {extracted.map((row, index) => (
          <div className="extract-row fx-slide" style={at(1450 + index * 150)} key={row.label}>
            <Icon name={row.icon} size={15} />
            <div>
              <small>{row.label}</small>
              <b>{row.value}</b>
            </div>
          </div>
        ))}
      </div>

      <Connector delay={2050} />

      <div className="ui-light record-panel">
        <div className="record-head">
          <span>
            <Icon name="lead" size={15} />
          </span>
          <strong>Nuevo lead</strong>
          <small>CRM</small>
        </div>
        <dl className="record-fields">
          {extracted.map((row, index) => (
            <div key={row.label}>
              <dt>{row.label === "Solicitud" ? "Interés" : row.label}</dt>
              <dd>
                <span className="fx-type" style={at(2250 + index * 160)}>
                  {row.value}
                </span>
              </dd>
            </div>
          ))}
        </dl>
        <span className="record-status fx-pop" style={at(2950)}>
          <i>
            <Icon name="check" size={11} />
          </i>
          Completado automáticamente
        </span>
      </div>
    </div>
  );
}

const followSteps = [
  { title: "Respuesta enviada", time: "09:42", done: true },
  { title: "Añadido al CRM", time: "09:42", done: true },
  { title: "Seguimiento programado", time: "Jueves, 10:00", done: false },
];

function LeadFlow() {
  return (
    <div className="lead-flow">
      <div className="ui-light chat-panel">
        <div className="chat-head fx-in" style={at(0)}>
          <span className="chat-avatar">JL</span>
          <div>
            <strong>Juan López</strong>
            <small>Formulario web · hace 1 min</small>
          </div>
          <span className="chat-new">Nueva consulta</span>
        </div>
        <div className="chat-thread">
          <p className="chat-bubble chat-bubble-in fx-in" style={at(250)}>
            Hola, me gustaría saber más sobre vuestros servicios.
          </p>
          <p className="chat-bubble chat-bubble-out fx-in" style={at(1850)}>
            ¡Hola, Juan! Gracias por escribir. Te envío toda la información.
            <small>
              <Icon name="check" size={11} />
              Respondido en 30 s
            </small>
          </p>
          <span className="chat-typing">
            <i />
            <i />
            <i />
          </span>
        </div>
      </div>

      <div className="ui-accent follow-panel fx-in" style={at(2300)}>
        <div className="follow-head">
          <Icon name="calendar" size={15} />
          Seguimiento activo
        </div>
        <ol className="follow-steps">
          {followSteps.map((step, index) => (
            <li className="fx-slide" style={at(2550 + index * 260)} key={step.title}>
              <span className={`follow-dot ${step.done ? "" : "follow-dot-pending"}`}>
                <Icon name={step.done ? "check" : "calendar"} size={11} />
              </span>
              <div>
                <strong>{step.title}</strong>
                <small>{step.time}</small>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

// Each source tool starts slightly scattered (--cx/--cy/--cr) and settles into line.
const sources: { icon: IconName; label: string; scatter: Record<string, string> }[] = [
  { icon: "form", label: "Formulario", scatter: { "--cx": "-10px", "--cy": "8px", "--cr": "-7deg" } },
  { icon: "mail", label: "Email", scatter: { "--cx": "18px", "--cy": "-4px", "--cr": "5deg" } },
  { icon: "users", label: "CRM", scatter: { "--cx": "-4px", "--cy": "10px", "--cr": "4deg" } },
  { icon: "doc", label: "Archivos", scatter: { "--cx": "14px", "--cy": "-8px", "--cr": "-6deg" } },
];

const targets: { icon: IconName; label: string }[] = [
  { icon: "lead", label: "Leads" },
  { icon: "users", label: "Clientes" },
  { icon: "folder", label: "Proyectos" },
  { icon: "invoice", label: "Facturación" },
  { icon: "tasks", label: "Tareas" },
];

const inPaths = [12.5, 37.5, 62.5, 87.5].map((y) => `M0 ${y} C55 ${y} 45 50 100 50`);
const outPaths = [10, 30, 50, 70, 90].map((y) => `M0 50 C55 50 45 ${y} 100 ${y}`);
const inPathsVertical = [12.5, 37.5, 62.5, 87.5].map((x) => `M${x} 0 C${x} 55 50 45 50 100`);

function Lines({ paths, className, delay }: { paths: string[]; className: string; delay: number }) {
  return (
    <svg
      className={`connect-lines ${className}`}
      style={at(delay)}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
      {paths.map((d) => (
        <path key={`flow-${d}`} className="connect-flowline" d={d} />
      ))}
    </svg>
  );
}

function ConnectFlow() {
  return (
    <div className="connect-flow">
      <ul className="connect-sources">
        {sources.map((source, index) => (
          <li className="connect-chip fx-settle" style={at(index * 120, source.scatter)} key={source.label}>
            <Icon name={source.icon} size={16} />
            <span>{source.label}</span>
          </li>
        ))}
      </ul>
      <Lines paths={inPaths} className="connect-lines-h fx-draw" delay={950} />
      <Lines paths={inPathsVertical} className="connect-lines-v fx-draw-down" delay={950} />
      <span className="connect-hub fx-pop" style={at(1350)}>
        <BrandMark size={28} />
      </span>
      <Lines paths={outPaths} className="connect-lines-h fx-draw" delay={1650} />
      <Lines paths={["M50 0 L50 100"]} className="connect-lines-v fx-draw-down" delay={1650} />
      <ul className="ui-accent connect-targets">
        {targets.map((target, index) => (
          <li className="fx-slide" style={at(1850 + index * 110)} key={target.label}>
            <Icon name={target.icon} size={15} />
            {target.label}
            <span className="connect-target-ok">
              <Icon name="check" size={12} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const modules: { icon: IconName; label: string }[] = [
  { icon: "users", label: "Clientes" },
  { icon: "invoice", label: "Facturación" },
  { icon: "folder", label: "Proyectos" },
];

const kpis = [
  { icon: "users" as IconName, label: "Clientes", value: "248", delta: "+12%" },
  { icon: "invoice" as IconName, label: "Facturación", value: "24.800 €", delta: "+18%" },
  { icon: "folder" as IconName, label: "Proyectos", value: "16", delta: "activos" },
];

const activity = [
  { icon: "user" as IconName, text: "Nuevo cliente registrado", time: "5 min", tone: "green" },
  { icon: "invoice" as IconName, text: "Factura F-118 enviada", time: "20 min", tone: "blue" },
  { icon: "folder" as IconName, text: "Proyecto actualizado", time: "1 h", tone: "violet" },
];

function BuildFlow() {
  return (
    <div className="build-flow">
      <ul className="build-modules">
        {modules.map((module, index) => (
          <li className="build-module" style={at(200 + index * 550)} key={module.label}>
            <Icon name={module.icon} size={17} />
            <span>{module.label}</span>
            <span className="build-status">
              <span className="build-status-plus">
                <Icon name="plus" size={13} />
              </span>
              <span className="build-status-check">
                <Icon name="check" size={12} />
              </span>
            </span>
          </li>
        ))}
      </ul>

      <div className="ui-light dash">
        <aside className="dash-side">
          <span className="dash-logo">
            <BrandMark size={17} />
          </span>
          <span className="is-active">
            <Icon name="home" size={15} />
          </span>
          <Icon name="users" size={15} />
          <Icon name="invoice" size={15} />
          <Icon name="folder" size={15} />
          <Icon name="chart" size={15} />
        </aside>
        <div className="dash-main">
          <div className="dash-top">
            <div>
              <small>Panel</small>
              <strong>Tu negocio, en un solo lugar</strong>
            </div>
            <span className="dash-pill">Hoy</span>
          </div>

          <div className="dash-kpis">
            {kpis.map((kpi, index) => (
              <div className="dash-slot" key={kpi.label}>
                <div className="dash-kpi fx-pop" style={at(450 + index * 550)}>
                  <span className="dash-kpi-label">
                    <i>
                      <Icon name={kpi.icon} size={12} />
                    </i>
                    {kpi.label}
                  </span>
                  <b>
                    {kpi.value}
                    <em>{kpi.delta}</em>
                  </b>
                </div>
              </div>
            ))}
          </div>

          <div className="dash-lower">
            <div className="dash-card dash-activity">
              <h4>Actividad reciente</h4>
              <ul>
                {activity.map((item, index) => (
                  <li className="fx-in" style={at(1950 + index * 150)} key={item.text}>
                    <i className={`tone-${item.tone}`}>
                      <Icon name={item.icon} size={11} />
                    </i>
                    <span>{item.text}</span>
                    <time>{item.time}</time>
                  </li>
                ))}
              </ul>
            </div>
            <div className="dash-card dash-chart fx-in" style={at(1950)}>
              <div className="dash-chart-head">
                <h4>Facturación</h4>
                <span className="fx-pop" style={at(3100)}>
                  +18%
                </span>
              </div>
              <div className="dash-chart-plot">
                <svg viewBox="0 0 200 80" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="change-chart-fill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0" stopColor="#02a0fc" stopOpacity=".22" />
                      <stop offset="1" stopColor="#02a0fc" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    className="dash-chart-area fx-in"
                    style={at(2700)}
                    d="M0 66 C18 64 28 52 46 55 S76 44 96 46 S130 30 150 28 S184 12 200 8 L200 80 L0 80Z"
                  />
                  <path
                    className="dash-chart-line fx-draw"
                    style={at(2200)}
                    d="M0 66 C18 64 28 52 46 55 S76 44 96 46 S130 30 150 28 S184 12 200 8"
                  />
                </svg>
                <span className="dash-chart-dot fx-pop" style={at(3100)} />
              </div>
              <div className="dash-chart-axis">
                <span>Ene</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Abr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChangeShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Each card's mini-interface plays its sequence once it is well inside the
  // viewport. Cards entering together (the two half cards on desktop) are
  // staggered so they never animate at the same time. Without JS or with
  // reduced motion, nothing is armed and the CSS default is the final state.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const visuals = Array.from(section.querySelectorAll<HTMLElement>(".change-visual"));
    const timers: number[] = [];
    let nextSlot = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const inView =
            entry.intersectionRatio >= 0.4 ||
            entry.intersectionRect.height >= window.innerHeight * 0.5;
          if (!entry.isIntersecting || !inView) return;
          observer.unobserve(entry.target);

          const now = performance.now();
          const start = Math.max(now, nextSlot);
          nextSlot = start + 900;
          timers.push(
            window.setTimeout(() => entry.target.classList.add("is-playing"), start - now),
          );
        });
      },
      { threshold: [0, 0.2, 0.4, 0.6] },
    );

    visuals.forEach((visual) => {
      visual.classList.add("is-armed");
      observer.observe(visual);
    });

    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
      visuals.forEach((visual) => visual.classList.remove("is-armed", "is-playing"));
    };
  }, []);

  return (
    <section className="change-section" ref={sectionRef} aria-labelledby="change-title">
      <Container>
        <header className="change-header" data-reveal>
          <p className="change-eyebrow">EL CAMBIO EMPIEZA AQUÍ</p>
          <h2 id="change-title">
            Tu empresa podría <span>funcionar mucho mejor.</span>
          </h2>
          <p className="change-subtitle">Y probablemente ya sabes por dónde empezar.</p>
        </header>

        <div className="change-grid">
          <ChangeCard
            wide
            icon="mail"
            className="change-card-inbox"
            title="¿Otra vez haciendo lo mismo?"
            punchline="Que se haga solo."
          >
            <InboxFlow />
          </ChangeCard>

          <ChangeCard
            icon="users"
            className="change-card-leads"
            title={
              <>
                ¿Y si no se escapara <br />
                ninguno?
              </>
            }
            punchline="Cada oportunidad cuenta."
          >
            <LeadFlow />
          </ChangeCard>

          <ChangeCard
            icon="layers"
            className="change-card-connect"
            title={
              <>
                Todo conectado. <br />
                Por fin.
              </>
            }
            punchline="Adiós al caos."
          >
            <ConnectFlow />
          </ChangeCard>

          <ChangeCard
            wide
            icon="chart"
            className="change-card-build"
            title={
              <>
                Tu empresa ha cambiado. <br />
                Tu software también debería.
              </>
            }
            punchline="No al revés."
          >
            <BuildFlow />
          </ChangeCard>
        </div>
      </Container>
    </section>
  );
}
