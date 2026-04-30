import type { Metadata } from "next";
import { AboutBlogTeaser } from "@/components/about/about-blog-teaser";
import { AboutContactBand } from "@/components/about/about-contact-band";
import { AboutHero } from "@/components/about/about-hero";
import { AboutPassionSplit } from "@/components/about/about-passion-split";
import { AboutServices } from "@/components/about/about-services";
import { ExperienceTimeline } from "@/components/landing/experience-timeline";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Takem Jim — software engineer and software developer building web & mobile apps. Faculty of Engineering and Technology graduate; master's in progress. Buea, Cameroon.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="landing-page">
      <AboutHero />
      <AboutPassionSplit />
      <AboutServices />
      <ExperienceTimeline />
      <AboutContactBand />
      <AboutBlogTeaser />
    </div>
  );
}
