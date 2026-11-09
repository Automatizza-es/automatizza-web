"use client";

import { useEffect, useRef } from "react";
import { useI18n } from "@/components/i18n/LocaleProvider";
import { SavingsCalculator } from "@/components/home/SavingsCalculator";
import styles from "./CalculatorPreview.module.css";
import palette from "./CalculatorPalette.module.css";

export function CalculatorPreview() {
  const { t } = useI18n();
  const viewport = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const resize = () => element.style.setProperty("--calculator-preview-scale", String(element.clientWidth / 720));
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div className={styles.frame} role="img" aria-label={t("Vista previa de la calculadora de Automatizza")}>
      <div ref={viewport} className={styles.viewport}>
        <div className={`${styles.canvas} ${palette.palette}`} inert aria-hidden="true">
          <SavingsCalculator />
        </div>
      </div>
    </div>
  );
}
