import { Container } from "@/components/layout/Container";
import { SectionHeading } from "./SectionHeading";
import styles from "./ServicesSection.module.css";

const services = [
  { number: "01", title: "Automatización", text: "Procesos que avanzan solos y menos trabajo manual." },
  { number: "02", title: "Software a medida", text: "Herramientas diseñadas para la forma real de trabajar de tu empresa." },
  { number: "03", title: "Inteligencia artificial", text: "Extraer información de documentos, clasificar solicitudes y facilitar consultas" },
  { number: "04", title: "Desarrollo web", text: "Webs y experiencias digitales con diseño, rendimiento y estrategia." },
];

export function ServicesSection() {
  return (
    <section className={`whatwedo-section ${styles.section}`} id="servicios" aria-labelledby="services-title">
      <Container className="editorial-container">
        <SectionHeading
          id="services-title"
          eyebrow="QUÉ PODEMOS HACER POR TI"
          title="De la idea a la solución."
          description="Automatización, software a medida, IA y desarrollo web para acompañar la forma real de trabajar de tu empresa."
        />

        <ol className={styles.services}>
          {services.map((service) => (
            <li className={styles.service} key={service.number} data-reveal>
              <span className={styles.number}>{service.number}</span>
              <h3><span>{service.title}</span></h3>
              <p>{service.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
