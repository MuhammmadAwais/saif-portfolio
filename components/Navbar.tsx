"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Lottie from "lottie-react";
import hamburgerData from "@/reference/js/lottieflow-menu-nav-11-1-000000-easey.json";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="section is--nav">
      <div className="container is--navbar">
        <div className="grid is--nav-top">
          <div className="grid_item is--nav-logo">
            <Link
              href="/"
              aria-current="page"
              className="nav_logo w-inline-block w--current"
            >
              <Image
                src="/images/intersect.png"
                alt="logo"
                width={50}
                height={50}
                priority
              />
            </Link>
          </div>
          <a
            href="#"
            onClick={toggleMenu}
            className="grid_item is--hamburger w-inline-block"
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
            className="grid_item is--menu"
            style={{ display: isMenuOpen ? "block" : undefined }}
          >
            <a
              href="#section-about-me"
              className="menu_button nav w-inline-block"
            >
              <div className="nav--button menu">
                <div className="menu-button--text">About Me</div>
              </div>
            </a>
            <a
              href="#section-services"
              className="menu_button nav w-inline-block"
            >
              <div className="nav--button menu">
                <div className="menu-button--text">Services</div>
              </div>
            </a>
            <a href="#section-work" className="menu_button nav w-inline-block">
              <div className="nav--button menu">
                <div className="menu-button--text">Projects</div>
              </div>
            </a>
            <a
              href="#section-contact"
              className="menu_button nav w-inline-block"
            >
              <div className="nav--button menu">
                <div className="menu-button--text">Contact</div>
              </div>
            </a>
            <a
              href="mailto:rehankhurshid1@gmail.com?subject=Hello.%20I%20have%20got%20a%20Project%20for%20you!"
              className="menu_button is--hide w-inline-block"
            >
              <div className="nav--button menu">
                <div className="menu-button--text">Get in Touch</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
