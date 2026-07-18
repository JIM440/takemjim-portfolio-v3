import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactPageIntro } from "@/components/contact/contact-page-intro";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Takem Jim - software engineer and developer for web & mobile projects, freelance, and contracts. Based in Buea, Cameroon. Email and project requests.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="contact-page-main flex items-center">
      <div className="grid w-full gap-10 sm:gap-12 lg:grid-cols-2 lg:items-center lg:gap-14 xl:gap-16">
        <Suspense
          fallback={
            <div className="flex min-w-0 flex-col gap-8 sm:gap-10">
              <header>
                <p className="section-label">Contact</p>
                <h1 className="mt-4 max-w-[22ch] font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-normal leading-[1.1] tracking-tight text-[color:var(--fg-soft)]">
                  Let&apos;s build something clear and useful.
                </h1>
              </header>
            </div>
          }
        >
          <ContactPageIntro />
        </Suspense>

        <aside className="min-w-0 border-t border-[color:var(--line)] pt-10 sm:pt-12 lg:border-t-0 lg:pt-0">
          <Suspense
            fallback={
              <p className="text-sm text-[color:var(--muted)]" role="status">
                Loading form...
              </p>
            }
          >
            <ContactForm />
          </Suspense>
        </aside>
      </div>
    </main>
  );
}

