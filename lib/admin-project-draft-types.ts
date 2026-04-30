/** Future: sync with CMS. Stored in localStorage for static admin prototyping. */

export type AdminProjectDraft = {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  updatedAt: string;
};

export const ADMIN_PROJECT_DRAFTS_KEY = "portfolio-admin-project-drafts-v1";
