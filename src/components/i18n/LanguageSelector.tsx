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
      <svg className={styles.globe} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
        <path d="M3 12h18M5 6.5h14M5 17.5h14" />
      </svg>
      {languageInfo[locale].code}
    </summary>
    <ul aria-label={t("Idioma")}>
      {locales.map(option => <li key={option}>
        {paths[option] ? <a href={paths[option]} lang={languageInfo[option].tag} hrefLang={languageInfo[option].tag} aria-current={option === locale ? "page" : undefined}>
          {languageInfo[option].name}
          {option === locale && <svg className={styles.check} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="m3.5 8 3 3 6-6" /></svg>}
        </a>
          : <span lang={languageInfo[option].tag} aria-disabled="true" title={t("Traducción no publicada")}>{languageInfo[option].name}</span>}
      </li>)}
    </ul>
  </details>;
}
