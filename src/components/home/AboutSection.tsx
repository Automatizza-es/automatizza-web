"use client";

import { useI18n } from "@/components/i18n/LocaleProvider";

import { Container } from "@/components/layout/Container";
import styles from "./AboutSection.module.css";

export function AboutSection() {
  const { t } = useI18n();
  return (
    <section className={styles.section} id="sobre-automatizza" aria-labelledby="about-title">
      <Container className="editorial-container">
        <div data-reveal>
          <p className={`section-eyebrow ${styles.eyebrow}`}>{t("SOBRE AUTOMATIZZA")}</p>
          <div className={styles.introduction}>
            <div className={styles.statement}>
              <h2 id="about-title">{t("Tecnología con los pies en el negocio.")}</h2>
              <p className={styles.highlight}>{t("De necesidades reales ")}<br />{t("a soluciones que funcionan.")}</p>
            </div>
            <div className={styles.copy}>
              <p className={styles.description}>{t("En Automatizza ayudamos a las pequeñas y medianas empresas a crecer con más capacidad y menos complejidad, poniendo a su alcance tecnología que les permita trabajar mejor, ser más competitivas y aprovechar mejor su tiempo.")}</p>
              <p className={styles.detail}>{t("Trabajar mejor. Vivir mejor.")}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
