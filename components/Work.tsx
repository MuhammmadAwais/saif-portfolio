"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProjectItem {
  href: string;
  caption?: string;
  title: string;
  src: string;
  alt: string;
}

export default function Work() {
  const workRef = useRef<HTMLDivElement>(null);

  const projects: ProjectItem[] = [
    {
      href: "#section-work",
      caption: "SHOWREEL",
      title: "High-Velocity Post-Production Reel",
      src: "/images/projects/showreel.png",
      alt: "High-Velocity Post-Production Reel",
    },
    {
      href: "#section-work",
      caption: "REAL ESTATE",
      title: "High-Impact Property Tour",
      src: "/images/projects/real-estate.jpg",
      alt: "High-Impact Property Tour",
    },
    {
      href: "#section-work",
      caption: "COLOR GRADING",
      title: "Nature & Atmosphere Grading",
      src: "/images/projects/color-grading.jpg",
      alt: "Nature & Atmosphere Grading",
    },
    {
      href: "#section-work",
      caption: "WEDDING FILM",
      title: "Cinematic Emotional Teaser",
      src: "/images/projects/wedding.png",
      alt: "Cinematic Emotional Teaser",
    },
  ];

  useEffect(() => {
    if (!workRef.current) return;

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

    return () => ctx.revert();
  }, []);

  return (
    <div id="section-work" ref={workRef} className="section w-dyn-list">
      <div role="list" className="w-dyn-items">
        {projects.map((project, index) => (
          <div
            key={index}
            role="listitem"
            className="container is--project w-dyn-item"
          >
            <Link
              href={project.href}
              className="grid is--proj w-inline-block group"
            >
              <div className="grid_item is--project__img">
                <div
                  className="project-img-wrapper overflow-hidden"
                  style={{
                    willChange: "clip-path, opacity",
                  }}
                >
                  <Image
                    alt={project.alt}
                    src={project.src}
                    width={800}
                    height={600}
                    className="proj__img transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="grid_item is--project__text-content">
                <div className="case__content-top">
                  <div className="is--pb-0-83em">
                    <p className="is--caption text-black/60">{project.caption}</p>
                  </div>
                  <h2 className="text-black">{project.title}</h2>
                </div>
                <div className="link-wrapper__content-copy">
                  <Image
                    src="/images/vector.svg"
                    alt="Right Black Arrow"
                    width={16}
                    height={16}
                    className="footer-link__arrow left"
                    loading="lazy"
                  />
                  <div className="text-block text-neutral-900">View Case Study</div>
                  <Image
                    src="/images/vector.svg"
                    alt="Right Black Arrow"
                    width={16}
                    height={16}
                    className="footer-link__arrow"
                    loading="lazy"
                  />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
