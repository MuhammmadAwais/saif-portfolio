"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [animationData, setAnimationData] = useState<unknown>(null);

  useEffect(() => {
    let isMounted = true;
    import("@/reference/js/333-loader-4-edited.json")
      .then((mod) => {
        if (isMounted) {
          setAnimationData(mod.default || mod);
        }
      })
      .catch((err) => {
        console.error("Failed to load preloader animation", err);
      });

    const timer = setTimeout(() => {
      if (isMounted) {
        setIsLoading(false);
      }
    }, 2000);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
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
      suppressHydrationWarning
    >
      <div className="preloader-content" suppressHydrationWarning>
        <div className="lottie-animation-2" suppressHydrationWarning>
          {animationData ? (
            <Lottie
              animationData={animationData}
              loop={false}
              autoplay={true}
              onComplete={() => setIsLoading(false)}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
