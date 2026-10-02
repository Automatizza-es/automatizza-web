"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

import { Container } from "@/components/layout/Container";

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
            <svg className="tasks-connector" viewBox="0 0 1200 760" preserveAspectRatio="none" aria-hidden="true">
              <path className="tasks-connector-path" d="M190 150 Q 420 130 600 110 Q 480 360 230 530 Q 520 580 760 490" />
              <circle className="tasks-connector-dot" cx="190" cy="150" r="5" />
              <circle className="tasks-connector-dot" cx="600" cy="110" r="5" />
              <circle className="tasks-connector-dot" cx="230" cy="530" r="5" />
              <circle className="tasks-connector-dot" cx="760" cy="490" r="5" />
            </svg>
          </div>

          <Container className="tasks-inner">
            <div className="tasks-headline" data-reveal>
              <p className="tasks-eyebrow">EL PUNTO DE PARTIDA</p>
              <h2 id="tasks-title">Hay tareas que no deberían seguir quitándote tiempo</h2>
              <div className="tasks-subtext-stack">
                <p className="tasks-subtext tasks-subtext-start">
                  Demasiado trabajo manual. Demasiado tiempo perdido.
                </p>
                <div className="tasks-subtext tasks-subtext-end">
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
              </div>
            </div>

            <div className="tasks-cards">
              <article className="task-card task-card-data" data-reveal>
                <div className="task-card-chrome">
                  <span className="task-card-number">01</span>
                  <span className="task-card-dots" aria-hidden="true">
                    •••
                  </span>
                </div>
                <p className="task-card-eyebrow">DE SOLICITUD A DATOS</p>
                <h3>Copiar datos a mano</h3>
                <div className="task-card-ui task-card-ui-form">
                  <p className="task-ui-label">Nueva solicitud</p>
                  <dl>
                    <div>
                      <dt>Cliente</dt>
                      <dd>Carlos Martín</dd>
                    </div>
                    <div>
                      <dt>Empresa</dt>
                      <dd>Example SL</dd>
                    </div>
                    <div>
                      <dt>Producto</dt>
                      <dd>Instalación industrial</dd>
                    </div>
                    <div>
                      <dt>País</dt>
                      <dd>España</dd>
                    </div>
                  </dl>
                  <p className="task-ui-status">
                    <span aria-hidden="true">✓</span> Datos extraídos automáticamente
                  </p>
                </div>
              </article>

              <article className="task-card task-card-docs" data-reveal>
                <div className="task-card-chrome">
                  <span className="task-card-number">02</span>
                  <span className="task-card-dots" aria-hidden="true">
                    •••
                  </span>
                </div>
                <p className="task-card-eyebrow">DE DATOS A DOCUMENTOS</p>
                <h3>Presupuesto preparado</h3>
                <div className="task-card-ui task-card-ui-doc">
                  <div className="task-ui-doc-head">
                    <span>Presupuesto #2481</span>
                    <span className="task-ui-tag">PDF</span>
                  </div>
                  <ul>
                    <li>
                      <span aria-hidden="true">✓</span> Cliente
                    </li>
                    <li>
                      <span aria-hidden="true">✓</span> Productos
                    </li>
                    <li>
                      <span aria-hidden="true">✓</span> Tarifas
                    </li>
                    <li>
                      <span aria-hidden="true">✓</span> PDF generado
                    </li>
                  </ul>
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
                      <time>09:42</time>
                      <span>CRM actualizado</span>
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
                  <p className="task-ui-status">
                    <span aria-hidden="true">✓</span> Todo gestionado automáticamente
                  </p>
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
                    <span>Formulario</span>
                    <i aria-hidden="true" />
                    <span>CRM</span>
                  </div>
                  <div className="task-ui-flow-row">
                    <span>Gmail</span>
                    <i aria-hidden="true" />
                    <span>ERP</span>
                  </div>
                  <div className="task-ui-flow-row">
                    <span>CRM</span>
                    <i aria-hidden="true" />
                    <span>Informe</span>
                  </div>
                  <p className="task-ui-status">
                    <span aria-hidden="true">✓</span> Sincronizado automáticamente
                  </p>
                </div>
              </article>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
