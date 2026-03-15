"use client";

import type { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
}

export default function ServiceCard({ title, description, icon: Icon, index }: ServiceCardProps) {
  return (
    <div
      className="service-card group relative p-8 rounded-2xl border border-accent-dim bg-bg-secondary/50 hover:border-accent/40 transition-all duration-500 overflow-hidden"
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-accent/20">
          <Icon size={28} className="text-accent" strokeWidth={1.5} />
        </div>

        <h3 className="font-heading text-xl font-semibold mb-2 text-text-primary">
          {title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
