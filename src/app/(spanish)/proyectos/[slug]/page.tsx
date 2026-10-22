import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetailPage } from "@/components/projects/ProjectDetailPage";
import { findProject, projectDetails } from "@/components/projects/projectDetails";
import { pageMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projectDetails.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return {};

  const metadata = pageMetadata(`/proyectos/${project.slug}`, project.seo.title, project.seo.description);
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
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
