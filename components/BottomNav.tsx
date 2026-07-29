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
              className="nav--link is--bp-0-42em w-inline-block"
            >
              <div className="link--text">{item.label}</div>
              <div className="lottie-animation">
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
            className="menu_button w-inline-block"
          >
            <div className="nav--button is--bottom">
              <div className="button--text">Get In Touch</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
