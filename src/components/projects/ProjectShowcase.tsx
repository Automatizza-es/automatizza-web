import Link from "next/link";

import { projects } from "@/components/projects/ProjectGallery";

// Home-only project cards: three equal cards, a large visual on top and the
// name + a short line underneath. Each .showcase-stage is an empty slot,
// scoped per project (.showcase-visual-<slug>), for that card's own visual
// and micro-animations; the card gets .is-visible from <EditorialMotion />
// when it scrolls into view.
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
              <div className="showcase-stage" />
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
