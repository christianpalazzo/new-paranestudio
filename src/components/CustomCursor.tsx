"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const circlePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hide on touch devices
    if ("ontouchstart" in window) return;

    const handleMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable =
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".magnetic-btn");

      if (isHoverable) {
        circleRef.current?.classList.add("scale-150", "border-accent");
        dotRef.current?.classList.add("scale-0");
      } else {
        circleRef.current?.classList.remove("scale-150", "border-accent");
        dotRef.current?.classList.remove("scale-0");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);

    let rafId: number;
    const animate = () => {
      // Dot follows closely
      dotPos.current.x += (pos.current.x - dotPos.current.x) * 0.5;
      dotPos.current.y += (pos.current.y - dotPos.current.y) * 0.5;

      // Circle follows with more delay
      circlePos.current.x += (pos.current.x - circlePos.current.x) * 0.15;
      circlePos.current.y += (pos.current.y - circlePos.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x - 4}px, ${dotPos.current.y - 4}px)`;
      }
      if (circleRef.current) {
        circleRef.current.style.transform = `translate(${circlePos.current.x - 16}px, ${circlePos.current.y - 16}px)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent z-[9998] pointer-events-none transition-transform duration-150 hidden md:block"
      />
      <div
        ref={circleRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent/50 z-[9997] pointer-events-none transition-all duration-300 hidden md:block"
      />
    </>
  );
}
