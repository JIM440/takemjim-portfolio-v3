type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  /** surface: default card; inverse: light headline on dark panel */
  tone?: "surface" | "inverse";
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  tone = "surface",
  className = "",
}: PageHeroProps) {
  const toneClass = tone === "inverse" ? "page-hero page-hero--inverse" : "page-hero";

  return (
    <section className={`${toneClass} animate-enter ${className}`.trim()}>
      <p className="page-hero__eyebrow">{eyebrow}</p>
      <h1 className="page-hero__title">{title}</h1>
      {description ? (
        <p className="page-hero__description">{description}</p>
      ) : null}
    </section>
  );
}
