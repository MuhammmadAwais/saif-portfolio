"use client";

import React, { useState } from "react";

// ── FAQ Data ──────────────────────────────────────────────────────────────────
// 5 high-intent Q&As targeting the primary keyword clusters:
//   - DaVinci Resolve workflow (technical authority)
//   - Turnaround time (commercial intent)
//   - Islamabad / Rawalpindi availability (local SEO)
//   - Remote collaboration (global reach)
//   - Footage delivery & revisions (trust signal)
const FAQS = [
  {
    id: "faq-01",
    question: "What is your DaVinci Resolve color grading workflow?",
    answer:
      "I use a node-based color grading pipeline in DaVinci Resolve 21 — starting with scene-referred normalization, then primary correction, secondary power windows, qualifier-based skin tone protection, and a final look-development node for cinematic LUT-aware grading. Every project is delivered in the correct color space (Rec.709, DCI-P3, or LOG) based on the client's delivery specification.",
  },
  {
    id: "faq-02",
    question:
      "What is the typical turnaround time for YouTube or commercial video projects?",
    answer:
      "Standard turnaround is 3–5 business days for YouTube edits (up to 15 minutes) and 5–10 business days for commercial or brand videos. Rush delivery within 24–48 hours is available for an additional fee. Timelines are confirmed at project kickoff based on scope and revision rounds.",
  },
  {
    id: "faq-03",
    question:
      "Are you available for freelance video editing in Islamabad and Rawalpindi?",
    answer:
      "Yes — I'm actively available for freelance video editing and post-production projects in Islamabad, Rawalpindi, and remotely for international clients. You can reach out directly via the contact form or by emailing saiflatifbusiness@gmail.com to discuss your project.",
  },
  {
    id: "faq-04",
    question:
      "How do you collaborate with remote clients on video editing projects?",
    answer:
      "Remote collaboration is fully streamlined: raw footage is shared via Google Drive, WeTransfer, or Dropbox. A project brief is completed at kickoff to align on tone, pacing references, and deliverables. Review rounds are conducted via Vimeo or a private Google Drive preview link with timestamped feedback. Revisions are delivered within 48 hours per round.",
  },
  {
    id: "faq-05",
    question:
      "What is your policy on raw footage delivery and revision rounds?",
    answer:
      "All packages include 2 revision rounds by default. Additional rounds are available at a fixed per-round rate. Final deliverables are exported in the agreed codec and resolution (H.264/H.265 for web, ProRes for broadcast). Raw project files (.drp) are available as an optional add-on. Client-provided raw footage is retained securely for 30 days post-delivery.",
  },
];

// ── Single FAQ Item ───────────────────────────────────────────────────────────
function FAQItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof FAQS)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="border-b border-black/15 last:border-b-0"
      suppressHydrationWarning
    >
      <button
        type="button"
        id={item.id}
        aria-expanded={isOpen}
        aria-controls={`${item.id}-answer`}
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-6 py-7 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 rounded-sm"
        suppressHydrationWarning
      >
        {/* Question — h3 for correct heading hierarchy below the h2 section title */}
        <h3 className="font-sans text-base sm:text-lg md:text-xl font-semibold tracking-tight text-black leading-snug transition-colors duration-200 group-hover:text-black/70">
          {item.question}
        </h3>

        {/* Animated plus / minus icon */}
        <span
          className="flex-shrink-0 mt-0.5 w-6 h-6 flex items-center justify-center rounded-full border border-black/20 transition-all duration-300 group-hover:border-black/50"
          aria-hidden="true"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <line x1="6" y1="1" x2="6" y2="11" className={`transition-all duration-300 ${isOpen ? "opacity-0 scale-y-0" : "opacity-100 scale-y-100"}`} />
            <line x1="1" y1="6" x2="11" y2="6" />
          </svg>
        </span>
      </button>

      {/* Answer panel — CSS height transition for smooth accordion */}
      <div
        id={`${item.id}-answer`}
        role="region"
        aria-labelledby={item.id}
        style={{
          maxHeight: isOpen ? "600px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.38s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        suppressHydrationWarning
      >
        <p className="pb-8 pr-10 font-sans text-sm sm:text-base text-black/60 leading-relaxed">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

// ── FAQ Section ───────────────────────────────────────────────────────────────
export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="section-faq"
      aria-labelledby="faq-heading"
      className="w-full bg-transparent py-20 md:py-32 relative z-10"
      suppressHydrationWarning
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12" suppressHydrationWarning>
        {/* Section header — matching the editorial monochrome site aesthetic */}
        <div className="mb-12 md:mb-16 flex items-center justify-between border-b border-black/10 pb-6">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-black inline-block" />
            <h2
              id="faq-heading"
              className="font-mono text-xs md:text-sm tracking-[0.25em] text-neutral-900 uppercase font-semibold"
            >
              Frequently Asked Questions
            </h2>
          </div>
          <span className="font-mono text-xs md:text-sm tracking-widest text-black/40 uppercase hidden sm:inline-block">
            [ FAQ ]
          </span>
        </div>

        {/* FAQ accordion list */}
        <div
          className="divide-y divide-black/15 border-t border-black/15"
          suppressHydrationWarning
        >
          {FAQS.map((item) => (
            <FAQItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => toggle(item.id)}
            />
          ))}
        </div>

        {/* Inline entity-dense footer — visible to crawlers and AI parsers */}
        <p className="mt-12 font-mono text-xs text-black/40 leading-relaxed max-w-2xl">
          Muhammad Saif Latif is a freelance video editor and{" "}
          <span className="font-semibold text-black/60">DaVinci Resolve</span>{" "}
          expert based in{" "}
          <span className="font-semibold text-black/60">Islamabad</span> and{" "}
          <span className="font-semibold text-black/60">Rawalpindi</span>,
          Pakistan. Available for cinematic editing, color grading, and
          post-production projects worldwide.
        </p>
      </div>
    </section>
  );
}
