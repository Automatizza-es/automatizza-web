"use client";

import { useState, type CSSProperties } from "react";

const numberFormat = (n: number) =>
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const moneyFormat = (n: number) => `${numberFormat(n)} €`;
const decimalFormat = new Intl.NumberFormat("es-ES", { maximumFractionDigits: 1 });

type SliderId = "employees" | "hours" | "days" | "automation";

const sliders: {
  id: SliderId;
  label: string;
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
    label: "Tiempo recuperable",
    min: 0,
    max: 100,
    step: 5,
    format: (v) => `${numberFormat(v)} %`,
  },
];

// Live savings calculator, styled like the original preview card. Same
// arithmetic as the standalone tool: employees × hours × hourly cost × days,
// times the recoverable share the visitor chooses (a hypothesis).
export function SavingsCalculator() {
  const [values, setValues] = useState<Record<SliderId, number>>({
    employees: 3,
    hours: 2,
    days: 22,
    automation: 80,
  });
  const [rate, setRate] = useState("25");

  const hourly = Number(rate.replace(",", "."));
  const validRate = rate.trim() !== "" && Number.isFinite(hourly) && hourly > 0 && hourly <= 500;
  const monthlyCost = validRate ? values.employees * values.hours * hourly * values.days : 0;
  const share = values.automation / 100;
  const annualCost = monthlyCost * 12;
  const annualValue = annualCost * share;
  const annualHours = values.employees * values.hours * values.days * 12 * share;

  return (
    <div className="calc">
      <div className="calc-card">
        <div className="calc-head">
          <div>
            <span className="calc-eyebrow">Estimación</span>
            <h3>Coste de tareas repetitivas</h3>
          </div>
          <span className="calc-pill">Orientativa</span>
        </div>

        <div className="calc-body">
          <div className="calc-controls">
            {sliders.map((slider) => {
              const value = values[slider.id];
              const progress = ((value - slider.min) / (slider.max - slider.min)) * 100;
              return (
                <div className="calc-slider" key={slider.id}>
                  <label htmlFor={`calc-${slider.id}`}>
                    <span>{slider.label}</span>
                    <output htmlFor={`calc-${slider.id}`}>{slider.format(value)}</output>
                  </label>
                  <input
                    type="range"
                    id={`calc-${slider.id}`}
                    min={slider.min}
                    max={slider.max}
                    step={slider.step}
                    value={value}
                    onChange={(event) =>
                      setValues((current) => ({ ...current, [slider.id]: Number(event.target.value) }))
                    }
                    style={{ "--progress": `${progress}%` } as CSSProperties}
                  />
                </div>
              );
            })}

            <label className={`calc-rate${validRate ? "" : " is-invalid"}`} htmlFor="calc-rate">
              <span>Coste medio por hora</span>
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
                ? "Salario bruto + costes de empresa."
                : "Introduce un coste por hora mayor que 0 y de hasta 500 €."}
            </small>
          </div>

          <div className="calc-result" aria-live="polite">
            <span>Coste anual estimado</span>
            <strong>{moneyFormat(annualCost)}</strong>
            <div className="calc-result-detail">
              <i aria-hidden="true" />
              <span>Potencial recuperable</span>
              <b>{moneyFormat(annualValue)}</b>
              <i aria-hidden="true" />
              <span>Horas recuperables al año</span>
              <b>{numberFormat(annualHours)} h</b>
            </div>
          </div>
        </div>
      </div>

      <p className="calc-disclaimer">
        <strong>Estimación orientativa, no ahorro garantizado.</strong> Representa el valor potencial del
        tiempo recuperado, no necesariamente una reducción directa de gastos. No incluye costes de
        implantación, mantenimiento ni licencias; el resultado real requiere analizar cada proceso.
      </p>
    </div>
  );
}
