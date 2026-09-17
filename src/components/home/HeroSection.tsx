import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";

export function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Container className="hero-grid">
        <div className="hero-copy">
          <p className="hero-eyebrow">AUTOMATIZACIÓN · SOFTWARE · IA APLICADA</p>
          <h1 id="hero-title">
            <span>Menos tareas repetitivas.</span>
            <span>Más tiempo para hacer crecer tu empresa.</span>
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

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-app">
            <Image
              src="/images/hero-crm-dashboard.png"
              alt=""
              fill
              priority
              sizes="(max-width: 600px) calc(100vw - 2.5rem), (max-width: 900px) 84vw, 530px"
            />
          </div>
          {/* hero-photo: sustituir esta superficie por una fotografía real de proyecto. */}
          <div className="hero-photo" />
        </div>
      </Container>
    </section>
  );
}
