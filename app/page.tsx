import type { Metadata } from "next";
import { AboutSplit } from "@/components/landing/about-split";
import { ContactCta } from "@/components/landing/contact-cta";
import { CoreCompetencies } from "@/components/landing/core-competencies";
import { HomeHero } from "@/components/landing/home-hero";
import { QuoteBlock } from "@/components/landing/quote-block";
import { SelectedWorks } from "@/components/landing/selected-works";
import { AboutBlogTeaser } from "@/components/about/about-blog-teaser";

export const metadata: Metadata = {
  title: {
    absolute: "Takem Jim- Software Developer",
  },
  description:
    "I build web and mobile applications that turn ideas into real, usable products. Got a project? I can help make it happen.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <div className="landing-page">
      <HomeHero />
      <CoreCompetencies />
      <SelectedWorks />
      <AboutSplit />
      <QuoteBlock />
      <AboutBlogTeaser />
      <ContactCta />
    </div>
  );
}
