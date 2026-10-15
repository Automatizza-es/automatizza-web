import { Container } from "@/components/layout/Container";
import styles from "./AboutSection.module.css";

export function AboutSection() {
  return (
    <section className={styles.section} id="sobre-automatizza" aria-labelledby="about-title">
      <Container className="editorial-container" data-reveal>
        <div className={styles.composition}>
          <div className={styles.statement}>
            <p className={`section-eyebrow ${styles.eyebrow}`}>SOBRE AUTOMATIZZA</p>
            <h2 id="about-title">Tecnología útil para empresas reales.</h2>
            <p className={styles.principle}>Menos complejidad. Más sentido.</p>
          </div>
          <p>
            Detrás de Automatizza hay personas que combinan visión de negocio y desarrollo digital.
            Nos gusta entender cómo trabaja cada empresa para crear soluciones que realmente encajen
            en su día a día.
          </p>
        </div>
        <p className={styles.detail}>Negocio, procesos y tecnología, en equilibrio.</p>
      </Container>
    </section>
  );
}
