import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Preloader from "@/components/Preloader";
import Contact from "@/components/Contact";

export default function CaseStudyNotFound() {
  return (
    <>
      <BottomNav />
      <div className="nav-home">
        <Navbar />
      </div>
      <div className="page-wrapper min-h-screen flex flex-col justify-between">
        <div className="flex-1 flex items-center justify-center py-20 px-4 relative z-10">
          <div className="max-w-xl w-full mx-auto text-center bg-neutral-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-14 shadow-2xl">
            <span className="inline-block px-3 py-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-xs font-bold tracking-widest text-amber-300 uppercase mb-4">
              404 &mdash; Case Study Not Found
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-6">
              PROJECT NOT FOUND
            </h1>
            <p className="text-neutral-300 text-base md:text-lg mb-8 leading-relaxed">
              We couldn&rsquo;t locate the case study you&rsquo;re looking for. It may have been moved or updated.
            </p>
            <Link
              href="/#section-work"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black font-black uppercase text-sm tracking-wider hover:bg-neutral-200 transition-all duration-300 shadow-2xl hover:scale-105"
            >
              <span>&larr; Back to Work</span>
            </Link>
          </div>
        </div>
        <Contact />
      </div>
      <Preloader />
    </>
  );
}
