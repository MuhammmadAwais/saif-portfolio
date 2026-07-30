"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import hamburgerData from "@/reference/js/lottieflow-menu-nav-11-1-000000-easey.json";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 5) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav
      className={`section is--nav ${isMenuOpen ? "is--menu-open" : ""} ${
        isScrolled ? "is--scrolled" : ""
      }`}
      suppressHydrationWarning
    >
      <div className="container is--navbar" suppressHydrationWarning>
        <div className="grid is--nav-top" suppressHydrationWarning>
          <div
            className="grid_item is--nav-logo"
            style={{
              width: "auto",
              flex: "0 0 auto",
              display: "flex",
              alignItems: "center",
            }}
            suppressHydrationWarning
          >
            <Link
              href="/"
              aria-current="page"
              className="nav_logo w-inline-block w--current transition-transform duration-300 hover:scale-105 "
              style={{ display: "flex", alignItems: "center" }}
              suppressHydrationWarning
            >
              <Image
                src="/images/logo.png"
                alt="Saif Latif Logo"
                width={2049}
                height={466}
                priority
                style={{
                  width: "clamp(140px, 14vw, 175px)",
                  height: "auto",
                  objectFit: "contain",
                  maxWidth: "none",
                  display: "block",
                }}
                suppressHydrationWarning
              />
            </Link>
          </div>
          <a
            href="#"
            onClick={toggleMenu}
            className="grid_item is--hamburger w-inline-block transition-transform duration-300 hover:scale-105 active:scale-95"
            suppressHydrationWarning
          >
            <div className="hamburger_icon" suppressHydrationWarning>
              <Lottie
                animationData={hamburgerData}
                loop={false}
                autoplay={false}
              />
            </div>
            <div className="hamburger_desc-text" suppressHydrationWarning>Menu</div>
          </a>
          <div
            className={`grid_item is--menu ${isMenuOpen ? "is--open" : ""}`}
            suppressHydrationWarning
          >
            <a
              href="/#section-about-me"
              onClick={() => setIsMenuOpen(false)}
              className="menu_button nav w-inline-block transition-all duration-300 hover:scale-105"
              suppressHydrationWarning
            >
              <div className="nav--button menu transition-colors duration-300 hover:bg-black hover:text-white" suppressHydrationWarning>
                <div className="menu-button--text" suppressHydrationWarning>About Me</div>
              </div>
            </a>
            <a
              href="/#section-services"
              onClick={() => setIsMenuOpen(false)}
              className="menu_button nav w-inline-block transition-all duration-300 hover:scale-105"
              suppressHydrationWarning
            >
              <div className="nav--button menu transition-colors duration-300 hover:bg-black hover:text-white" suppressHydrationWarning>
                <div className="menu-button--text" suppressHydrationWarning>Services</div>
              </div>
            </a>
            <a
              href="/#section-work"
              onClick={() => setIsMenuOpen(false)}
              className="menu_button nav w-inline-block transition-all duration-300 hover:scale-105"
              suppressHydrationWarning
            >
              <div className="nav--button menu transition-colors duration-300 hover:bg-black hover:text-white" suppressHydrationWarning>
                <div className="menu-button--text" suppressHydrationWarning>Projects</div>
              </div>
            </a>
            <a
              href="/#section-contact"
              onClick={() => setIsMenuOpen(false)}
              className="menu_button nav w-inline-block transition-all duration-300 hover:scale-105"
              suppressHydrationWarning
            >
              <div className="nav--button menu transition-colors duration-300 hover:bg-black hover:text-white" suppressHydrationWarning>
                <div className="menu-button--text" suppressHydrationWarning>Contact</div>
              </div>
            </a>
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="menu_button w-inline-block transition-all duration-300 hover:scale-105 active:scale-95"
              suppressHydrationWarning
            >
              <div className="nav--button menu transition-all duration-300 hover:bg-black hover:text-white hover:shadow-lg" suppressHydrationWarning>
                <div className="menu-button--text" suppressHydrationWarning>Get in Touch</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
