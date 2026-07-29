import React from "react";
import Image from "next/image";

export default function Contact() {
  const socialLinks = [
    { name: "LINKEDIN", url: "https://www.linkedin.com/in/saiflatifbusiness" },
    { name: "INSTAGRAM", url: "https://www.instagram.com/saiflatifbusiness/" },
  ];

  return (
    <footer id="section-contact" className="section is--footer">
      <div className="container is--footer">
        <div className="grid is--body">
          <div className="grid_item is--contact--header">
            <div className="grid_item is--contact--footer-caption">
              <h2 className="heading">
                LET&rsquo;S&nbsp;BUILD&nbsp;SOMETHING&nbsp;CINEMATIC.
              </h2>
              <a
                href="mailto:SAIFLATIFBUSINESS@GMAIL.COM?subject=Hey.%20I%20would%20love%20to%20collaborate%20with%20you%20on%20a%20Project!"
                className="footer-email w-inline-block transition-opacity duration-300 hover:opacity-80"
              >
                <h1
                  className="display is--mail"
                  style={{
                    fontSize: "clamp(1.1rem, 3.6vw, 4.2rem)",
                    lineHeight: "1",
                    whiteSpace: "nowrap",
                    letterSpacing: "-0.02em",
                  }}
                >
                  SAIFLATIFBUSINESS@GMAIL.COM
                </h1>
              </a>
            </div>
          </div>
          <div className="grid_item is--contact--footer-caption _w-2">
            <h5 className="heading">FOLLOw&nbsp;ME</h5>
          </div>
          <div className="grid_item is--contact--footer _w-5">
            {socialLinks.map((link, index) => (
              <div key={index} className="link-wrapper">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__link w-inline-block group"
                >
                  <div className="link-wrapper__content">
                    <Image
                      src="/images/vector.svg"
                      alt="Right Black Arrow"
                      width={16}
                      height={16}
                      className="footer-link__arrow left transition-transform duration-300 group-hover:translate-x-1"
                      loading="lazy"
                    />
                    <h4>{link.name}</h4>
                    <Image
                      src="/images/vector.svg"
                      alt="Right Black Arrow"
                      width={16}
                      height={16}
                      className="footer-link__arrow transition-transform duration-300 group-hover:translate-x-1"
                      loading="lazy"
                    />
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
