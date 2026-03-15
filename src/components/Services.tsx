"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "@/lib/constants";
import ServiceCard from "./ServiceCard";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      const chars = titleRef.current!.querySelectorAll(".char");
      gsap.fromTo(
        chars,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.02,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards animation
      const cards = cardsRef.current!.querySelectorAll(".service-card");
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split title into chars with highlight
  const renderTitle = () => {
    const words = SERVICES.title.split(" ");
    return words.map((word, wi) => {
      const isHighlight = word.toLowerCase() === SERVICES.highlightWord;
      return (
        <span key={wi} className="inline-block" style={{ marginRight: "0.3em" }}>
          {word.split("").map((char, ci) => (
            <span
              key={ci}
              className={`char inline-block ${isHighlight ? "text-accent" : ""}`}
            >
              {char}
            </span>
          ))}
        </span>
      );
    });
  };

  return (
    <section id="servicios" ref={sectionRef} className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <h2
          ref={titleRef}
          className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-20"
        >
          {renderTitle()}
        </h2>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SERVICES.items.map((service, i) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
