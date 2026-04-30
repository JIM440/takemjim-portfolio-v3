import type { Metadata, Viewport } from "next";
import { Manrope, Newsreader } from "next/font/google";
import { AppShell } from "@/components/app-shell";
import { PersonJsonLd } from "@/components/person-json-ld";
import { ThemeProvider } from "@/components/theme-provider";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const displayFont = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

const rootTitle = "Takem Jim";
const rootDescription =
  "I build web and mobile applications that turn ideas into real, usable products. Got a project? I can help make it happen.";
const rootImage = "/jim/hero-og.png";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [{ url: "/jim.png", type: "image/png" }],
    apple: [{ url: "/jim.png", type: "image/png" }],
    shortcut: "/jimII.png",
  },
  title: {
    default: rootTitle,
    template: "%s | Takem Jim",
  },
  description: rootDescription,
  keywords: [
    "Takem Jim",
    "takem jim",
    "Takem Jim software engineer",
    "software engineer",
    "software developer",
    "web developer",
    "mobile developer",
    "full stack developer",
    "React developer",
    "Next.js developer",
    "Cameroon software engineer",
    "portfolio",
  ],
  authors: [{ name: "Takem Jim", url: siteUrl }],
  creator: "Takem Jim",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: siteUrl,
    siteName: "Takem Jim",
    title: rootTitle,
    description: rootDescription,
    images: [
      {
        url: rootImage,
        width: 1200,
        height: 630,
        alt: "Takem Jim",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: rootTitle,
    description: rootDescription,
    images: [rootImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className={`${displayFont.variable} ${bodyFont.variable}`} suppressHydrationWarning>
        <ThemeProvider />
        <PersonJsonLd />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
