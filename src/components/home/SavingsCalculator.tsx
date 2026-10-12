"use client";

import { useRef, useState, type CSSProperties, type FormEvent } from "react";

const numberFormat = (n: number) =>
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const moneyFormat = (n: number) => `${numberFormat(n)} €`;
const decimalFormat = new Intl.NumberFormat("es-ES", { maximumFractionDigits: 1 });

type RangeField = {
  id: "employees" | "hours" | "days" | "automation";
  label: string;
  hint?: string;
  min: number;
  max: number;
  step: number;
  limits: [string, string];
  format: (value: number) => string;
};

const teamFields: RangeField[] = [
  {
    id: "employees",
    label: "¿Cuántos empleados realizan estas tareas manuales?",
    min: 1,
    max: 50,
    step: 1,
    limits: ["1", "50"],
    format: (v) => `${numberFormat(v)} ${v === 1 ? "persona" : "personas"}`,
  },
  {
    id: "hours",
    label: "Horas dedicadas al día a tareas repetitivas (por persona)",
    hint: "Burocracia, introducción de datos, informes, correos, seguimientos…",
    min: 0.5,
    max: 8,
    step: 0.5,
    limits: ["0,5 h", "8 h"],
    format: (v) => `${decimalFormat.format(v)} h`,
  },
];

const daysField: RangeField = {
  id: "days",
  label: "Días laborables al mes",
  min: 15,
  max: 23,
  step: 1,
  limits: ["15", "23"],
  format: (v) => `${numberFormat(v)} días`,
};

const automationField: RangeField = {
  id: "automation",
  label: "¿Qué porcentaje de esas horas podría recuperarse?",
  hint: "Elige una hipótesis. El porcentaje real depende de cada proceso y deberá validarse.",
  min: 0,
  max: 100,
  step: 5,
  limits: ["0 %", "100 %"],
  format: (v) => `${numberFormat(v)} %`,
};

type Values = Record<RangeField["id"], number>;

type Result = {
  monthlyCost: number;
  monthlyValue: number;
  annualValue: number;
  annualHours: number;
  automation: number;
};

