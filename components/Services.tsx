import React from "react";
import ScrollReveal from "./ScrollReveal";

export default function Services() {
  return (
    <section id="section-services" className="section">
      <div className="container">
        <div className="grid is--body">
          <div className="grid_item is--service__header">
            <h2 className="heading">SERVICES&nbsp;I&nbsp;CAN&nbsp;HELP&nbsp;YOU&nbsp;WITH</h2>
          </div>
          <div className="grid_item is--service-text">
            <ScrollReveal as="h2" className="is--service-text-content">
              ART&nbsp;DIRECTION. BRANDING. ICONOGRAPHY. MOTION. UI/UX. WEBSITES.
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
