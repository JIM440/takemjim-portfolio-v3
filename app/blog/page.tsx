import type { Metadata } from "next";
import { BlogArchiveView } from "@/components/blog/blog-archive-view";
import { BlogNewsletter } from "@/components/blog/blog-newsletter";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read articles by Takem Jim on software development, web and mobile engineering, cloud systems, product delivery, and building useful applications.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Takem Jim",
    description:
      "Read articles by Takem Jim on software development, web and mobile engineering, cloud systems, product delivery, and building useful applications.",
    url: "/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Takem Jim",
    description:
      "Read articles by Takem Jim on software development, web and mobile engineering, cloud systems, product delivery, and building useful applications.",
  },
};

type BlogPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category } = await searchParams;
  
  return (
    <>
      <BlogArchiveView initialCategory={category} />
      <BlogNewsletter />
    </>
  );
}
