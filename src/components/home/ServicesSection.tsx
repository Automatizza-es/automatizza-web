import { Container } from "@/components/layout/Container";

const services = [
  { number: "01", title: "Automatización", text: "El trabajo repetitivo, resuelto." },
  { number: "02", title: "Software a medida", text: "Herramientas hechas para tu empresa." },
  { number: "03", title: "Inteligencia artificial", text: "IA aplicada donde realmente aporta valor." },
  { number: "04", title: "Desarrollo web", text: "Webs que combinan diseño, rendimiento y estrategia." },
];

// Editorial list, deliberately static: no cards, icons or reveal motion.
export function ServicesSection() {
  return (
    <section className="whatwedo-section" id="servicios" aria-labelledby="services-title">
      <Container>
        <header className="section-header">
          <p className="section-eyebrow">QUÉ HACEMOS</p>
          <h2 id="services-title">Ideas que se convierten en soluciones.</h2>
          <p>
            Cuatro palabras no bastan para definir lo que hacemos, pero estas cuatro áreas lo resumen:
          </p>
        </header>

        <ol className="whatwedo-list">
          {services.map((service) => (
            <li className="whatwedo-row" key={service.number}>
              <span className="whatwedo-number">{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
