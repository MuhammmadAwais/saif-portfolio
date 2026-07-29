"use client";

import React from "react";
import Link from "next/link";
import Lottie from "lottie-react";
import dataJson from "@/reference/js/data.json";

export default function BottomNav() {
  const links = [
    { href: "/#section-about-me", label: "About" },
    { href: "/#section-services", label: "Services" },
    { href: "/#section-work", label: "Work" },
    { href: "/#section-contact", label: "Contact" },
  ];

  return (
    <div className="container is--navbar-bottom">
      <div className="grid is--nav-bottom">
        <div className="grid_item is--menu-bottom">
          {links.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="nav--link is--bp-0-42em w-inline-block group transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
            >
              <div className="relative inline-block link--text transition-colors duration-300 group-hover:text-black font-semibold">
                <span>{item.label}</span>
                <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-black transition-all duration-300 ease-out group-hover:w-full" />
              </div>
              <div className="lottie-animation transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                <Lottie
                  animationData={dataJson}
                  loop={false}
                  autoplay={false}
                />
              </div>
            </a>
          ))}
        </div>
        <div className="grid_item is--menu__bottom">
          <Link
            href="/contact"
            className="menu_button w-inline-block group transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <div className="nav--button is--bottom transition-all duration-300 group-hover:bg-black group-hover:text-white group-hover:shadow-2xl">
              <div className="button--text">Get In Touch</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
