"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

import { Container } from "@/components/layout/Container";

type FlowIconName = "form" | "crm" | "mail" | "erp" | "chart";

function FlowIcon({ name }: { name: FlowIconName }) {
  const common = {
    width: 15,
    height: 15,
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "form") {
    return (
      <svg {...common} stroke="#425066">
        <path d="M6 3.5h8l4 4V20H6V3.5Z" />
        <path d="M9 12h6M9 16h6" />
      </svg>
    );
  }
  if (name === "crm") {
    return (
      <svg {...common} stroke="#c2660f">
        <circle cx="8" cy="8" r="2.75" />
        <circle cx="17" cy="7" r="2" />
        <circle cx="16" cy="17" r="2.5" />
        <path d="m10.1 9.4 4.9-1.7M9.3 10.3l5.3 5.1" />
      </svg>
    );
  }
  if (name === "mail") {
    return (
      <svg {...common} stroke="#d1483f">
        <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
        <path d="m4.5 7 7.5 6 7.5-6" />
      </svg>
    );
  }
  if (name === "erp") {
    return (
      <svg {...common} stroke="#5b4fc4">
        <rect x="5" y="3.5" width="14" height="17" rx="1" />
        <path d="M9 8h6M9 12h6M9 16h3" />
      </svg>
    );
  }
  return (
    <svg {...common} stroke="#1d8a52">
      <path d="M4 20V9M11 20V4M18 20v-7" />
      <path d="M4 20h17" />
    </svg>
  );
}

function MailGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function ChatGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12.5a7.5 7.5 0 1 1 3.2 6.15L4 19.5l.9-3A7.44 7.44 0 0 1 4 12.5Z" />
    </svg>
  );
}

function PhoneGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6.5 4.5c.6 1.6 1.4 3 2.4 4.1-.9 1-1 1.8-.5 2.6 1 1.7 2.6 3.3 4.3 4.3.8.5 1.6.4 2.6-.5 1.1 1 2.5 1.8 4.1 2.4v2.4c0 1-.9 1.7-1.9 1.5A17 17 0 0 1 5 8.4c-.2-1 .5-1.9 1.5-1.9h0Z" />
    </svg>
  );
}

function SheetGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="3.5" width="16" height="17" rx="2" />
      <path d="M4 10h16M4 15h16M10 10v10" />
    </svg>
  );
}

