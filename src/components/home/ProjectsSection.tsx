"use client";

import { useI18n } from "@/components/i18n/LocaleProvider";

import { Container } from "@/components/layout/Container";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import styles from "./ProjectsSection.module.css";

export function ProjectsSection() {
  const { t } = useI18n();
  return (
    <section className={`projects-section projects-home ${styles.section}`} id="proyectos" aria-labelledby="projects-title">
      <Container className="editorial-container">
        <header className={styles.heading} data-reveal>
          <p className={styles.eyebrow}>{t("PROYECTOS REALES")}</p>
          <div className={styles.intro}>
            <h2 id="projects-title">{t("Soluciones construidas para necesidades reales")}</h2>
            <p className={styles.description}>{t("Cada proyecto parte de una necesidad concreta y se construye en función de cómo trabaja realmente cada empresa.")}</p>
          </div>
        </header>

        <ProjectShowcase />
      </Container>
    </section>
  );
}
