import React from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Preloader from "@/components/Preloader";

export default function Home() {
  return (
    <>
      <BottomNav />
      <div className="nav-home">
        <Navbar />
      </div>
      <div className="body-background"></div>
      <div className="page-wrapper">
        <Hero />
        <About />
        <Services />
        <Work />
        <Contact />
      </div>
      <Preloader />
    </>
  );
}
