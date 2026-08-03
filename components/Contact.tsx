"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import ScrollReveal from "./ScrollReveal";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const emailAddress = "SAIFLATIFBUSINESS@GMAIL.COM";

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      toast.success("Email copied to clipboard! ✉️", {
        description: "SAIFLATIFBUSINESS@GMAIL.COM",
      });
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast.error("Failed to copy email");
    }
  };

  const socialLinks = [
    { name: "LINKEDIN", url: "https://www.linkedin.com/in/saiflatifbusiness" },
    { name: "INSTAGRAM", url: "https://www.instagram.com/saiflatifbusiness/" },
  ];

  return (
    <footer id="section-contact" className="section is--footer" suppressHydrationWarning>
      <div className="container is--footer" suppressHydrationWarning>
        <div className="grid is--body" suppressHydrationWarning>
          {/* Top Section & Fluid Email */}
          <div className="grid_item is--contact--header" suppressHydrationWarning>
            <div className="grid_item is--contact--footer-caption w-full pr-4 md:pr-12" suppressHydrationWarning>
              <ScrollReveal as="div">
                <h2 className="heading">
                  LET&rsquo;S BUILD SOMETHING CINEMATIC.
                </h2>
              </ScrollReveal>

              <ScrollReveal as="div" delay={0.1}>
                <button
                  onClick={handleCopyEmail}
                  type="button"
                  className="footer-email w-inline-block text-left bg-transparent border-none p-0 cursor-pointer focus:outline-none w-full max-w-full group my-2 overflow-hidden"
                  title="Click to copy email address"
                >
                  <h1
                    className="display is--mail transition-opacity duration-300 group-hover:opacity-80 max-w-full"
                    style={{
                      fontSize: "clamp(1.1rem, 3.4vw, 4.2rem)",
                      lineHeight: "1.1",
                      letterSpacing: "-0.02em",
                      whiteSpace: "nowrap",
                      textTransform: "uppercase",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {copied ? "COPIED!" : "SAIFLATIFBUSINESS@GMAIL.COM"}
                  </h1>

                  <div className="mt-2 inline-flex items-center gap-2 font-mono text-xs text-black/60 font-medium">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 border ${
                        copied
                          ? "bg-black text-white border-black shadow-sm"
                          : "bg-black/5 text-black/80 border-black/15 group-hover:bg-black group-hover:text-white"
                      }`}
                    >
                      {copied ? "COPIED TO CLIPBOARD!" : "CLICK TO COPY EMAIL"}
                    </span>
                  </div>
                </button>
              </ScrollReveal>
            </div>

            {/* Massive Glassmorphism CTA Link */}
            <ScrollReveal as="div" delay={0.2} className="mt-8 mb-6">
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-between gap-6 px-8 py-4 sm:px-10 sm:py-5 bg-white/40 backdrop-blur-md border border-black/20 rounded-full font-sans font-black text-lg sm:text-xl md:text-2xl text-black uppercase tracking-tight shadow-sm hover:bg-black hover:text-white hover:scale-105 transition-all duration-300 active:scale-95"
                suppressHydrationWarning
              >
                <span>START A PROJECT</span>
                <span className="text-xl sm:text-2xl md:text-3xl transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1.5">
                  ↗
                </span>
              </Link>
            </ScrollReveal>
          </div>

          {/* Follow Me Section - Original Webflow Grid Layout */}
          <div className="grid_item is--contact--footer-caption _w-2" suppressHydrationWarning>
            <h5 className="heading md:ml-8">FOLLOw&nbsp;ME</h5>
          </div>
          <div className="grid_item is--contact--footer _w-5" suppressHydrationWarning>
            {socialLinks.map((link, index) => (
              <div key={index} className="link-wrapper" suppressHydrationWarning>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__link w-inline-block group"
                  suppressHydrationWarning
                >
                  <div className="link-wrapper__content">
                    <Image
                      src="/images/vector.svg"
                      alt="Right Black Arrow"
                      width={16}
                      height={16}
                      className="footer-link__arrow left transition-transform duration-300 group-hover:translate-x-1"
                      loading="lazy"
                    />
                    <h4 className="relative inline-block pb-0.5">
                      {link.name}
                      <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 ease-out group-hover:w-full" />
                    </h4>
                    <Image
                      src="/images/vector.svg"
                      alt="Right Black Arrow"
                      width={16}
                      height={16}
                      className="footer-link__arrow transition-transform duration-300 group-hover:translate-x-1"
                      loading="lazy"
                    />
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
