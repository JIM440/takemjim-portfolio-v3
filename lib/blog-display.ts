type ArchiveMetaPost = {
  category?: string;
  date?: string;
  publishedAt?: string;
};

export function archiveMetaSplit(post: ArchiveMetaPost): { left: string; right: string } {
  const dateStr = post.date || (post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "");
  const parts = dateStr.replace(/,/g, "").split(" ").filter(Boolean);
  const month = parts[0]?.slice(0, 3).toUpperCase() ?? "";
  const year = parts[parts.length - 1] ?? "";
  
  return {
    left: (post.category || "General").toUpperCase(),
    right: `${month} ${year}`.trim(),
  };
}
