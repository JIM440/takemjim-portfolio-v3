import { profile } from "@/lib/site-data";
import { siteUrl } from "@/lib/site-url";

export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: "Takem Jim",
    jobTitle: profile.title,
    description:
      "Software engineer building web and mobile applications; background in engineering from the Faculty of Engineering and Technology; master's degree in progress.",
    url: siteUrl,
    email: profile.email,
    address: {
      "@type": "PostalAddress",
      addressCountry: profile.location,
    },
    knowsAbout: [
      "Software engineering",
      "Software development",
      "Web development",
      "Mobile app development",
      "TypeScript",
      "React",
      "Next.js",
      "UI engineering",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Faculty of Engineering and Technology",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
