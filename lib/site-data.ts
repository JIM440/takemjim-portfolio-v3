export const navigation = [
  { href: "/projects", label: "Works" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const featuredMetrics = [
  { value: "Web", label: "Web products built to feel clear, reliable, and ready for real teams." },
  { value: "Mobile", label: "Mobile experiences shaped for smooth flows and everyday use." },
  { value: "Cloud", label: "AI-enabled and cloud-backed systems planned with long-term quality in mind." },
];

export type ServiceOffering = {
  title: string;
  body: string;
};

export const serviceOfferings: ServiceOffering[] = [
  {
    title: "Web development",
    body: "Web products built to feel clear, reliable, and ready for real teams.",
  },
  {
    title: "Mobile development",
    body: "Mobile experiences shaped for smooth flows, fast feedback, and everyday use.",
  },
  {
    title: "UI/UX Design",
    body: "Creating user-centered designs that enhance engagement.",
  },
];

export const services: string[] = serviceOfferings.map((item) => item.title);

export const profile = {
  name: "Takem Jim",
  title: "Software Developer",
  heroSentence:
    "Take a look at my portfolio, reach out for anything or for a project you have in mind.",
  education:
    "I earned my degree from the Faculty of Engineering and Technology and I am currently pursuing a master's degree in software engineering.",
  approach:
    "Most of my time goes to shipping reliable software, shaping products that feel steady, understandable, and built with care.",
  email: "takemjim43@gmail.com",
  location: "Cameroon",
  availability:
    "Open to selected freelance, contract, and product work where engineering and product sense both matter.",
};

export const contactSocial = {
  whatsappUrl:
    "https://wa.me/237654812052?text=Hello%20Takem%2C%20I%27m%20reaching%20out%20from%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20potential%20project.",
  cvHref: "/takem_jim_rawlings_cv.pdf",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/takem-jim" },
    { label: "GitHub", href: "https://github.com/" },
  ] as const,
};

export const aboutPage = {
  heroLede:
    "I am a software engineer based in Buea, Cameroon who is especially drawn to AI and cloud because they turn good product ideas into systems that can adapt, scale, and keep creating value over time.",
  passionSection: {
    headlineLead: "Passionate about",
    headlineAccent: "AI and cloud",
    paragraphs: [
      "I approach these areas with the same mindset I bring to web and mobile work: keep the experience understandable, keep the architecture dependable, and make each layer support the quality of the whole product.",
      "That mix of curiosity and discipline keeps me interested in intelligent tooling, cloud infrastructure, and system design without losing sight of the people who use the software every day.",
    ],
  },
  contactBand: {
    sectionMark: "09",
    bandLabel: "CONTACT",
    headlineLead: "Let's work",
    headlineAccent: "together",
    description:
      "I sectively engage with high-impact opportunities that align with my strength in software engineering, AI-aware products, cloud-backed systems, and interface-led delivery.",
  },
};

export type ProfessionalTimelineRole = {
  range: string;
  title: string;
  org: string;
  body: string;
};

export const professionalTimeline: ProfessionalTimelineRole[] = [
  {
    range: "Apr 2023 - Present",
    title: "Fullstack Developer and Engineering Lead",
    org: "STARUTH Technologies",
    body:
      "Built responsive web systems focused on performance and accessibility while integrating APIs that improved frontend-backend data flow and system reliability.",
  },
  {
    range: "Sep 2024 - Present",
    title: "Lead Mobile Developer",
    org: "Reepls",
    body:
      "Built the first version of the Reepls mobile application from initial UI designs through Google Play Store deployment, with backend service integration for scalable synchronization and performance.",
  },
  {
    range: "Sep 2024 - Dec 2024",
    title: "Software Engineering Intern",
    org: "InchTechs",
    body:
      "Developed IoT dashboards for real-time smart plant and animal monitoring, automated internship lifecycle tracking, and contributed to system debugging and optimization.",
  },
];

export type ProjectOutcomeStat = {
  value: string;
  kicker: string;
  description: string;
};

export type ProjectScreenshot = {
  title: string;
  caption: string;
  src?: string;
  frame?: "mobile" | "desktop" | "wide" | "admin";
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  challenge: string;
  background?: string;
  journey?: string;
  whatWeDid?: string;
  whatWeMade?: string;
  outcome: string;
  services: string[];
  stack: string[];
  role: string;
  duration: string;
  spotlight: string;
  outcomeStats?: ProjectOutcomeStat[];
  images?: string[];
  heroImage?: string;
  screenshots?: ProjectScreenshot[];
  liveUrl?: string;
  links?: ProjectLink[];
  builtDescription?: string;
};

export const projects: Project[] = [
  {
    slug: "reepls",
    title: "REEPLS - Amplify Your African Voice",
    category: "Mobile",
    year: "2026",
    summary:
      "A publishing and discovery platform built to help African thought leaders, storytellers, and innovators share long-form ideas, podcasts, and curated perspectives with more reach.",
    builtDescription: "Mobile app",
    whatWeMade: "helps African thought leaders, storytellers, and innovators share long-form ideas and podcasts with more reach.",
    challenge:
      "African creators needed a dedicated platform that could support deeper storytelling, curated discovery, and mobile-first reading without the noise and limitations of generic social feeds.",
    background:
      "At first glance, REEPLS may look like another publishing app, but it is intentionally built as an African-first platform where thought leaders, storytellers, and innovators can publish and grow influence through richer content formats. The goal was to mirror the feeling of exploring a vibrant knowledge community: discovering posts, podcasts, and creator voices while still keeping the product simple, local, and mobile-first.",
    journey:
      "Our journey focused on combining familiar social publishing patterns with a stronger editorial experience. We designed the flows so users can move quickly across discovery, long-form reading, audio stories, and creator interactions without losing context. Across tabs, typography, and layout rhythm, the product direction emphasizes trust, cultural relevance, and a cleaner way to share ideas.",
    whatWeDid:
      "We shaped the mobile product experience end-to-end: product structure, UI/UX direction, and implementation of key publishing and discovery flows.",
    outcome:
      "REEPLS shaped a focused ecosystem for long-form posts, podcasts, topic-led streams, curated knowledge feeds, and offline reading so African creators can publish with more structure and reach.",
    services: ["Product strategy", "Mobile product design", "Content platform planning", "Frontend engineering"],
    stack: ["React Native", "Editorial workflows", "Mobile-first interface design", "Offline reading"],
    role: "Mobile developer",
    duration: "September 2025",
    spotlight: "A mobile-first African publishing product for thoughtful stories, podcasts, and curated knowledge.",
    liveUrl: "https://blog.reepls.com",
    links: [{ label: "Visit website", href: "https://blog.reepls.com" }],
    outcomeStats: [
      {
        value: "05",
        kicker: "Play Store frames",
        description: "The detail page now prioritizes a five-screen mobile gallery layout for the product story.",
      },
      {
        value: "01",
        kicker: "Focused mission",
        description: "The platform is built to amplify African voices with more depth than generic social surfaces.",
      },
    ],
    heroImage: "/projects/reepls-hero.png",
    images: ["/projects/reepls-hero.png"],
    screenshots: [
      {
        title: "Play Store screen 01",
        caption: "Primary REEPLS app preview highlighting the feed and publishing experience.",
        src: "/projects/reepls-shot-01.png",
        frame: "mobile",
      },
      {
        title: "Play Store screen 02",
        caption: "Second REEPLS screenshot focused on reading and multimedia story presentation.",
        src: "/projects/reepls-shot-02.png",
        frame: "mobile",
      },
      {
        title: "Play Store screen 03",
        caption: "Reserved for long-form reading, podcast, or curated feed viewing.",
        frame: "mobile",
      },
      {
        title: "Play Store screen 04",
        caption: "Reserved for topic-led streams, saved content, or profile views.",
        frame: "mobile",
      },
      {
        title: "Play Store screen 05",
        caption: "Reserved for the final supporting mobile screenshot in the REEPLS sequence.",
        frame: "mobile",
      },
    ],
  },
  {
    slug: "note-loom",
    title: "Note Loom - Personal Knowledge Workspace",
    category: "Mobile",
    year: "2025",
    summary:
      "A note-taking mobile application that allows users to capture, organize, and refine their thoughts using a rich blog-style editor, favorites, and intelligent SQLite-powered search.",
    builtDescription: "Mobile app",
    whatWeMade: "allows users to capture, organize, and refine their thoughts using a rich editor and intelligent search.",
    challenge:
      "Our thoughts are usually scattered everywhere on pieces of papers and even note taking apps that we have today do not usually allow us to group them together so that's what we solved here.",
    outcome:
      "Note Loom delivered a calmer writing experience with a rich editor, smart folders, favorite notes, and intelligent search so users can capture ideas quickly and return to them with less friction.",
    services: ["Mobile development", "UI/UX design", "Offline-first architecture"],
    stack: ["React Native", "Expo", "SQLite"],
    role: "Mobile developer and product designer",
    duration: "October 2025",
    spotlight: "A rich-editor note app built for thoughtful capture, organization, and offline access.",
    heroImage: "/projects/note-loom-reference.png",
    images: ["/projects/note-loom-reference.png"],
    whatWeDid: "We developed a smarter way to capture and refine thoughts, featuring a powerful WYSIWYG rich editor for beautiful formatting, smart folder organization, and an intelligent SQLite-backed search system for instant idea retrieval.",
    screenshots: [
      {
        title: "I. Powerful Rich Editor",
        caption: "Create beautiful, fully formatted notes effortlessly with our intuitive editor supporting bold, lists, links, images, and more.",
        src: "/projects/note-loom-shot01.png",
        frame: "wide",
      },
      {
        title: "II. Smart Folder Organization",
        caption: "Keep related notes neatly grouped into folders for better structure and easy access across multiple topics or projects.",
        src: "/projects/note-loom-shot02.png",
        frame: "wide",
      },
      {
        title: "III. Quick Favorite Notes Access",
        caption: "Easily mark your most important or frequently used notes as favorites for instant access. Spend less time searching and more time focusing on what matters.",
        src: "/projects/note-loom-shot03.png",
        frame: "wide",
      },
    ],
  },
  {
    slug: "fet-space-school-management-system",
    title: "FET SPACE - School Management System",
    category: "Web / Mobile",
    year: "2025",
    summary:
      "A cross-platform system designed to replace WhatsApp for faculty communication, allowing for managed announcements, course materials, and assignment tracking.",
    builtDescription: "Both mobile and web",
    whatWeMade: "replaces WhatsApp for faculty communication with managed announcements, materials, and assignment tracking.",
    challenge:
      "Faculty communication was fragmented across informal platforms like WhatsApp. There was a need for a dedicated system where announcements, course management, and assignments could be handled professionally.",
    outcome:
      "FET SPACE provided a unified platform for faculty-wide announcements, course management, and assignment submissions, enabling teachers to manage students and projects more effectively.",
    services: ["UI/UX design", "Full-stack development", "Mobile development", "API integration"],
    stack: ["React", "React Native", "Apollo Client", "GraphQL", "Zustand", "socket.io", "Express Js", "PostgresSQL"],
    role: "Full-stack and mobile developer",
    duration: "July 2025",
    spotlight: "A cross-platform academic management product for students and faculty.",
    heroImage: "/projects/fet-space.png",
    images: ["/projects/fet-space.png"],
    screenshots: [
      {
        title: "FET SPACE hero preview",
        caption: "A unified platform for academic management, announcements, and assignment submissions.",
        src: "/projects/fet-space.png",
        frame: "wide",
      },
    ],
  },
  {
    slug: "internship-management-system",
    title: "Internship Management System",
    category: "Web",
    year: "2024",
    summary:
      "A platform built for InchTechs to manage interns, supervisors, departments, project assignments, and the wider internship workflow.",
    builtDescription: "Web platform with role-based access",
    challenge:
      "The internship process needed a more structured workflow for tracking participants, reducing coordination friction, and keeping communication clearer across the team.",
    outcome:
      "The platform centralized internship operations into one role-based experience, giving admins control over interns, supervisors, departments, and records while giving supervisors a focused panel for assigning projects and interns a space for progress updates and real-time messaging.",
    services: ["UI/UX design", "Full-stack web development", "API integration"],
    stack: ["React", "MUI", "MySQL", "Express Js", "socket.io"],
    role: "Full-stack developer",
    duration: "December 2024",
    spotlight: "A structured internship operations platform with admin and supervisor workflows.",
    heroImage: "/projects/internship-platform.png",
    images: ["/projects/internship-platform.png"],
    whatWeMade:
      "manages the full intern lifecycle, including an admin panel for interns, supervisors, departments, and records, a supervisor panel for assigning projects, and an intern panel for real-time messaging and progress updates.",
    screenshots: [],
  },
  {
    slug: "pawtaker",
    title: "PawTaker - Take them good",
    category: "Mobile",
    year: "2025",
    summary:
      "A trust-first pet care community where owners connect with local sitters for walks, daycare, and overnight stays.",
    builtDescription: "Mobile app and Landing page",
    whatWeMade: "connects pet owners with local sitters for walks, daycare, and stays through a trust-first community flow.",
    challenge:
      "The product had to make pet care feel more personal and trustworthy by helping owners avoid random, transactional sitter discovery while still supporting sitters with clear care requests and reputation signals.",
    outcome:
      "PawTaker introduced a more human pet-care flow built around local community, visible reliability, PawPoints, and flexible care options like walks, daytime care, overnight stays, and vacation support.",
    services: ["Landing page design", "Mobile app design", "Admin panel planning", "Interaction design"],
    stack: ["React Native", "Next.js", "Admin workflows", "Trust-based marketplace UX"],
    role: "Mobile and web developer",
    duration: "April 2026",
    spotlight: "A trust-led pet care product built around local help, familiar faces, and community reputation.",
    liveUrl: "https://pawtaker-web.vercel.app/",
    links: [
      { label: "Visit landing page", href: "https://pawtaker-web.vercel.app/" },
      { label: "Get on Play Store", href: "https://play.google.com/store/search?q=Pawtaker&c=apps" },
    ],
    heroImage: "/projects/pawtaker-reference.png",
    images: ["/projects/pawtaker-reference.png"],
    screenshots: [
      {
        title: "Landing Experience",
        caption: "A trust-led introduction to the pet care community, highlighting local sitter reliability.",
        src: "/projects/pawtaker-shot-01.png",
        frame: "wide",
      },
      {
        title: "Mobile Screens",
        caption: "Seamless sitter discovery and care request flows optimized for on-the-go pet owners.",
        src: "/projects/pawtaker-shot-02.png",
        frame: "wide",
      },
      {
        title: "",
        caption: "",
        src: "/projects/pawtaker-shot-03.png",
        frame: "wide",
      },
    ],
  },
  {
    slug: "cost-estimate",
    title: "Cost Estimate",
    category: "Mobile",
    year: "2024",
    summary:
      "A specialized mobile tool designed to help unskilled technicians calculate project estimates and learn the estimation process.",
    builtDescription: "Mobile app",
    whatWeMade: "helps unskilled technicians calculate project estimates and learn the estimation process through guided steps.",
    challenge:
      "Unskilled technicians often struggle with accurate project estimation. This app was built to guide them through calculations while teaching them the underlying principles.",
    outcome:
      "The app empowered technicians to deliver professional estimates, reducing errors and providing a learning path for accurate cost calculation.",
    services: ["Mobile development", "UI/UX design"],
    stack: ["React", "React Native"],
    role: "UI designer and mobile developer",
    duration: "June 2024",
    spotlight: "A practical estimating app for construction planning from foundation to finish.",
    heroImage: "/projects/cost-estimate-reference.png",
    images: ["/projects/cost-estimate-reference.png"],
    screenshots: [
      {
        title: "",
        caption: "",
        src: "/projects/cost-estimate-shot01.png",
        frame: "wide",
      },
      {
        title: "",
        caption: "",
        src: "/projects/cost-estimate-shot02.png",
        frame: "wide",
      },
    ],
  },
];

export type BlogArtifact =
  | { variant: "systemic"; title: string }
  | { variant: "contrast"; line1: string; line2: string; kicker: string }
  | { variant: "icon" }
  | { variant: "number"; value: string; label: string };

export type BlogPostLayoutDetail = {
  issueNo: string;
  pullQuote: string;
  wordsBy?: string;
  creditLine?: string;
  geometric: {
    title: string;
    body: string;
    list: [string, string, string];
  };
  editorial: {
    lines: [string, string, string];
    cite: string;
  };
  silence: {
    title: string;
    quote: string;
    body: string;
  };
  artifactsEyebrow: string;
  artifacts: [BlogArtifact, BlogArtifact, BlogArtifact, BlogArtifact];
};

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  readTime: string;
  content: string[];
  coverLabel: string;
  image?: string;
  layout: BlogPostLayoutDetail;
};

