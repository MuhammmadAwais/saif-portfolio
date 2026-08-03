import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug, getAllCaseStudies } from "@/data/caseStudies";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Preloader from "@/components/Preloader";
import Contact from "@/components/Contact";
import CaseStudyView from "@/components/case-study/CaseStudyView";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const caseStudies = getAllCaseStudies();
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
      description: "The requested case study could not be found.",
    };
  }

  const canonicalUrl = `https://saiflatif.me/work/${caseStudy.slug}`;
  const ogImage = caseStudy.thumbnailUrl.startsWith("http")
    ? caseStudy.thumbnailUrl
    : `https://saiflatif.me${caseStudy.thumbnailUrl}`;

  return {
    // Uses the layout.tsx title template: "%s | Saif Latif — Video Editor"
    title: `${caseStudy.title} — Case Study`,
    description: `${caseStudy.challenge} — A case study by Muhammad Saif Latif, professional video editor and DaVinci Resolve expert based in Islamabad, Pakistan.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${caseStudy.title} — Case Study | Saif Latif`,
      description: `${caseStudy.challenge} — A case study by Muhammad Saif Latif, professional video editor and DaVinci Resolve expert, Islamabad Pakistan.`,
      type: "article",
      url: canonicalUrl,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${caseStudy.title} — Case Study by Muhammad Saif Latif, DaVinci Resolve Expert`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${caseStudy.title} — Case Study | Saif Latif`,
      description: `${caseStudy.challenge} — Muhammad Saif Latif, professional video editor & DaVinci Resolve expert, Islamabad Pakistan.`,
      images: [ogImage],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  // ── VideoObject JSON-LD Schema ────────────────────────────────────────────
  // Connects each case study video to Muhammad Saif Latif's name, location,
  // and DaVinci Resolve expertise. Enables Google rich video results and
  // allows AI crawlers to build strong associations between his name and work.
  const thumbnailUrl = caseStudy.thumbnailUrl.startsWith("http")
    ? caseStudy.thumbnailUrl
    : `https://saiflatif.me${caseStudy.thumbnailUrl}`;

  const videoObjectSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: caseStudy.title,
    description: `${caseStudy.challenge} ${caseStudy.solution} — Edited by Muhammad Saif Latif, professional video editor and DaVinci Resolve expert based in Islamabad and Rawalpindi, Pakistan. Tools used: ${caseStudy.technicalTools.join(", ")}.`,
    thumbnailUrl: thumbnailUrl,
    // TODO: update uploadDate to the actual publish date of each video
    uploadDate: "2025-01-01T00:00:00+05:00",
    duration: `PT${caseStudy.duration
      .replace(" MIN ", "M")
      .replace(" SEC", "S")
      .replace(" MIN", "M")}`,
    embedUrl: `https://saiflatif.me/work/${caseStudy.slug}`,
    url: `https://saiflatif.me/work/${caseStudy.slug}`,
    author: {
      "@type": "Person",
      "@id": "https://saiflatif.me/#person",
      name: "Muhammad Saif Latif",
    },
    creator: {
      "@type": "Person",
      "@id": "https://saiflatif.me/#person",
      name: "Muhammad Saif Latif",
    },
    publisher: {
      "@type": "Person",
      "@id": "https://saiflatif.me/#person",
      name: "Muhammad Saif Latif",
    },
    keywords: [
      "DaVinci Resolve",
      "Video Editing",
      "Muhammad Saif Latif",
      "Saif Latif",
      "Color Grading",
      "Islamabad",
      "Pakistan",
      caseStudy.category,
    ].join(", "),
    inLanguage: "en",
  };

  // ── BreadcrumbList schema for this page ────────────────────────────────────
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
        name: caseStudy.title,
        item: `https://saiflatif.me/work/${caseStudy.slug}`,
      },
    ],
  };

  return (
    <>
      <BottomNav />
      <div className="nav-home">
        <Navbar />
      </div>
      <div className="body-background"></div>
      <main className="page-wrapper min-h-screen">
        <CaseStudyView caseStudy={caseStudy} />
        <Contact />
      </main>
      <Preloader />

      {/* Page-level JSON-LD: VideoObject + BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([videoObjectSchema, breadcrumbSchema]),
        }}
      />
    </>
  );
}
