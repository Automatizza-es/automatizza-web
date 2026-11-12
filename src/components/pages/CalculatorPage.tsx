import { ContextualText } from "@/components/links/ContextualText";
import { localizeHref } from "@/lib/i18n/routes";
import { translator } from "@/lib/i18n/translate";
import type { Locale } from "@/lib/i18n/routes";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import Link from "@/components/i18n/LocaleLink";
import { SavingsCalculator } from "@/components/home/SavingsCalculator";
import styles from "./CalculatorPage.module.css";
import palette from "@/components/calculator/CalculatorPalette.module.css";

export default function CalculatorPage({ locale = "es" }: { locale?: Locale }) {
  const t = translator(locale);
  return (
    <>
      <Header redesign homeLinks />
      <main className={styles.page}>
        <Container className={styles.container}>
          <header className={styles.intro}>
            <Link className={styles.back} href="/#calculadora"><span aria-hidden="true">←</span>{t("Volver a la portada")}</Link>
            <p className={styles.eyebrow}>{t("CALCULADORA AUTOMATIZZA")}</p>
            <h1>{t("Calculadora de automatización")}</h1>
            <p><ContextualText text={t("Estima el tiempo y el valor económico que podrías recuperar al automatizar tareas repetitivas de tu empresa.")} links={[{ phrase: t("automatizar tareas repetitivas"), href: localizeHref("/servicios/automatizacion-de-procesos", locale) }]} /></p>
          </header>
          <div className={`${styles.tool} ${palette.palette}`}><SavingsCalculator /></div>
          <Link className={styles.contact} href="/contacto">{t("Hablemos de tu proyecto")}<span aria-hidden="true"><svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12 12 4M4 4h8v8" /></svg></span></Link>
        </Container>
      </main>
      <Footer homeLinks />
    </>
  );
}
