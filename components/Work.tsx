"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.config({ force3D: true });

interface ProjectItem {
  href: string;
  caption?: string;
  title: string;
  src: string;
  alt: string;
}

export default function Work() {
  const workRef = useRef<HTMLDivElement>(null);

  // ── Hydration guard ────────────────────────────────────────────────────────
  // Bitdefender injects bis_skin_checked on <a> tags (attribute mismatch) and
  // a position:absolute <div> child inside image containers (element mismatch).
  // A separate AI-detector extension adds data-ai-detector-processed to <img>.
  // Rendering the image wrappers client-only eliminates the element-child throw.
  // suppressHydrationWarning on Link/Image handles the attribute mismatches.
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const projects: ProjectItem[] = [
    {
      href: "/work/showreel",
      caption: "SHOWREEL",
      title: "High-Velocity Post-Production Reel",
      src: "/images/projects/showreel.png",
      // SEO alt text: connects editor name + skill + project type
      alt: "High-velocity video editing showreel by Saif Latif — DaVinci Resolve post-production reel, Islamabad Pakistan",
    },
    {
      href: "/work/premium-real-estate-tour",
      caption: "REAL ESTATE",
      title: "High-Impact Property Tour",
      src: "/images/projects/real-estate.jpg",
      alt: "Cinematic luxury real estate video tour edited by Muhammad Saif Latif using DaVinci Resolve color grading",
    },
    {
      href: "/work/cinematic-color-grading",
      caption: "COLOR GRADING",
      title: "Nature & Atmosphere Grading",
      src: "/images/projects/color-grading.jpg",
      alt: "DaVinci Resolve color grading timeline — nature and atmosphere grade by Saif Latif, professional colorist",
    },
    {
      href: "/work/cinematic-wedding-teaser",
      caption: "WEDDING FILM",
      title: "Cinematic Emotional Teaser",
      src: "/images/projects/wedding.png",
      alt: "Cinematic wedding film teaser edited by Saif Latif — DaVinci Resolve color grade, Pakistan wedding videographer",
    },
  ];

  useEffect(() => {
    // Wait for image wrappers to mount before running GSAP
    if (!hasMounted || !workRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".project-img-wrapper").forEach((el) => {
        gsap.fromTo(
          el,
          {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            opacity: 0,
          },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            opacity: 1,
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );

        const img = el.querySelector("img");
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.15 },
            {
              scale: 1,
              duration: 1.3,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
    }, workRef);

    const timerId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      clearTimeout(timerId);
      ctx.revert();
    };
  }, [hasMounted]);

  // Interactive GSAP Cursor Magnetic & Hover Effect for Project Thumbnails
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const imgWrapper = card.querySelector<HTMLElement>(".project-img-wrapper");
    const img = card.querySelector<HTMLElement>(".proj__img");
    if (!img || !imgWrapper) return;

    const rect = imgWrapper.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    gsap.to(img, {
      x: x * 0.08,
      y: y * 0.08,
      rotation: (x / rect.width) * 4,
      scale: 1.08,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const img = card.querySelector<HTMLElement>(".proj__img");
    if (!img) return;

    gsap.to(img, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      duration: 0.7,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <section
      id="section-work"
      aria-label="Portfolio — Selected Work by Muhammad Saif Latif"
      ref={workRef}
      className="section w-dyn-list"
      suppressHydrationWarning
    >
      {/* Visually hidden heading for crawlers and accessibility */}
      <h2 className="sr-only">Selected Video Editing Work by Muhammad Saif Latif</h2>
      <div role="list" className="w-dyn-items" suppressHydrationWarning>
        {projects.map((project, index) => (
          <div
            key={index}
            role="listitem"
            className="container is--project w-dyn-item"
            suppressHydrationWarning
          >
            <Link
              href={project.href}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="grid is--proj w-inline-block group"
              // Suppresses bis_skin_checked attribute injected by Bitdefender
              // on every <a> tag — this is an attribute mismatch, not element.
              suppressHydrationWarning
            >
              <div className="grid_item is--project__img" suppressHydrationWarning>
                {/* Image wrapper rendered client-only: Bitdefender injects a
                  * position:absolute child div inside any positioned container
                  * that holds an image. suppressHydrationWarning cannot suppress
                  * element-child mismatches — only client-only render can. The
                  * initial style matches GSAP's from-state to prevent any flash. */}
                {hasMounted ? (
                  <div
                    className="project-img-wrapper overflow-hidden rounded-xl"
                    style={{
                      willChange: "clip-path, opacity, transform",
                      // Match GSAP fromTo initial state to prevent a 1-frame flash
                      opacity: 0,
                      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                    }}
                    suppressHydrationWarning
                  >
                    <Image
                      alt={project.alt}
                      src={project.src}
                      width={800}
                      height={600}
                      className="proj__img object-cover w-full h-full"
                      loading="lazy"
                      style={{ willChange: "transform" }}
                      // Suppresses data-ai-detector-processed attribute
                      // injected by AI-image-detector browser extensions
                      suppressHydrationWarning
                    />
                  </div>
                ) : (
                  // Placeholder keeps grid layout stable during SSR and before
                  // first client paint — same dimensions, invisible.
                  <div
                    className="project-img-wrapper overflow-hidden rounded-xl"
                    style={{ opacity: 0, minHeight: "1px" }}
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className="grid_item is--project__text-content" suppressHydrationWarning>
                <div className="case__content-top" suppressHydrationWarning>
                  <div className="is--pb-0-83em" suppressHydrationWarning>
                    <p className="is--caption text-black/60">{project.caption}</p>
                  </div>
                  <h2 className="text-black transition-colors duration-300 group-hover:text-neutral-700">
                    {project.title}
                  </h2>
                </div>
                <div className="link-wrapper__content-copy" suppressHydrationWarning>
                  <Image
                    src="/images/vector.svg"
                    alt="Right Black Arrow"
                    width={16}
                    height={16}
                    className="footer-link__arrow left transition-transform duration-300 group-hover:translate-x-1"
                    loading="lazy"
                  />
                  <div className="text-block text-neutral-900 font-medium">
                    View Case Study
                  </div>
                  <Image
                    src="/images/vector.svg"
                    alt="Right Black Arrow"
                    width={16}
                    height={16}
                    className="footer-link__arrow transition-transform duration-300 group-hover:translate-x-1"
                    loading="lazy"
                  />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
