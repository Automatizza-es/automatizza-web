"use client";

import { useI18n } from "@/components/i18n/LocaleProvider";
import Link from "@/components/i18n/LocaleLink";
import { Container } from "@/components/layout/Container";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  const { t } = useI18n();
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.background} aria-hidden="true" />
      <div className={styles.overlay} aria-hidden="true" />
      <Container className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{t("SOFTWARE · AUTOMATIZACIÓN · INTELIGENCIA ARTIFICIAL")}</p>
          <h1 id="hero-title" className={styles.title}>
            {t("Automatización a medida, en producción.")}
          </h1>
          <p className={styles.description}>{t("Diseñamos, desarrollamos y mantenemos software y automatizaciones que conectan los procesos de tu empresa.")}</p>
          <div className={styles.actions}>
            <Link className={styles.primary} href="/contacto">{t("Hablemos de tu proyecto")} <span aria-hidden="true">↗</span></Link>
            <Link className={styles.secondary} href="#proyectos">{t("Ver proyectos")} <span aria-hidden="true">↘</span></Link>
          </div>
        </div>
      </Container>
      <div className={styles.lowerLine} aria-hidden="true" />
    </section>
  );
}
