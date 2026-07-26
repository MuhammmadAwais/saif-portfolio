import React from "react";
import Image from "next/image";

export default function Contact() {
  const socialLinks = [
    { name: "LINKEDIN", url: "https://www.linkedin.com/in/rehankhurshid" },
    { name: "INSTAGRAM", url: "https://www.instagram.com/rehandesign/" },
    { name: "DRIBBBLE", url: "https://dribbble.com/rehankhurshid" },
    { name: "BEHANCE", url: "https://www.behance.net/rehankhurshid" },
  ];

  return (
    <footer id="section-contact" className="section is--footer">
      <div className="container is--footer">
        <div className="grid is--body">
          <div className="grid_item is--contact--header">
            <div className="grid_item is--contact--footer-caption">
              <h2 className="heading">GET&nbsp;IN&nbsp;TOUCH</h2>
              <a
                href="mailto:rehankhurshid1@gmail.com?subject=Hey.%20I%20would%20love%20to%20collaborate%20with%20you%20%20on%20Project.%20%20%5B%5Babout%20your"
                className="footer-email w-inline-block"
              >
                <h1 className="display is--mail">
                  HELLO@<br />
                  WARREN.COM
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
                  className="footer__link w-inline-block"
                >
                  <div className="link-wrapper__content">
                    <Image
                      src="/images/vector.svg"
                      alt="Right Black Arrow"
                      width={16}
                      height={16}
                      className="footer-link__arrow left"
                      loading="lazy"
                    />
                    <h4>{link.name}</h4>
                    <Image
                      src="/images/vector.svg"
                      alt="Right Black Arrow"
                      width={16}
                      height={16}
                      className="footer-link__arrow"
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
