import Link from "next/link";
import { Container } from "./Container";

const navigation = [
  ["Servicios", "#servicios"], ["Proyectos", "#proyectos"],
  ["Sobre Automatizza", "#sobre-automatizza"], ["Contacto", "/contacto"],
];

export function Footer({ homeLinks = false }: { homeLinks?: boolean }) {
  return (
    <footer className="site-footer">
      <Container className="footer-inner">
        <nav aria-label="Navegación del pie">
          {navigation.map(([label, href]) => <Link key={href} href={homeLinks && href.startsWith("#") ? `/${href}` : href}>{label}</Link>)}
        </nav>
        <Link href="mailto:info@automatizza.es">info@automatizza.es</Link>
        <div className="footer-legal">
          <span>© 2026 Automatizza</span>
          <Link href="/aviso-legal">Aviso legal</Link>
          <Link href="/politica-de-privacidad">Política de privacidad</Link>
          <Link href="/politica-de-cookies">Política de cookies</Link>
          <span>Soluciones digitales para procesos reales</span>
        </div>
      </Container>
    </footer>
  );
}
