import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/contact/ContactForm";
import { getContactConfig } from "@/lib/contact/server";
import { isPrivacyPolicyReady, privacyPolicy } from "@/content/privacy";
import styles from "./ContactSection.module.css";

export function ContactSection({ withForm = false }: { withForm?: boolean }) {
  return (
    <div className="closing-block">
      <section className="contact-section" id="contacto" aria-labelledby="contact-title">
        <Container className={`contact-layout${withForm ? ` ${styles.withForm}` : ""}`} data-reveal>
          {withForm ? <>
            <div className={styles.copy}>
              <p className="contact-kicker">HABLEMOS</p>
              <h2 id="contact-title">¿Hay algún proceso de tu empresa que sabes que podría funcionar mejor?</h2>
              <p>No necesitas tenerlo todo definido. Cuéntanos tu idea y vemos cómo podemos ayudarte.</p>
              <Link className={styles.email} href="mailto:info@automatizza.es">info@automatizza.es</Link>
            </div>
            <ContactForm enabled={getContactConfig().ready} privacyReady={isPrivacyPolicyReady()} policyVersion={privacyPolicy.version} controller={privacyPolicy.legalName} rightsEmail={privacyPolicy.rightsEmail} />
          </> : <>
          <p className="contact-kicker">HABLEMOS</p>
          <h2 id="contact-title">
            ¿Hay algún proceso de tu empresa que sabes que podría funcionar mejor?
          </h2>
          <p>Cuéntanos cómo trabajáis ahora. Empezaremos por entender el problema.</p>
          <div className="contact-actions">
            <Link className="contact-button" href="mailto:info@automatizza.es">
              Hablemos de tu proyecto <span aria-hidden="true">→</span>
            </Link>
            <Link href="mailto:info@automatizza.es">info@automatizza.es</Link>
          </div>
          </>}
        </Container>
      </section>

      <Footer />
    </div>
  );
}
