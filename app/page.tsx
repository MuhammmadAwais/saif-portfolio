import type { Metadata } from "next";
import React from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Preloader from "@/components/Preloader";

// ── Homepage metadata overrides the root layout defaults ─────────────────────
export const metadata: Metadata = {
  title: {
    absolute:
      "Muhammad Saif Latif | Professional Video Editor & DaVinci Resolve Expert — Islamabad",
  },
  description:
    "Muhammad Saif Latif is a professional video editor and DaVinci Resolve expert based in Islamabad & Rawalpindi, Pakistan. Specializing in cinematic color grading, wedding films, luxury real estate tours, and post-production. Available for freelance projects worldwide.",
  alternates: {
    canonical: "https://saiflatif.me/",
  },
};

// ── Page-level BreadcrumbList schema ─────────────────────────────────────────
// Helps search engines display rich breadcrumb results in SERPs.
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
        <Contact />
      </main>

      <Preloader />

      {/* Page-level JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
