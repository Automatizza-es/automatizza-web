"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { equivalents, languageInfo, locales, resolveRoute } from "@/lib/i18n/routes";
import { useI18n } from "./LocaleProvider";
import styles from "./LanguageSelector.module.css";

export function LanguageSelector() {
  const { locale, t } = useI18n();
  const path = usePathname();
  const route = resolveRoute(path);
  const paths = route ? equivalents(route.id) : {};
  const menu = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    function outside(event: PointerEvent) { if (menu.current && !menu.current.contains(event.target as Node)) menu.current.open = false; }
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);
  return <details ref={menu} className={styles.selector} onKeyDown={event => {
    if (event.key === "Escape") { event.currentTarget.open = false; event.currentTarget.querySelector("summary")?.focus(); }
  }}>
    <summary aria-label={`${t("Idioma")}: ${languageInfo[locale].name}`}>
      {languageInfo[locale].code}<span aria-hidden="true">⌄</span>
    </summary>
    <ul aria-label={t("Idioma")}>
      {locales.map(option => <li key={option}>
        {paths[option] ? <a href={paths[option]} lang={languageInfo[option].tag} hrefLang={languageInfo[option].tag} aria-current={option === locale ? "page" : undefined}>{languageInfo[option].name}</a>
          : <span lang={languageInfo[option].tag} aria-disabled="true" title={t("Traducción no publicada")}>{languageInfo[option].name}</span>}
      </li>)}
    </ul>
  </details>;
}
