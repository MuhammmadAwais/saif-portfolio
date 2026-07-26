"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const MotionImage = motion(Image);

export default function Hero() {
  const headings = [
    { text: "Visual ", leftClass: "" },
    { text: "DESIGNER", leftClass: "is--5-6em-left" },
    { text: "BASED IN", leftClass: "" },
    { text: "NEw\u00A0YORK", leftClass: "is--5-6em-left" },
  ];

  const floatingImages = [
    {
      src: "/images/6.png",
      alt: "cone",
      className: "hero__element-img _1",
      width: 320,
      height: 320,
      delay: 0.2,
    },
    {
      src: "/images/1.png",
      alt: "steel-1",
      className: "hero__element-img _2",
      width: 320,
      height: 320,
      delay: 0.35,
    },
    {
      src: "/images/3.png",
      alt: "steel",
      className: "hero__element-img _3",
      width: 320,
      height: 320,
      delay: 0.5,
    },
  ];

  return (
    <section className="section is--hero">
      <div className="container is--hero">
        <div className="grid_item is--sticky-logo">
          <a
            href="/"
            aria-current="page"
            className="nav_logo w-inline-block w--current"
          >
            <Image
              src="/images/intersect.png"
              alt="logo"
              width={60}
              height={60}
              priority
            />
          </a>
        </div>
        <div className="grid is--body is--hero">
          {floatingImages.map((img, index) => (
            <MotionImage
              key={index}
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              className={img.className}
              priority
              style={{
                transform:
                  "translate3d(0, 0, 0) scale3d(0, 0, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
              }}
              initial={{
                opacity: 0,
                scale: 0,
                filter: "blur(5px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 1.1,
                ease: [0.16, 1, 0.3, 1],
                delay: img.delay,
              }}
            />
          ))}

          {headings.map((item, index) => (
            <div
              key={index}
              className={`grid_item is--hero-text ${item.leftClass}`.trim()}
            >
              <motion.h1
                className="display"
                style={{
                  transformStyle: "preserve-3d",
                  transform:
                    "translate3d(0, 160px, 0) scale3d(1, 1, 1) rotateX(-60deg) rotateY(0) rotateZ(0) skew(0, 0)",
                }}
                initial={{
                  opacity: 0,
                  y: 160,
                  rotateX: -60,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.1 * index,
                }}
              >
                {item.text}
              </motion.h1>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
