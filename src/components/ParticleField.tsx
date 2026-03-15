"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  pulseSpeed: number;
  pulseOffset: number;
  depth: number; // for parallax
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];
    const PARTICLE_COUNT = 60;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      resize();
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 1 + Math.random() * 3,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.2,
          opacity: 0.1 + Math.random() * 0.5,
          pulseSpeed: 0.5 + Math.random() * 2,
          pulseOffset: Math.random() * Math.PI * 2,
          depth: 0.3 + Math.random() * 0.7,
        });
      }
    };

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    const animate = (time: number) => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const t = time * 0.001;

      for (const p of particles) {
        // Movement
        p.x += p.speedX;
        p.y += p.speedY;

        // Parallax based on scroll
        const parallaxOffset = scrollYRef.current * p.depth * 0.05;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < -50) p.y = canvas.height + 50;
        if (p.y > canvas.height + 50) p.y = -50;

        // Pulsing opacity
        const pulse = Math.sin(t * p.pulseSpeed + p.pulseOffset) * 0.3 + 0.7;
        const finalOpacity = p.opacity * pulse;

        // Draw
        const drawY = (p.y + parallaxOffset) % (canvas.height + 100) - 50;

        ctx.beginPath();
        ctx.arc(p.x, drawY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(78, 205, 196, ${finalOpacity})`;
        ctx.fill();

        // Add glow for larger particles
        if (p.size > 2) {
          ctx.beginPath();
          ctx.arc(p.x, drawY, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(78, 205, 196, ${finalOpacity * 0.1})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(animate);
    };

    init();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1] pointer-events-none"
      aria-hidden="true"
    />
  );
}
