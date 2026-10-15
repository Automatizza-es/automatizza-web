import { Container } from "@/components/layout/Container";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { SectionHeading } from "./SectionHeading";

export function ProjectsSection() {
  return (
    <section className="projects-section projects-home" id="proyectos" aria-labelledby="projects-title">
      <Container className="editorial-container">
        <SectionHeading
          id="projects-title"
          eyebrow="PROYECTOS REALES"
          title="Soluciones construidas para necesidades reales"
          description="Cada proyecto parte de una necesidad concreta y se construye en función de cómo trabaja realmente cada empresa."
          reveal
        />

        <ProjectShowcase />
      </Container>
    </section>
  );
}
