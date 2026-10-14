import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { SectionHeading } from "./SectionHeading";

export function ProjectsSection() {
  return (
    <section className="projects-section projects-home" id="proyectos" aria-labelledby="projects-title">
      <Container>
        <SectionHeading
          id="projects-title"
          eyebrow="PROYECTOS REALES"
          title="Soluciones construidas para necesidades reales"
          description="Cada proyecto parte de una necesidad concreta y se construye en función de cómo trabaja realmente cada empresa."
          reveal
        />

        <ProjectShowcase />

        <div className="projects-all-link" data-reveal>
          <Link href="/proyectos">
            Ver todos los proyectos <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
