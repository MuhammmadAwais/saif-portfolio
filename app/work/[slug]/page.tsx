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
      title: "Case Study Not Found — Saif Latif",
      description: "The requested case study could not be found.",
    };
  }

  return {
    title: `${caseStudy.title} — Case Study | Saif Latif`,
    description: caseStudy.challenge,
    openGraph: {
      title: `${caseStudy.title} — Case Study | Saif Latif`,
      description: caseStudy.challenge,
      type: "article",
      images: [
        {
          url: caseStudy.thumbnailUrl,
          width: 1200,
          height: 630,
          alt: caseStudy.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${caseStudy.title} — Case Study | Saif Latif`,
      description: caseStudy.challenge,
      images: [caseStudy.thumbnailUrl],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <>
      <BottomNav />
      <div className="nav-home">
        <Navbar />
      </div>
      <div className="body-background"></div>
      <div className="page-wrapper min-h-screen">
        <CaseStudyView caseStudy={caseStudy} />
        <Contact />
      </div>
      <Preloader />
    </>
  );
}
