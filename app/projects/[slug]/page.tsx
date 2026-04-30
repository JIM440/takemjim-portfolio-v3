import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailView } from "@/components/project/project-detail-view";
import { projects } from "@/lib/site-data";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);

  if (!project) {
    return { title: "Project not found" };
  }

  const description = `${project.summary} Case study by Takem Jim — software engineer & developer (web & mobile).`;

  return {
    title: `${project.title} | Work`,
    description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | Takem Jim`,
      description,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const project = projects.find((entry) => entry.slug === decodedSlug);
  const projectIndex = projects.findIndex((entry) => entry.slug === decodedSlug);
  
  const nextIndex = projectIndex !== -1 ? (projectIndex + 1) % projects.length : 0;
  const nextProject = projects.length > 0 ? projects[nextIndex] : null;

  if (!project || projectIndex < 0) {
    notFound();
  }

  return <ProjectDetailView project={project} projectIndex={projectIndex} nextProject={nextProject} />;
}
