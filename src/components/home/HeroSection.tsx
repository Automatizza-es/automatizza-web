"use client";

import { useI18n } from "@/components/i18n/LocaleProvider";
import Link from "@/components/i18n/LocaleLink";
import { Container } from "@/components/layout/Container";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  const { t } = useI18n();
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <Container className={styles.inner}>
        <div className={styles.copy}>
          <h1 id="hero-title" className={styles.title}>
            <span className={styles.lead}>{t("La tecnología debería adaptarse a ti.")}</span>{" "}
            <span className={styles.closing}>{t("No al revés.")}</span>
          </h1>
          <p className={styles.description}>{t("Desarrollamos software a medida, automatizaciones e inteligencia artificial para empresas.")}</p>
          <div className={styles.actions}>
            <Link className={`${styles.button} ${styles.primary}`} href="/contacto">
              <span>{t("Hablemos de tu proyecto")}</span>
              <span className={styles.arrow} aria-hidden="true">→</span>
            </Link>
            <Link className={`${styles.button} ${styles.secondary}`} href="#proyectos">{t("Ver proyectos")}</Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
