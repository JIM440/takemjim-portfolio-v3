import type { Project, ProjectScreenshot } from "@/lib/site-data";

export function projectUsesNoteLoomCaseStudy(project: Project) {
  void project;
  return false;
}

export function projectUsesPlayStoreStrip(project: Project) {
  return project.slug === "reepls";
}

export function projectUsesPawtakerScreenshotBoard(project: Project) {
  return (
    project.slug === "pawtaker" ||
    project.slug === "internship-management-system" ||
    project.slug === "cost-estimate" ||
    project.slug === "note-loom"
  );
}

export function projectUsesMinimalVisualCaseStudy(project: Project) {
  return (
    project.slug === "fet-space-school-management-system"
  );
}

export function getPlayStoreStripShots(screenshots: ProjectScreenshot[]) {
  return screenshots.filter((shot) => shot.frame === "mobile");
}

export function splitPawtakerShots(screenshots: ProjectScreenshot[]) {
  return {
    mobile: screenshots.filter((shot) => shot.frame === "mobile" || shot.frame === "desktop"),
    admin: screenshots.filter((shot) => shot.frame === "admin"),
  };
}
