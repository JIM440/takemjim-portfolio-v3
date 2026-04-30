import Link from "next/link";

type BlogArchiveToolbarProps = {
  categories: string[];
  active?: string;
  onSelect?: (category: string) => void;
};

export function BlogArchiveToolbar({
  categories,
  active,
  onSelect,
}: BlogArchiveToolbarProps) {
  const normalized = active?.toLowerCase() || "all";

  const renderItem = (label: string, value: string) => {
    const isActive = normalized === value.toLowerCase();
    const className = isActive ? "blog-archive-filter is-active" : "blog-archive-filter";

    if (onSelect) {
      return (
        <button
          key={value}
          onClick={() => onSelect(value)}
          className={className}
        >
          {label}
        </button>
      );
    }

    return (
      <Link
        key={value}
        href={value === "all" ? "/blog" : `/blog?category=${encodeURIComponent(value)}`}
        className={className}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="blog-archive-toolbar">
      <h2 className="blog-archive-toolbar__heading">Blog</h2>
      <nav className="blog-archive-toolbar__filters" aria-label="Filter by category">
        {renderItem("All", "all")}
        {categories.filter(c => c !== "all").map((cat) => renderItem(cat, cat))}
      </nav>
    </div>
  );
}
