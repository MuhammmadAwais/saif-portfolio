"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── FAQ Data ──────────────────────────────────────────────────────────────────
const FAQ_GROUPS = [
  {
    category: "Software & Services",
    accent: "#6366f1",
    items: [
      {
        id: "faq-01",
        question: "What software do you use for video editing?",
        answer:
          "All projects are handled inside <strong>DaVinci Resolve</strong>, utilizing node-based color grading, <em>cinema-grade color science</em>, studio audio engineering, and custom motion design.",
      },
      {
        id: "faq-02",
        question: "What is included in a complete video edit?",
        answer:
          "Full end-to-end post-production: <strong>narrative cutting</strong>, beat-synced pacing, <strong>professional color grading</strong>, studio sound design/SFX, <em>kinetic subtitles</em>, and optimized multi-platform formatting (16:9 widescreen or 9:16 vertical).",
      },
    ],
  },
  {
    category: "Turnaround & Delivery",
    accent: "#10b981",
    items: [
      {
        id: "faq-03",
        question: "What are your typical turnaround times?",
        answerList: [
          { label: "Short-Form Content", detail: "Reels, TikToks, Shorts", time: "24–48 hours" },
          { label: "Long-Form Content", detail: "Real Estate, Weddings, Promos", time: "3–5 business days" },
        ],
        answerNote: "24-hour rush delivery available upon request for urgent deadlines.",
      },
      {
        id: "faq-04",
        question: "How do I send you raw footage?",
        answer:
          "Simply upload your files to <strong>Google Drive, Dropbox, WeTransfer,</strong> or <strong>Frame.io</strong> and share the link alongside your project brief or reference style links.",
      },
    ],
  },
  {
    category: "Pricing, Revisions & Terms",
    accent: "#f59e0b",
    items: [
      {
        id: "faq-05",
        question: "How does pricing work?",
        answer:
          "I offer <strong>flat, project-based rates</strong> customized to your project&#39;s length and visual complexity. Complete cost transparency upfront &#8212; <em>no hourly tracking, hidden fees, or surprises.</em>",
      },
      {
        id: "faq-06",
        question: "What is your revision policy?",
        answer:
          "Every project includes <strong>2 complimentary rounds of revisions</strong> to ensure the final edit aligns 100% with your brand vision and expectations.",
      },
      {
        id: "faq-07",
        question: "How do we handle payments?",
        answer:
          "Projects begin with a <strong>50% deposit</strong> to secure your schedule slot, with the final 50% due upon final video review before unwatermarked delivery.",
      },
    ],
  },
];

type FAQItemData = {
  id: string;
  question: string;
  answer?: string;
  answerList?: { label: string; detail: string; time: string }[];
  answerNote?: string;
};

