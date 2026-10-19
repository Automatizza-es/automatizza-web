import Image from "next/image";
import { Container } from "@/components/layout/Container";
// Replace the independent original file to update the provisional portrait.
// The static import refreshes Next's image cache when its contents change.
import mariaJosePortrait from "../../../public/about/maria-jose-lopez.png";
import evaPortrait from "../../../public/about/eva-martin-lopez.png";
import styles from "./AboutSection.module.css";

export function AboutSection() {
  return (
    <section className={styles.section} id="sobre-automatizza" aria-labelledby="about-title">
      <Container className="editorial-container">
        <div className={styles.introduction} data-reveal>
          <h2 id="about-title">Quienes estamos detrás</h2>
          <p>
            Unimos experiencia en negocio, desarrollo y datos para crear aplicaciones y
            automatizaciones adaptadas a cada empresa.
          </p>
        </div>
        <div className={styles.profiles}>
          <article className={styles.profile} aria-labelledby="about-maria-jose" data-reveal>
            <div className={styles.portraitFrame}>
              <Image
                className={`${styles.portrait} ${styles.mariaJosePortrait}`}
                src={mariaJosePortrait}
                alt="María José López"
                width={120}
                height={145}
                sizes="(max-width: 360px) 72px, (max-width: 600px) 88px, 120px"
              />
            </div>
            <div className={styles.profileCopy}>
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
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
          <article className={styles.profile} aria-labelledby="about-eva" data-reveal>
            <div className={styles.portraitFrame}>
              <Image
                className={`${styles.portrait} ${styles.evaPortrait}`}
                src={evaPortrait}
                alt="Eva Martín López"
                width={120}
                height={145}
                sizes="(max-width: 360px) 126px, (max-width: 600px) 154px, 210px"
              />
            </div>
            <div className={styles.profileCopy}>
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
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
