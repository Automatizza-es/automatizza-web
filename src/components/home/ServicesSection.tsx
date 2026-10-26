"use client";

import { useI18n } from "@/components/i18n/LocaleProvider";
import Link from "next/link";
import { localePath } from "@/lib/i18n/routes";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "./SectionHeading";
import styles from "./ServicesSection.module.css";

const services = [
  { number: "01", title: "Automatización", text: "Procesos que avanzan solos y menos trabajo manual." },
  { number: "02", title: "Software a medida", text: "Herramientas diseñadas para la forma real de trabajar de tu empresa." },
  { number: "03", title: "Inteligencia artificial", text: "Extraer información de documentos, clasificar solicitudes y facilitar consultas" },
  { number: "04", title: "Desarrollo web", text: "Webs y experiencias digitales con diseño, rendimiento y estrategia." },
];

export function ServicesSection() {
  const { locale, t } = useI18n();
  return (
    <section className={`whatwedo-section ${styles.section}`} id="servicios" aria-labelledby="services-title">
      <Container className="editorial-container">
        <SectionHeading
          id="services-title"
          eyebrow={t("QUÉ PODEMOS HACER POR TI")}
          title={t("De la idea a la solución.")}
          description={t("Automatización, software a medida, IA y desarrollo web para acompañar la forma real de trabajar de tu empresa.")}
        />

        <ol className={styles.services}>
          {services.map((service) => (
            <li className={styles.service} key={service.number} data-reveal>
              <span className={styles.number}>{service.number}</span>
              <h3><span>{service.number === "01" || service.number === "02" || service.number === "03"
                ? <Link className={styles.serviceLink} href={localePath(service.number === "01" ? "process-automation" : service.number === "02" ? "bespoke-software" : "artificial-intelligence", locale)!}>{t(service.title)}</Link>
                : t(service.title)}</span></h3>
              <p>{t(service.text)}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
