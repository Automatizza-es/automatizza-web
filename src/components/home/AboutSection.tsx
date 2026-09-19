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

        <div className="about-asset-slot" data-asset-slot="automatizza-real-photo">
          <div className="about-photo-mark" aria-hidden="true">A</div>
          <span>Espacio preparado para fotografía real</span>
          <strong>Automatizza · tecnología aplicada al negocio</strong>
        </div>
      </Container>
    </section>
  );
}
