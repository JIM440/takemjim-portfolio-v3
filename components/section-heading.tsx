import Link from "next/link";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  href?: string;
  linkLabel?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  href,
  linkLabel,
}: SectionHeadingProps) {
  return (
    <div className="section-heading animate-enter">
      <div>
        <p className="section-label">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {href && linkLabel ? (
        <Link href={href} className="section-link">
          {linkLabel}
        </Link>
      ) : null}
    </div>
  );
}
