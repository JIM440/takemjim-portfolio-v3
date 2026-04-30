type CoverBlockProps = {
  label: string;
  size?: "default" | "compact" | "tall";
  className?: string;
};

const sizeClass: Record<NonNullable<CoverBlockProps["size"]>, string> = {
  default: "cover-block",
  compact: "cover-block cover-block--compact",
  tall: "cover-block cover-block--tall",
};

export function CoverBlock({
  label,
  size = "default",
  className = "",
}: CoverBlockProps) {
  return (
    <div className={`${sizeClass[size]} ${className}`.trim()}>
      <span className="cover-block__label">{label}</span>
    </div>
  );
}