export function TasksShowcaseSection() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 900px)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      const progress = range > 0 ? Math.min(1, Math.max(0, -rect.top / range)) : 0;
      el.style.setProperty("--p", progress.toFixed(4));
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="tasks-section" aria-labelledby="tasks-title">
      <div className="tasks-scroller" ref={stageRef}>
        <div className="tasks-stage">
          <div className="tasks-bg" aria-hidden="true">
            <span className="tasks-blob tasks-blob-a" />
            <span className="tasks-blob tasks-blob-b" />
            <span className="tasks-dotgrid" />
          </div>

          <Container className="tasks-inner">
            <div className="tasks-headline" data-reveal>
              <div className="tasks-headline-text">
                <p className="tasks-eyebrow">EL PUNTO DE PARTIDA</p>
                <h2 id="tasks-title">Hay tareas que no deberían seguir quitándote tiempo</h2>
              </div>
            </div>

            <div className="tasks-cta">
              <p>
                Tu equipo decide.
                <br />
                Automatizza se ocupa del resto.
              </p>
              <Link className="button button-primary" href="#contacto">
                <span>Cuéntanos qué proceso quieres automatizar</span>
                <span className="button-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>

            <div className="tasks-cards">
              <article className="task-card task-card-data task-card-v2" data-reveal>
                <span className="task-v2-number">01</span>
                <h3 className="task-v2-title">
                  Copiar datos
                  <br />a mano
                </h3>
                <p className="task-v2-subtitle">Todo se rellena solo.</p>
                <div className="task-v2-visual" aria-hidden="true">
                  <div className="task-v2-form">
                    <div className="task-v2-form-head">
                      <span className="task-v2-avatar" />
                      <div>
                        <strong>Nueva solicitud</strong>
                        <small>Hace 2 min</small>
                      </div>
                    </div>
                    <div className="task-v2-form-row">
                      <span>Cliente</span>
                      <b>Carlos Martín</b>
                    </div>
                    <div className="task-v2-form-row">
                      <span>Empresa</span>
                      <b>Example SL</b>
                    </div>
                    <div className="task-v2-form-check">
                      <span>✓</span> Auto-completado
                    </div>
                  </div>
                  <span className="task-v2-bubble task-v2-bubble-mail">
                    <MailGlyph />
                  </span>
                  <span className="task-v2-bubble task-v2-bubble-sheet">
                    <SheetGlyph />
                  </span>
                </div>
              </article>

              <article className="task-card task-card-docs task-card-v2" data-reveal>
                <span className="task-v2-number">02</span>
                <h3 className="task-v2-title">
                  Agente WhatsApp
                  <br />+ Teléfono
                </h3>
                <p className="task-v2-subtitle">Responde, deriva y registra.</p>
                <div className="task-v2-visual" aria-hidden="true">
                  <div className="task-v2-phone">
                    <div className="task-v2-phone-head">
                      <span className="task-v2-avatar" />
                      <div>
                        <strong>Cliente</strong>
                        <small>En línea</small>
                      </div>
                    </div>
                    <div className="task-v2-msg task-v2-msg-in">
                      ¿Podríais enviarme un presupuesto?
                      <time>10:24</time>
                    </div>
                    <div className="task-v2-msg task-v2-msg-out">
                      ¡Claro! Te lo preparo ahora mismo.
                      <time>10:25 ✓✓</time>
                    </div>
                  </div>
                  <span className="task-v2-bubble task-v2-bubble-chat">
                    <ChatGlyph />
                  </span>
                  <span className="task-v2-bubble task-v2-bubble-call">
                    <PhoneGlyph />
                  </span>
                </div>
              </article>

              <article className="task-card task-card-followup" data-reveal>
                <div className="task-card-chrome">
                  <span className="task-card-number">03</span>
                  <span className="task-card-dots" aria-hidden="true">
                    •••
                  </span>
                </div>
                <p className="task-card-eyebrow">DE ACTIVIDAD A AVANCE</p>
                <h3>Seguimientos en marcha</h3>
                <div className="task-card-ui task-card-ui-timeline">
                  <ul>
                    <li>
                      <time>09:42</time>
                      <span>Cliente solicita información</span>
                    </li>
                    <li>
                      <time>09:43</time>
                      <span>Responsable avisado</span>
                    </li>
                    <li>
                      <time>09:43</time>
                      <span>Seguimiento programado</span>
                    </li>
                  </ul>
                </div>
              </article>

              <article className="task-card task-card-flow" data-reveal>
                <div className="task-card-chrome">
                  <span className="task-card-number">04</span>
                  <span className="task-card-dots" aria-hidden="true">
                    •••
                  </span>
                </div>
                <p className="task-card-eyebrow">DE HERRAMIENTAS AISLADAS A UN SOLO FLUJO</p>
                <h3>Mover información entre herramientas</h3>
                <div className="task-card-ui task-card-ui-flow">
                  <div className="task-ui-flow-row">
                    <span className="task-ui-chip">
                      <FlowIcon name="form" />
                      Formulario
                    </span>
                    <span className="task-ui-link" aria-hidden="true">
                      <i />
                      <b>Z</b>
                      <i />
                    </span>
                    <span className="task-ui-chip">
                      <FlowIcon name="crm" />
                      CRM
                    </span>
                  </div>
                  <div className="task-ui-flow-row">
                    <span className="task-ui-chip">
                      <FlowIcon name="mail" />
                      Gmail
                    </span>
                    <span className="task-ui-link" aria-hidden="true">
                      <i />
                      <b>Z</b>
                      <i />
                    </span>
                    <span className="task-ui-chip">
                      <FlowIcon name="erp" />
                      ERP
                    </span>
                  </div>
                  <div className="task-ui-flow-row">
                    <span className="task-ui-chip">
                      <FlowIcon name="crm" />
                      CRM
                    </span>
                    <span className="task-ui-link" aria-hidden="true">
                      <i />
                      <b>Z</b>
                      <i />
                    </span>
                    <span className="task-ui-chip">
                      <FlowIcon name="chart" />
                      Informe
                    </span>
                  </div>
                </div>
              </article>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