// ── Single accordion item ─────────────────────────────────────────────────────
function FAQItem({
  item,
  isOpen,
  onToggle,
  accentColor,
}: {
  item: FAQItemData;
  isOpen: boolean;
  onToggle: () => void;
  accentColor: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panelRef.current) return;
    if (isOpen) {
      gsap.fromTo(
        panelRef.current,
        { maxHeight: 0, opacity: 0, y: -6 },
        { maxHeight: 500, opacity: 1, y: 0, duration: 0.48, ease: "power3.out" }
      );
    } else {
      gsap.to(panelRef.current, {
        maxHeight: 0,
        opacity: 0,
        y: -4,
        duration: 0.32,
        ease: "power3.in",
      });
    }
  }, [isOpen]);

  return (
    <div className={`faq-item${isOpen ? " faq-item--open" : ""}`}>
      <button
        id={item.id}
        type="button"
        aria-expanded={isOpen}
        aria-controls={`${item.id}-panel`}
        onClick={onToggle}
        className="faq-question-btn"
        suppressHydrationWarning
      >
        <span className={`faq-question-text${isOpen ? " faq-question-text--open" : ""}`}>
          {item.question}
        </span>
        <span
          className={`faq-toggle-icon${isOpen ? " faq-toggle-icon--open" : ""}`}
          aria-hidden="true"
        >
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="6" y1="1" x2="6" y2="11" />
            <line x1="1" y1="6" x2="11" y2="6" />
          </svg>
        </span>
      </button>

      <div
        ref={panelRef}
        id={`${item.id}-panel`}
        role="region"
        aria-labelledby={item.id}
        style={{ maxHeight: 0, overflow: "hidden", opacity: 0 }}
        suppressHydrationWarning
      >
        <div className="faq-answer-body">
          {item.answer && (
            <p
              className="faq-answer-text"
              dangerouslySetInnerHTML={{ __html: item.answer }}
            />
          )}
          {item.answerList && (
            <ul className="faq-answer-list">
              {item.answerList.map((row) => (
                <li key={row.label} className="faq-answer-list-item">
                  <div className="faq-answer-list-left">
                    <span className="faq-answer-list-dot" style={{ background: accentColor }} />
                    <div>
                      <span className="faq-answer-list-label">{row.label}</span>
                      <span className="faq-answer-list-detail"> &mdash; {row.detail}</span>
                    </div>
                  </div>
                  <span className="faq-answer-list-time" style={{ color: accentColor }}>
                    {row.time}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {item.answerNote && (
            <p className="faq-answer-note">
              <em>{item.answerNote}</em>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ── FAQ Section ───────────────────────────────────────────────────────────────
export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const toggle = (id: string) =>
    setOpenId((prev) => (prev === id ? null : id));

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (leftRef.current) {
        gsap.from(leftRef.current, {
          x: -52,
          opacity: 0,
          duration: 1.05,
          ease: "power4.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });
      }

      if (rightRef.current) {
        gsap.from(rightRef.current, {
          x: 52,
          opacity: 0,
          duration: 1.05,
          ease: "power4.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });
      }

      const items = rightRef.current?.querySelectorAll(".faq-item");
      if (items && items.length > 0) {
        gsap.from(items, {
          y: 22,
          opacity: 0,
          duration: 0.55,
          stagger: 0.075,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: rightRef.current,
            start: "top 86%",
            toggleActions: "play none none none",
          },
        });
      }

      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          y: 28,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        });
      }

      if (headingRef.current) {
        const lines = headingRef.current.querySelectorAll(".faq-heading-line");
        gsap.from(lines, {
          y: 32,
          opacity: 0,
          duration: 0.68,
          stagger: 0.13,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="section-faq"
      ref={sectionRef}
      aria-labelledby="faq-heading"
      className="faq-section"
      suppressHydrationWarning
    >
      {/* SEO entity anchor — visually hidden, crawler/AI readable */}
      <p className="sr-only">
        Muhammad Saif Latif is a freelance video editor and DaVinci Resolve expert
        based in Islamabad and Rawalpindi, Pakistan. Available for cinematic editing,
        color grading, and post-production worldwide.
      </p>

      <div className="faq-container">

        {/* ── Main Section Header Block ── */}
        <div className="faq-header-block mb-8">
          <div className="faq-header-eyebrow">
            <span className="faq-header-dot" />
            <span className="faq-header-kicker ">Got A Question?</span>
          </div>
          <div className="faq-header-title-row">
            <h2 id="faq-heading" className="faq-main-title">
              Frequently Asked Questions
            </h2>

          </div>
        </div>

        {/* Two-column grid */}
        <div className="faq-grid">

          {/* Left column */}
          <div ref={leftRef} className="faq-left-col" suppressHydrationWarning>

            {/* Image card with hover animation */}
            <div className="faq-image-outer">
              <div className="faq-corner faq-corner-tl" />
              <div className="faq-corner faq-corner-br" />
              <div className="faq-image-ring" />

              <div className="faq-image-wrap">
                <Image
                  src="/images/FAQ-custom.png"
                  alt="Saif Latif — DaVinci Resolve professional editing workstation"
                  width={900}
                  height={900}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="faq-image"
                  loading="lazy"
                />
                <div className="faq-image-overlay" />
                <div className="faq-image-badge">
                  <span className="faq-badge-dot" />
                  <span className="faq-badge-text">DaVinci Resolve Studio</span>
                </div>
              </div>

              <div className="faq-stat-badge">
                <p className="faq-stat-label">Client Satisfaction</p>
                <p className="faq-stat-value">100%</p>
              </div>
            </div>

            {/* Editorial heading / Ask away block */}
            <div className="faq-heading-block" ref={headingRef}>
              <p className="faq-heading-eyebrow">
                <span className="faq-heading-eyebrow-line" />
                Got a question?
              </p>
              <div className="faq-heading-main">
                <span className="faq-heading-line faq-heading-ask">
                  Ask away<span className="faq-heading-period">.</span>
                </span>
              </div>
              <p className="faq-heading-sub">
                Everything you need to know about working with me &mdash; from
                workflow and software to pricing and delivery.
              </p>
              <Link href="/contact" className="faq-mini-cta" suppressHydrationWarning>
                <span>Start a project</span>
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
                <span className="faq-mini-cta-underline" />
              </Link>
            </div>
          </div>

          {/* Right column */}
          <div ref={rightRef} className="faq-right-col" suppressHydrationWarning>

            <div className="faq-groups">
              {FAQ_GROUPS.map((group) => (
                <div key={group.category} className="faq-group">
                  <div className="faq-category-header">
                    <span
                      className="faq-category-accent"
                      style={{ background: group.accent }}
                    />
                    <span className="faq-category-label">{group.category}</span>
                  </div>
                  <div className="faq-group-items">
                    {group.items.map((item) => (
                      <FAQItem
                        key={item.id}
                        item={item}
                        isOpen={openId === item.id}
                        onToggle={() => toggle(item.id)}
                        accentColor={group.accent}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Block */}
            <div ref={ctaRef} className="faq-cta-block" suppressHydrationWarning>
              <div className="faq-cta-content">
                <p className="faq-cta-eyebrow">Ready to collaborate?</p>
                <p className="faq-cta-heading">
                  Let&apos;s bring your vision to life.
                </p>
                <p className="faq-cta-sub">
                  No obligations &mdash; just a straightforward conversation about your project.
                </p>
              </div>
              <Link
                href="/contact"
                className="faq-cta-btn"
                suppressHydrationWarning
              >
                <span>Get in Touch</span>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
