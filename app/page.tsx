import type { Metadata } from "next";
import React from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Work from "@/components/Work";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Preloader from "@/components/Preloader";

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
      name: "What is your DaVinci Resolve color grading workflow?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "I use a node-based color grading pipeline in DaVinci Resolve 21 — starting with scene-referred normalization, then primary correction, secondary power windows, qualifier-based skin tone protection, and a final look-development node for cinematic LUT-aware grading. Every project is delivered in the correct color space (Rec.709, DCI-P3, or LOG) based on the client's delivery specification.",
      },
    },
    {
      "@type": "Question",
      name: "What is the typical turnaround time for YouTube or commercial video projects?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Standard turnaround is 3–5 business days for YouTube edits (up to 15 minutes) and 5–10 business days for commercial or brand videos. Rush delivery within 24–48 hours is available for an additional fee. Timelines are confirmed at project kickoff based on scope and revision rounds.",
      },
    },
    {
      "@type": "Question",
      name: "Are you available for freelance video editing projects in Islamabad and Rawalpindi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — Muhammad Saif Latif is actively available for freelance video editing and post-production projects in Islamabad, Rawalpindi, and remotely for international clients. You can reach out directly via the contact form or by emailing saiflatifbusiness@gmail.com to discuss your project.",
      },
    },
    {
      "@type": "Question",
      name: "How do you collaborate with remote clients on video editing projects?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Remote collaboration is fully streamlined: raw footage is shared via Google Drive, WeTransfer, or Dropbox. A project brief is completed at kickoff to align on tone, pacing references, and deliverables. Review rounds are conducted via Vimeo or a private Google Drive preview link with timestamped feedback. Revisions are delivered within 48 hours per round.",
      },
    },
    {
      "@type": "Question",
      name: "What is your policy on raw footage delivery and revision rounds?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All packages include 2 revision rounds by default. Additional rounds are available at a fixed per-round rate. Final deliverables are exported in the agreed codec and resolution (H.264/H.265 for web, ProRes for broadcast). Raw project files (.drp) are available as an optional add-on. Client-provided raw footage is retained securely for 30 days post-delivery.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Page-level JSON-LD: FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
