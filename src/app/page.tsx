"use client";

import dynamic from "next/dynamic";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Preloader = dynamic(() => import("@/components/Preloader"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const ParticleField = dynamic(() => import("@/components/ParticleField"), { ssr: false });
const FloatingDots = dynamic(() => import("@/components/FloatingDots"), { ssr: false });
const DecorativeLines = dynamic(() => import("@/components/DecorativeLines"), { ssr: false });

export default function Home() {
  return (
    <SmoothScrollProvider>
      <Preloader />
      <CustomCursor />
      <ParticleField />
      <FloatingDots />
      <DecorativeLines />

      <Navbar />

      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Contact />
      </main>

      <Footer />
    </SmoothScrollProvider>
  );
}
