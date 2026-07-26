import React from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <section id="section-about-me" className="section">
      <div className="container">
        <div className="grid is--body">
          <div className="grid_item is--about__header">
            <h2 className="heading">ABOUT&nbsp;ME</h2>
          </div>
          <div className="grid_item is--about__para-3">
            <ScrollReveal as="p" className="is--big">
              Hi, my name is Wade Warren, a multidisciplinary designer &amp; art
              director based in New York. With a passion for well-crafted
              (digital) experiences, I believe in beauty to empower ideas.
            </ScrollReveal>
          </div>
          <div className="grid_item is--about__img">
            <Image
              src="/images/rectangle-202.png"
              alt="designer photo"
              width={600}
              height={700}
              className="about__img"
              loading="lazy"
            />
          </div>
          <div className="grid_item is--about__para-4 is--pt-4-58em">
            <ScrollReveal as="p" delay={0.1} className="is--big">
              I create delightful and intuitive human-centered experiences at
              scale through innovation and product strategy
            </ScrollReveal>
          </div>
          <div className="grid_item is--about__para-5 is--pt-4-58em">
            <ScrollReveal as="p" delay={0.2} className="is--big">
              I&rsquo;m big on branding, art direction, UX, UI, motion graphics
              and anything else that tells a visual story. If you want to see
              what that looks like in action, please scroll on.
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
