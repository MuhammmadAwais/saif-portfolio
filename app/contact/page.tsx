import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Preloader from "@/components/Preloader";
import ContactPageSection from "@/components/contact-page/ContactPageSection";
import Contact from "@/components/Contact";
import Script from "next/script";

export const metadata: Metadata = {
  // Uses the layout.tsx title template: "%s | Saif Latif — Video Editor"
  title: "Hire a Video Editor — Get in Touch",
  description:
    "Contact Muhammad Saif Latif — professional video editor and DaVinci Resolve expert based in Islamabad & Rawalpindi, Pakistan. Available for freelance video editing, cinematic color grading, real estate tours, wedding films, and documentary projects worldwide.",
  alternates: {
    canonical: "https://saiflatif.me/contact",
  },
  openGraph: {
    title: "Hire a Video Editor — Contact Saif Latif | Islamabad, Pakistan",
    description:
      "Get in touch with Muhammad Saif Latif, a professional video editor and DaVinci Resolve expert based in Islamabad, Pakistan. Available for freelance projects globally.",
    url: "https://saiflatif.me/contact",
  },
};

// ── ContactPage schema ────────────────────────────────────────────────────────
// Signals to search engines and AI crawlers that this is a hire/contact page
// for Muhammad Saif Latif, linking it to the Person and Service entities.
const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://saiflatif.me/contact",
  name: "Contact Muhammad Saif Latif — Professional Video Editor & DaVinci Resolve Expert",
  description:
    "Hire Muhammad Saif Latif, a professional video editor and DaVinci Resolve expert based in Islamabad and Rawalpindi, Pakistan, for freelance video editing, cinematic color grading, real estate tours, wedding films, and documentary projects.",
  url: "https://saiflatif.me/contact",
  about: {
    "@id": "https://saiflatif.me/#person",
  },
  mainEntity: {
    "@id": "https://saiflatif.me/#service",
  },
};

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
      name: "Contact",
      item: "https://saiflatif.me/contact",
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <BottomNav />
      <div className="nav-home">
        <Navbar />
      </div>
      <main className="page-wrapper min-h-screen">
        <ContactPageSection />
        <Contact />
      </main>
      <Preloader />

      {/* Page-level JSON-LD: ContactPage + BreadcrumbList */}
      <Script
        id="contact-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([contactPageSchema, breadcrumbSchema]),
        }}
      />
    </>
  );
}
