/**
 * Canonical site origin for metadata, sitemap, and JSON-LD.
 * Override in production with NEXT_PUBLIC_SITE_URL (no trailing slash).
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://takemjim.com"
).replace(/\/$/, "");
