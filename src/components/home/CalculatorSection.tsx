"use client";

import { useI18n } from "@/components/i18n/LocaleProvider";
import Link from "@/components/i18n/LocaleLink";
import { Container } from "@/components/layout/Container";
import { CalculatorPreview } from "@/components/calculator/CalculatorPreview";
import styles from "./CalculatorSection.module.css";

export function CalculatorSection() {
  const { t } = useI18n();
  return (
    <section className={styles.section} id="calculadora" aria-labelledby="calculator-title">
      <Container className={`editorial-container ${styles.layout}`}>
        <div className={styles.copy} data-reveal>
          <p className={styles.eyebrow}>{t("CALCULADORA AUTOMATIZZA")}</p>
          <h2 id="calculator-title">{t("¿Cuánto tiempo se va en tareas que podrías automatizar?")}</h2>
          <p className={styles.description}>{t("Descubre cuánto tiempo y qué valor económico podría recuperar tu empresa automatizando parte del trabajo repetitivo.")}</p>
          <Link className={styles.link} href="/calculadora">
            {t("Calcular mi ahorro potencial")}<span aria-hidden="true"><svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12 12 4M4 4h8v8" /></svg></span>
          </Link>
        </div>
        <div className={styles.visual} data-reveal><CalculatorPreview /></div>
      </Container>
    </section>
  );
}
