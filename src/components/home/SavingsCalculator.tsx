"use client";

import { languageInfo } from "@/lib/i18n/routes";
import { useI18n } from "@/components/i18n/LocaleProvider";

import { useState, type CSSProperties } from "react";

const spanishNumber = (n: number) =>
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

type SliderId = "employees" | "hours" | "days" | "automation";

// Live savings calculator, styled like the original preview card. Same
// arithmetic as the standalone tool: employees × hours × hourly cost × days,
// times the recoverable share the visitor chooses (a hypothesis).
export function SavingsCalculator() {
  const { t, locale } = useI18n();
  const numberFormat = (n: number) => locale === "es" ? spanishNumber(n) : new Intl.NumberFormat(languageInfo[locale].format, { maximumFractionDigits: 0 }).format(n);
  const moneyFormat = (n: number) => locale === "es" ? `${numberFormat(n)} €` : new Intl.NumberFormat(languageInfo[locale].format, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
  const decimalFormat = new Intl.NumberFormat(languageInfo[locale].format, { maximumFractionDigits: 1 });
const sliders: {
  id: SliderId;
  label: string;
  hint?: string;
  min: number;
  max: number;
  step: number;
  format: (value: number) => string;
}[] = [
  { id: "employees", label: "Personas implicadas", min: 1, max: 50, step: 1, format: (v) => numberFormat(v) },
  {
    id: "hours",
    label: "Horas al día por persona",
    min: 0.5,
    max: 8,
    step: 0.5,
    format: (v) => `${decimalFormat.format(v)} h`,
  },
  { id: "days", label: "Días laborables al mes", min: 15, max: 23, step: 1, format: (v) => numberFormat(v) },
  {
    id: "automation",
    label: "Tiempo que podrías liberar",
    hint: "Parte de esas horas que podrías recuperar para dedicar a lo que siempre acabas dejando para después.",
    min: 0,
    max: 100,
    step: 5,
    format: (v) => `${numberFormat(v)} %`,
  },
];


  const [values, setValues] = useState<Record<SliderId, number>>({
    employees: 3,
    hours: 2,
    days: 22,
    automation: 30,
  });
  const [rate, setRate] = useState("25");

  const hourly = Number(rate.replace(",", "."));
  const validRate = rate.trim() !== "" && Number.isFinite(hourly) && hourly > 0 && hourly <= 500;
  const monthlyCost = validRate ? values.employees * values.hours * hourly * values.days : 0;
  const share = values.automation / 100;
  const monthlyValue = monthlyCost * share;
  const annualValue = monthlyValue * 12;
  const annualHours = values.employees * values.hours * values.days * 12 * share;

  return (
    <div className="calc">
      <div className="calc-card">
        <div className="calc-head">
          <div>
            <span className="calc-eyebrow">{t("Estimación")}</span>
            <h3>{t("Coste de tareas repetitivas")}</h3>
          </div>
        </div>

        <div className="calc-body">
          <div className="calc-controls">
            {sliders.map((slider) => {
              const value = values[slider.id];
              const progress = ((value - slider.min) / (slider.max - slider.min)) * 100;
              return (
                <div className="calc-slider" key={slider.id}>
                  <label htmlFor={`calc-${slider.id}`}>
                    <span>{t(slider.label)}</span>
                    <output htmlFor={`calc-${slider.id}`}>{slider.format(value)}</output>
                  </label>
                  {slider.hint ? (
                    <small className="calc-slider-hint" id={`calc-${slider.id}-hint`}>
                      {t(slider.hint)}
                    </small>
                  ) : null}
                  <input
                    type="range"
                    id={`calc-${slider.id}`}
                    min={slider.min}
                    max={slider.max}
                    step={slider.step}
                    value={value}
                    aria-describedby={slider.hint ? `calc-${slider.id}-hint` : undefined}
                    onChange={(event) =>
                      setValues((current) => ({ ...current, [slider.id]: Number(event.target.value) }))
                    }
                    style={{ "--progress": `${progress}%` } as CSSProperties}
                  />
                </div>
              );
            })}

            <label className={`calc-rate${validRate ? "" : " is-invalid"}`} htmlFor="calc-rate">
              <span>{t("Coste medio por hora")}</span>
              <span className="calc-rate-input">
                <input
                  type="number"
                  id="calc-rate"
                  value={rate}
                  min="0.01"
                  max="500"
                  step="0.01"
                  inputMode="decimal"
                  onChange={(event) => setRate(event.target.value)}
                  aria-describedby="calc-rate-help"
                />
                €
              </span>
            </label>
            <small className="calc-rate-help" id="calc-rate-help">
              {validRate
                ? t("Salario bruto + costes de empresa.")
                : "Introduce un coste por hora mayor que 0 y de hasta 500 €."}
            </small>
          </div>

          <div className="calc-result" aria-live="polite">
            <span>{t("Valor potencial anual")}</span>
            <strong>{moneyFormat(annualValue)}</strong>
            <div className="calc-result-detail">
              <i aria-hidden="true" />
              <span>{t("Horas recuperables al año")}</span>
              <b>{numberFormat(annualHours)} h</b>
            </div>
          </div>
        </div>
      </div>

      <div className="calc-comparison" role="group" aria-label={t("Comparación mensual")}>
        <div className="calc-comparison-row">
          <span>{t("Coste mensual de las tareas")}</span>
          <div className="calc-comparison-track" aria-hidden="true">
            <span style={{ width: monthlyCost > 0 ? "100%" : "0%" }} />
          </div>
          <strong>{moneyFormat(monthlyCost)}</strong>
        </div>
        <div className="calc-comparison-row">
          <span>{t("Valor mensual recuperable")}</span>
          <div className="calc-comparison-track is-recoverable" aria-hidden="true">
            <span style={{ width: monthlyCost > 0 ? `${values.automation}%` : "0%" }} />
          </div>
          <strong>{moneyFormat(monthlyValue)}</strong>
        </div>
      </div>

      <p className="calc-insight">{t("Con esta hipótesis, tu equipo podría recuperar ")}<strong>{numberFormat(annualHours)}{t(" horas al año")}</strong>{t(", con un valor potencial de ")}<strong>{moneyFormat(annualValue)}</strong>{t(". El cálculo anual supone")}<strong>{t(" 12 meses con la misma carga de trabajo")}</strong>.
      </p>

      <p className="calc-disclaimer">
        <strong>{t("Estimación orientativa, no ahorro garantizado.")}</strong>{t(" El valor del tiempo recuperado no equivale necesariamente a una reducción de gastos. El ahorro efectivo dependerá de cómo se reorganice el trabajo y de los costes de implantación, mantenimiento y licencias, no incluidos en el cálculo.")}</p>
    </div>
  );
}
