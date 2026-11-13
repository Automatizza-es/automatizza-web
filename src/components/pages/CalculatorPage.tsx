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
            <p className={styles.eyebrow}>{t("CALCULADORA DE AHORRO POTENCIAL")}</p>
            <h1>{t("¿Cuánto te cuesta no automatizar?")}</h1>
            <p><ContextualText text={t("Calcula cuánto te cuestan las tareas repetitivas de tu empresa y estima el tiempo y el valor económico que podrías recuperar al automatizarlas.")} links={[{ phrase: t("tareas repetitivas"), href: localizeHref("/servicios/automatizacion-de-procesos", locale) }]} /></p>
          </header>
          <div className={`${styles.tool} ${palette.palette}`}><SavingsCalculator /></div>
          <section className={styles.closing} aria-labelledby="calculator-contact-title">
            <h2 id="calculator-contact-title">{t("¿Y si empezamos por uno de tus procesos?")}</h2>
            <p>{t("Cuéntanos qué tareas te gustaría simplificar. Analizaremos contigo el proceso y valoraremos qué parte merece la pena automatizar y cómo hacerlo.")}</p>
            <Link className={styles.contact} href="/contacto">{t("Quiero analizar mi proceso")}<span aria-hidden="true"><svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12 12 4M4 4h8v8" /></svg></span></Link>
          </section>
        </Container>
      </main>
      <Footer homeLinks />
    </>
  );
}
