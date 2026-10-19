import { Container } from "@/components/layout/Container";
import styles from "./AboutSection.module.css";

export function AboutSection() {
  return (
    <section className={styles.section} id="sobre-automatizza" aria-labelledby="about-title">
      <Container className="editorial-container">
        <div className={styles.introduction} data-reveal>
          <div className={styles.statement}>
            <p className={`section-eyebrow ${styles.eyebrow}`}>SOBRE AUTOMATIZZA</p>
            <h2 id="about-title">Somos María José y Eva.</h2>
          </div>
          <p className={styles.story}>
            Creamos Automatizza después de trabajar resolviendo necesidades de empresas industriales
            y pequeños negocios. Desarrollamos juntas cada proyecto, desde entender el proceso hasta
            poner en marcha la solución.
          </p>
        </div>
        <div className={styles.profiles}>
          <article className={styles.profile} aria-labelledby="about-maria-jose" data-reveal>
            <h3 id="about-maria-jose">María José López</h3>
            <p>
              Experiencia en estrategia, marketing digital y analítica web. Másteres en SEO-SEM,
              Analítica Web e Inteligencia Artificial.
            </p>
            <a
              href="https://www.linkedin.com/in/mariajoselopez/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de María José López (se abre en una pestaña nueva)"
            >
              LinkedIn
            </a>
          </article>
          <article className={styles.profile} aria-labelledby="about-eva" data-reveal>
            <h3 id="about-eva">Eva Martín López</h3>
            <p>
              Bioinformática y máster en Data Science. Experiencia en desarrollo de software
              industrial e investigación con datos e inteligencia artificial.
            </p>
            <a
              href="https://www.linkedin.com/in/eva-martin-lopez/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Eva Martín López (se abre en una pestaña nueva)"
            >
              LinkedIn
            </a>
          </article>
        </div>
      </Container>
    </section>
  );
}
