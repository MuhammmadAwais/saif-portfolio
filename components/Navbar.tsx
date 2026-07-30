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
    >
      <div className="container is--navbar">
        <div className="grid is--nav-top">
          <div
            className="grid_item is--nav-logo"
            style={{
              width: "auto",
              flex: "0 0 auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link
              href="/"
              aria-current="page"
              className="nav_logo w-inline-block w--current transition-transform duration-300 hover:scale-105 "
              style={{ display: "flex", alignItems: "center" }}
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
              />
            </Link>
          </div>
          <a
            href="#"
            onClick={toggleMenu}
            className="grid_item is--hamburger w-inline-block transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            <div className="hamburger_icon">
              <Lottie
                animationData={hamburgerData}
                loop={false}
                autoplay={false}
              />
            </div>
            <div className="hamburger_desc-text">Menu</div>
          </a>
          <div
            className={`grid_item is--menu ${isMenuOpen ? "is--open" : ""}`}
          >
            <a
              href="/#section-about-me"
              onClick={() => setIsMenuOpen(false)}
              className="menu_button nav w-inline-block transition-all duration-300 hover:scale-105"
            >
              <div className="nav--button menu transition-colors duration-300 hover:bg-black hover:text-white">
                <div className="menu-button--text">About Me</div>
              </div>
            </a>
            <a
              href="/#section-services"
              onClick={() => setIsMenuOpen(false)}
              className="menu_button nav w-inline-block transition-all duration-300 hover:scale-105"
            >
              <div className="nav--button menu transition-colors duration-300 hover:bg-black hover:text-white">
                <div className="menu-button--text">Services</div>
              </div>
            </a>
            <a
              href="/#section-work"
              onClick={() => setIsMenuOpen(false)}
              className="menu_button nav w-inline-block transition-all duration-300 hover:scale-105"
            >
              <div className="nav--button menu transition-colors duration-300 hover:bg-black hover:text-white">
                <div className="menu-button--text">Projects</div>
              </div>
            </a>
            <a
              href="/#section-contact"
              onClick={() => setIsMenuOpen(false)}
              className="menu_button nav w-inline-block transition-all duration-300 hover:scale-105"
            >
              <div className="nav--button menu transition-colors duration-300 hover:bg-black hover:text-white">
                <div className="menu-button--text">Contact</div>
              </div>
            </a>
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="menu_button w-inline-block transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <div className="nav--button menu transition-all duration-300 hover:bg-black hover:text-white hover:shadow-lg">
                <div className="menu-button--text">Get in Touch</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
