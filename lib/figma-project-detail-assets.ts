/** Figma node 1:445 — remote assets expire ~7 days per Figma MCP. */
export const projectDetailAssets = {
  hero: "https://www.figma.com/api/mcp/asset/35679f55-8b73-4b97-a086-8c9ae8faa4be",
  strategyWide: "https://www.figma.com/api/mcp/asset/0e817c43-0da6-4934-a25b-b6d173550ecf",
  artifact1: "https://www.figma.com/api/mcp/asset/cec8f107-0e89-49c2-8505-4bece6bef888",
  artifact2: "https://www.figma.com/api/mcp/asset/479c4804-ae49-44ce-bcaa-1044344c0a7f",
  artifact3: "https://www.figma.com/api/mcp/asset/133bf9c6-5938-4398-b083-e978a7eaba92",
  desktop: "https://www.figma.com/api/mcp/asset/9af3cebe-d41c-422a-83ed-a0eaae816e6e",
  mobile: "https://www.figma.com/api/mcp/asset/bf21f7a0-6024-46bb-9309-056ec297a736",
  arrow: "https://www.figma.com/api/mcp/asset/85b01f76-5259-43f1-9554-b179137ea8c5",
  diagramIcon: "https://www.figma.com/api/mcp/asset/889db6fb-a392-4384-99a6-69034d67e163",
  nextArrow: "https://www.figma.com/api/mcp/asset/e9a03c32-776c-4757-8123-e297be54602b",
} as const;

const ROTATED = [
  projectDetailAssets.hero,
  projectDetailAssets.strategyWide,
  projectDetailAssets.artifact1,
  projectDetailAssets.artifact2,
  projectDetailAssets.artifact3,
  projectDetailAssets.desktop,
  projectDetailAssets.mobile,
] as const;

export function getProjectDetailMedia(projectIndex: number) {
  const n = ROTATED.length;
  const pick = (i: number) => ROTATED[(projectIndex + i) % n]!;

  return {
    hero: pick(0),
    strategyWide: pick(1),
    artifacts: [pick(2), pick(3), pick(4)] as [string, string, string],
    desktop: pick(5),
    mobile: pick(6),
  };
}
