"use client";

import { useI18n } from "@/components/i18n/LocaleProvider";

import type { ReactNode } from "react";
import Link from "@/components/i18n/LocaleLink";

import { projects } from "@/components/projects/ProjectGallery";
import { ApcPhotoVisual } from "@/components/projects/visuals/ApcPhotoVisual";
import { LaFactoryPhotoVisual } from "@/components/projects/visuals/LaFactoryPhotoVisual";
import { SilosSpainPhotoVisual } from "@/components/projects/visuals/SilosSpainPhotoVisual";

const visuals: Partial<Record<string, ReactNode>> = {
  "silos-spain": <SilosSpainPhotoVisual />,
  apc: <ApcPhotoVisual />,
  "la-factory-coworking": <LaFactoryPhotoVisual />,
};

// Native horizontal scrolling keeps the same card proportions as the project
// collection grows. The focusable list also supports keyboard scrolling.
export function ProjectShowcase() {
  const { t } = useI18n();
  return (
    <ul className="showcase-grid" aria-label={t("Proyectos destacados")} tabIndex={0}>
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
              <h3>{project.client}.</h3> <p>{t(project.title)}.</p>
            </div>
            <Link className="showcase-link" href={href} scroll={false}>{t("Ver proyecto ")}<span aria-hidden="true">→</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
