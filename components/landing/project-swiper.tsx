"use client";

import { useRef, useState, useEffect } from "react";
import { AppPhoto } from "./app-photo";

type ProjectSwiperProps = {
  images: string[];
};

export function ProjectSwiper({ images }: ProjectSwiperProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [images]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="group/swiper relative aspect-[769.67/456.28] w-full max-w-full">
      {/* Scroll Container */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="no-scrollbar flex h-full w-full snap-x snap-mandatory overflow-x-auto scroll-smooth"
      >
        {images.map((src, i) => (
          <div key={i} className="h-full w-full shrink-0 snap-center snap-always">
            <AppPhoto
              src={src}
              alt=""
              className="h-full w-full"
              imgClassName="absolute left-0 top-[-20%] h-[140%] w-full max-w-none object-cover"
            />
          </div>
        ))}
      </div>

      {/* Controls */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`absolute left-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-[color:var(--surface-strong)] text-[color:var(--fg)] shadow-lg transition-all hover:bg-[color:var(--bg-muted)] disabled:pointer-events-none disabled:opacity-0 ${
              canScrollLeft ? "opacity-100" : "opacity-0"
            }`}
            aria-label="Previous image"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`absolute right-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-[color:var(--surface-strong)] text-[color:var(--fg)] shadow-lg transition-all hover:bg-[color:var(--bg-muted)] disabled:pointer-events-none disabled:opacity-0 ${
              canScrollRight ? "opacity-100" : "opacity-0"
            }`}
            aria-label="Next image"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 transition-opacity group-hover/swiper:opacity-100 opacity-60">
             {images.map((_, i) => (
               <div key={i} className="size-1.5 rounded-full bg-[color:var(--fg)] ring-1 ring-[color:var(--line)]" />
             ))}
          </div>
        </>
      )}
    </div>
  );
}
