export type ContactIntent = "project-request";

export function contactPageHref(options: {
  intent?: ContactIntent;
  projectSlug?: string;
  projectTitle?: string;
}): string {
  const params = new URLSearchParams();

  if (options.intent) {
    params.set("intent", options.intent);
  }
  if (options.projectSlug) {
    params.set("ref", options.projectSlug);
  }
  if (options.projectTitle?.trim()) {
    params.set("subject", options.projectTitle.trim());
  }

  const query = params.toString();
  return query ? `/contact?${query}` : "/contact";
}
