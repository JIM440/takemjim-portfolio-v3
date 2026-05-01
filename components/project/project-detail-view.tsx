import Link from "next/link";
import { AppPhoto } from "@/components/landing/app-photo";
import { BackLink } from "@/components/back-link";
import { contactPageHref } from "@/lib/contact-href";
import { getProjectDetailMedia } from "@/lib/figma-project-detail-assets";
import {
  getPlayStoreStripShots,
  projectUsesMinimalVisualCaseStudy,
  projectUsesNoteLoomCaseStudy,
  projectUsesPawtakerScreenshotBoard,
  projectUsesPlayStoreStrip,
  splitPawtakerShots,
} from "@/lib/project-detail-layout";
import type { Project, ProjectScreenshot } from "@/lib/site-data";

type ProjectDetailViewProps = {
  project: Project;
  projectIndex: number;
  nextProject?: Project | null;
};

function detailTitle(title: string) {
  return title.split(" - ")[0] ?? title;
}

function platformNotes(project: Project) {
  if (project.slug === "fet-space-school-management-system") {
    return [
      {
        title: "Focused public view",
        body: "This case study keeps FET SPACE intentionally concise with the hero screenshot and the product story rather than a long public gallery.",
      },
      {
        title: "Teacher and student surfaces",
        body: "The shipped product supports a teacher-facing web app and a student mobile experience while keeping assignments and announcements connected.",
      },
      {
        title: "Shared system thinking",
        body: "A connected product structure keeps both web and mobile surfaces feeling like one academic workflow rather than separate tools.",
      },
    ];
  }

  if (project.slug === "internship-management-system") {
    return [
      {
        title: "Internal company project",
        body: "The interface was built for internal operations, so the public detail page intentionally keeps the visual exposure limited.",
      },
      {
        title: "Operational clarity",
        body: "The product centers on tracking interns, program status, and communication in a more structured way for the team running the process.",
      },
      {
        title: "Single public preview",
        body: "A hero-level screenshot is shown publicly while deeper product views remain private to protect the internal workflow.",
      },
    ];
  }

  if (project.slug === "note-loom") {
    return [
      {
        title: "Exact supplied imagery",
        body: "This case study uses the exact Note Loom image supplied for the portfolio so the presentation stays faithful to the approved visual.",
      },
      {
        title: "Writing-first product",
        body: "The feature story highlights the rich editor, folder organization, favorites, and search because those are the core value loops of the app.",
      },
      {
        title: "Offline-first structure",
        body: "The experience is designed to keep note capture and retrieval feeling dependable even when the workflow needs to stay local and lightweight.",
      },
    ];
  }

  if (project.slug === "reepls") {
    return [
      {
        title: "Play Store-led presentation",
        body: "The detail page is structured around a five-screen mobile gallery so the product reads more like a store-ready app presentation.",
      },
      {
        title: "Creator-first product story",
        body: "REEPLS is framed around long-form publishing, podcasts, and curated discovery rather than short-form social noise.",
      },
      {
        title: "Website anchor",
        body: "The live website remains linked from the case study while the image treatment leaves room for the mobile screenshots you want to feature most.",
      },
    ];
  }

  if (project.slug === "pawtaker") {
    return [
      {
        title: "Three-part delivery",
        body: "The project coverage here reflects the landing page, the mobile app, and the admin panel because all three were part of the product work.",
      },
      {
        title: "Mobile and admin focus",
        body: "The screenshot plan prioritizes customer-facing mobile flows first, then reserves space for admin panel management views.",
      },
      {
        title: "Trust-based positioning",
        body: "Every part of the presentation reinforces the trust, reputation, and local-community angle that defines PawTaker's product direction.",
      },
    ];
  }

  if (project.slug === "cost-estimate") {
    return [
      {
        title: "Exact supplied imagery",
        body: "This case study uses the exact Cost Estimate image supplied for the portfolio so the presentation stays faithful to the approved visual.",
      },
      {
        title: "Service-driven flow",
        body: "The product centers on guided estimating flows across house categories, materials, and project records instead of manual cost calculations.",
      },
      {
        title: "Practical user value",
        body: "The product story focuses on helping builders and clients move from manual calculations toward a simpler guided mobile process.",
      },
    ];
  }

  if (project.category === "Mobile") {
    return [
      {
        title: "Mobile-first flow",
        body: "The product is shaped around quick understanding, clearer actions, and screens that feel steady in everyday use.",
      },
      {
        title: "Feature structure",
        body: "Each core flow is organized to reduce friction, so navigation, input, and feedback stay easier to follow.",
      },
      {
        title: "Trust and clarity",
        body: "Visual hierarchy and product copy do more than decorate the interface; they help users move with confidence.",
      },
    ];
  }

  return [
    {
      title: "Primary surface",
      body: "The experience is structured for scanning, clarity, and product movement that feels calm rather than crowded.",
    },
    {
      title: "System consistency",
      body: "Shared patterns keep decisions easier to repeat across the product without making the interface feel mechanical.",
    },
    {
      title: "Delivery intent",
      body: "The implementation stays close to the product story so the shipped experience feels deliberate, not improvised.",
    },
  ];
}

