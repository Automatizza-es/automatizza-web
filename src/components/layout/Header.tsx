"use client";

import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import styles from "./Header.module.css";

const navigation = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Sobre Automatizza", href: "#sobre-automatizza" },
  { label: "Contacto", href: "#contacto" },
];

export function Header({ redesign = false }: { redesign?: boolean }) {
  return (
    <header className={`site-header${redesign ? ` ${styles.redesigned}` : ""}`}>
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

        <details
          className="mobile-navigation"
          onKeyDown={redesign ? (event) => {
            if (event.key === "Escape") {
              event.currentTarget.open = false;
              event.currentTarget.querySelector("summary")?.focus();
            }
          } : undefined}
        >
          <summary aria-label={redesign ? "Menú de navegación" : "Abrir menú"}>
            <span />
            <span />
          </summary>
          <nav
            aria-label="Navegación móvil"
            onClick={redesign ? (event) => {
              if ((event.target as HTMLElement).closest("a")) {
                const menu = event.currentTarget.closest("details");
                if (menu) menu.open = false;
              }
            } : undefined}
          >
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
