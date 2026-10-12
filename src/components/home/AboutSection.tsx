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
            Nuestra misión es ayudar a las pequeñas y medianas empresas a competir a otro nivel,
            poniendo a su alcance tecnología que les permita trabajar mejor, ganar competitividad y
            crecer sin añadir complejidad.
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