function buildLayout(issueNo: string, cite: string, label: string): BlogPostLayoutDetail {
  return {
    issueNo,
    pullQuote: label,
    geometric: {
      title: "Systems and software quality",
      body: "Strong products stay useful because the system underneath them is clear, observable, and easier to evolve without drama.",
      list: ["I. SYSTEM JUDGMENT", "II. PRODUCT CLARITY", "III. DELIVERY QUALITY"],
    },
    editorial: {
      lines: ["Good software", "is felt in trust,", "not noise."],
      cite,
    },
    silence: {
      title: "What quality protects",
      quote: "Calm products come from disciplined systems.",
      body: "The calmer the product feels, the more likely the software underneath has clear contracts, better feedback loops, and fewer surprises.",
    },
    artifactsEyebrow: label,
    artifacts: [
      { variant: "systemic", title: "Quality-first delivery" },
      { variant: "contrast", line1: "Clear systems,", line2: "steady products", kicker: "TRUST" },
      { variant: "icon" },
      { variant: "number", value: issueNo, label: "NOTES" },
    ],
  };
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-ai-products-with-good-software-judgment",
    title: "Building AI Products With Good Software Judgment",
    date: "April 18, 2026",
    category: "AI engineering",
    excerpt:
      "AI products need more than prompts and endpoints; they need software quality, clear fallbacks, and product decisions that make intelligence feel trustworthy.",
    readTime: "4 min read",
    content: [
      "AI products succeed when software quality surrounds the model: clear state handling, dependable fallbacks, understandable outputs, and interfaces that help users recover when the system is uncertain.",
      "Prompt design is only one layer. The stronger work is in orchestration, evaluation, observability, and the product decisions that keep the experience calm when the model is imperfect.",
      "The result is not just a smarter product. It is a more trustworthy one, where intelligence feels useful because the software around it is disciplined.",
    ],
    coverLabel: "AI engineering & product quality",
    layout: buildLayout("01", "— AI NOTES", "AI ENGINEERING / 2026"),
  },
  {
    slug: "cloud-architecture-that-serves-product-speed",
    title: "Cloud Architecture That Serves Product Speed",
    date: "April 03, 2026",
    category: "Cloud",
    excerpt:
      "Cloud work matters most when it gives teams room to ship faster, recover cleanly, and support growth without turning the architecture into a burden.",
    readTime: "5 min read",
    content: [
      "Good cloud architecture is not about collecting services. It is about choosing infrastructure that keeps deployments steady, environments understandable, and operations light enough for the team you actually have.",
      "When those decisions are made well, product teams move faster because infrastructure becomes a support system rather than a source of daily friction.",
      "That is the standard I care about: cloud choices that improve product velocity, resilience, and long-term maintainability together.",
    ],
    coverLabel: "Cloud systems & delivery",
    layout: buildLayout("02", "— CLOUD NOTES", "CLOUD SYSTEMS / 2026"),
  },
  {
    slug: "system-design-decisions-that-keep-products-calm",
    title: "System Design Decisions That Keep Products Calm",
    date: "March 12, 2026",
    category: "System design",
    excerpt:
      "System design is not only about scale diagrams; it is about making decisions that keep products understandable, resilient, and easier to evolve.",
    readTime: "5 min read",
    content: [
      "The best system design decisions reduce drama. They clarify boundaries, make failures easier to reason about, and help features grow without forcing the whole product to wobble.",
      "That often means favoring simpler contracts, explicit ownership, and infrastructure choices that teams can actually operate with confidence.",
      "When the design is calm, the product feels calmer too, because the software underneath is less likely to surprise the people building it or the people using it.",
    ],
    coverLabel: "System design & stability",
    layout: buildLayout("03", "— SYSTEM NOTES", "SYSTEM DESIGN / 2026"),
  },
  {
    slug: "writing-better-software-for-ai-cloud-and-the-web",
    title: "Writing Better Software for AI, Cloud, and the Web",
    date: "February 07, 2026",
    category: "Software engineering",
    excerpt:
      "Across AI features, cloud services, and interface layers, software quality is the thread that keeps the whole product moving with confidence.",
    readTime: "4 min read",
    content: [
      "Across AI features, cloud services, and interface layers, the same principles hold up: reliable contracts, sensible observability, and code that makes change easier instead of riskier.",
      "Quality is what lets those layers collaborate well. Without it, every new feature adds confusion; with it, the whole product can keep growing with more confidence.",
      "Better software is not an isolated concern. It is the connecting tissue between product ambition and dependable delivery.",
    ],
    coverLabel: "Software quality across systems",
    layout: buildLayout("04", "— SOFTWARE NOTES", "SOFTWARE QUALITY / 2026"),
  },
  {
    slug: "operational-thinking-for-modern-software-teams",
    title: "Operational Thinking for Modern Software Teams",
    date: "January 10, 2026",
    category: "Cloud",
    excerpt:
      "Operational thinking is what helps teams move from shipping features to running software well over time.",
    readTime: "4 min read",
    content: [
      "Strong delivery depends on what happens after release too: monitoring, rollback plans, environment clarity, and systems that help teams respond quickly when real usage exposes new edges.",
      "Operational thinking is what turns a working feature into a dependable product capability that teams can sustain with confidence.",
      "The goal is not ceremony. It is resilience that keeps delivery moving even when real conditions get messy.",
    ],
    coverLabel: "Operations & resilience",
    layout: buildLayout("05", "— OPERATIONS NOTES", "CLOUD OPS / 2026"),
  },
];

export const BLOG_ARCHIVE_PAGE_LIMIT = 6;
