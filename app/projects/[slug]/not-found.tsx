import type { Metadata } from "next";
import { NotFoundScreen } from "@/components/not-found-screen";

export const metadata: Metadata = {
  title: "Project not found",
};

export default function ProjectNotFound() {
  return (
    <NotFoundScreen
      eyebrow="Work"
      title="This case study is not here."
      description="The project slug might be wrong, or this write-up is not live yet. Browse the full work list to find what you are looking for."
      actions={[
        { href: "/projects", label: "All projects", variant: "primary" },
        { href: "/contact", label: "Get in touch" },
      ]}
    />
  );
}
