"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instagram } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lineRef.current) return;

    gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <footer className="relative py-12 px-6">
      {/* Animated line */}
      <div ref={lineRef} className="h-[1px] bg-accent/30 origin-center mb-12" style={{ transform: "scaleX(0)" }} />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-bg-primary font-bold text-sm font-heading">
            P.
          </div>
          <span className="text-sm text-text-secondary font-heading">Prana Estudio</span>
        </div>

        {/* Address */}
        <p className="text-sm text-text-muted text-center">
          Nuñez 6149 - CABA - Argentina
        </p>

        {/* Social + Copyright */}
        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/prana.estudio/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent hover:scale-125 transition-all duration-300"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://www.behance.net/pranaestudio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent hover:scale-125 transition-all duration-300 font-bold text-sm"
            aria-label="Behance"
          >
            Bē
          </a>
          <span className="text-xs text-text-muted">
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}
