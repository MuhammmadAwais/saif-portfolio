"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.config({ force3D: true });

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);

  const headings = [
    { text: "WHERE", leftClass: "" },
    { text: "Raw Clips", leftClass: "is--5-6em-left" },
    { text: "BECOMES", leftClass: "" },
    { text: "Cinematics", leftClass: "is--5-6em-left" },
  ];

  const floatingImages = [
    {
      src: "/images/6.png",
      alt: "cone",
      className: "hero__element-img _1",
      width: 180,
      height: 180,
    },
    {
      src: "/images/1.png",
      alt: "steel-1",
      className: "hero__element-img _2",
      width: 220,
      height: 220,
    },
    {
      src: "/images/3.png",
      alt: "steel",
      className: "hero__element-img _3",
      width: 240,
      height: 240,
    },
  ];

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Hero Stagger Load Animation (Characters sliding up from clip-path mask)
      gsap.fromTo(
        ".hero-char",
        {
          y: "115%",
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        },
        {
          y: "0%",
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.95,
          ease: "power4.out",
          stagger: 0.03,
          delay: 0.15,
        },
      );

      // 2. Initial fade and scale in for 3D decorative shapes
      gsap.fromTo(
        ".hero-interactive-img",
        {
          opacity: 0,
          scale: 0.6,
          filter: "blur(6px)",
        },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.15,
          delay: 0.25,
        },
      );

      // 3. ScrollTrigger Parallax Effect for 3D Decorative Shapes
      imgRefs.current.forEach((el, idx) => {
        if (!el) return;
        const speed = (idx + 1) * 60;
        gsap.to(el, {
          y: -speed,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      });
    }, heroRef);

    // 4. Cursor Proximity / Magnetic Interaction for 3D Decorative Shapes
    const handleMouseMove = (e: MouseEvent) => {
      imgRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxDistance = 350;

        if (distance < maxDistance) {
          const power = (1 - distance / maxDistance) * 28;
          const moveX = (deltaX / distance) * -power;
          const moveY = (deltaY / distance) * -power;
          const rotate = (deltaX / maxDistance) * 12;

          gsap.to(el, {
            x: moveX,
            rotation: rotate,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
          });
        } else {
          gsap.to(el, {
            x: 0,
            rotation: 0,
            duration: 0.7,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    const timerId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      clearTimeout(timerId);
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={heroRef} className="section is--hero" suppressHydrationWarning>
      <div className="container is--hero" suppressHydrationWarning>
        <div
          className="grid_item is--sticky-logo"
          style={{
            width: "auto",
            flex: "0 0 auto",
            display: "flex",
            alignItems: "center",
          }}
          suppressHydrationWarning
        >
     
        </div>
        <div className="grid is--body is--hero" suppressHydrationWarning>
          {floatingImages.map((img, index) => (
            <div key={index} className={img.className} suppressHydrationWarning>
              <div
                ref={(el) => {
                  imgRefs.current[index] = el;
                }}
                className="hero-interactive-img w-full h-full flex items-center justify-center"
                style={{ willChange: "transform", position: "relative" }}
                suppressHydrationWarning
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  className="w-full h-full object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  suppressHydrationWarning
                />
              </div>
            </div>
          ))}

          {headings.map((item, index) => (
            <div
              key={index}
              className={`grid_item is--hero-text ${item.leftClass}`.trim()}
              suppressHydrationWarning
            >
              <h1 className="display" aria-label={item.text} suppressHydrationWarning>
                {item.text.split("").map((char, charIdx) => (
                  <span
                    key={charIdx}
                    className="inline-block overflow-hidden"
                    style={{ verticalAlign: "bottom" }}
                    suppressHydrationWarning
                  >
                    <span
                      className="hero-char inline-block"
                      style={{
                        transform: "translateY(115%)",
                        clipPath:
                          "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                        willChange: "transform, clip-path",
                      }}
                      suppressHydrationWarning
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  </span>
                ))}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
