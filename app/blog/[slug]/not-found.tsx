import type { Metadata } from "next";
import { NotFoundScreen } from "@/components/not-found-screen";

export const metadata: Metadata = {
  title: "Post not found",
};

export default function BlogPostNotFound() {
  return (
    <NotFoundScreen
      eyebrow="Blog"
      title="This post is not here."
      description="The slug may have changed, or the link was copied wrong. Head back to the blog index for published software engineering notes."
      actions={[
        { href: "/blog", label: "All posts", variant: "primary" },
        { href: "/", label: "Home" },
      ]}
    />
  );
}
