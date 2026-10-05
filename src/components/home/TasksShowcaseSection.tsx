"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

import { Container } from "@/components/layout/Container";

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

function PlaneGlyph({ color = "#fff" }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 3 10.5 13.5M21 3l-6.5 18-4-8.5L2 8.5 21 3Z" />
    </svg>
  );
}

function BellGlyph({ color = "#fff" }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 10a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 14 6 10Z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </svg>
  );
}

function CheckGlyph({ color = "#fff" }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

type TileIconName = "form" | "mail" | "crm" | "invoice";

function TileIcon({ name }: { name: TileIconName }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#02a0fc",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "form") {
    return (
      <svg {...common}>
        <path d="M6 3.5h8l4 4V20H6V3.5Z" />
        <path d="M14 3.5V8h4M9 12h6M9 15.5h6" />
      </svg>
    );
  }
  if (name === "mail") {
    return (
      <svg {...common}>
        <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
        <path d="m4.5 7 7.5 6 7.5-6" />
      </svg>
    );
  }
  if (name === "crm") {
    return (
      <svg {...common}>
        <ellipse cx="12" cy="6" rx="7" ry="2.5" />
        <path d="M5 6v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6" />
        <path d="M5 12v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-6" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M6 3.5h8l4 4V20H6V3.5Z" />
      <path d="M9 11.5h6M9 15h4" />
      <circle cx="15.5" cy="16.5" r="3" />
      <path d="m17.6 18.6 1.4 1.4" />
    </svg>
  );
}

export function TasksShowcaseSection() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 1040px)").matches) return;

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
          </Container>

          <div className="tasks-carousel">
            <div className="tasks-carousel-track">
              <article className="task-card task-card-data task-card-v2" data-reveal>
                <span className="task-v2-number">01</span>
                <div className="task-v2-header">
                  <h3 className="task-v2-title">
                    Copiar datos
                    <br />a mano
                  </h3>
                  <p className="task-v2-subtitle">Todo se rellena solo.</p>
                </div>
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
                <div className="task-v2-header">
                  <h3 className="task-v2-title">
                    Agente WhatsApp
                    <br />+ Teléfono
                  </h3>
                  <p className="task-v2-subtitle">Responde, deriva y registra.</p>
                </div>
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

              <article className="task-card task-card-followup task-card-v2" data-reveal>
                <span className="task-v2-number">03</span>
                <div className="task-v2-header">
                  <h3 className="task-v2-title">
                    Seguimiento
                    <br />
                    automático
                  </h3>
                  <p className="task-v2-subtitle">Nada se queda atrás.</p>
                </div>
                <div className="task-v2-tl" aria-hidden="true">
                  <div className="task-v2-tl-item">
                    <div className="task-v2-tl-rail">
                      <span className="task-v2-tl-dot task-v2-tl-dot-a">
                        <PlaneGlyph />
                      </span>
                      <span className="task-v2-tl-rail-line" />
                    </div>
                    <div className="task-v2-tl-card">
                      <strong>Presupuesto enviado</strong>
                      <small>Hoy · 10:24</small>
                    </div>
                  </div>
                  <div className="task-v2-tl-item">
                    <div className="task-v2-tl-rail">
                      <span className="task-v2-tl-dot task-v2-tl-dot-b">
                        <BellGlyph color="#2f6bf0" />
                      </span>
                      <span className="task-v2-tl-rail-line" />
                    </div>
                    <div className="task-v2-tl-card">
                      <strong>Recordatorio automático</strong>
                      <small>En 2 días</small>
                    </div>
                  </div>
                  <div className="task-v2-tl-item">
                    <div className="task-v2-tl-rail">
                      <span className="task-v2-tl-dot task-v2-tl-dot-c">
                        <CheckGlyph />
                      </span>
                    </div>
                    <div className="task-v2-tl-card">
                      <strong>Cliente respondido</strong>
                      <small>Hoy · 16:30</small>
                    </div>
                  </div>
                </div>
              </article>

              <article className="task-card task-card-flow task-card-v2" data-reveal>
                <span className="task-v2-number">04</span>
                <div className="task-v2-header">
                  <h3 className="task-v2-title">
                    Datos
                    <br />
                    conectados
                  </h3>
                  <p className="task-v2-subtitle">Todo en un mismo flujo.</p>
                </div>
                <div className="task-v2-visual task-v2-connect" aria-hidden="true">
                  <div className="task-v2-tile">
                    <TileIcon name="form" />
                    <small>Formulario web</small>
                  </div>
                  <div className="task-v2-tile">
                    <TileIcon name="mail" />
                    <small>Email</small>
                  </div>
                  <div className="task-v2-tile">
                    <TileIcon name="crm" />
                    <small>CRM</small>
                  </div>
                  <div className="task-v2-tile">
                    <TileIcon name="invoice" />
                    <small>Presupuestos</small>
                  </div>
                  <span className="task-v2-hub">Z</span>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
