"use client";

import { useI18n } from "@/components/i18n/LocaleProvider";

import Image from "next/image";
import { brandAssets } from "@/lib/brand-assets";
import { useEffect, useState } from "react";
import Link from "@/components/i18n/LocaleLink";

import { Container } from "@/components/layout/Container";
import { LanguageSelector } from "@/components/i18n/LanguageSelector";
import styles from "./Header.module.css";

const navigation = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Sobre Automatizza", href: "#sobre-automatizza" },
  { label: "Contacto", href: "/contacto" },
];

export function Header({ redesign = false, homeLinks = false, overlayHero = false }: { redesign?: boolean; homeLinks?: boolean; overlayHero?: boolean }) {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    if (!overlayHero) return;
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [overlayHero]);
  const transparent = overlayHero && !scrolled;
  const hrefFor = (href: string) => homeLinks && href.startsWith("#") ? `/${href}` : href;
  return (
    <header className={`site-header${redesign ? ` ${styles.redesigned}` : ""}${overlayHero ? ` ${styles.overHero}` : ""}${transparent ? ` ${styles.transparent}` : ""}`}>
      <Container className="header-inner editorial-container">
        <Link className="brand" href="/" aria-label={t("Automatizza, inicio")}>
          <Image
            src={transparent ? brandAssets.wordmark.white : brandAssets.wordmark.dark}
            unoptimized
            alt="Automatizza"
            width={brandAssets.wordmark.width}
            height={brandAssets.wordmark.height}
            priority
          />
        </Link>

        <nav className="desktop-navigation" aria-label={t("Navegación principal")}>
          {navigation.map((item) => (
            <Link key={item.href} href={hrefFor(item.href)}>
              {t(item.label)}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
        <LanguageSelector />
        <Link className="header-cta" href="/contacto">
          <span>{t("Hablemos")}</span>
          <span aria-hidden="true">→</span>
        </Link>

        </div>

        <details
          className="mobile-navigation"
          onKeyDown={redesign ? (event) => {
            if (event.key === "Escape") {
              event.currentTarget.open = false;
              event.currentTarget.querySelector("summary")?.focus();
            }
          } : undefined}
        >
          <summary aria-label={redesign ? t("Menú de navegación") : t("Abrir menú")}>
            <span />
            <span />
          </summary>
          <nav
            aria-label={t("Navegación móvil")}
            onClick={redesign ? (event) => {
              if ((event.target as HTMLElement).closest("a")) {
                const menu = event.currentTarget.closest("details");
                if (menu) menu.open = false;
              }
            } : undefined}
          >
            {navigation.map((item) => (
              <Link key={item.href} href={hrefFor(item.href)}>
                {t(item.label)}
              </Link>
            ))}
            <Link className="mobile-navigation-cta" href="/contacto">{t("Hablemos ")}<span aria-hidden="true">→</span>
            </Link>
          </nav>
        </details>
      </Container>
    </header>
  );
}
