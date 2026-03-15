import { Palette, Monitor, Video, Megaphone } from "lucide-react";

export const BRAND = {
  name: "Prana Estudio",
  tagline: "Diseño & desarrollo",
  url: "https://pranaestudio.com.ar",
};

export const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Trabajos", href: "#trabajos" },
  { label: "Contacto", href: "#contacto" },
];

export const HERO = {
  headline: "Desde la primera idea, construimos y creamos.",
  highlightWord: "idea",
  cta: {
    text: "Mirá nuestros trabajos",
    href: "https://www.behance.net/pranaestudio",
  },
};

export const SERVICES = {
  title: "Todo esto podemos hacer por vos",
  highlightWord: "podemos",
  items: [
    {
      title: "Diseño y Branding",
      description: "Marca y comunicación",
      icon: Palette,
    },
    {
      title: "Digital",
      description: "Web · Apps · UX/UI",
      icon: Monitor,
    },
    {
      title: "Producción",
      description: "Eventos y escenografías",
      icon: Video,
    },
    {
      title: "Marketing",
      description: "Social media",
      icon: Megaphone,
    },
  ],
};

export const PROJECTS = [
  {
    title: "App Mobile",
    category: "Digital · UX/UI",
    gradient: "from-emerald-900/60 to-teal-800/40",
  },
  {
    title: "Branding Corporativo",
    category: "Diseño · Branding",
    gradient: "from-slate-800/60 to-zinc-700/40",
  },
  {
    title: "Packaging Design",
    category: "Producción · Diseño",
    gradient: "from-cyan-900/60 to-sky-800/40",
  },
];

export const CONTACT = {
  heading: "Contanos tu idea",
  subheading: "La hacemos realidad",
  channels: [
    {
      type: "whatsapp" as const,
      label: "+54 911 3019 1555",
      href: "https://wa.me/541130191555",
    },
    {
      type: "instagram" as const,
      label: "prana.estudio",
      href: "https://www.instagram.com/prana.estudio/",
    },
    {
      type: "behance" as const,
      label: "pranaestudio",
      href: "https://www.behance.net/pranaestudio",
    },
    {
      type: "email" as const,
      label: "info@pranaestudio.com.ar",
      href: "mailto:info@pranaestudio.com.ar",
    },
  ],
  address: "Nuñez 6149 - CABA - Argentina",
};