function RangeRow({
  field,
  value,
  onChange,
}: {
  field: RangeField;
  value: number;
  onChange: (value: number) => void;
}) {
  const progress = ((value - field.min) / (field.max - field.min)) * 100;
  return (
    <div className="calc-field">
      <label className="calc-label" htmlFor={`calc-${field.id}`}>
        {field.label}
        {field.hint ? <span className="calc-hint">{field.hint}</span> : null}
      </label>
      <div className="calc-range">
        <input
          type="range"
          id={`calc-${field.id}`}
          min={field.min}
          max={field.max}
          step={field.step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          style={{ "--progress": `${progress}%` } as CSSProperties}
        />
        <div className="calc-limits" aria-hidden="true">
          <span>{field.limits[0]}</span>
          <span>{field.limits[1]}</span>
        </div>
      </div>
      <output className="calc-value" htmlFor={`calc-${field.id}`}>
        {field.format(value)}
      </output>
    </div>
  );
}

// Interactive version of the Automatizza savings calculator. Same inputs and
// arithmetic as the standalone tool: employees × hours × rate × days, times
// the recoverable share the visitor chooses (a hypothesis, not a promise).
export function SavingsCalculator() {
  const [values, setValues] = useState<Values>({ employees: 3, hours: 2, days: 22, automation: 80 });
  const [rate, setRate] = useState("25");
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const rateRef = useRef<HTMLInputElement>(null);

  const set = (id: RangeField["id"]) => (value: number) => setValues((current) => ({ ...current, [id]: value }));

  function calculate(event: FormEvent) {
    event.preventDefault();
    const hourly = Number(rate);
    if (rate.trim() === "" || !Number.isFinite(hourly) || hourly <= 0 || hourly > 500) {
      setError("Introduce un coste por hora válido, mayor que 0 y de hasta 500 €.");
      rateRef.current?.focus();
      return;
    }
    setError("");
    const automation = values.automation / 100;
    const monthlyCost = values.employees * values.hours * hourly * values.days;
    const monthlyValue = monthlyCost * automation;
    setResult({
      monthlyCost,
      monthlyValue,
      annualValue: monthlyValue * 12,
      annualHours: values.employees * values.hours * values.days * 12 * automation,
      automation,
    });
    requestAnimationFrame(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      resultsRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "nearest" });
      resultsRef.current?.querySelector<HTMLElement>("h3")?.focus({ preventScroll: true });
    });
  }

  return (
    <div className="calc">
      <form onSubmit={calculate} noValidate>
        <section className="calc-panel" aria-labelledby="calc-team-title">
          <div className="calc-panel-head">
            <div className="calc-head-title">
              <span className="calc-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <circle cx="9" cy="8" r="3" />
                  <path d="M3 20v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6M17 14a5 5 0 0 1 4 5v1" />
                </svg>
              </span>
              <h3 id="calc-team-title">Tu equipo</h3>
            </div>
            <span className="calc-step">01</span>
          </div>
          <div className="calc-panel-body">
            {teamFields.map((field) => (
              <RangeRow field={field} value={values[field.id]} onChange={set(field.id)} key={field.id} />
            ))}
            <div className="calc-field">
              <label className="calc-label" htmlFor="calc-rate">
                Coste por hora por empleado
                <span className="calc-hint">Salario bruto + costes de empresa. Introduce tu estimación.</span>
              </label>
              <div className="calc-currency">
                <span aria-hidden="true">€</span>
                <input
                  ref={rateRef}
                  type="number"
                  id="calc-rate"
                  value={rate}
                  min="0.01"
                  max="500"
                  step="0.01"
                  inputMode="decimal"
                  required
                  onChange={(event) => {
                    setRate(event.target.value);
                    setError("");
                  }}
                />
              </div>
            </div>
            <RangeRow field={daysField} value={values.days} onChange={set("days")} />
          </div>
        </section>

        <section className="calc-panel" aria-labelledby="calc-automation-title">
          <div className="calc-panel-head">
            <div className="calc-head-title">
              <span className="calc-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" />
                </svg>
              </span>
              <h3 id="calc-automation-title">Nivel de automatización estimado</h3>
            </div>
            <span className="calc-step">02</span>
          </div>
          <div className="calc-panel-body">
            <RangeRow field={automationField} value={values.automation} onChange={set("automation")} />
          </div>
        </section>

        <button type="submit" className="calc-button">
          Calcular mi ahorro potencial <span aria-hidden="true">→</span>
        </button>
        {error ? (
          <p className="calc-error" role="alert">
            {error}
          </p>
        ) : null}
      </form>

      {result ? (
        <div className="calc-results" ref={resultsRef}>
          <section className="calc-panel" aria-labelledby="calc-results-title">
            <div className="calc-panel-head">
              <div className="calc-head-title">
                <span className="calc-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M3 20h18M5 17v-5h3v5M11 17V5h3v12M17 17V9h3v8" />
                  </svg>
                </span>
                <h3 id="calc-results-title" tabIndex={-1}>
                  Tu ahorro potencial
                </h3>
              </div>
              <span className="calc-step">03</span>
            </div>
            <div className="calc-results-body">
              <div className="calc-metrics">
                <div className="calc-metric">
                  <div className="calc-metric-label">Coste mensual de las tareas</div>
                  <div className="calc-metric-value">{moneyFormat(result.monthlyCost)}</div>
                </div>
                <div className="calc-metric">
                  <div className="calc-metric-label">Valor mensual recuperable</div>
                  <div className="calc-metric-value">{moneyFormat(result.monthlyValue)}</div>
                </div>
                <div className="calc-metric is-highlight">
                  <div className="calc-metric-label">Potencial anual estimado</div>
                  <div className="calc-metric-value">{moneyFormat(result.annualValue)}</div>
                </div>
                <div className="calc-metric">
                  <div className="calc-metric-label">Horas recuperables al año</div>
                  <div className="calc-metric-value">{numberFormat(result.annualHours)} h</div>
                </div>
              </div>

              <div className="calc-bars" role="group" aria-label="Comparación del coste mensual actual con el valor recuperable estimado">
                <div className="calc-bar-row">
                  <div className="calc-bar-label">Coste mensual de las tareas</div>
                  <div className="calc-bar-track">
                    <div className="calc-bar-fill" style={{ width: "100%" }} />
                  </div>
                  <div className="calc-bar-amount">{moneyFormat(result.monthlyCost)}</div>
                </div>
                <div className="calc-bar-row">
                  <div className="calc-bar-label">Valor mensual recuperable</div>
                  <div className="calc-bar-track">
                    <div className="calc-bar-fill is-saving" style={{ width: `${result.automation * 100}%` }} />
                  </div>
                  <div className="calc-bar-amount">{moneyFormat(result.monthlyValue)}</div>
                </div>
              </div>

              <div className="calc-insight">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M13.5 1 3 13h8l-1 10 11-13h-8l.5-9Z" />
                </svg>
                <p>
                  Con esta hipótesis, tu equipo podría recuperar{" "}
                  <strong>{numberFormat(result.annualHours)} horas al año</strong>, con un valor económico
                  potencial de <strong>{moneyFormat(result.annualValue)} anuales</strong>. Ese tiempo podría
                  dedicarse a otras tareas de valor para la empresa. El ahorro económico efectivo dependerá de
                  cómo se reorganice el trabajo y de los costes de la solución.
                </p>
              </div>

              <p className="calc-disclaimer">
                <strong>Estimación orientativa, no ahorro garantizado.</strong> El cálculo aplica el porcentaje
                que tú eliges al tiempo y al coste introducidos. Representa el valor potencial del tiempo
                recuperado, no necesariamente una reducción directa de gastos o nóminas. No incluye costes de
                implantación, mantenimiento, licencias, supervisión ni posibles cambios en la carga de trabajo.
                El resultado real requiere analizar y validar cada proceso.
              </p>
            </div>
          </section>

          <div className="calc-cta">
            <div>
              <h3>¿Y si empezamos por uno de tus procesos?</h3>
              <p>
                Cuéntanos qué tareas te gustaría simplificar. Analizaremos tu necesidad y valoraremos qué
                solución puede ayudarte a recuperar tiempo y mejorar tu forma de trabajar.
              </p>
            </div>
            <a
              className="calc-cta-button"
              href="mailto:info@automatizza.es?subject=Consulta%20sobre%20automatizaci%C3%B3n%20de%20procesos%20%E2%80%93%20Automatizza&body=Hola%2C%20he%20utilizado%20la%20calculadora%20y%20me%20gustar%C3%ADa%20valorar%20qu%C3%A9%20procesos%20de%20mi%20empresa%20podr%C3%ADa%20automatizar.%0A%0AMi%20necesidad%20es%3A%0A%0A%0AGracias."
            >
              Cuéntanos tu proyecto <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
