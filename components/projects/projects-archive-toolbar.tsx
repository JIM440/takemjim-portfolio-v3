import Link from "next/link";

type ProjectsArchiveToolbarProps = {
  categories: string[];
  active?: string;
};

export function ProjectsArchiveToolbar({ categories, active }: ProjectsArchiveToolbarProps) {
  const normalized = active?.toLowerCase();

  return (
    <div className="blog-archive-toolbar">
      <h2 className="blog-archive-toolbar__heading">Works</h2>
      <nav className="blog-archive-toolbar__filters" aria-label="Filter by category">
        <Link
          href="/projects"
          className={
            normalized === undefined || normalized === "all"
              ? "blog-archive-filter is-active"
              : "blog-archive-filter"
          }
        >
          All
        </Link>
        {categories.map((cat) => {
          const isActive = normalized === cat.toLowerCase();
          return (
            <Link
              key={cat}
              href={`/projects?category=${encodeURIComponent(cat)}`}
              className={isActive ? "blog-archive-filter is-active" : "blog-archive-filter"}
            >
              {cat}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
