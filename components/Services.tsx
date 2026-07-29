"use client";

import React from "react";
import { useServiceHover } from "@/hooks/useServiceHover";

export interface ServiceItem {
  id: string;
  title: string;
  category?: string;
  isCTA?: boolean;
  ctaText?: string;
  ctaHref?: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "01",
    title: "Cinematic Video Editing",
    category: "Post-Production",
  },
  {
    id: "02",
    title: "Professional Color Grading",
    category: "Color & Look",
  },
  {
    id: "03",
    title: "Luxury Real Estate Tours",
    category: "Commercial",
  },
  {
    id: "04",
    title: "Wedding Teasers",
    category: "Event Cinema",
  },
  {
    id: "05",
    title: "High-End Documentaries",
    category: "Long Form",
  },
  {
    id: "06",
    title: "Have Something Else in Mind?",
    category: "Custom Scope",
    isCTA: true,
    ctaText: "Let's Collaborate",
    ctaHref: "#section-contact",
  },
];

export default function Services() {
  const {
    hoveredIndex,
    setRowRef,
    handleMouseEnter,
    handleMouseLeave,
    handleRowClick,
  } = useServiceHover();

  return (
    <section
      id="section-services"
      className="w-full bg-transparent py-20 md:py-32 relative z-10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Editorial Eyebrow Header */}
        <div className="mb-12 md:mb-16 flex items-center justify-between border-b border-black/10 pb-6">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-black inline-block"></span>
            <h1 className="font-mono text-xs md:text-sm tracking-[0.25em] text-neutral-900 uppercase font-semibold">
              Services & Capabilities
            </h1>
          </div>
          <span className="font-mono text-xs md:text-sm tracking-widest text-black/40 uppercase hidden sm:inline-block">
            [ 01 — 06 ]
          </span>
        </div>

        {/* Editorial Vertical Typographic List */}
        <div className="flex flex-col w-full border-t border-black/20">
          {SERVICES_DATA.map((service, index) => {
            return (
              <div
                key={service.id}
                ref={(el) => setRowRef(el, index)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleRowClick(index)}
                className="group relative flex flex-col md:flex-row md:items-center justify-between py-8 sm:py-10 md:py-8 border-b border-black/20 cursor-pointer select-none transition-colors duration-300"
              >
                {/* Left Column: Number + Title */}
                <div className="flex items-baseline gap-4 sm:gap-6 md:gap-8 pr-4">
                  <span className="font-mono text-xs sm:text-sm md:text-base text-black/40 font-bold tracking-widest shrink-0">
                    {service.id}
                  </span>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase text-black leading-none transition-colors duration-300">
                    {service.title}
                  </h2>
                </div>

                {/* Right Column: Category & CTA/Icon */}
                <div className="mt-6 md:mt-0 flex items-center justify-between md:justify-end gap-6 shrink-0 self-start md:self-auto w-full md:w-auto">
                  {service.category && (
                    <span className="font-mono text-xs sm:text-sm tracking-widest uppercase text-black/60 font-medium">
                      {service.category}
                    </span>
                  )}

                  {service.isCTA ? (
                    <a
                      href={service.ctaHref}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-3 px-7 py-3.5 md:px-8 md:py-4 bg-black text-white text-xs md:text-sm font-bold tracking-widest uppercase rounded-full shadow-lg hover:bg-neutral-800 hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                    >
                      <span>{service.ctaText}</span>
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </a>
                  ) : (
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-black/20 flex items-center justify-center group-hover:border-black group-hover:bg-black group-hover:text-white transition-all duration-300">
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 17L17 7M17 7H7M17 7V17"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
