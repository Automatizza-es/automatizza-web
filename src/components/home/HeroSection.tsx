import Link from "next/link";

import { Container } from "@/components/layout/Container";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.network} aria-hidden="true">
        <svg viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice">
          <g className={styles.lines}>
            <path d="M-30 188 154 188 258 86 430 86" />
            <path d="M80 586 244 424 414 424 516 322" />
            <path d="M314 720 314 588 494 408 662 408" />
            <path d="M1026 78 1144 196 1470 196" />
            <path d="M844 316 1010 316 1134 440 1470 440" />
            <path d="M930 596 1094 596 1230 460" />
            <path d="M558 126 676 244 840 244 956 128" />
            <path d="M556 598 672 482 834 482 948 596" />
          </g>
          <g className={styles.routes}>
            <path d="M-30 188 154 188 258 86 430 86" />
            <path d="M80 586 244 424 414 424 516 322" />
            <path d="M1026 78 1144 196 1470 196" />
            <path d="M844 316 1010 316 1134 440 1470 440" />
          </g>
          <g className={styles.nodes}>
            <circle className="node-secondary" cx="154" cy="188" r="3.5" />
            <circle className="node-primary" cx="258" cy="86" r="6" />
            <circle cx="244" cy="424" r="4" />
            <circle className="node-primary" cx="414" cy="424" r="6" />
            <circle cx="314" cy="588" r="4" />
            <circle cx="676" cy="244" r="4" />
            <circle cx="834" cy="482" r="4" />
            <circle className="node-primary" cx="1010" cy="316" r="6" />
            <circle cx="1134" cy="440" r="4" />
            <circle className="node-primary" cx="1144" cy="196" r="6" />
            <circle cx="1230" cy="460" r="4" />
          </g>
          <g className={styles.travelers}>
            <circle r="3.5">
              <animateMotion dur="18s" repeatCount="indefinite" path="M-30 188 154 188 258 86 430 86" />
            </circle>
            <circle r="3">
              <animateMotion dur="22s" begin="-4s" repeatCount="indefinite" path="M844 316 1010 316 1134 440 1470 440" />
            </circle>
            <circle r="3">
              <animateMotion dur="20s" begin="-6s" repeatCount="indefinite" path="M556 598 672 482 834 482 948 596" />
            </circle>
          </g>
        </svg>
      </div>
      <Container className={styles.inner}>
        <div className={styles.copy}>
          <h1 id="hero-title" className={styles.title}>
            <span className={styles.statement}>
              <span className={styles.lead}>La tecnología</span>{" "}
              <strong className={styles.emphasis}>se adapta a ti.</strong>
            </span>
            <span className={styles.closing}>No al revés.</span>
          </h1>
          <p className={styles.description}>
            Creamos aplicaciones y automatizaciones a medida que conectan procesos y simplifican tu día a día.
          </p>
          <div className={styles.actions}>
            <Link className={`${styles.button} ${styles.primary}`} href="#contacto">
              <span>Hablemos de tu proyecto</span>
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </Link>
            <Link className={`${styles.button} ${styles.secondary}`} href="#proyectos">
              Ver proyectos
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