function detailLinks(project: Project) {
  if (project.links?.length) return project.links;
  if (!project.liveUrl) return [];
  return [{ label: "Visit website", href: project.liveUrl }];
}

function mobileDownloadLink(project: Project) {
  const links = detailLinks(project);
  const preferred = links.find((link) => /play store|download|get on/i.test(link.label));
  if (preferred) return preferred;
  if (project.liveUrl) return { label: "Download app", href: project.liveUrl };
  return null;
}

function shotAspect(projectSlug: string, frame?: string) {
  if (projectSlug === "note-loom" || projectSlug === "cost-estimate") return "aspect-[716/477]";
  if (frame === "mobile") return "aspect-[9/16]";
  if (frame === "admin") return "aspect-[4/3]";
  if (frame === "wide") return "aspect-[1.69/1]";
  return "aspect-[16/11]";
}

function heroAspect(projectSlug: string) {
  if (projectSlug === "pawtaker") return "aspect-[716/382]";
  if (projectSlug === "note-loom" || projectSlug === "cost-estimate") return "aspect-[716/477]";
  return "aspect-[1.69/1]";
}

function renderShot(
  project: Project,
  shot:
    | ProjectScreenshot
    | {
      title: string;
      caption: string;
      src?: string;
      frame?: "mobile" | "desktop" | "wide" | "admin";
    },
  fallbackSrc: string,
  key: string,
) {
  const src = shot?.src ?? fallbackSrc;
  const aspectClass = shotAspect(project.slug, shot?.frame);

  if (src) {
    return (
      <AppPhoto
        key={key}
        src={src}
        alt={shot?.title ?? project.title}
        className={`${aspectClass} w-full`}
        imgClassName="absolute inset-0 h-full w-full max-w-none object-cover"
      />
    );
  }

  return (
    <div
      key={key}
      className={`relative w-full overflow-hidden border border-[color:var(--line)] bg-[color:var(--bg-muted)] ${aspectClass}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_46%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.08))]" />
      <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-6">
        <p className="font-[family-name:var(--font-body)] text-[11px] uppercase tracking-[0.22em] text-(--muted)">
          Screenshot placeholder
        </p>
        <div>
          <h3 className="font-[family-name:var(--font-display)] text-2xl leading-tight text-(--fg-soft) md:text-3xl">
            {shot?.title ?? project.title}
          </h3>
          <p className="mt-3 max-w-md font-[family-name:var(--font-body)] text-sm leading-relaxed text-(--muted) md:text-base">
            {shot?.caption ?? "Screenshot slot reserved for this project."}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ProjectDetailView({ project, projectIndex, nextProject }: ProjectDetailViewProps) {
  const media = getProjectDetailMedia(projectIndex);
  const detailName = detailTitle(project.title);
  const projectRequestHref = contactPageHref({
    intent: "project-request",
    projectSlug: project.slug,
    projectTitle: `I love the project "${project.title}" and want a similar project`,
  });
  const notes = platformNotes(project);
  const mobileLink = mobileDownloadLink(project);
  const screenshots = project.screenshots ?? [];
  const background = project.background ?? project.summary;
  const journey = project.journey ?? project.spotlight;
  const whatWeDid = project.whatWeDid ?? `Role: ${project.role}. Services: ${project.services.join(", ")}.`;
  const heroSrc = project.heroImage ?? project.images?.[0] ?? screenshots[0]?.src ?? media.hero;

  const useNoteLoom = projectUsesNoteLoomCaseStudy(project);
  const usePlayStrip = projectUsesPlayStoreStrip(project);
  const usePawtaker = projectUsesPawtakerScreenshotBoard(project);
  const useMinimal = projectUsesMinimalVisualCaseStudy(project);
  const showLegacyGallery = !useNoteLoom && !usePlayStrip && !usePawtaker && !useMinimal;
  const showHeroInBuiltSection =
    project.slug === "internship-management-system" ||
    project.slug === "fet-space-school-management-system";
  const walkthroughLabel =
    project.slug === "pawtaker"
      ? "PawTaker Walkthrough"
      : project.slug === "internship-management-system"
        ? "Internship Walkthrough"
        : "Product Walkthrough";

  const playStripShots = usePlayStrip ? getPlayStoreStripShots(screenshots) : [];
  const reepLsShots = project.slug === "reepls" ? playStripShots.slice(0, 2) : [];
  const pawtakerSplit = usePawtaker
    ? splitPawtakerShots(screenshots)
    : { mobile: [] as ProjectScreenshot[], admin: [] as ProjectScreenshot[] };
  const noteLoomFeatures = useNoteLoom ? screenshots.slice(1) : [];

  const galleryShots =
    showLegacyGallery && screenshots.length > 0
      ? screenshots.slice(0, 3)
      : showLegacyGallery
        ? [
          { title: `${project.title} visual 01`, caption: project.summary, src: media.artifacts[0], frame: "desktop" as const },
          { title: `${project.title} visual 02`, caption: project.spotlight, src: media.artifacts[1], frame: "desktop" as const },
          { title: `${project.title} visual 03`, caption: project.outcome, src: media.artifacts[2], frame: "desktop" as const },
        ]
        : [];

  const featurePrimary = screenshots[0] ?? {
    title: "Primary product flow",
    caption: "The main product surface is shaped to make the core journey easier to understand and easier to complete.",
    src: project.heroImage ?? project.images?.[0] ?? media.desktop,
    frame: "desktop" as const,
  };
  const featureSecondary = screenshots[1] ?? {
    title: "Secondary flow",
    caption: "Secondary moments still carry the same attention to hierarchy, feedback, and product calm.",
    src: project.images?.[1] ?? media.mobile,
    frame: "desktop" as const,
  };
  const extraScreenshots = screenshots.slice(2);

  return (
    <main className="project-detail">
      <div className="project-detail__wrap">
        <BackLink href="/projects">Back to work</BackLink>

        <header className="project-detail__hero">
          <p className="project-detail__eyebrow">{project.category}</p>
          <h1 className="project-detail__title">{detailName}</h1>

          <div className="project-detail__hero-row">
            <p className="project-detail__summary">{project.summary}</p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href={projectRequestHref} className="project-detail__cta">
                Start a similar project
              </Link>
            </div>
          </div>
        </header>
      </div>

      <div className="project-detail__wrap">
        <div className="project-detail__hero-image overflow-hidden">
          <AppPhoto
            src={heroSrc}
            alt={project.title}
            className={`${heroAspect(project.slug)} min-h-[14rem] w-full md:min-h-[18rem] lg:min-h-[20rem]`}
            imgClassName="absolute inset-0 h-full w-full max-w-none object-cover"
          />
        </div>
      </div>

      <section className="project-detail__stats-band">
        <div className="project-detail__wrap">
          <div className="project-detail__request-stats">
            <div className="project-detail__request-stat">
              <p className="project-detail__request-label">Role</p>
              <span className="project-detail__request-rule" aria-hidden />
              <p className="project-detail__request-value project-detail__request-value--clamp">{project.role}</p>
            </div>
            <div className="project-detail__request-stat">
              <p className="project-detail__request-label">Date</p>
              <span className="project-detail__request-rule" aria-hidden />
              <p className="project-detail__request-value">{project.duration}</p>
            </div>
            {project.liveUrl && <div className="project-detail__request-stat">
              <p className="project-detail__request-label">Live link</p>
              <span className="project-detail__request-rule" aria-hidden />
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-detail__request-value project-detail__request-value--link"
                >
                  {project.liveUrl}
                </a>
              ) : (
                <p className="project-detail__request-value">Available on request</p>
              )}
            </div>}
          </div>
        </div>
      </section>

      <section className="project-detail__section">
        <div className="project-detail__wrap">
          <div className="project-detail__split">
            <h2 className="project-detail__h2 project-detail__h2--left">The challenge</h2>
            <div className="project-detail__split-body">
              <p className="project-detail__lead">{project.challenge}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="project-detail__section">
        <div className="project-detail__wrap">
          <div className="project-detail__split">
            <h2 className="project-detail__h2 project-detail__h2--left">Background</h2>
            <div className="project-detail__split-body">
              <p className="text-base leading-relaxed text-[color:var(--muted)] md:text-lg">{background}</p>
            </div>
          </div>
        </div>
      </section>



      {useNoteLoom ? (
        <section className="project-detail__section">
          <div className="project-detail__wrap">
            <div className="flex flex-col gap-4 border-b border-[color:var(--line)] pb-10 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-[family-name:var(--font-body)] text-[11px] uppercase tracking-[0.24em] text-(--muted)">
                  Landing-aligned case study
                </p>
                <h2 className="project-detail__h2 mt-3 not-italic">What we built</h2>
              </div>
              <p className="max-w-xl font-[family-name:var(--font-body)] text-sm leading-relaxed text-(--muted) md:text-base">
                We built a {project.builtDescription?.toLowerCase() || "product"} that {project.whatWeMade || project.summary}
              </p>
            </div>

            <div className="mt-14 flex flex-col gap-20 md:gap-28">
              {noteLoomFeatures.map((shot, index) => (
                <div
                  key={`${project.slug}-nl-${shot.title}`}
                  className={`flex flex-col gap-10 md:flex-row md:items-center md:gap-16 ${index % 2 === 1 ? "md:flex-row-reverse" : ""
                    }`}
                >
                  <div className="w-full max-w-xl space-y-4 text-center md:text-left">
                    <h3 className="font-[family-name:var(--font-display)] text-[1.65rem] leading-tight text-(--fg-soft) md:text-4xl">
                      {shot.title}
                    </h3>
                    <p className="font-[family-name:var(--font-body)] text-sm leading-relaxed text-(--muted) md:text-base">
                      {shot.caption}
                    </p>
                  </div>
                  <div className="w-full min-w-0 flex-1 rounded-lg border border-[color:var(--line)] p-3 md:p-4">
                    <AppPhoto
                      src={shot.src ?? media.artifacts[index % media.artifacts.length]!}
                      alt={shot.title ?? project.title}
                      className={`${shotAspect(project.slug, shot.frame)} w-full`}
                      imgClassName="absolute inset-0 h-full w-full max-w-none object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}


      {usePlayStrip ? (
        <section className="project-detail__gallery">
          <div className="project-detail__wrap">
            <div className="mb-10 flex flex-col gap-4 border-b border-[color:var(--line)] pb-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-[family-name:var(--font-body)] text-[11px] uppercase tracking-[0.24em] text-(--muted)">
                  Mobile presentation
                </p>
                <h2 className="project-detail__h2 mt-3 not-italic">What we built</h2>
              </div>
              <p className="max-w-xl font-[family-name:var(--font-body)] text-sm leading-relaxed text-(--muted) md:text-base">
                We built a {project.builtDescription?.toLowerCase() || "mobile app"} that {project.whatWeMade || project.summary}
              </p>
            </div>

            {project.slug === "reepls" ? (
              <div className="grid gap-6">
                {reepLsShots.map((shot, index) => (
                  <div key={`${project.slug}-ps-full-${index}`} className="project-detail__artifact-cell">
                    {renderShot(
                      project,
                      { ...shot, frame: "wide" },
                      media.artifacts[index % media.artifacts.length]!,
                      `${project.slug}-play-full-${index}`,
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {playStripShots.map((shot, index) => (
                  <div key={`${project.slug}-ps-${index}`} className="project-detail__artifact-cell">
                    {renderShot(
                      project,
                      shot,
                      media.artifacts[index % media.artifacts.length]!,
                      `${project.slug}-play-${index}`,
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ) : null}

      {usePawtaker ? (
        <section className="project-detail__section">
          <div className="project-detail__wrap">
            <div className="flex flex-col gap-4 border-b border-[color:var(--line)] pb-10 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-[family-name:var(--font-body)] text-[11px] uppercase tracking-[0.24em] text-(--muted)">
                  {walkthroughLabel}
                </p>
                <h2 className="project-detail__h2 mt-3 not-italic">What we built</h2>
              </div>
              <p className="max-w-xl font-[family-name:var(--font-body)] text-sm leading-relaxed text-(--muted) md:text-base">
                We built a {project.builtDescription?.toLowerCase() || "product"} that {project.whatWeMade || project.summary}
              </p>
            </div>

            {showHeroInBuiltSection && screenshots.length === 0 ? (
              <div className="mt-14 w-full overflow-hidden">
                <AppPhoto
                  src={heroSrc}
                  alt={project.title}
                  className={`${heroAspect(project.slug)} w-full`}
                  imgClassName="absolute inset-0 h-full w-full max-w-none object-cover"
                />
              </div>
            ) : null}

            <div className="mt-16 space-y-24 md:space-y-32">
              {screenshots.map((shot, index) => (
                <article key={`${project.slug}-paw-step-${index}`} className="space-y-10">
                  {(shot.title || shot.caption) && (
                    <div className="w-full max-w-3xl px-1">
                      {shot.title && (
                        <h3 className="font-[family-name:var(--font-display)] text-3xl text-(--fg-soft) md:text-4xl">
                          {shot.title}
                        </h3>
                      )}
                      {shot.caption && (
                        <p className="mt-6 font-[family-name:var(--font-body)] text-base leading-relaxed text-(--muted) md:text-lg">
                          {shot.caption}
                        </p>
                      )}
                    </div>
                  )}
                  <div className="w-full overflow-hidden">
                    {renderShot(project, shot, media.artifacts[index % media.artifacts.length], `${project.slug}-paw-shot-${index}`)}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {useMinimal && showHeroInBuiltSection ? (
        <section className="project-detail__section">
          <div className="project-detail__wrap">
            <div className="flex flex-col gap-4 border-b border-[color:var(--line)] pb-10 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-[family-name:var(--font-body)] text-[11px] uppercase tracking-[0.24em] text-(--muted)">
                  Product Overview
                </p>
                <h2 className="project-detail__h2 mt-3 not-italic">What we built</h2>
              </div>
              <p className="max-w-xl font-[family-name:var(--font-body)] text-sm leading-relaxed text-(--muted) md:text-base">
                We built a {project.builtDescription?.toLowerCase() || "product"} that {project.whatWeMade || project.summary}
              </p>
            </div>

            <div className="mt-14 w-full overflow-hidden">
              <AppPhoto
                src={heroSrc}
                alt={project.title}
                className={`${heroAspect(project.slug)} w-full`}
                imgClassName="absolute inset-0 h-full w-full max-w-none object-cover"
              />
            </div>
          </div>
        </section>
      ) : null}

      {showLegacyGallery ? (
        <section className="project-detail__section">
          <div className="project-detail__wrap">
            <div className="flex flex-col gap-4 border-b border-[color:var(--line)] pb-10 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-[family-name:var(--font-body)] text-[11px] uppercase tracking-[0.24em] text-(--muted)">
                  Product Overview
                </p>
                <h2 className="project-detail__h2 mt-3 not-italic">What we built</h2>
              </div>
              <p className="max-w-xl font-[family-name:var(--font-body)] text-sm leading-relaxed text-(--muted) md:text-base">
                We built a {project.builtDescription?.toLowerCase() || "product"} that {project.whatWeMade || project.summary}
              </p>
            </div>

            {screenshots.length === 0 && (
              <div className="mt-16 w-full overflow-hidden">
                <AppPhoto
                  src={heroSrc}
                  alt={project.title}
                  className={`${heroAspect(project.slug)} w-full`}
                  imgClassName="absolute inset-0 h-full w-full max-w-none object-cover"
                />
              </div>
            )}
          </div>
        </section>
      ) : null}

      {showLegacyGallery && screenshots.length > 0 ? (
        <section className="project-detail__gallery">
          <div className="project-detail__wrap">
            <div className="project-detail__artifact-row">
              {galleryShots.map((shot, index) => (
                <div key={`${project.slug}-gallery-${index}`} className="project-detail__artifact-cell">
                  {renderShot(project, shot, media.artifacts[index] ?? media.artifacts[0], `${project.slug}-gallery-shot-${index}`)}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {showLegacyGallery ? (
        <section className="project-detail__feature-band">
          <div className="project-detail__wrap">
            <div className="project-detail__feature-grid">
              <article className="project-detail__feature-card">
                <div className="project-detail__feature-shot">
                  {renderShot(project, featurePrimary, media.desktop, `${project.slug}-feature-primary`)}
                </div>
                <p className="project-detail__feature-label">FEATURE 01</p>
                <h3 className="project-detail__feature-title">{featurePrimary.title}</h3>
                <p className="project-detail__feature-copy">{featurePrimary.caption}</p>
              </article>

              <article className="project-detail__feature-card project-detail__feature-card--phone">
                <div className="project-detail__feature-phone">
                  {renderShot(project, featureSecondary, media.mobile, `${project.slug}-feature-secondary`)}
                </div>
                <p className="project-detail__feature-label">FEATURE 02</p>
                <h3 className="project-detail__feature-title">{featureSecondary.title}</h3>
                <p className="project-detail__feature-copy">{featureSecondary.caption}</p>
              </article>
            </div>
          </div>
        </section>
      ) : null}

      {showLegacyGallery && extraScreenshots.length > 0 ? (
        <section className="project-detail__section">
          <div className="project-detail__wrap">
            <div className="flex items-end justify-between gap-6 border-b border-[color:var(--line)] pb-6">
              <div>
                <p className="font-[family-name:var(--font-body)] text-[11px] uppercase tracking-[0.24em] text-(--muted)">
                  Screenshot gallery
                </p>
                <h2 className="project-detail__h2 mt-3 not-italic">More product views</h2>
              </div>
              <p className="max-w-xl font-[family-name:var(--font-body)] text-sm leading-relaxed text-(--muted) md:text-base">
                Additional screens and reserved slots for the project detail sequence.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {extraScreenshots.map((shot, index) => (
                <article key={`${project.slug}-extra-${index}`} className="flex flex-col gap-4">
                  {renderShot(project, shot, project.images?.[index + 2] ?? media.artifacts[index % media.artifacts.length], `${project.slug}-extra-shot-${index}`)}
                  <div>
                    <p className="font-[family-name:var(--font-body)] text-[11px] uppercase tracking-[0.18em] text-(--muted)">
                      SCREEN {String(index + 3).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 font-[family-name:var(--font-display)] text-[1.55rem] leading-tight text-(--fg-soft)">
                      {shot.title}
                    </h3>
                    <p className="mt-2 font-[family-name:var(--font-body)] text-sm leading-relaxed text-(--muted) md:text-base">
                      {shot.caption}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {project.category.includes("Mobile") && mobileLink ? (
        <section className="project-detail__section">
          <div className="project-detail__wrap">
            <div className="mt-2">
              <a
                href={mobileLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-[color:var(--line-strong)] bg-[color:var(--fg-soft)] px-7 py-3 font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--bg)] transition-opacity hover:opacity-90"
              >
                Download app
              </a>
            </div>
          </div>
        </section>
      ) : null}



      <section className="project-detail__request">
        <div className="project-detail__request-inner">
          <h2 className="project-detail__request-headline">
            Interested in a project with this level of clarity and care?
          </h2>
          <Link href={projectRequestHref} className="project-detail__request-btn">
            Start a project like this
            <span className="project-detail__request-btn-arrow" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </section>

      <section className="project-detail__next">
        <div className="project-detail__wrap">
          <div className="project-detail__next-inner">
            <p className="project-detail__next-label">NEXT PROJECT</p>
            <Link href={nextProject ? `/projects/${nextProject.slug}` : "/projects"} className="project-detail__next-link">
              <span className="project-detail__next-title">{nextProject ? detailTitle(nextProject.title) : "View all projects"}</span>
              <span className="project-detail__next-arrow" aria-hidden>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-full w-full"
                >
                  <path d="M7 17 17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
