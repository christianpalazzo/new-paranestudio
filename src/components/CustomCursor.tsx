"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);

  useEffect(() => {
    if ("ontouchstart" in window) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
      if (circleRef.current) {
        circleRef.current.style.left = `${e.clientX}px`;
        circleRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverable =
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".magnetic-btn");

      if (hoverable && !isHovering.current) {
        isHovering.current = true;
        if (dotRef.current) {
          dotRef.current.style.width = "0px";
          dotRef.current.style.height = "0px";
        }
        if (circleRef.current) {
          circleRef.current.style.width = "48px";
          circleRef.current.style.height = "48px";
          circleRef.current.style.borderColor = "#4ECDC4";
          circleRef.current.style.backgroundColor = "rgba(78, 205, 196, 0.08)";
        }
      } else if (!hoverable && isHovering.current) {
        isHovering.current = false;
        if (dotRef.current) {
          dotRef.current.style.width = "8px";
          dotRef.current.style.height = "8px";
        }
        if (circleRef.current) {
          circleRef.current.style.width = "32px";
          circleRef.current.style.height = "32px";
          circleRef.current.style.borderColor = "rgba(78, 205, 196, 0.5)";
          circleRef.current.style.backgroundColor = "transparent";
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed z-[9998] pointer-events-none rounded-full bg-accent hidden md:block"
        style={{
          width: 8,
          height: 8,
          top: 0,
          left: 0,
          translate: "-50% -50%",
          transition: "width 0.2s, height 0.2s",
          willChange: "top, left",
        }}
      />
      <div
        ref={circleRef}
        className="fixed z-[9997] pointer-events-none rounded-full border hidden md:block"
        style={{
          width: 32,
          height: 32,
          top: 0,
          left: 0,
          translate: "-50% -50%",
          borderColor: "rgba(78, 205, 196, 0.5)",
          transition: "width 0.2s, height 0.2s, border-color 0.2s, background-color 0.2s",
          willChange: "top, left",
        }}
      />
    </>
  );
}
