import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";

export function ProjectsSection() {
  return (
    <section className="projects-section projects-home" id="proyectos" aria-labelledby="projects-title">
      <Container>
        <header className="projects-header" data-reveal>
          <p className="section-eyebrow">PROYECTOS REALES</p>
          <h2 id="projects-title">Soluciones construidas para necesidades reales</h2>
          <p>
            Cada proyecto parte de una necesidad concreta y se construye en función de cómo trabaja
            realmente cada empresa.
          </p>
        </header>

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
