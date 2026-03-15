export type Locale = "es" | "en";

export const translations = {
  es: {
    nav: {
      inicio: "Inicio",
      servicios: "Servicios",
      trabajos: "Trabajos",
      contacto: "Contacto",
    },
    hero: {
      headline: "Desde la primera idea, construimos y creamos.",
      highlightWord: "idea",
      cta: "Mirá nuestros trabajos",
    },
    services: {
      title: "Todo esto podemos hacer por vos",
      highlightWord: "podemos",
      items: [
        { title: "Diseño y Branding", description: "Marca y comunicación" },
        { title: "Digital", description: "Web · Apps · UX/UI" },
        { title: "Producción", description: "Eventos y escenografías" },
        { title: "Marketing", description: "Social media" },
      ],
    },
    portfolio: {
      title: "Nuestros",
      titleHighlight: "trabajos",
      subtitle: "Algunos proyectos que nos enorgullecen",
      cta: "Ver todos los trabajos",
      projects: [
        { title: "App Mobile", category: "Digital · UX/UI" },
        { title: "Branding Corporativo", category: "Diseño · Branding" },
        { title: "Packaging Design", category: "Producción · Diseño" },
      ],
    },
    contact: {
      heading: "Contanos tu idea",
      subheading: "La hacemos realidad",
    },
    scroll: "Scroll",
  },
  en: {
    nav: {
      inicio: "Home",
      servicios: "Services",
      trabajos: "Work",
      contacto: "Contact",
    },
    hero: {
      headline: "From the first idea, we build and create.",
      highlightWord: "idea",
      cta: "See our work",
    },
    services: {
      title: "Everything we can do for you",
      highlightWord: "can",
      items: [
        { title: "Design & Branding", description: "Brand & communication" },
        { title: "Digital", description: "Web · Apps · UX/UI" },
        { title: "Production", description: "Events & set design" },
        { title: "Marketing", description: "Social media" },
      ],
    },
    portfolio: {
      title: "Our",
      titleHighlight: "work",
      subtitle: "Some projects we're proud of",
      cta: "See all projects",
      projects: [
        { title: "Mobile App", category: "Digital · UX/UI" },
        { title: "Corporate Branding", category: "Design · Branding" },
        { title: "Packaging Design", category: "Production · Design" },
      ],
    },
    contact: {
      heading: "Tell us your idea",
      subheading: "We make it happen",
    },
    scroll: "Scroll",
  },
};

export type Translations = typeof translations.es;
