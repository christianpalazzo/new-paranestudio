"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CONTACT } from "@/lib/constants";
import { useLanguage } from "@/providers/LanguageProvider";
import { Phone, Instagram, Pen, Mail, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ICONS = {
  whatsapp: Phone,
  instagram: Instagram,
  behance: Pen,
  email: Mail,
};

export default function Contact() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading reveal with block wipe effect
      if (headingRef.current) {
        const wiper = headingRef.current.querySelector(".text-wiper");
        const text = headingRef.current.querySelector(".text-reveal");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(wiper, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "power3.inOut", transformOrigin: "left" })
          .to(text, { opacity: 1, duration: 0.01 })
          .to(wiper, { scaleX: 0, duration: 0.6, ease: "power3.inOut", transformOrigin: "right" });
      }

      // Subheading
      const sub = sectionRef.current!.querySelector(".subheading");
      if (sub) {
        gsap.fromTo(sub, { y: 20, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 55%", toggleActions: "play none none reverse" },
        });
      }

      // Contact pills
      if (pillsRef.current) {
        gsap.fromTo(
          pillsRef.current.children,
          { y: 40, opacity: 0, rotateX: 10 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: pillsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contacto" ref={sectionRef} className="py-32 px-6 relative">
      {/* Animated gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
        <div className="w-full h-full rounded-full bg-accent/5 blur-[120px] animate-float" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left - Heading */}
          <div>
            <h2 ref={headingRef} className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] relative">
              <span className="text-reveal opacity-0">
                {t.contact.heading.split(" ").map((word, i) => (
                  <span key={i} className="inline-block" style={{ marginRight: "0.3em" }}>
                    {word.toLowerCase() === "idea" ? (
                      <span className="text-accent">{word}</span>
                    ) : (
                      word
                    )}
                  </span>
                ))}
              </span>
              <span className="text-wiper absolute inset-0 bg-accent origin-left" style={{ transform: "scaleX(0)" }} />
            </h2>
            <p className="subheading text-2xl text-text-secondary mt-4 font-heading">
              {t.contact.subheading}
            </p>

            {/* Logo */}
            <div className="flex items-center gap-3 mt-10">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-bg-primary font-bold text-xl font-heading">
                P.
              </div>
              <div>
                <div className="text-sm font-semibold font-heading">Prana Estudio</div>
                <div className="text-xs text-text-secondary tracking-wider uppercase">Diseño & desarrollo</div>
              </div>
            </div>
          </div>

          {/* Right - Contact Info */}
          <div ref={pillsRef} className="flex flex-col gap-4">
            {CONTACT.channels.map((channel) => {
              const Icon = ICONS[channel.type];
              return (
                <a
                  key={channel.type}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic-btn flex items-center gap-4 p-5 rounded-2xl bg-bg-secondary/80 border border-accent-dim hover:border-accent/40 hover:bg-bg-secondary transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Icon size={22} className="text-accent" strokeWidth={1.5} />
                  </div>
                  <span className="text-text-primary group-hover:text-accent transition-colors">
                    {channel.label}
                  </span>
                </a>
              );
            })}

            {/* Address */}
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-bg-secondary/50 border border-accent-dim/50">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <MapPin size={22} className="text-accent" strokeWidth={1.5} />
              </div>
              <span className="text-text-secondary">{CONTACT.address}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
