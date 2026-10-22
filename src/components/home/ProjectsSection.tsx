"use client";

import { useI18n } from "@/components/i18n/LocaleProvider";

import { Container } from "@/components/layout/Container";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { SectionHeading } from "./SectionHeading";

export function ProjectsSection() {
  const { t } = useI18n();
  return (
    <section className="projects-section projects-home" id="proyectos" aria-labelledby="projects-title">
      <Container className="editorial-container">
        <SectionHeading
          id="projects-title"
          eyebrow={t("PROYECTOS REALES")}
          title={t("Soluciones construidas para necesidades reales")}
          description={t("Cada proyecto parte de una necesidad concreta y se construye en función de cómo trabaja realmente cada empresa.")}
          reveal
        />

        <ProjectShowcase />
      </Container>
    </section>
  );
}
