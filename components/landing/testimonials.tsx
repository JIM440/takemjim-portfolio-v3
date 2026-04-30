"use client";

import { useEffect, useState, useCallback } from "react";
import type { Testimonial } from "@/lib/data-store";

function TestimonialSkeleton() {
  return (
    <div className="flex flex-col justify-between gap-8 rounded-[2rem] border border-(--line) bg-(--surface-strong) p-8 shadow-(--shadow)">
      <div className="space-y-3">
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-[90%] rounded" />
        <div className="skeleton h-4 w-[75%] rounded" />
      </div>
      <div className="flex items-center gap-4">
        <div className="skeleton size-10 rounded-full" />
        <div className="space-y-2">
          <div className="skeleton h-3 w-24 rounded" />
          <div className="skeleton h-3 w-32 rounded" />
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      console.log("Fetching testimonials...");
      const res = await fetch("/api/testimonials");
      console.log("Testimonials response received:", res.status);
      if (res.ok) {
        const json = await res.json();
        console.log("Testimonials json:", json);
        setTestimonials(json.testimonials || []);
      } else {
        console.error("Testimonials fetch failed:", res.status);
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  if (loading) {
    return (
      <section className="landing-band py-20 md:py-32 bg-(--bg-stripe)">
        <div className="landing-container">
          <div className="max-w-2xl">
            <div className="skeleton h-3 w-20 rounded mb-4" />
            <div className="skeleton h-10 w-full rounded" />
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <TestimonialSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="landing-band py-20 bg-(--bg-stripe)">
        <div className="landing-container text-center">
          <p className="text-(--muted)">Failed to load testimonials.</p>
          <button 
            onClick={fetchTestimonials}
            className="mt-4 text-sm font-semibold underline underline-offset-4 hover:text-(--fg)"
          >
            Try again
          </button>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  return (
    <section className="landing-band py-20 md:py-32 bg-(--bg-stripe)">
      <div className="landing-container">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="landing-eyebrow">Reputation</p>
            <h2 className="landing-display-lg mt-4 text-(--fg-soft)">
              Kind words from people I&apos;ve worked with.
            </h2>
          </div>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <article 
              key={t.id} 
              className="flex flex-col justify-between gap-8 rounded-[2rem] border border-(--line) bg-(--surface-strong) p-8 shadow-(--shadow)"
            >
              <p className="text-lg italic leading-relaxed text-(--fg)">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                {t.avatar && (
                  <img src={t.avatar} alt="" className="size-10 rounded-full object-cover" />
                )}
                {!t.avatar && (
                   <div className="size-10 rounded-full bg-(--accent-soft) flex items-center justify-center text-[10px] font-bold text-(--fg-soft)">
                      {t.name.slice(0, 2).toUpperCase()}
                   </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-(--fg-soft)">{t.name}</p>
                  <p className="text-xs text-(--muted)">
                    {t.role} {t.company ? `at ${t.company}` : ""}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
