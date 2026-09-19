import Link from "next/link";

import { Container } from "@/components/layout/Container";

export function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-network" aria-hidden="true">
        <svg viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice">
          <g className="hero-network-lines">
            <path d="M-30 188 154 188 258 86 430 86" />
            <path d="M80 586 244 424 414 424 516 322" />
            <path d="M314 720 314 588 494 408 662 408" />
            <path d="M1026 78 1144 196 1470 196" />
            <path d="M844 316 1010 316 1134 440 1470 440" />
            <path d="M930 596 1094 596 1230 460" />
            <path d="M558 126 676 244 840 244 956 128" />
            <path d="M556 598 672 482 834 482 948 596" />
          </g>
          <g className="hero-network-routes">
            <path d="M-30 188 154 188 258 86 430 86" />
            <path d="M80 586 244 424 414 424 516 322" />
            <path d="M1026 78 1144 196 1470 196" />
            <path d="M844 316 1010 316 1134 440 1470 440" />
          </g>
          <g className="hero-network-nodes">
            <circle className="node-secondary" cx="154" cy="188" r="3.5" />
            <circle className="node-primary" cx="258" cy="86" r="6" />
            <circle cx="244" cy="424" r="4" />
            <circle className="node-primary" cx="414" cy="424" r="6" />
            <circle cx="314" cy="588" r="4" />
            <circle cx="676" cy="244" r="4" />
            <circle cx="834" cy="482" r="4" />
            <circle className="node-primary" cx="1010" cy="316" r="6" />
            <circle cx="1134" cy="440" r="4" />
            <circle className="node-primary" cx="1144" cy="196" r="6" />
            <circle cx="1230" cy="460" r="4" />
          </g>
          <g className="hero-network-travelers">
            <circle r="3.5">
              <animateMotion dur="8s" repeatCount="indefinite" path="M-30 188 154 188 258 86 430 86" />
            </circle>
            <circle r="3">
              <animateMotion dur="11s" begin="-4s" repeatCount="indefinite" path="M844 316 1010 316 1134 440 1470 440" />
            </circle>
            <circle r="3">
              <animateMotion dur="9s" begin="-6s" repeatCount="indefinite" path="M556 598 672 482 834 482 948 596" />
            </circle>
          </g>
        </svg>
      </div>
      <Container className="hero-inner">
        <div className="hero-copy">
          <p className="hero-eyebrow">AUTOMATIZACIÓN · SOFTWARE · IA APLICADA</p>
          <h1 id="hero-title">
            <span>Menos tareas repetitivas</span>
            <span>
              <strong>Más tiempo</strong> para hacer crecer tu empresa
            </span>
          </h1>
          <p className="hero-description">
            Desarrollamos aplicaciones y automatizaciones adaptadas a tu forma de trabajar,
            incorporando inteligencia artificial cuando aporta valor. Desde una necesidad concreta
            hasta sistemas que conectan distintas áreas de tu empresa.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="#contacto">
              <span>Hablemos de tu proyecto</span>
              <span className="button-arrow" aria-hidden="true">
                →
              </span>
            </Link>
            <Link className="button button-secondary" href="#proyectos">
              Ver proyectos reales
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
