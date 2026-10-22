"use client";

import { useI18n } from "@/components/i18n/LocaleProvider";

import Link from "@/components/i18n/LocaleLink";

import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import styles from "./ContactSection.module.css";

export function ContactSection() {
  const { t } = useI18n();
  return (
    <div className="closing-block">
      <section className={`contact-section ${styles.compact}`} id="contacto" aria-labelledby="contact-title">
        <Container className="contact-layout" data-reveal>
          <p className="contact-kicker">{t("HABLEMOS")}</p>
          <h2 id="contact-title">{t("¿Qué proceso de tu empresa podría funcionar mejor?")}</h2>
          <p>{t("No necesitas tenerlo todo definido. Cuéntanos tu idea y vemos cómo podemos ayudarte.")}</p>
          <div className="contact-actions">
            <Link className="contact-button" href="/contacto">{t("Hablemos de tu proyecto ")}<span aria-hidden="true">→</span>
            </Link>
            <Link href="mailto:info@automatizza.es">info@automatizza.es</Link>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
