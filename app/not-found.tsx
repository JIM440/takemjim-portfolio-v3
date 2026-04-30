import type { Metadata } from "next";
import { NotFoundScreen } from "@/components/not-found-screen";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <NotFoundScreen
      eyebrow="Nothing here"
      title="That page does not exist (or moved)."
      description="The URL might be mistyped, out of date, or pointing to something I have not published yet. If you were following a link from elsewhere, try the home page or jump straight to work or the blog."
      actions={[
        { href: "/", label: "Back home", variant: "primary" },
        { href: "/projects", label: "View work" },
        { href: "/blog", label: "Read the blog" },
      ]}
    />
  );
}
