import type { Metadata } from "next";
import React from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Preloader from "@/components/Preloader";
import Script from "next/script";

// ── Lazy Loaded Components (Below the fold) ──────────────────────────────────
const Services = dynamic(() => import("@/components/Services"), { ssr: true });
const Work = dynamic(() => import("@/components/Work"), { ssr: true });
const FAQ = dynamic(() => import("@/components/FAQ"), { ssr: true });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: true });

// ── Homepage metadata overrides the root layout defaults ─────────────────────
// Title: 51 chars — within Google's ~550px limit
// Description: 130 chars — within Google's ~950px limit
export const metadata: Metadata = {
  title: {
    absolute: "Muhammad Saif Latif | Video Editor & DaVinci Expert",
  },
  description:
    "Professional video editor in Islamabad & Rawalpindi. Specializing in cinematic color grading, wedding films, and post-production.",
  alternates: {
    canonical: "https://saiflatif.me/",
  },
};

// ── Page-level BreadcrumbList schema ─────────────────────────────────────────
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://saiflatif.me/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Portfolio",
      item: "https://saiflatif.me/#section-work",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Services",
      item: "https://saiflatif.me/#section-services",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Contact",
      item: "https://saiflatif.me/contact",
    },
  ],
};

// ── FAQPage JSON-LD schema ────────────────────────────────────────────────────
// Enables Google rich results (FAQ accordions in SERPs) and gives AI models
// (Gemini, ChatGPT, Perplexity) explicit Q&A pairs to cite.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What software do you use for video editing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "I work exclusively in DaVinci Resolve for all projects — a powerful tool for node-based color grading, cinema-quality color science, professional audio engineering, and custom motion design.",
      },
    },
    {
      "@type": "Question",
      name: "What is included in a complete video edit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Full end-to-end post-production: narrative cutting, beat-synced pacing, professional color grading, studio-level sound design and SFX, kinetic subtitles, and formatting optimized for each platform — 16:9 widescreen or 9:16 vertical.",
      },
    },
    {
      "@type": "Question",
      name: "What are your typical turnaround times?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Short-form content (Reels, TikToks, Shorts): 24–48 hours. Long-form content (Real Estate, Weddings, Promos): 3–5 business days. 24-hour rush delivery is available upon request.",
      },
    },
    {
      "@type": "Question",
      name: "How do I send you raw footage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Simply upload your files to Google Drive, Dropbox, WeTransfer, or Frame.io and share the link alongside your project brief or any reference style links.",
      },
    },
    {
      "@type": "Question",
      name: "How does pricing work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "I offer flat, project-based rates customized to your project's length and visual complexity. Complete cost transparency upfront — no hourly tracking, hidden fees, or surprises.",
      },
    },
    {
      "@type": "Question",
      name: "What is your revision policy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every project includes 2 complimentary rounds of revisions to ensure the final edit aligns 100% with your brand vision and expectations.",
      },
    },
    {
      "@type": "Question",
      name: "How do we handle payments?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Projects begin with a 50% deposit to secure your slot, with the final 50% due upon final video review before unwatermarked delivery.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <BottomNav />
      <div className="nav-home" suppressHydrationWarning>
        <Navbar />
      </div>
      <div className="body-background" suppressHydrationWarning></div>

      {/*
       * Semantic page wrapper:
       * - <main> identifies the primary content to search crawlers and LLMs.
       * - Individual sections are wrapped in <section> inside components.
       * The page-wrapper class preserves existing visual styling.
       */}
      <main className="page-wrapper" suppressHydrationWarning>
        <Hero />
        <About />
        <Services />
        <Work />
        <FAQ />
        <Contact />
      </main>

      <Preloader />

      {/* Page-level JSON-LD: BreadcrumbList */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Page-level JSON-LD: FAQPage */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
