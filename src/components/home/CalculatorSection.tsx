"use client";

import { useI18n } from "@/components/i18n/LocaleProvider";

import Link from "@/components/i18n/LocaleLink";

import { Container } from "@/components/layout/Container";
import { SavingsCalculator } from "@/components/home/SavingsCalculator";

export function CalculatorSection() {
  const { t } = useI18n();
  return (
    <section className="calculator-section" id="calculadora" aria-labelledby="calculator-title">
      <Container className="calculator-shell">
        <div className="calculator-copy" data-reveal>
          <p className="section-eyebrow">{t("CALCULADORA AUTOMATIZZA")}</p>
          <h2 id="calculator-title">{t("¿Cuánto te cuesta no automatizar?")}</h2>
          <p>{t("Calcula cuánto te cuestan las tareas repetitivas de tu empresa y estima el tiempo y el valor económico que podrías recuperar al automatizarlas.")}</p>
          <Link className="button button-primary" href="/contacto">{t("Cuéntanos tu proyecto ")}<span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="calculator-app" data-reveal>
          <SavingsCalculator />
        </div>
      </Container>
    </section>
  );
}
