"use client";

import { useEffect, useRef } from "react";

export default function BrandingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width * 2;
        canvas.height = rect.height * 2;
        ctx.scale(2, 2);
      }
    };
    resize();

    const shapes: {
      x: number;
      y: number;
      size: number;
      rotation: number;
      rotSpeed: number;
      type: "circle" | "square" | "line" | "triangle";
      color: string;
      opacity: number;
    }[] = [];

    const w = canvas.width / 2;
    const h = canvas.height / 2;
    const colors = ["#4ECDC4", "#FFFFFF", "#A0A0A0", "#4ECDC4"];

    for (let i = 0; i < 15; i++) {
      shapes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: 20 + Math.random() * 60,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.01,
        type: (["circle", "square", "line", "triangle"] as const)[i % 4],
        color: colors[i % colors.length],
        opacity: 0.1 + Math.random() * 0.3,
      });
    }

    const animate = (time: number) => {
      const t = time * 0.001;
      ctx.clearRect(0, 0, w, h);

      // Dark background
      ctx.fillStyle = "#0F1A1A";
      ctx.fillRect(0, 0, w, h);

      // Animated gradient background
      const grad = ctx.createRadialGradient(
        w * 0.5 + Math.sin(t * 0.3) * 50,
        h * 0.4 + Math.cos(t * 0.2) * 30,
        0,
        w * 0.5,
        h * 0.5,
        w * 0.6
      );
      grad.addColorStop(0, "rgba(78, 205, 196, 0.15)");
      grad.addColorStop(1, "rgba(78, 205, 196, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Draw shapes
      for (const shape of shapes) {
        shape.rotation += shape.rotSpeed;
        const floatY = Math.sin(t + shape.x * 0.01) * 5;

        ctx.save();
        ctx.translate(shape.x, shape.y + floatY);
        ctx.rotate(shape.rotation);
        ctx.globalAlpha = shape.opacity;
        ctx.strokeStyle = shape.color;
        ctx.lineWidth = 1.5;

        switch (shape.type) {
          case "circle":
            ctx.beginPath();
            ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
            ctx.stroke();
            break;
          case "square":
            ctx.strokeRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
            break;
          case "line":
            ctx.beginPath();
            ctx.moveTo(-shape.size / 2, 0);
            ctx.lineTo(shape.size / 2, 0);
            ctx.stroke();
            break;
          case "triangle":
            ctx.beginPath();
            ctx.moveTo(0, -shape.size / 2);
            ctx.lineTo(shape.size / 2, shape.size / 2);
            ctx.lineTo(-shape.size / 2, shape.size / 2);
            ctx.closePath();
            ctx.stroke();
            break;
        }

        ctx.restore();
      }

      // Animated "P." logo in center
      ctx.globalAlpha = 0.4 + Math.sin(t * 1.5) * 0.15;
      ctx.fillStyle = "#4ECDC4";
      ctx.beginPath();
      ctx.arc(w * 0.5, h * 0.45, 35, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 1;
      ctx.fillStyle = "#0F1A1A";
      ctx.font = "bold 28px system-ui";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("P.", w * 0.5, h * 0.45);

      // "BRAND" text below
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "300 14px system-ui";
      ctx.letterSpacing = "8px";
      ctx.fillText("B R A N D I N G", w * 0.5, h * 0.58);

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}
