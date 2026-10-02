import Link from "next/link";

import { ProjectMedia } from "@/components/projects/ProjectMedia";

const projects = [
  {
    slug: "silos-spain",
    client: "Silos Spain",
    title: "Gestión comercial y procesos conectados",
    description:
      "Plataforma empresarial para centralizar CRM, gestión comercial, presupuestos, facturas y automatizaciones en un mismo entorno.",
    image: "/images/hero-crm-dashboard.png",
    alt: "Dashboard real de la plataforma empresarial de Silos Spain",
    position: "center top",
  },
  {
    slug: "apc",
    client: "APC",
    title: "Gestión logística digital desde el terreno",
    description:
      "Aplicación para digitalizar recogidas y descargas de transportistas, facilitando el trabajo de conductores y la gestión operativa.",
    image: "/reference/apc.png",
    alt: "Aplicación APC para la gestión operativa de transportistas",
    position: "center top",
    video: "/videos/apc.mp4",
    videoType: "video/mp4" as const,
  },
  {
    slug: "la-factory-coworking",
    client: "La Factory Coworking",
    title: "Un hub digital para gestionar el coworking",
    description:
      "Webapp que comienza con la reserva de salas y está concebida para centralizar progresivamente onboarding, Holded, acceso a instalaciones, campañas de email y otros servicios actualmente dispersos.",
    image: "/reference/la-factory.png",
    alt: "Webapp de La Factory Coworking para la reserva de salas y servicios",
    position: "center top",
    video: "/videos/la-factory-coworking.mp4",
    videoType: "video/mp4" as const,
  },
];

type ProjectGalleryProps = {
  mode?: "home" | "page";
  priority?: boolean;
};

export function ProjectGallery({ mode = "home", priority = false }: ProjectGalleryProps) {
  return (
    <div className={`project-gallery project-gallery-${mode}`}>
      {projects.map((project, index) => (
        <article className={`project-card project-card-${project.slug}`} data-reveal key={project.slug}>
          <ProjectMedia
            alt={project.alt}
            image={project.image}
            video={project.video}
            videoType={project.videoType}
            imagePosition={project.position}
            priority={priority && index === 0}
            showAsset={Boolean(project.video)}
          />
          <div className="project-card-copy">
            <p className="project-client">{project.client}</p>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <Link href={`/proyectos/${project.slug}`}>
              Ver proyecto <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
