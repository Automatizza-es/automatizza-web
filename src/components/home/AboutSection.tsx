import Image from "next/image";

import { Container } from "@/components/layout/Container";

export function AboutSection() {
  return (
    <section className="about-section" id="sobre-automatizza" aria-labelledby="about-title">
      <Container className="about-layout" data-reveal>
        <div className="about-statement">
          <p className="section-eyebrow">SOBRE AUTOMATIZZA</p>
          <h2 id="about-title">Tecnología con los pies en el negocio</h2>
        </div>

        <div className="about-copy">
          <p>
            Entendemos primero el problema y la forma real de trabajar. Después diseñamos una
            solución adaptada, utilizando automatización, software o inteligencia artificial solo
            cuando aportan valor.
          </p>
          <p className="about-principle">La tecnología es el medio. El proceso es el punto de partida.</p>
        </div>

        <figure className="about-photo">
          <Image
            src="/about/equipo.jpg"
            alt="El equipo de Automatizza revisando un proyecto en el portátil"
            width={800}
            height={900}
            sizes="(max-width: 900px) calc(100vw - 2.5rem), 420px"
          />
        </figure>
      </Container>
    </section>
  );
}
