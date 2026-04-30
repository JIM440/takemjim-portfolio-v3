/** Figma MCP export (node 1:258); URLs expire ~7 days — re-export or move to /public for production. */

export const blogDetailAssets = {
  hero: "https://www.figma.com/api/mcp/asset/ee7a6463-67f2-42c7-be9f-f13ac74ea7be",
  gallery: "https://www.figma.com/api/mcp/asset/bef9b73b-a16c-4091-99ff-69a4a729a0b8",
  icon: "https://www.figma.com/api/mcp/asset/75b960ba-6f78-4e78-a031-010d37c0c314",
  snowflake: "https://www.figma.com/api/mcp/asset/e3ae676b-0819-4eeb-a50c-5a6503d269cf",
  arrowCircle: "https://www.figma.com/api/mcp/asset/f108442e-7065-4797-b0d7-437019514ebd",
} as const;

const heroCycle = [blogDetailAssets.hero, blogDetailAssets.gallery] as const;
const galleryCycle = [blogDetailAssets.gallery, blogDetailAssets.hero] as const;

export function getBlogDetailMedia(postIndex: number) {
  return {
    hero: heroCycle[postIndex % heroCycle.length]!,
    gallery: galleryCycle[postIndex % galleryCycle.length]!,
    icon: blogDetailAssets.icon,
    snowflake: blogDetailAssets.snowflake,
    arrow: blogDetailAssets.arrowCircle,
  };
}
