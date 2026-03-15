"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import Image from "next/image";
import BrandingCanvas from "./BrandingCanvas";

gsap.registerPlugin(ScrollTrigger);

const BEHANCE_URL = "https://www.behance.net/pranaestudio";

// Project media - mix of images and animated canvas
const PROJECT_MEDIA: { type: "image" | "canvas"; src: string }[] = [
  { type: "image", src: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&h=1000&fit=crop&q=80" },
  { type: "canvas", src: "" },
  { type: "image", src: "https://images.unsplash.com/photo-1636955816868-fcb881e57954?w=800&h=1000&fit=crop&q=80" },
];

export default function Portfolio() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        const track = trackRef.current!;
        const totalWidth = track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${totalWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="trabajos" ref={sectionRef} className="relative min-h-screen overflow-hidden">
      <div className="pt-20 pb-8 px-6 max-w-7xl mx-auto">
        <h2 ref={titleRef} className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          {t.portfolio.title} <span className="text-accent">{t.portfolio.titleHighlight}</span>
        </h2>
        <p className="text-text-secondary text-lg mb-12">{t.portfolio.subtitle}</p>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="flex gap-8 px-6 md:flex-nowrap flex-wrap md:w-max"
      >
        {PROJECTS.map((project, i) => (
          <div
            key={project.title}
            className="project-card relative w-[85vw] md:w-[50vw] lg:w-[40vw] h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden flex-shrink-0 group"
          >
            {/* Project media */}
            {PROJECT_MEDIA[i].type === "canvas" ? (
              <BrandingCanvas />
            ) : (
              <Image
                src={PROJECT_MEDIA[i].src}
                alt={t.portfolio.projects[i].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 40vw"
              />
            )}

            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500" />

            {/* Project number */}
            <div className="absolute top-6 right-8 text-8xl font-heading font-bold text-white/10">
              0{i + 1}
            </div>

            {/* Glow border on hover */}
            <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-accent/30 transition-all duration-500" />

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
              <span className="text-accent text-sm font-medium tracking-wider uppercase mb-2 block">
                {t.portfolio.projects[i].category}
              </span>
              <h3 className="font-heading text-3xl md:text-4xl font-bold text-white">
                {t.portfolio.projects[i].title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* CTA after portfolio */}
      <div className="py-16 px-6 text-center">
        <a
          href={BEHANCE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="magnetic-btn inline-flex items-center gap-3 px-8 py-4 border border-accent/30 rounded-full text-accent hover:bg-accent hover:text-bg-primary transition-all duration-300 group"
        >
          {t.portfolio.cta}
          <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}
