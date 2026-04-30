import type { Metadata } from "next";
import BlogDetailContainer from "@/components/blog/blog-detail-container";
import { blogStore } from "@/lib/data-store";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return blogStore.list().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogStore.get(slug);

  if (!post) {
    return {
      title: "Post not found",
      description: "The requested blog post could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const description =
    post.excerpt?.trim() ||
    `Read ${post.title} by Takem Jim, covering software development, engineering practice, and product delivery.`;

  return {
    title: `${post.title} | Blog`,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Takem Jim`,
      description,
      type: "article",
      url: `/blog/${post.slug}`,
      images: post.image ? [post.image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Takem Jim`,
      description,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;

  return <BlogDetailContainer slug={slug} />;
}
