"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

const BEHANCE_URL = "https://www.behance.net/pranaestudio";

export default function Hero() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1.5 });

    if (headlineRef.current) {
      const words = headlineRef.current.querySelectorAll(".word");
      tl.fromTo(
        words,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: "power3.out" }
      );
    }

    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        "-=0.2"
      );
    }

    if (scrollRef.current) {
      tl.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.1"
      );
    }
  }, []);

  const renderHeadline = () => {
    const words = t.hero.headline.split(" ");
    return words.map((word, i) => {
      const cleanWord = word.replace(/[.,]/g, "");
      const punctuation = word.replace(cleanWord, "");
      const isHighlight = cleanWord.toLowerCase() === t.hero.highlightWord;

      return (
        <span key={i} className="word inline-block" style={{ marginRight: "0.3em" }}>
          {isHighlight ? (
            <>
              <span className="text-accent glow-text">{cleanWord}</span>
              {punctuation}
            </>
          ) : (
            word
          )}
        </span>
      );
    });
  };

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <HeroCanvas />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
        <div className="max-w-3xl">
          <h1
            ref={headlineRef}
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight"
          >
            {renderHeadline()}
          </h1>

          <a
            ref={ctaRef}
            href={BEHANCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-btn inline-flex items-center gap-3 mt-12 px-8 py-4 bg-white text-bg-primary rounded-full font-medium text-base hover:bg-accent hover:text-bg-primary transition-all duration-300 group"
          >
            {t.hero.cta}
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted"
      >
        <span className="text-xs tracking-widest uppercase">{t.scroll}</span>
        <ChevronDown size={20} className="animate-bounce" />
      </div>
    </section>
  );
}
