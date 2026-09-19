import Link from "next/link";

import { Container } from "@/components/layout/Container";

const navigation = [
  ["Servicios", "#servicios"],
  ["Proyectos", "#proyectos"],
  ["Sobre Automatizza", "#sobre-automatizza"],
  ["Contacto", "#contacto"],
];

export function ContactSection() {
  return (
    <div className="closing-block">
      <section className="contact-section" id="contacto" aria-labelledby="contact-title">
        <Container className="contact-layout" data-reveal>
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
        </Container>
      </section>

      <footer className="site-footer">
        <Container className="footer-inner">
          <nav aria-label="Navegación del pie">
            {navigation.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          </nav>
          <Link href="mailto:info@automatizza.es">info@automatizza.es</Link>
          <div className="footer-legal">
            <span>© 2026 Automatizza</span>
            <span>Soluciones digitales para procesos reales</span>
          </div>
        </Container>
      </footer>
    </div>
  );
}
