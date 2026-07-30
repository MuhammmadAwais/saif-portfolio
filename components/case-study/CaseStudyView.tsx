"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CaseStudy } from "@/data/caseStudies";

gsap.registerPlugin(ScrollTrigger);

interface CaseStudyViewProps {
  caseStudy: CaseStudy;
}

const formatTime = (seconds: number) => {
  if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

export default function CaseStudyView({ caseStudy }: CaseStudyViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const bentoGridRef = useRef<HTMLDivElement>(null);
  const nextProjectRef = useRef<HTMLDivElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isEnded, setIsEnded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isHoveringVideo, setIsHoveringVideo] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerControlsVisibility = useCallback(() => {
    setIsHoveringVideo(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      setIsHoveringVideo(false);
    }, 2500);
  }, []);

  // GSAP animations with safe scroll trigger and clearProps so nothing ever stays hidden
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Header fade up
      const headerElements = heroTextRef.current?.querySelectorAll(".animate-header");
      if (headerElements && headerElements.length > 0) {
        gsap.from(headerElements, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "all",
        });
      }

      // 2. Video section entrance
      if (videoContainerRef.current) {
        gsap.fromTo(
          videoContainerRef.current,
          { scale: 0.96, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: videoContainerRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 3. Bento cards staggered entrance
      const cards = bentoGridRef.current?.querySelectorAll(".bento-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: "power3.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: bentoGridRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 4. Next Project Card entrance
      if (nextProjectRef.current) {
        gsap.fromTo(
          nextProjectRef.current,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: nextProjectRef.current,
              start: "top 96%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [caseStudy.slug]);

  // Handle autoplay muted on mount
  useEffect(() => {
    setIsEnded(false);
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.muted = true;
      setIsMuted(true);
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            setIsPlaying(false);
          });
      }
    }
  }, [caseStudy.videoUrl]);

  // Optimized Video Event Handlers with useCallback
  const handlePlayPause = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.paused || isEnded) {
      if (isEnded) {
        videoRef.current.currentTime = 0;
        setIsEnded(false);
      }
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => setIsPlaying(true));
      }
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isEnded]);

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    if (videoRef.current.duration && isFinite(videoRef.current.duration)) {
      setDuration(videoRef.current.duration);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.duration && isFinite(videoRef.current.duration)) {
      setDuration(videoRef.current.duration);
    }
  }, []);

  const handleVideoEnded = useCallback(() => {
    setIsEnded(true);
    setIsPlaying(false);
  }, []);

  const handleReplay = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    setIsEnded(false);
    const playPromise = videoRef.current.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        setIsPlaying(true);
      });
    }
  }, []);

  const handleSeekClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * (duration || 1);
    if (!videoRef.current) return;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }, [duration]);

  const toggleFullscreen = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoContainerRef.current) return;
    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
    }
  }, []);

  // ==========================================
  // 3D MAGNETIC TILTING GSAP EFFECT FOR BENTO CARDS
  // ==========================================
  const handleCardMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      const rotateX = -(y / (rect.height / 2)) * 7.5;
      const rotateY = (x / (rect.width / 2)) * 7.5;

      gsap.to(card, {
        rotateX,
        rotateY,
        scale: 1.015,
        transformPerspective: 1200,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });

      // Subtle parallax depth on background glow element inside the card
      const glow = card.querySelector<HTMLElement>(".card-glow");
      if (glow) {
        gsap.to(glow, {
          x: x * 0.15,
          y: y * 0.15,
          duration: 0.45,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    },
    []
  );

  const handleCardMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.7,
        ease: "power2.out",
        overwrite: "auto",
        clearProps: "transform",
      });

      const glow = card.querySelector<HTMLElement>(".card-glow");
      if (glow) {
        gsap.to(glow, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    },
    []
  );

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      id="case-study-view"
      ref={containerRef}
      className="w-full relative z-10 pt-36 sm:pt-40 md:pt-44 pb-6"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ==========================================
            1. TOP NAVIGATION HEADER (ALL BLACK TEXT & PROPER TOP SPACING)
            ========================================== */}
        <div ref={heroTextRef} className="flex flex-col gap-6 mb-10 md:mb-12">
          {/* Top Bar: Back Button + Category Pill */}
          <div className="flex flex-wrap items-center justify-between gap-4 animate-header">
            <Link
              href="/#section-work"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/90 hover:bg-black hover:text-white border border-black/15 hover:border-black transition-all duration-300 text-sm font-semibold text-neutral-900 shadow-md backdrop-blur-md"
            >
              <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1.5">
                &larr;
              </span>
              <span>Back to Work</span>
            </Link>

            <div className="inline-flex items-center px-5 py-2 rounded-full bg-black text-white text-xs md:text-sm font-black uppercase tracking-widest shadow-md">
              {caseStudy.category}
            </div>
          </div>

          {/* Project Title (CRISP BLACK TYPOGRAPHY) */}
          <h1 className="case-study-hero-title animate-header text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-black leading-[1.12] sm:leading-none break-normal">
            {caseStudy.title}
          </h1>

          {/* Quick Metadata Strip: Role | DaVinci Resolve Badge | Duration */}
          <div className="animate-header flex flex-wrap items-center gap-3 sm:gap-4 pt-4 border-t border-black/10 text-xs sm:text-sm text-neutral-800 font-medium">
            {/* Role Badge */}
            <div className="flex items-center gap-2.5 bg-white/70 border border-black/10 px-4 py-2 rounded-full text-black font-semibold shadow-sm backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Role: {caseStudy.role}</span>
            </div>

            {/* Software Badge with DaVinci Resolve Logo */}
            <div className="flex items-center gap-2 bg-white/80 border border-black/15 px-4 py-2 rounded-full text-black font-semibold shadow-sm hover:border-black/30 transition-all backdrop-blur-md">
              <Image
                src="/images/davinci-resolve-seeklogo.png"
                alt="DaVinci Resolve"
                width={20}
                height={20}
                className="w-4 h-4 object-contain"
                sizes="20px"
              />
              <span>DaVinci Resolve 21</span>
            </div>

            {/* Duration Badge */}
            <div className="flex items-center gap-2 bg-white/70 border border-black/10 px-4 py-2 rounded-full text-black font-semibold shadow-sm backdrop-blur-md">
              <span className="text-neutral-600 font-normal">Duration:</span>
              <span className="font-bold text-black">{caseStudy.duration}</span>
            </div>
          </div>
        </div>

        {/* ==========================================
            2. HERO VIDEO SECTION WITH CUSTOM CONTROLS & END OVERLAY
            ========================================== */}
        <div
          ref={videoContainerRef}
          onMouseEnter={triggerControlsVisibility}
          onMouseMove={triggerControlsVisibility}
          onMouseLeave={() => setIsHoveringVideo(false)}
          onTouchStart={triggerControlsVisibility}
          onClick={() => {
            triggerControlsVisibility();
            handlePlayPause();
          }}
          className="relative aspect-video w-full rounded-2xl md:rounded-3xl overflow-hidden border border-black/15 bg-black shadow-2xl group my-8 md:my-10 cursor-pointer select-none"
          style={{ willChange: "transform, opacity" }}
        >
          {/* HTML5 Video Element */}
          <video
            ref={videoRef}
            src={caseStudy.videoUrl}
            poster={caseStudy.thumbnailUrl}
            preload="metadata"
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleVideoEnded}
            onPlay={() => {
              setIsPlaying(true);
              setIsEnded(false);
              triggerControlsVisibility();
            }}
            onPause={() => setIsPlaying(false)}
            className="w-full h-full object-contain bg-black rounded-2xl md:rounded-3xl"
          />

          {/* Top Mute / Unmute Quick Overlay Button */}
          {!isEnded && (
            <button
              onClick={toggleMute}
              type="button"
              className="absolute top-4 right-4 z-30 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/75 hover:bg-black border border-white/20 hover:border-white/40 text-xs sm:text-sm font-bold text-white backdrop-blur-xl shadow-lg transition-all duration-300 hover:scale-105"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                <>
                  <svg
                    className="w-4 h-4 text-amber-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                    />
                  </svg>
                  <span>UNMUTE</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4 text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                    />
                  </svg>
                  <span>MUTE</span>
                </>
              )}
            </button>
          )}

          {/* CUSTOM GLASSMORPHISM BOTTOM VIDEO CONTROLS BAR */}
          {!isEnded && (
            <div
              onClick={(e) => e.stopPropagation()}
              className={`absolute bottom-4 left-4 right-4 z-30 bg-black/75 backdrop-blur-2xl border border-white/20 rounded-2xl px-5 py-3.5 flex flex-col gap-2.5 text-white shadow-2xl transition-all duration-300 ${
                !isPlaying
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2 pointer-events-none"
              }`}
            >
              {/* Seeker / Duration Progress Bar */}
              <div
                onClick={handleSeekClick}
                className="w-full h-2 bg-white/20 rounded-full cursor-pointer relative overflow-hidden group/progress"
              >
                <div
                  className="h-full bg-white group-hover/progress:bg-amber-400 transition-all duration-100 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Bottom Control Buttons: Play/Pause | Time | Mute | Fullscreen */}
              <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                <div className="flex items-center gap-4">
                  {/* Play / Pause Toggle Button */}
                  <button
                    onClick={() => handlePlayPause()}
                    type="button"
                    className="p-1 hover:text-amber-400 transition-colors"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <svg
                        className="w-5 h-5 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>

                  {/* Current Time / Duration Display */}
                  <span className="text-neutral-300 font-mono tracking-wide">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {/* Mute Button */}
                  <button
                    onClick={toggleMute}
                    type="button"
                    className="p-1 hover:text-amber-400 transition-colors"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <svg
                        className="w-5 h-5 text-amber-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                        />
                      </svg>
                    )}
                  </button>

                  {/* Fullscreen Button */}
                  <button
                    onClick={toggleFullscreen}
                    type="button"
                    className="p-1 hover:text-amber-400 transition-colors"
                    aria-label="Toggle Fullscreen"
                  >
                    <svg
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              VIDEO ENDED STATE: THUMBNAIL OVERLAY + ELEGANT REPLAY BUTTON (ZERO TEXT)
              ========================================== */}
          {isEnded && (
            <div className="absolute inset-0 z-30 flex items-center justify-center overflow-hidden bg-black/30 backdrop-blur-[1px] transition-all duration-500 animate-fadeIn">
              {/* Beautiful Full Thumbnail Image */}
              <Image
                src={caseStudy.thumbnailUrl}
                alt={caseStudy.title}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover opacity-90"
              />
              {/* Subtle Vignette Overlay so Button Pops */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/50"></div>

              {/* Elegant Replay CTA Button - Exactly as requested */}
              <button
                onClick={handleReplay}
                type="button"
                className="relative z-40 group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-black font-black uppercase text-sm tracking-widest hover:bg-black hover:text-white border border-black/10 transition-all duration-300 shadow-2xl hover:scale-105"
              >
                <svg
                  className="w-5 h-5 fill-current transition-transform duration-300 group-hover:rotate-180"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
                </svg>
                <span>Replay Video</span>
              </button>
            </div>
          )}
        </div>

        {/* ==========================================
            3. BENTO GRID CONTENT SECTION (TRUE GLASSMORPHISM + 3D GSAP TILTING HOVER)
            - Row 1: Cards 1 & 2 side-by-side on desktop (2-column flexbox wrapper)
            - Row 2: Card 3 full-width (w-full)
            - Row 3: Card 4 full-width (w-full, EXACT same width as Card 3)
            ========================================== */}
        <div ref={bentoGridRef} className="my-10 md:my-12 w-full">
          {/* Row 1: Challenge & Solution Side-by-Side in Columns on Desktop (Flexbox guaranteed 2-col) */}
          <div
            className="flex flex-col md:flex-row gap-6 w-full mb-6 items-stretch"
            style={{ display: "flex", width: "100%" }}
          >
            {/* Card 1: The Challenge (Left Column on Desktop) */}
            <div
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="bento-card flex-1 w-full md:w-1/2 bg-black/[0.04] backdrop-blur-2xl border border-black/15 hover:border-black/30 transition-colors duration-300 rounded-3xl p-8 md:p-10 flex flex-col justify-between shadow-lg hover:shadow-2xl relative overflow-hidden group cursor-default"
              style={{
                flex: "1 1 0%",
                minWidth: 0,
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
            >
              <div className="card-glow absolute top-0 right-0 w-44 h-44 bg-black/5 rounded-full blur-3xl pointer-events-none group-hover:bg-black/10 transition-colors duration-500"></div>
              <div className="relative z-10">
                <div className="inline-block px-3.5 py-1.5 rounded-full bg-black text-white text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
                  01 / THE CHALLENGE
                </div>
                <p className="text-neutral-950 leading-relaxed text-base md:text-lg font-medium">
                  {caseStudy.challenge}
                </p>
              </div>
              <div className="relative z-10 mt-8 pt-4 border-t border-black/15 flex items-center justify-between text-xs text-neutral-600 uppercase tracking-wider font-bold">
                <span>Problem Statement</span>
                <span>Visual Flow</span>
              </div>
            </div>

            {/* Card 2: The Solution (Right Column on Desktop) */}
            <div
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="bento-card flex-1 w-full md:w-1/2 bg-black/[0.04] backdrop-blur-2xl border border-black/15 hover:border-black/30 transition-colors duration-300 rounded-3xl p-8 md:p-10 flex flex-col justify-between shadow-lg hover:shadow-2xl relative overflow-hidden group cursor-default"
              style={{
                flex: "1 1 0%",
                minWidth: 0,
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
            >
              <div className="card-glow absolute top-0 right-0 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/15 transition-colors duration-500"></div>
              <div className="relative z-10">
                <div className="inline-block px-3.5 py-1.5 rounded-full bg-black text-white text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
                  02 / THE STRATEGY &amp; SOLUTION
                </div>
                <p className="text-neutral-950 leading-relaxed text-base md:text-lg font-medium">
                  {caseStudy.solution}
                </p>
              </div>
              <div className="relative z-10 mt-8 pt-4 border-t border-black/15 flex items-center justify-between text-xs text-neutral-600 uppercase tracking-wider font-bold">
                <span>Editorial Strategy</span>
                <span>Execution</span>
              </div>
            </div>
          </div>

          {/* Row 2: Card 3 (Toolkit & Tech - 100% Full Width + 3D GSAP Tilt) */}
          <div
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            className="bento-card w-full mb-6 bg-black/[0.04] backdrop-blur-2xl border border-black/15 hover:border-black/30 transition-colors duration-300 rounded-3xl p-8 md:p-10 flex flex-col justify-between shadow-lg hover:shadow-2xl relative overflow-hidden group cursor-default"
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
          >
            <div className="card-glow absolute -bottom-10 -right-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="inline-block px-3.5 py-1.5 rounded-full bg-black text-white text-xs font-bold tracking-widest uppercase shadow-sm">
                  03 / TOOLKIT &amp; TECH
                </div>
                <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/10 border border-black/20 text-xs text-black font-bold">
                  <Image
                    src="/images/davinci-resolve-seeklogo.png"
                    alt="DaVinci Resolve"
                    width={16}
                    height={16}
                    className="w-3.5 h-3.5 object-contain"
                    sizes="16px"
                  />
                  <span>Powered by Resolve</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-4">
                {caseStudy.technicalTools.map((tool, idx) => {
                  const isResolve = tool
                    .toLowerCase()
                    .includes("davinci resolve");
                  return (
                    <div
                      key={idx}
                      className={`group/badge inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border text-sm font-semibold tracking-wide transition-transform duration-300 hover:scale-105 cursor-default shadow-sm ${
                        isResolve
                          ? "bg-black border-black text-white hover:bg-neutral-800"
                          : "bg-white/70 backdrop-blur-md border-black/20 text-neutral-950 hover:bg-black hover:text-white"
                      }`}
                    >
                      {isResolve && (
                        <Image
                          src="/images/davinci-resolve-seeklogo.png"
                          alt="DaVinci Resolve"
                          width={18}
                          height={18}
                          className="w-4 h-4 object-contain transition-transform duration-300 group-hover/badge:rotate-12"
                          sizes="18px"
                        />
                      )}
                      <span>{tool}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-4 border-t border-black/15 flex items-center justify-between text-xs text-neutral-600 uppercase tracking-wider font-bold">
              <span>Broadcast Standards</span>
              <span>Advanced Editing</span>
            </div>
          </div>

          {/* Row 3: Card 4 (Impact & Results - 100% Full Width + 3D GSAP Tilt) */}
          <div
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            className="bento-card w-full bg-gradient-to-br from-black/[0.05] via-black/[0.02] to-black/[0.05] backdrop-blur-2xl border-2 border-black/25 hover:border-black/45 transition-colors duration-500 rounded-3xl p-8 md:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden group cursor-default"
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
          >
            <div className="card-glow absolute -top-12 -right-12 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>

            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="inline-block px-3.5 py-1.5 rounded-full bg-black text-white text-xs font-bold tracking-widest uppercase shadow-sm">
                  04 / BUSINESS IMPACT &amp; RESULTS
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-600/20">
                  High-Converting
                </span>
              </div>

              <p className="text-black leading-relaxed text-lg md:text-xl font-bold tracking-wide">
                {caseStudy.results}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-black/20 flex items-center justify-between text-xs text-neutral-700 uppercase tracking-wider font-black relative z-10">
              <span>Measurable Value</span>
              <span>Client Retention &amp; ROI</span>
            </div>
          </div>
        </div>

        {/* ==========================================
            4. CLEAN HORIZONTAL DIVIDER LINE WITH EDITORIAL PILL
            ========================================== */}
        <div className="relative my-12 md:my-16 flex items-center justify-center">
          <div className="w-full border-t border-black/15"></div>
          <span className="absolute bg-white/70 backdrop-blur-md border border-black/15 px-5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest text-neutral-700 shadow-sm">
            Next Case Study
          </span>
        </div>

        {/* ==========================================
            5. NEXT PROJECT CARD: VIVID THUMBNAIL BACKGROUND WITHOUT FOGGY OVERLAY
            ========================================== */}
        <div ref={nextProjectRef} className="mb-8">
          <Link
            href={`/work/${caseStudy.nextSlug}`}
            className="group block relative rounded-3xl overflow-hidden border border-black/20 shadow-2xl p-6 sm:p-10 md:p-16 transition-all duration-500 hover:border-black/40 hover:scale-[1.01]"
          >
            {/* Vivid Next Project Thumbnail Background Image - NO WHITE/FOGGY OVERLAY */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image
                src={caseStudy.nextThumbnailUrl}
                alt={caseStudy.nextTitle}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              {/* Sleek Dark Edge/Bottom Gradient Vignette so Text is 100% Crisp Without Washing Out Image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/65 to-black/20"></div>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="pr-2">
                <span className="inline-block text-[11px] sm:text-xs uppercase tracking-widest text-white font-black mb-2 sm:mb-3 bg-black/60 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/20">
                  Next Case Study &mdash; {caseStudy.nextCategory}
                </span>
                <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white group-hover:text-amber-300 transition-colors drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] break-words leading-tight sm:leading-none">
                  {caseStudy.nextTitle}
                </h2>
              </div>

              <div className="flex items-center justify-end sm:justify-center">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white text-black flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-400 shadow-2xl shrink-0">
                  <Image
                    src="/images/vector.svg"
                    alt="Next Project Arrow"
                    width={20}
                    height={20}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
