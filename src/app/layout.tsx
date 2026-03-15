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
  title: "Prana Estudio | Estudio de Diseño",
  description:
    "Desde la primera idea, construimos y creamos. Estudio de diseño y desarrollo en Buenos Aires, Argentina.",
  keywords: ["diseño", "branding", "desarrollo web", "UX/UI", "Buenos Aires"],
  openGraph: {
    title: "Prana Estudio | Estudio de Diseño",
    description: "Desde la primera idea, construimos y creamos.",
    url: "https://pranaestudio.com.ar",
    siteName: "Prana Estudio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
        <div className="noise-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
