import type { Metadata } from "next";

import { ContactSection } from "@/components/home/ContactSection";
import { EditorialMotion } from "@/components/home/EditorialMotion";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { ProjectGallery } from "@/components/projects/ProjectGallery";

export const metadata: Metadata = {
  title: "Proyectos | Automatizza",
  description: "Proyectos reales desarrollados por Automatizza.",
};

export default function ProjectsPage() {
  return (
    <>
      <EditorialMotion />
      <Header />
      <main className="projects-page">
        <section className="projects-page-intro" aria-labelledby="projects-page-title">
          <Container>
            <p className="section-eyebrow">PROYECTOS REALES</p>
            <h1 id="projects-page-title">Soluciones construidas para necesidades reales</h1>
            <p>
              Cada proyecto parte de una necesidad concreta y se construye en función de cómo
              trabaja realmente cada empresa.
            </p>
          </Container>
        </section>
        <section className="projects-page-gallery" aria-label="Muestrario de proyectos">
          <Container>
            <ProjectGallery mode="page" priority />
          </Container>
        </section>
      </main>
      <ContactSection />
    </>
  );
}
