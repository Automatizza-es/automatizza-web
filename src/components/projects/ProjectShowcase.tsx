import type { ReactNode } from "react";
import Link from "next/link";

import { projects } from "@/components/projects/ProjectGallery";
import { ApcVisual } from "@/components/projects/visuals/ApcVisual";
import { LaFactoryVisual } from "@/components/projects/visuals/LaFactoryVisual";
import { SilosSpainVisual } from "@/components/projects/visuals/SilosSpainVisual";

const visuals: Partial<Record<string, ReactNode>> = {
  "silos-spain": <SilosSpainVisual />,
  apc: <ApcVisual />,
  "la-factory-coworking": <LaFactoryVisual />,
};

// Home-only project cards: three equal cards, a large visual on top and the
// name + a short line underneath. Each .showcase-stage holds that project's
// visual from `visuals` (scoped per project as .showcase-visual-<slug>);
// projects without one yet keep an empty slot.
export function ProjectShowcase() {
  return (
    <ul className="showcase-grid" aria-label="Proyectos destacados">
      {projects.map((project) => {
        const href = `/proyectos/${project.slug}`;
        return (
          <li className={`showcase-card showcase-card-${project.slug}`} data-reveal key={project.slug}>
            <Link
              className={`showcase-visual showcase-visual-${project.slug}`}
              href={href}
              tabIndex={-1}
              aria-hidden="true"
            >
              <div className="showcase-stage">{visuals[project.slug]}</div>
            </Link>
            <div className="showcase-copy">
              <h3>{project.client}.</h3> <p>{project.title}.</p>
            </div>
            <Link className="showcase-link" href={href}>
              Ver proyecto <span aria-hidden="true">→</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
