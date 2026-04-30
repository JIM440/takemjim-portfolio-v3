import { blogArchiveAssets } from "@/lib/figma-blog-archive-assets";
import { AppPhoto } from "@/components/landing/app-photo";

export function BlogNewsletter() {
  return (
    <section className="px-5 pb-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1440px] overflow-hidden border border-[color:var(--line-strong)] bg-[color:var(--bg-muted)] text-[color:var(--fg)] shadow-[var(--shadow)]">
        <div className="grid min-h-[min(780px,90vh)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)]">
          <div className="relative flex flex-col justify-center px-8 py-14 md:px-12 md:py-16 lg:px-16 lg:py-20">
            <div
              className="pointer-events-none absolute inset-0 opacity-90"
              aria-hidden
              style={{
                background:
                  "radial-gradient(120% 80% at 0% 0%, color-mix(in oklab, var(--fg) 10%, transparent), transparent 55%), linear-gradient(180deg, color-mix(in oklab, var(--accent-soft) 55%, transparent), transparent 42%)",
              }}
            />

            <div className="relative">
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-[color:var(--line-strong)]" aria-hidden />
                <p className="font-[family-name:var(--font-body)] text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[color:var(--muted-label)]">
                  The newsletter
                </p>
              </div>

              <h2 className="mt-8 max-w-[14ch] font-[family-name:var(--font-display)] text-[clamp(2.85rem,6.4vw,5.75rem)] leading-[0.95] tracking-[-0.05em] text-[color:var(--fg-soft)]">
                Join the mailing list.
              </h2>

              <p className="mt-10 max-w-[30rem] font-[family-name:var(--font-body)] text-[1.02rem] leading-[1.78] text-[color:var(--muted)] md:text-[1.12rem]">
                Notes on AI engineering, cloud systems, software quality, and system design - delivered to your inbox.
              </p>

              <form className="mt-12 flex w-full max-w-[34rem] flex-col gap-4" action="/contact" method="get">
                <input type="hidden" name="subject" value="Mailing list signup" />
                <label className="font-[family-name:var(--font-body)] text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-[color:var(--muted-label)]">
                  Email
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    className="mt-3 h-[3.35rem] w-full border border-[color:var(--line-strong)] bg-[color:var(--surface-strong)] px-5 font-[family-name:var(--font-body)] text-[1rem] text-[color:var(--fg)] outline-none ring-0 transition-[box-shadow,border-color] placeholder:text-[color:var(--input-placeholder)] focus:border-[color:var(--fg)] focus:shadow-[0_0_0_1px_color-mix(in_oklab,var(--fg)_35%,transparent)]"
                  />
                </label>
                <button
                  type="submit"
                  className="mt-2 h-[3.35rem] w-full border border-[color:var(--line-strong)] bg-[color:var(--fg-soft)] font-[family-name:var(--font-body)] text-[0.78rem] font-semibold uppercase tracking-[0.26em] text-[color:var(--bg)] transition-opacity hover:opacity-90"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="relative min-h-[22rem] overflow-hidden border-t border-[color:var(--line)] lg:min-h-0 lg:border-l lg:border-t-0">
            <div
              className="absolute inset-0 z-[1]"
              aria-hidden
              style={{
                background:
                  "linear-gradient(115deg, color-mix(in oklab, var(--bg) 55%, transparent), transparent 46%), linear-gradient(180deg, transparent, color-mix(in oklab, var(--bg) 88%, transparent))",
              }}
            />
            <div
              className="absolute inset-0 z-[2] mix-blend-soft-light opacity-55"
              aria-hidden
              style={{
                background:
                  "radial-gradient(circle at 70% 18%, color-mix(in oklab, var(--fg) 22%, transparent), transparent 40%)",
              }}
            />
            <AppPhoto
              src={blogArchiveAssets.newsletterPhoto}
              alt=""
              className="h-full min-h-[22rem] w-full lg:min-h-full"
              imgClassName="absolute inset-0 h-full w-full object-cover opacity-85 grayscale contrast-[1.05] brightness-[0.82]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
