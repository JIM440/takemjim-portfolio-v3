import type { Metadata } from "next";
import { AboutBlogTeaser } from "@/components/about/about-blog-teaser";
import { AboutContactBand } from "@/components/about/about-contact-band";
import { AboutEducation } from "@/components/about/about-education";
import { AboutHero } from "@/components/about/about-hero";
import { ExperienceTimeline } from "@/components/landing/experience-timeline";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Takem Jim, a software engineer and software developer building web and mobile apps with a focus on user experience and software quality.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="landing-page">
      <AboutHero />
      <ExperienceTimeline />
      <AboutEducation />
      <AboutContactBand />
      <AboutBlogTeaser />
    </div>
  );
}
