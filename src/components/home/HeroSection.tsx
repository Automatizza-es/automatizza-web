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
        <div className={styles.topline}><span className={styles.dot} aria-hidden="true" />{t("Estudio independiente de tecnología")}<span className={styles.index}>/ 001 — 026</span></div>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <h1 id="hero-title" className={styles.title}>
              <span>{t("Tu empresa")}</span><span>{t("no debería")}</span><em>{t("adaptarse")}</em><span>{t("al software.")}</span>
            </h1>
            <div className={styles.underTitle}>
              <span className={styles.asterisk} aria-hidden="true">✳</span>
              <div>
                <p className={styles.description}>{t("Diseñamos software, automatizaciones e inteligencia artificial alrededor de cómo trabaja tu equipo. No al revés.")}</p>
                <div className={styles.actions}>
                  <Link className={styles.primary} href="/contacto">{t("Cuéntanos qué necesitas")} <span aria-hidden="true">↗</span></Link>
                  <Link className={styles.secondary} href="#proyectos">{t("Explorar proyectos")} <span aria-hidden="true">↘</span></Link>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.art} role="img" aria-label={t("Composición gráfica que representa herramientas conectadas y software a medida.")}>
            <div className={styles.artTop}><span>AZ / LAB</span><span>FIG. 01</span></div>
            <div className={styles.orbit}>
              <div className={styles.outerRing} /><div className={styles.innerRing} />
              <div className={styles.core}><strong>AZ</strong><small>MADE TO FIT</small></div>
              <div className={`${styles.node} ${styles.nodeOne}`}>01 <small>DATA</small></div>
              <div className={`${styles.node} ${styles.nodeTwo}`}>02 <small>FLOW</small></div>
              <div className={`${styles.node} ${styles.nodeThree}`}>03 <small>BUILD</small></div>
            </div>
            <div className={styles.artBottom}><span>FORM FOLLOWS FUNCTION</span><span>↗</span></div>
          </div>
        </div>
        <div className={styles.bottomline}><span>{t("Estrategia. Diseño. Ingeniería.")}</span><span>{t("Desliza para descubrir")} ↓</span></div>
      </Container>
    </section>
  );
}
