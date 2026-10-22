import Link from "@/components/i18n/LocaleLink";

import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getContactConfig } from "@/lib/contact/server";
import { isPrivacyPolicyReady, privacyPolicy } from "@/content/privacy";
import { translator } from "@/lib/i18n/translate";
import type { Locale } from "@/lib/i18n/routes";
import styles from "@/components/contact/ContactPage.module.css";

export default function ContactPage({ locale = "es" }: { locale?: Locale }) {
  const t = translator(locale);
  const config = getContactConfig();
  return (
    <>
      <Header redesign homeLinks />
      <main className={styles.page}>
        <section className={styles.section} aria-labelledby="contact-title">
          <Container className={`contact-layout ${styles.layout}`}>
            <div className={styles.copy}>
              <p className="contact-kicker">{t("HABLEMOS")}</p>
              <h1 id="contact-title">{t("¿Hay algún proceso de tu empresa que podría funcionar mejor?")}</h1>
              <p>{t("No necesitas tenerlo todo definido. ")}<strong>{t("Cuéntanos cómo trabajáis ahora y qué te gustaría mejorar. Te ayudamos a encontrar la mejor forma de resolverlo.")}</strong>
              </p>
              <Link className={styles.email} href="mailto:info@automatizza.es">info@automatizza.es</Link>
            </div>
            <ContactForm enabled={config.ready} testMode={config.testMode} privacyReady={isPrivacyPolicyReady()} policyVersion={privacyPolicy.version} controller={privacyPolicy.legalName} rightsEmail={privacyPolicy.rightsEmail} />
          </Container>
        </section>
      </main>
      <Footer homeLinks />
    </>
  );
}
