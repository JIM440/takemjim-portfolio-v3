"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { contactSocial, profile, projects } from "@/lib/site-data";

export function ContactPageIntro() {
  const searchParams = useSearchParams();
  const intent = searchParams.get("intent");
  const ref = searchParams.get("ref");
  const isProjectRequest = intent === "project-request";
  const refProject = ref ? projects.find((p) => p.slug === ref) : undefined;
  const mailtoHref = `mailto:${profile.email}`;

  return (
    <div className="flex min-w-0 flex-col gap-8 sm:gap-10">
      <header>
        <p className="section-label">Contact</p>
        <h1 className="mt-4 max-w-[22ch] font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-normal leading-[1.1] tracking-tight text-[color:var(--fg-soft)]">
          Let&apos;s build something clear and useful.
        </h1>
      </header>

      <div className="flex flex-wrap items-center gap-3">
        <a
          href={mailtoHref}
          className="group flex items-center gap-3 font-[family-name:var(--font-body)] text-lg font-medium tracking-tight text-[color:var(--fg-soft)] underline underline-offset-8 decoration-[color:var(--muted-label)] transition-colors hover:decoration-[color:var(--fg)] sm:text-xl"
        >
          {profile.email}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4 transition-transform group-hover:translate-x-1 sm:size-5"
            aria-hidden="true"
          >
            <path d="M5 12h14m-7-7 7 7-7 7" />
          </svg>
        </a>
      </div>

      <nav aria-label="Social profiles and messaging" className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-[color:var(--line)] pt-8">
        <a
          href={contactSocial.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.14em] text-[color:var(--muted)] underline underline-offset-4 transition-colors hover:text-[color:var(--fg)]"
        >
          WhatsApp
        </a>
        {contactSocial.social.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.14em] text-[color:var(--muted)] underline-offset-4 transition-colors hover:text-[color:var(--fg)]"
          >
            {item.label}
          </a>
        ))}
        <a
          href={contactSocial.cvHref}
          target="_blank"
          rel="noopener noreferrer"
          className="font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--fg)] underline underline-offset-4"
        >
          Download CV
        </a>
      </nav>

      {isProjectRequest ? (
        <div className="border-l-2 border-[color:var(--fg)] py-1 pl-5">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--muted-label)]">
            Project request
          </p>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-[color:var(--muted)]">
            You landed here to start a <strong className="font-medium text-[color:var(--fg-soft)]">new project</strong>.
            Share your timeline, stack preferences, and what success looks like - I will reply as soon as possible.
          </p>
          {refProject ? (
            <p className="mt-3 text-sm text-[color:var(--muted)]">
              Inspired by this case study:{" "}
              <Link
                href={`/projects/${refProject.slug}`}
                className="font-medium text-[color:var(--fg-soft)] underline underline-offset-4 decoration-[color:var(--line)]"
              >
                {refProject.title}
              </Link>
            </p>
          ) : ref ? (
            <p className="mt-3 text-sm text-[color:var(--muted)]">
              Reference: <span className="font-medium text-[color:var(--fg-soft)]">{ref}</span>
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

