"use client";

import Image from "next/image";
import { ContextualText } from "@/components/links/ContextualText";
import { localizeHref } from "@/lib/i18n/routes";
import { useRef, useState, type CSSProperties, type FormEvent } from "react";
import { brandAssets } from "@/lib/brand-assets";
import { useI18n } from "@/components/i18n/LocaleProvider";
import { languageInfo } from "@/lib/i18n/routes";
import styles from "./ReferenceCalculator.module.css";

type Result = { monthlyCost: number; monthlyValue: number; annualValue: number; annualHours: number; share: number };

// Layout, control order, defaults and submit behaviour mirror the supplied v3 HTML.
export function ReferenceCalculator() {
  const { t, locale } = useI18n();
  const [values, setValues] = useState({ employees: 3, hours: 2, days: 22, automation: 80 });
  const [rate, setRate] = useState("25");
  const [error, setError] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const rateRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const decimal = new Intl.NumberFormat(languageInfo[locale].format, { maximumFractionDigits: 1 });
  const number = (value: number) => locale === "es" ? Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : new Intl.NumberFormat(languageInfo[locale].format, { maximumFractionDigits: 0 }).format(value);
  const money = (value: number) => `${number(value)} €`;
  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const hourly = Number(rate);
    if (!rate.trim() || !Number.isFinite(hourly) || hourly <= 0 || hourly > 500) {
      setError(true);
      rateRef.current?.focus();
      return;
    }
    setError(false);
    const monthlyCost = values.employees * values.hours * hourly * values.days;
    const share = values.automation / 100;
    setResult({ monthlyCost, monthlyValue: monthlyCost * share, annualValue: monthlyCost * share * 12, annualHours: values.employees * values.hours * values.days * 12 * share, share });
    requestAnimationFrame(() => {
      titleRef.current?.focus({ preventScroll: true });
      resultsRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
    });
  }
  return (
<div className={styles["wrap"]}>
  <header className={styles["header"]}>
    <div className={styles["brand"]}><Image src={brandAssets.wordmark.dark} alt="Automatizza" width={brandAssets.wordmark.width} height={brandAssets.wordmark.height} unoptimized priority /></div>
    <p className={styles["eyebrow"]}>{t("Calculadora de ahorro potencial")}</p>
    <h1>{t("¿Cuánto te cuesta no automatizar?")}</h1>
    <p className={styles["lead"]}><ContextualText text={t("Calcula cuánto te cuestan las tareas repetitivas de tu empresa y estima el tiempo y el valor económico que podrías recuperar al automatizarlas.")} links={[{ phrase: t("tareas repetitivas"), href: localizeHref("/servicios/automatizacion-de-procesos", locale) }]} /></p>
  </header>

  <form onSubmit={calculate} id="calculator" noValidate>
    <section className={styles["panel"]} aria-labelledby="team-title">
      <div className={styles["panel-head"]}><div className={styles["head-title"]}><span className={styles["icon"]} aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"></circle><path d="M3 20v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6M17 14a5 5 0 0 1 4 5v1"></path></svg></span><h2 id="team-title">{t("Tu equipo")}</h2></div><span className={styles["step"]}>01</span></div>
      <div className={styles["panel-body"]}>
        <div className={styles["field"]}><label className={styles["field-label"]} htmlFor="employees">{t("¿Cuántos empleados realizan estas tareas manuales?")}</label><div className={styles["range-wrap"]}><input value={values.employees} onChange={(event) => setValues({ ...values, employees: Number(event.target.value) })} style={{ "--progress": `${(values.employees - 1) / (50 - 1) * 100}%` } as CSSProperties} type="range" id="employees" min="1" max="50" step="1" aria-describedby="employees-limits" /><div className={styles["range-limits"]} id="employees-limits"><span>1</span><span>50</span></div></div><output className={styles["field-value"]} id="employees-out" htmlFor="employees">{`${number(values.employees)} ${t(values.employees === 1 ? "persona" : "personas")}`}</output></div>
        <div className={styles["field"]}><label className={styles["field-label"]} htmlFor="hours">{t("Horas dedicadas al día a tareas repetitivas (por persona)")}<span className={styles["hint"]}>{t("Burocracia, introducción de datos, informes, correos, seguimientos…")}</span></label><div className={styles["range-wrap"]}><input value={values.hours} onChange={(event) => setValues({ ...values, hours: Number(event.target.value) })} style={{ "--progress": `${(values.hours - 0.5) / (8 - 0.5) * 100}%` } as CSSProperties} type="range" id="hours" min="0.5" max="8" step="0.5" aria-describedby="hours-limits" /><div className={styles["range-limits"]} id="hours-limits"><span>{decimal.format(0.5)} h</span><span>8 h</span></div></div><output className={styles["field-value"]} id="hours-out" htmlFor="hours">{`${decimal.format(values.hours)} h`}</output></div>
        <div className={styles["field"]}><label className={styles["field-label"]} htmlFor="rate">{t("Coste por hora por empleado")}<span className={styles["hint"]}>{t("Salario bruto + costes de empresa. Introduce tu estimación.")}</span></label><div className={styles["currency-row"]}><span className={styles["currency-symbol"]} aria-hidden="true">€</span><input value={rate} ref={rateRef} aria-invalid={error} onChange={(event) => { setRate(event.target.value); setError(false); }} type="number" id="rate" min="0.01" max="500" step="0.01" inputMode="decimal" required aria-describedby="rate-hint" /></div><span className={styles["hint"]} id="rate-hint" style={{"gridColumn": "1 / -1", "display": "none"}}>{t("Coste por hora en euros.")}</span></div>
        <div className={styles["field"]}><label className={styles["field-label"]} htmlFor="days">{t("Días laborables al mes")}</label><div className={styles["range-wrap"]}><input value={values.days} onChange={(event) => setValues({ ...values, days: Number(event.target.value) })} style={{ "--progress": `${(values.days - 15) / (23 - 15) * 100}%` } as CSSProperties} type="range" id="days" min="15" max="23" step="1" aria-describedby="days-limits" /><div className={styles["range-limits"]} id="days-limits"><span>15</span><span>23</span></div></div><output className={styles["field-value"]} id="days-out" htmlFor="days">{`${number(values.days)} ${t("días")}`}</output></div>
      </div>
    </section>

    <section className={styles["panel"]} aria-labelledby="automation-title">
      <div className={styles["panel-head"]}><div className={styles["head-title"]}><span className={styles["icon"]} aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M10 2h4l.5 2.2a8 8 0 0 1 1.8.8l2-.9 2.8 2.8-.9 2a8 8 0 0 1 .8 1.8L23 11v4l-2.2.5a8 8 0 0 1-.8 1.8l.9 2-2.8 2.8-2-.9a8 8 0 0 1-1.8.8L14 24h-4l-.5-2.2a8 8 0 0 1-1.8-.8l-2 .9-2.8-2.8.9-2a8 8 0 0 1-.8-1.8L1 15v-4l2.2-.5a8 8 0 0 1 .8-1.8l-.9-2 2.8-2.8 2 .9a8 8 0 0 1 1.8-.8L10 2Z" transform="translate(0 -1) scale(.96)"></path><circle cx="12" cy="12" r="3"></circle></svg></span><h2 id="automation-title">{t("Nivel de automatización estimado")}</h2></div><span className={styles["step"]}>02</span></div>
      <div className={styles["panel-body"]}><div className={styles["field"]}><label className={styles["field-label"]} htmlFor="automation">{t("¿Qué porcentaje de esas horas podría recuperarse?")}<span className={styles["hint"]}>{t("Elige una hipótesis. El porcentaje real depende de cada proceso y deberá validarse.")}</span></label><div className={styles["range-wrap"]}><input value={values.automation} onChange={(event) => setValues({ ...values, automation: Number(event.target.value) })} style={{ "--progress": `${(values.automation - 0) / (100 - 0) * 100}%` } as CSSProperties} type="range" id="automation" min="0" max="100" step="5" aria-describedby="automation-limits" /><div className={styles["range-limits"]} id="automation-limits"><span>0 %</span><span>100 %</span></div></div><output className={styles["field-value"]} id="automation-out" htmlFor="automation">{`${number(values.automation)} %`}</output></div></div>
    </section>
    <button type="submit" className={styles["calc-btn"]}>{t("Calcular mi ahorro potencial ")}<span aria-hidden="true">→</span></button>
    <p hidden={!error} id="form-error" className={styles["form-error"]} role="alert">{error ? t("Introduce un coste por hora válido, mayor que 0 y de hasta 500 €.") : ""}</p>
  </form>

  <section hidden={!result} ref={resultsRef} aria-live="polite" className={styles["results"]} id="results" aria-labelledby="results-title">{result && <> 
    <div className={styles["panel"] + " " + styles["result-panel"]}>
      <div className={styles["panel-head"]}><div className={styles["head-title"]}><span className={styles["icon"]} aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 20h18M5 17v-5h3v5M11 17V5h3v12M17 17V9h3v8"></path></svg></span><h2 ref={titleRef} id="results-title" tabIndex={-1}>{t("Tu ahorro potencial")}</h2></div><span className={styles["step"]}>03</span></div>
      <div className={styles["results-body"]}>
        <div className={styles["cards"]}>
          <div className={styles["metric"]}><div className={styles["metric-label"]}>{t("Coste mensual de las tareas")}</div><div className={styles["metric-value"]} id="res-cost">{money(result.monthlyCost)}</div></div>
          <div className={styles["metric"]}><div className={styles["metric-label"]}>{t("Valor mensual recuperable")}</div><div className={styles["metric-value"]} id="res-save-month">{money(result.monthlyValue)}</div></div>
          <div className={styles["metric"] + " " + styles["highlight"]}><div className={styles["metric-label"]}>{t("Potencial anual estimado")}</div><div className={styles["metric-value"]} id="res-save-year">{money(result.annualValue)}</div></div>
          <div className={styles["metric"]}><div className={styles["metric-label"]}>{t("Horas recuperables al año")}</div><div className={styles["metric-value"]} id="res-hours">{`${number(result.annualHours)} h`}</div></div>
        </div>
        <div className={styles["bar-section"]} role="group" aria-label={t("Comparación del coste mensual actual con el valor recuperable estimado")}>
          <div className={styles["bar-row"]}><div className={styles["bar-label"]}>{t("Coste mensual de las tareas")}</div><div className={styles["bar-track"]}><div className={styles["bar-fill"]} style={{"width": "100%"}}></div></div><div className={styles["bar-amount"]} id="bar-cost-label">{money(result.monthlyCost)}</div></div>
          <div className={styles["bar-row"]}><div className={styles["bar-label"]}>{t("Valor mensual recuperable")}</div><div className={styles["bar-track"]}><div style={{ width: `${result.share * 100}%` }} className={styles["bar-fill"] + " " + styles["saving"]} id="bar-saving"></div></div><div className={styles["bar-amount"]} id="bar-saving-label">{money(result.monthlyValue)}</div></div>
        </div>
        <div className={styles["insight"]}><svg className={styles["bolt"]} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 1 3 13h8l-1 10 11-13h-8l.5-9Z"></path></svg><p id="insight-text">{t("Con esta hipótesis, tu equipo podría recuperar ")}<strong>{number(result.annualHours)}{t(" horas al año")}</strong>{t(", con un valor económico potencial de ")}<strong>{money(result.annualValue)}{t(" anuales")}</strong>{t(". Ese tiempo podría dedicarse a otras tareas de valor para la empresa. El ahorro económico efectivo dependerá de cómo se reorganice el trabajo y de los costes de la solución.")}</p></div>
        <p className={styles["disclaimer"]}><strong>{t("Estimación orientativa, no ahorro garantizado.")}</strong>{t(" El cálculo aplica el porcentaje que tú eliges al tiempo y al coste introducidos. Representa el valor potencial del tiempo recuperado, no necesariamente una reducción directa de gastos o nóminas. No incluye costes de implantación, mantenimiento, licencias, supervisión ni posibles cambios en la carga de trabajo. El resultado real requiere analizar y validar cada proceso.")}</p>
      </div>
    </div>
    <div className={styles["cta-box"]}><div className={styles["cta-copy"]}><h2>{t("¿Y si empezamos por uno de tus procesos?")}</h2><p>{t("Cuéntanos qué tareas te gustaría simplificar. Analizaremos tu necesidad y valoraremos qué solución puede ayudarte a recuperar tiempo y mejorar tu forma de trabajar.")}</p></div><a className={styles["cta-btn"]} href="mailto:info@automatizza.es?subject=Consulta+sobre+automatizaci%C3%B3n+de+procesos+%E2%80%93+Automatizza&body=Hola%2C+he+utilizado+la+calculadora+y+me+gustar%C3%ADa+valorar+qu%C3%A9+procesos+de+mi+empresa+podr%C3%ADa+automatizar.%0A%0AMi+necesidad+es%3A%0A%0A%0AGracias.">{t("Cuéntanos tu proyecto ")}<span aria-hidden="true">→</span></a></div>
   </>}</section>
</div>
  );
}
