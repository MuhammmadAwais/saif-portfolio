"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const emailAddress = "SAIFLATIFBUSINESS@GMAIL.COM";

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      toast.success("Email copied to clipboard! 📋", {
        description: emailAddress,
        duration: 3000,
      });
      setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch (err) {
      console.error("Failed to copy email address:", err);
      toast.error("Failed to copy email address");
    }
  };

  const socialLinks = [
    { name: "LINKEDIN", url: "https://www.linkedin.com/in/saiflatifbusiness" },
    { name: "INSTAGRAM", url: "https://www.instagram.com/saiflatifbusiness/" },
  ];

  return (
    <footer id="section-contact" className="section is--footer">
      <div className="container is--footer">
        <div className="grid is--body">
          {/* Top Section & Fluid Email */}
          <div className="grid_item is--contact--header">
            <div className="grid_item is--contact--footer-caption w-full pr-4 md:pr-12">
              <h2 className="heading">
                LET&rsquo;S&nbsp;BUILD&nbsp;SOMETHING&nbsp;CINEMATIC.
              </h2>

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
            </div>

            {/* Massive Glassmorphism CTA Link */}
            <div className="mt-8 mb-6">
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-between gap-6 px-8 py-4 sm:px-10 sm:py-5 bg-white/40 backdrop-blur-md border border-black/20 rounded-full font-sans font-black text-lg sm:text-xl md:text-2xl text-black uppercase tracking-tight shadow-sm hover:bg-black hover:text-white hover:scale-105 transition-all duration-300 active:scale-95"
              >
                <span>START A PROJECT</span>
                <span className="text-xl sm:text-2xl md:text-3xl transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1.5">
                  ↗
                </span>
              </Link>
            </div>
          </div>

          {/* Follow Me Section - Original Webflow Grid Layout */}
          <div className="grid_item is--contact--footer-caption _w-2">
            <h5 className="heading ml-8">FOLLOw&nbsp;ME</h5>
          </div>
          <div className="grid_item is--contact--footer _w-5">
            {socialLinks.map((link, index) => (
              <div key={index} className="link-wrapper">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__link w-inline-block group"
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
