import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Prana Estudio | Estudio de Diseño y Desarrollo en Buenos Aires",
    template: "%s | Prana Estudio",
  },
  description:
    "Estudio de diseño y desarrollo en Buenos Aires, Argentina. Branding, diseño digital, UX/UI, desarrollo web, marketing y producción de eventos. Desde la primera idea, construimos y creamos.",
  keywords: [
    "estudio de diseño",
    "branding Buenos Aires",
    "diseño gráfico",
    "desarrollo web Argentina",
    "UX/UI design",
    "agencia de diseño",
    "diseño de marca",
    "marketing digital",
    "producción de eventos",
    "Prana Estudio",
    "diseño CABA",
  ],
  authors: [{ name: "Prana Estudio", url: "https://pranaestudio.com.ar" }],
  creator: "Prana Estudio",
  metadataBase: new URL("https://pranaestudio.com.ar"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Prana Estudio | Estudio de Diseño y Desarrollo",
    description:
      "Branding, diseño digital, UX/UI, desarrollo web y marketing. Desde la primera idea, construimos y creamos.",
    url: "https://pranaestudio.com.ar",
    siteName: "Prana Estudio",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prana Estudio | Estudio de Diseño",
    description:
      "Branding, diseño digital, UX/UI, desarrollo web y marketing en Buenos Aires.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Prana Estudio",
  description:
    "Estudio de diseño y desarrollo en Buenos Aires, Argentina. Branding, diseño digital, UX/UI, desarrollo web, marketing y producción de eventos.",
  url: "https://pranaestudio.com.ar",
  telephone: "+5491130191555",
  email: "info@pranaestudio.com.ar",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Nuñez 6149",
    addressLocality: "Buenos Aires",
    addressRegion: "CABA",
    addressCountry: "AR",
  },
  sameAs: [
    "https://www.instagram.com/prana.estudio/",
    "https://www.behance.net/pranaestudio",
  ],
  serviceType: [
    "Diseño gráfico",
    "Branding",
    "Desarrollo web",
    "UX/UI Design",
    "Marketing digital",
    "Producción de eventos",
  ],
  areaServed: {
    "@type": "City",
    name: "Buenos Aires",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
        <div className="noise-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
