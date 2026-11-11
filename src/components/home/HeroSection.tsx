"use client";

import { useEffect, useRef } from "react";
import { useI18n } from "@/components/i18n/LocaleProvider";
import Link from "@/components/i18n/LocaleLink";
import { Container } from "@/components/layout/Container";
import styles from "./HeroSection.module.css";

// Reuse the original hero's SVG routes and CSS hover response, with fewer nodes.
const connections = [
  "M-30 188 154 188 258 86 430 86",
  "M-30 630 160 630 244 546 410 546",
  "M1026 78 1144 196 1470 196",
  "M1030 620 1190 620 1310 500 1470 500",
];
const nodes = [[154, 188], [258, 86], [160, 630], [244, 546], [1144, 196], [1026, 78], [1190, 620], [1310, 500]];
const interactiveWords = {
  es: /(?:tecnología|adaptarse a ti)/gu,
  en: /(?:Technology|adapt to you)/gu,
  fr: /(?:technologie|s’adapter à vous)/gu,
  pt: /(?:tecnologia|adaptar-se a si)/gu,
};

export function HeroSection() {
  const { locale, t } = useI18n();
  const heroRef = useRef<HTMLElement>(null);
  const lead = t("La tecnología debería adaptarse a ti.");
  const words = [...lead.matchAll(interactiveWords[locale])];
  const segments = [];
  let start = 0;
  for (const [index, word] of words.entries()) {
    segments.push(lead.slice(start, word.index));
    segments.push(<span className={index === 0 ? styles.technology : styles.adapt} key={word.index}>{word[0]}</span>);
    start = word.index + word[0].length;
  }
  segments.push(lead.slice(start));

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => {
      hero.dataset.visible = String(entry.isIntersecting);
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);
  return (
    <section ref={heroRef} className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.network} aria-hidden="true">
        <svg viewBox="0 0 1440 720" preserveAspectRatio="xMinYMid slice" focusable="false">
          <g className={styles.lines}>
            {connections.map((path) => <path d={path} key={path} />)}
          </g>
          <g className={styles.routes}>
            {connections.map((path) => <path d={path} key={path} />)}
          </g>
          <g className={styles.nodes}>
            {nodes.map(([cx, cy]) => <circle cx={cx} cy={cy} r="2.2" key={`${cx}-${cy}`} />)}
          </g>
        </svg>
      </div>
      <Container className={styles.inner}>
        <div className={styles.copy}>
          <h1 id="hero-title" className={styles.title}>
            <span className={styles.lead}>{segments}</span>{" "}
            <span className={styles.closing}>{t("No al revés.")}</span>
          </h1>
          <p className={styles.description}>{t("Desarrollamos software a medida, automatizaciones e inteligencia artificial para empresas.")}</p>
          <div className={styles.actions}>
            <Link className={`${styles.button} ${styles.primary}`} href="/contacto">
              <span>{t("Hablemos de tu proyecto")}</span>
              <span className={styles.arrow} aria-hidden="true">→</span>
            </Link>
            <Link className={`${styles.button} ${styles.secondary}`} href="#proyectos">{t("Ver proyectos")}</Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
