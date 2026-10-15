import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetailPage } from "@/components/projects/ProjectDetailPage";
import { findProject, projectDetails } from "@/components/projects/projectDetails";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projectDetails.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return {};

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://automatizza.es"),
    title: `${project.client} | Proyectos | Automatizza`,
    description: project.introduction,
    alternates: { canonical: `/proyectos/${project.slug}` },
    openGraph: {
      title: `${project.client} — ${project.title}`,
      description: project.introduction,
      type: "website",
      locale: "es_ES",
      images: [{ url: project.seoImage, alt: project.client }],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();
  return <ProjectDetailPage project={project} />;
}
