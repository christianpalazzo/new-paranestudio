"use client";

import { useState, useEffect } from "react";
import { NAV_LINKS, BRAND } from "@/lib/constants";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass py-3" : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#inicio" onClick={(e) => handleNavClick(e, "#inicio")} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-bg-primary font-bold text-lg font-heading transition-transform group-hover:scale-110">
              P.
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-semibold font-heading tracking-wide">{BRAND.name}</div>
              <div className="text-[10px] text-text-secondary tracking-widest uppercase">
                {BRAND.tagline}
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative text-sm text-text-secondary hover:text-text-primary transition-colors duration-300"
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-accent transition-all duration-300 ${
                    activeSection === link.href.replace("#", "")
                      ? "w-full"
                      : "w-0"
                  }`}
                />
              </a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span className="w-6 h-[2px] bg-white transition-all" />
            <span className="w-4 h-[2px] bg-accent transition-all" />
            <span className="w-6 h-[2px] bg-white transition-all" />
          </button>
        </div>
      </nav>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
