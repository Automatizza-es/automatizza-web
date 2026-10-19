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
              <p className={styles.highlight}>
                De necesidades reales <br />a soluciones que funcionan.
              </p>
            </div>
            <p className={styles.description}>
              En Automatizza ayudamos a las pequeñas y medianas empresas a crecer con más
              capacidad y menos complejidad, poniendo a su alcance tecnología que les permita
              trabajar mejor, ser más competitivas y aprovechar mejor su tiempo.
            </p>
          </div>
          <p className={styles.detail}>Trabajar mejor. Vivir mejor.</p>
        </div>
      </Container>
    </section>
  );
}
