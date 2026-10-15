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

// Native horizontal scrolling keeps the same card proportions as the project
// collection grows. The focusable list also supports keyboard scrolling.
export function ProjectShowcase() {
  return (
    <ul className="showcase-grid" aria-label="Proyectos destacados" tabIndex={0}>
      {projects.map((project) => {
        const href = `/proyectos/${project.slug}`;
        return (
          <li className={`showcase-card showcase-card-${project.slug}`} data-reveal key={project.slug}>
            <Link
              className={`showcase-visual showcase-visual-${project.slug}`}
              href={href}
              scroll={false}
              tabIndex={-1}
              aria-hidden="true"
            >
              <div className="showcase-stage">{visuals[project.slug]}</div>
            </Link>
            <div className="showcase-copy">
              <h3>{project.client}.</h3> <p>{project.title}.</p>
            </div>
            <Link className="showcase-link" href={href} scroll={false}>
              Ver proyecto <span aria-hidden="true">→</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
