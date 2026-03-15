"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Preloader() {
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setDone(true),
    });

    // Logo pulse in
    tl.fromTo(
      logoRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "power3.out" }
    )
      // Glow pulse
      .fromTo(
        glowRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1.5, opacity: 0.6, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      )
      .to(glowRef.current, { opacity: 0, scale: 2, duration: 0.3 })
      // Split reveal
      .to(logoRef.current, { opacity: 0, scale: 0.9, duration: 0.2 }, "-=0.1")
      .to(leftRef.current, { xPercent: -100, duration: 0.7, ease: "power3.inOut" }, "-=0.1")
      .to(rightRef.current, { xPercent: 100, duration: 0.7, ease: "power3.inOut" }, "<");
  }, []);

  if (done) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[200] pointer-events-none">
      {/* Left half */}
      <div ref={leftRef} className="absolute top-0 left-0 w-1/2 h-full bg-bg-primary" />
      {/* Right half */}
      <div ref={rightRef} className="absolute top-0 right-0 w-1/2 h-full bg-bg-primary" />

      {/* Logo centered */}
      <div ref={logoRef} className="absolute inset-0 flex items-center justify-center z-10">
        <div className="relative">
          <div ref={glowRef} className="absolute inset-0 w-24 h-24 -m-4 rounded-full bg-accent/40 blur-xl" />
          <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-bg-primary font-bold text-2xl font-heading relative z-10">
            P.
          </div>
        </div>
      </div>
    </div>
  );
}
