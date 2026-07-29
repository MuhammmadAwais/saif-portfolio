import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Preloader from "@/components/Preloader";
import ContactPageSection from "@/components/contact-page/ContactPageSection";

export const metadata: Metadata = {
  title: "Get in Touch — Saif Latif",
  description:
    "Connect with Saif Latif — Dynamic Editor and Colorist. Let's build something cinematic together.",
};

export default function ContactPage() {
  return (
    <>
      <BottomNav />
      <div className="nav-home">
        <Navbar />
      </div>
      <div className="body-background"></div>
      <div className="page-wrapper min-h-screen">
        <ContactPageSection />
      </div>
      <Preloader />
    </>
  );
}
