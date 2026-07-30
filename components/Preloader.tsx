"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import loaderAnimation from "@/reference/js/333-loader-4-edited.json";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) {
    return null;
  }

  return (
    <div
      className="preloader"
      style={{
        transform: "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
        display: "block",
      }}
    >
      <div className="preloader-content">
        <div className="lottie-animation-2">
          <Lottie
            animationData={loaderAnimation}
            loop={false}
            autoplay={true}
            onComplete={() => setIsLoading(false)}
          />
        </div>
      </div>
    </div>
  );
}
