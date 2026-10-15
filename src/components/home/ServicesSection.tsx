import { Container } from "@/components/layout/Container";
import { SectionHeading } from "./SectionHeading";
import styles from "./ServicesSection.module.css";

const services = [
  { number: "01", title: "Automatización", text: "Procesos que avanzan solos y menos trabajo manual." },
  { number: "02", title: "Software a medida", text: "Herramientas diseñadas para la forma real de trabajar de tu empresa." },
  { number: "03", title: "Inteligencia artificial", text: "IA aplicada donde realmente ahorra tiempo y aporta valor." },
  { number: "04", title: "Desarrollo web", text: "Webs y experiencias digitales con diseño, rendimiento y estrategia." },
];

export function ServicesSection() {
  return (
    <section className={`whatwedo-section ${styles.section}`} id="servicios" aria-labelledby="services-title">
      <Container className="editorial-container">
        <SectionHeading
          id="services-title"
          eyebrow="QUÉ HACEMOS"
          title="De la idea a la solución."
          description="Desde pequeñas automatizaciones hasta aplicaciones completas. Tecnología diseñada para la forma de trabajar de tu empresa."
        />

        <ol className={styles.services}>
          {services.map((service) => (
            <li className={styles.service} key={service.number}>
              <span className={styles.number}>{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
