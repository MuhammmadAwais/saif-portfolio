import React from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

interface ProjectItem {
  href: string;
  caption?: string;
  title: string;
  src?: string;
  alt: string;
}

export default function Work() {
  const projects: ProjectItem[] = [
    {
      href: "/project/asdasda",
      caption: "",
      title: "Hello",
      src: "",
      alt: "Hello",
    },
    {
      href: "/project/the-finlabs-website-redesign",
      caption: "Website Redesign",
      title: "The Finlabs Redesign",
      src: "/images/project-20-e2-80-93-20finlabs.png",
      alt: "The Finlabs Redesign",
    },
    {
      href: "/project/the-future-of-gradient",
      caption: "Branding",
      title: "The Future of Gradient",
      src: "/images/rectangle-205.png",
      alt: "The Future of Gradient",
    },
    {
      href: "/project/nike-shoe-app",
      caption: "Mobile App",
      title: "NIke Shoe App",
      src: "/images/rectangle-204.png",
      alt: "NIke Shoe App",
    },
  ];

  return (
    <div id="section-work" className="section w-dyn-list">
      <div role="list" className="w-dyn-items">
        {projects.map((project, index) => (
          <div
            key={index}
            role="listitem"
            className="container is--project w-dyn-item"
          >
            <Link href={project.href} className="grid is--proj w-inline-block">
              <div className="grid_item is--project__img">
                <ScrollReveal>
                  {project.src ? (
                    <Image
                      alt={project.alt}
                      src={project.src}
                      width={800}
                      height={600}
                      className="proj__img"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="proj__img w-dyn-bind-empty"
                      style={{
                        transform:
                          "translate3d(0, 0em, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0deg)",
                        opacity: 1,
                      }}
                    />
                  )}
                </ScrollReveal>
              </div>
              <div className="grid_item is--project__text-content">
                <div className="case__content-top">
                  <div className="is--pb-0-83em">
                    <p
                      className={
                        project.caption
                          ? "is--caption"
                          : "is--caption w-dyn-bind-empty"
                      }
                    >
                      {project.caption}
                    </p>
                  </div>
                  <h2>{project.title}</h2>
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
                  <div className="text-block">View Case Study</div>
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
