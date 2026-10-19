import { Container } from "@/components/layout/Container";
import styles from "./AboutSection.module.css";

export function AboutSection() {
  return (
    <section className={styles.section} id="sobre-automatizza" aria-labelledby="about-title">
      <Container className="editorial-container">
        <div data-reveal>
          <p className={`section-eyebrow ${styles.eyebrow}`}>SOBRE AUTOMATIZZA</p>
          <div className={styles.introduction}>
            <div className={styles.statement}>
              <h2 id="about-title">Tecnología con los pies en el negocio.</h2>
              <p className={styles.highlight}>De necesidades reales a soluciones que funcionan.</p>
            </div>
            <p className={styles.description}>
              Ayudamos a pequeñas y medianas empresas a aprovechar la tecnología de una forma
              práctica: simplificar tareas, conectar procesos y dedicar más tiempo a lo que
              realmente importa. Todo con soluciones adaptadas a su forma de trabajar, sin
              añadir complejidad.
            </p>
          </div>
          <p className={styles.detail}>Trabajar mejor. Vivir mejor.</p>
        </div>
      </Container>
    </section>
  );
}
