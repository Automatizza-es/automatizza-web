import styles from "./CalculatorPage.module.css";
import type { Locale } from "@/lib/i18n/routes";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ReferenceCalculator } from "@/components/calculator/ReferenceCalculator";

export default function CalculatorPage({ locale = "es" }: { locale?: Locale }) {
  return <><Header redesign homeLinks /><main lang={locale} className={styles.page}><ReferenceCalculator /></main><Footer homeLinks /></>;
}
