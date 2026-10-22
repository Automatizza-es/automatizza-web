"use client";

import { useI18n } from "@/components/i18n/LocaleProvider";

import Link from "@/components/i18n/LocaleLink";
import { Container } from "./Container";

const navigation = [
  ["Servicios", "#servicios"], ["Proyectos", "#proyectos"],
  ["Sobre Automatizza", "#sobre-automatizza"], ["Contacto", "/contacto"],
];

export function Footer({ homeLinks = false }: { homeLinks?: boolean }) {
  const { t } = useI18n();
  return (
    <footer className="site-footer">
      <Container className="footer-inner">
        <nav aria-label={t("Navegación del pie")}>
          {navigation.map(([label, href]) => <Link key={href} href={homeLinks && href.startsWith("#") ? `/${href}` : href}>{t(label)}</Link>)}
        </nav>
        <Link href="mailto:info@automatizza.es">info@automatizza.es</Link>
        <div className="footer-legal">
          <span>© 2026 Automatizza</span>
          <Link href="/aviso-legal">{t("Aviso legal")}</Link>
          <Link href="/politica-de-privacidad">{t("Política de privacidad")}</Link>
          <Link href="/politica-de-cookies">{t("Política de cookies")}</Link>
          <span>{t("Soluciones digitales para procesos reales")}</span>
        </div>
      </Container>
    </footer>
  );
}
