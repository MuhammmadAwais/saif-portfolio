import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "@/reference/css/portfolio-rk.webflow.5dc738e00.min.css";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

// ─── Global JSON-LD Schemas ──────────────────────────────────────────────────
// These are injected once at the root level and apply to every page.
// Page-level schemas (VideoObject, etc.) are added in their respective files.

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://saiflatif.me/#person",
  name: "Muhammad Saif Latif",
  alternateName: ["Saif Latif", "Saif"],
  url: "https://saiflatif.me/",
  image: "https://saiflatif.me/images/tab-logo.png",
  jobTitle: "Professional Video Editor & DaVinci Resolve Expert",
  description:
    "Muhammad Saif Latif is a professional video editor and DaVinci Resolve expert based in Islamabad and Rawalpindi, Pakistan. He specializes in cinematic color grading, post-production, wedding films, luxury real estate tours, and high-end documentaries.",
  knowsAbout: [
    "Video Editing",
    "DaVinci Resolve",
    "Color Grading",
    "Post-Production",
    "Cinematic Editing",
    "Wedding Films",
    "Real Estate Video Tours",
    "Documentary Editing",
    "Fusion Motion Graphics",
    "Beat-Sync Editing",
    "Sound Design",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Islamabad",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  sameAs: [
    "https://saiflatif.me/",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
  },
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://saiflatif.me/#service",
  name: "Saif Latif — Video Editing & Color Grading Services",
  url: "https://saiflatif.me/",
  description:
    "Professional video editing and DaVinci Resolve color grading services by Muhammad Saif Latif, serving clients in Islamabad, Rawalpindi, and worldwide. Services include cinematic video editing, broadcast-level color grading, luxury real estate tours, wedding film teasers, and high-end documentaries.",
  founder: {
    "@id": "https://saiflatif.me/#person",
  },
  areaServed: [
    { "@type": "City", name: "Islamabad" },
    { "@type": "City", name: "Rawalpindi" },
    { "@type": "Country", name: "Pakistan" },
    { "@type": "Text", name: "Worldwide (Remote)" },
  ],
  serviceType: [
    "Cinematic Video Editing",
    "Professional Color Grading",
    "DaVinci Resolve Post-Production",
    "Luxury Real Estate Video Tours",
    "Wedding Film Teasers",
    "High-End Documentary Editing",
  ],
  priceRange: "$$",
  image: "https://saiflatif.me/images/tab-logo.png",
  sameAs: ["https://saiflatif.me/"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://saiflatif.me/#website",
  name: "Saif Latif — Professional Video Editor & DaVinci Resolve Expert",
  url: "https://saiflatif.me/",
  description:
    "Portfolio of Muhammad Saif Latif, a professional video editor and DaVinci Resolve expert based in Islamabad, Pakistan.",
  author: {
    "@id": "https://saiflatif.me/#person",
  },
  inLanguage: "en",
};

// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  // ── Title (≤55 chars / ~550px) ─────────────────────────────────────────────
  // 51 chars — within Google's recommended pixel limit.
  title: {
    default: "Muhammad Saif Latif | Video Editor & DaVinci Expert",
    template: "%s | Saif Latif",
  },

  // ── Description (≤150 chars / ~950px) ─────────────────────────────────────
  // 130 chars — well within Google's recommended pixel limit.
  description:
    "Professional video editor in Islamabad & Rawalpindi. Specializing in cinematic color grading, wedding films, and post-production.",

  // ── Canonical ──────────────────────────────────────────────────────────────
  alternates: {
    canonical: "https://saiflatif.me/",
  },

  // ── Keywords (supplementary — primary signal is on-page content) ───────────
  keywords: [
    "Muhammad Saif Latif",
    "Saif Latif portfolio",
    "Saif Latif Editor",
    "Saif Latif DaVinci Resolve expert",
    "Freelance Video Editor Islamabad",
    "Video Editor Rawalpindi",
    "Professional Video Editor Pakistan",
    "DaVinci Resolve color grading",
    "Cinematic video editor",
    "Wedding film editor Pakistan",
    "Real estate video editor",
  ],

  // ── Open Graph ─────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    url: "https://saiflatif.me/",
    siteName: "Saif Latif — Video Editor",
    title:
      "Muhammad Saif Latif | Professional Video Editor & DaVinci Resolve Expert",
    description:
      "Muhammad Saif Latif is a professional video editor and DaVinci Resolve expert based in Islamabad & Rawalpindi, Pakistan. Cinematic color grading, wedding films, luxury real estate tours, and post-production.",
    images: [
      {
        url: "https://saiflatif.me/images/og-cover.png",
        width: 1200,
        height: 630,
        alt: "Muhammad Saif Latif — Professional Video Editor & DaVinci Resolve Expert, Islamabad Pakistan",
      },
    ],
    locale: "en_US",
  },

  // ── Twitter Card ───────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: "@saiflatif",
    creator: "@saiflatif",
    title:
      "Muhammad Saif Latif | Professional Video Editor & DaVinci Resolve Expert",
    description:
      "Muhammad Saif Latif — professional video editor and DaVinci Resolve expert. Islamabad & Rawalpindi, Pakistan. Cinematic editing, color grading, wedding films.",
    images: [
      {
        url: "https://saiflatif.me/images/og-cover.png",
        alt: "Muhammad Saif Latif — Professional Video Editor & DaVinci Resolve Expert",
      },
    ],
  },

  // ── Robots ─────────────────────────────────────────────────────────────────
  // robots.ts in /app handles the full robots.txt generation.
  // This object controls the meta robots tag rendered into <head>.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // ── Icons ──────────────────────────────────────────────────────────────────
  // Next.js App Router file convention: app/icon.png → auto-served as
  // /icon.png with the correct Link rel="icon" headers.
  // Google requires favicons to be a multiple of 48px for mobile SERPs.
  // We provide 192×192 (icon.png) and 48×48 (favicon.png) to satisfy both
  // the 192px Google mobile requirement and the 48px minimum grid.
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "48x48", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: { url: "/icon.png", type: "image/png" },
    apple: { url: "/icon.png", sizes: "192x192", type: "image/png" },
  },

  // ── Authors / Publisher ────────────────────────────────────────────────────
  authors: [{ name: "Muhammad Saif Latif", url: "https://saiflatif.me/" }],
  creator: "Muhammad Saif Latif",
  publisher: "Muhammad Saif Latif",

  // ── Category ───────────────────────────────────────────────────────────────
  category: "Video Production & Post-Production",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-wf-page="60c11f0c32e8479e90fbcb71"
      data-wf-site="60c11f0c32e847294cfbcb6c"
      className={`w-mod-js w-mod-ix ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
      </head>
      <body data-w-id="5f075927b33f5315850a8719" suppressHydrationWarning>
        {children}
        <Toaster position="top-right" theme="dark" richColors closeButton />

        {/* ── Global Structured Data (JSON-LD) ───────────────────────────── */}
        {/* Person, ProfessionalService, and WebSite schemas are injected     */}
        {/* globally so every page crawler pass picks them up immediately.    */}
        <Script
          id="global-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              personSchema,
              professionalServiceSchema,
              websiteSchema,
            ]),
          }}
        />
        <GoogleAnalytics gaId="G-0QXEB91049" />
      </body>
    </html>
  );
}

