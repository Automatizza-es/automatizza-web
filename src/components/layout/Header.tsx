import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";

const navigation = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Sobre Automatizza", href: "#sobre-automatizza" },
  { label: "Contacto", href: "#contacto" },
];

export function Header() {
  return (
    <header className="site-header">
      <Container className="header-inner">
        <Link className="brand" href="/" aria-label="Automatizza, inicio">
          <Image
            src="/brand/automatizza-logo.png"
            alt="Automatizza"
            width={1909}
            height={280}
            priority
          />
        </Link>

        <nav className="desktop-navigation" aria-label="Navegación principal">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="header-cta" href="#contacto">
          <span>Hablemos</span>
          <span aria-hidden="true">→</span>
        </Link>

        <details className="mobile-navigation">
          <summary aria-label="Abrir menú">
            <span />
            <span />
          </summary>
          <nav aria-label="Navegación móvil">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link className="mobile-navigation-cta" href="#contacto">
              Hablemos <span aria-hidden="true">→</span>
            </Link>
          </nav>
        </details>
      </Container>
    </header>
  );
}
