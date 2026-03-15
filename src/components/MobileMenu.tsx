"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { NAV_LINKS } from "@/lib/constants";
import { X } from "lucide-react";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current || !linksRef.current) return;

    if (open) {
      document.body.style.overflow = "hidden";
      gsap.to(overlayRef.current, { opacity: 1, pointerEvents: "auto", duration: 0.3 });
      gsap.fromTo(
        linksRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power3.out", delay: 0.15 }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(overlayRef.current, { opacity: 0, pointerEvents: "none", duration: 0.3 });
    }
  }, [open]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onClose();
    setTimeout(() => {
      const target = document.querySelector(href);
      target?.scrollIntoView({ behavior: "smooth" });
    }, 350);
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-bg-primary/95 backdrop-blur-xl flex flex-col items-center justify-center opacity-0 pointer-events-none"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-accent transition-colors"
        aria-label="Close menu"
      >
        <X size={32} />
      </button>

      <div ref={linksRef} className="flex flex-col items-center gap-8">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleClick(e, link.href)}
            className="text-3xl font-heading font-bold text-white hover:text-accent transition-colors duration-300"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
