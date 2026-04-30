import Image from "next/image";

type AppPhotoProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
};

/** Standardized photo container for the site (replaces the previous B&W treatment). */
export function AppPhoto({
  src,
  alt,
  className = "",
  imgClassName = "absolute inset-0 h-full w-full max-w-none object-cover",
  priority = false,
  sizes = "(min-width: 1280px) 50vw, (min-width: 768px) 75vw, 100vw",
  quality = 75,
}: AppPhotoProps) {
  return (
    <div className={`relative overflow-hidden ${className}`.trim()}>
      <Image
        alt={alt}
        src={src}
        fill
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
        sizes={sizes}
        quality={quality}
        className={imgClassName}
      />
    </div>
  );
}
