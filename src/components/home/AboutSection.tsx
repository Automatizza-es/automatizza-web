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
            <p className={styles.lead}>
              Madre e hija, con trayectorias distintas y una idea compartida: simplificar el trabajo
              diario de las empresas.
            </p>
          </div>
          <div className={styles.story}>
            <p>
              Automatizza nace de la experiencia de resolver necesidades en empresas industriales y
              pequeños negocios. Al trabajar con sus equipos, encontramos tareas que se repiten,
              información repartida entre herramientas y procesos que podrían ser más sencillos.
            </p>
            <p>
              Trabajamos juntas en cada proyecto, desde entender cómo funciona el negocio hasta
              desarrollar y poner en marcha la solución.
            </p>
          </div>
        </div>
        <div className={styles.profiles}>
          <article className={styles.profile} aria-labelledby="about-maria-jose" data-reveal>
            <h3 id="about-maria-jose">María José López</h3>
            <p>
              Cuenta con una amplia trayectoria en estrategia, marketing digital y analítica web.
              Ha completado esa experiencia con formación de máster en SEO-SEM, Analítica Web e
              Inteligencia Artificial.
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
              Bioinformática y máster en Data Science, con experiencia en desarrollo de software
              para la industria e investigación en ciencia de datos e inteligencia artificial.
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
