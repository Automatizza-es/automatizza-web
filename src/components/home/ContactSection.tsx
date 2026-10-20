import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import styles from "./ContactSection.module.css";

export function ContactSection() {
  return (
    <div className="closing-block">
      <section className={`contact-section ${styles.compact}`} id="contacto" aria-labelledby="contact-title">
        <Container className="contact-layout" data-reveal>
          <p className="contact-kicker">HABLEMOS</p>
          <h2 id="contact-title">
            ¿Qué proceso de tu empresa podría funcionar mejor?
          </h2>
          <p>No necesitas tenerlo todo definido. Cuéntanos tu idea y vemos cómo podemos ayudarte.</p>
          <div className="contact-actions">
            <Link className="contact-button" href="/contacto">
              Hablemos de tu proyecto <span aria-hidden="true">→</span>
            </Link>
            <Link href="mailto:info@automatizza.es">info@automatizza.es</Link>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
