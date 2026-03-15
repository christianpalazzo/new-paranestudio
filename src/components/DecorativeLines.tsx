"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DecorativeLines() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const paths = svgRef.current.querySelectorAll("path");

    paths.forEach((path, i) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: path,
          start: "top 90%",
          end: "bottom 10%",
          scrub: 1,
        },
        delay: i * 0.2,
      });
    });
  }, []);

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden="true">
      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox="0 0 1920 1080"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Large concentric arcs - left side */}
        <path
          d="M -100 540 A 400 400 0 0 1 300 140"
          stroke="rgba(78, 205, 196, 0.08)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M -150 540 A 500 500 0 0 1 350 40"
          stroke="rgba(78, 205, 196, 0.06)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M -200 540 A 600 600 0 0 1 400 -60"
          stroke="rgba(78, 205, 196, 0.04)"
          strokeWidth="1"
          fill="none"
        />

        {/* Connecting lines */}
        <path
          d="M 960 800 Q 1200 600 1400 900"
          stroke="rgba(78, 205, 196, 0.06)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M 1600 200 Q 1700 400 1920 300"
          stroke="rgba(78, 205, 196, 0.05)"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </div>
  );
}
