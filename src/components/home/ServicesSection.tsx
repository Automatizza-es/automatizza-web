"use client";

import { useI18n } from "@/components/i18n/LocaleProvider";
import Link from "next/link";
import { localePath } from "@/lib/i18n/routes";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "./SectionHeading";
import styles from "./ServicesSection.module.css";

const services = [
  { route: "process-automation", number: "01", title: "Automatización", text: "Procesos que avanzan solos y menos trabajo manual." },
  { route: "bespoke-software", number: "02", title: "Software a medida", text: "Herramientas diseñadas para la forma real de trabajar de tu empresa." },
  { route: "artificial-intelligence", number: "03", title: "Inteligencia artificial", text: "Extraer información de documentos, clasificar solicitudes y facilitar consultas" },
  { route: "contact", number: "04", title: "Desarrollo web", text: "Webs y experiencias digitales con diseño, rendimiento y estrategia." },
] as const;

export function ServicesSection() {
  const { locale, t } = useI18n();
  return (
    <section className={`whatwedo-section ${styles.section}`} id="servicios" aria-labelledby="services-title">
      <Container className={`editorial-container ${styles.layout}`}>
        <div className={styles.intro}>
        <SectionHeading
          id="services-title"
          eyebrow={t("QUÉ PODEMOS HACER POR TI")}
          title={t("De la idea a la solución.")}
          description={t("Automatización, software a medida, IA y desarrollo web para acompañar la forma real de trabajar de tu empresa.")}
        />
        </div>

        <ol className={styles.services}>
          {services.map((service) => (
            <li className={styles.service} key={service.number} data-reveal>
              <Link className={styles.serviceLink} href={localePath(service.route, locale)!}>
                <span className={styles.number}>{service.number}</span>
                <div className={styles.copy}>
                  <h3>{t(service.title)}</h3>
                  <p>{t(service.text)}</p>
                </div>
                <svg className={styles.arrow} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 15 15 5M5 5h10v10" />
                </svg>
              </Link>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
