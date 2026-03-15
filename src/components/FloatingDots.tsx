"use client";

const dots = [
  { top: "15%", left: "8%", size: 8, delay: 0 },
  { top: "25%", right: "12%", size: 6, delay: 0.5 },
  { top: "45%", left: "5%", size: 10, delay: 1 },
  { top: "55%", right: "8%", size: 6, delay: 1.5 },
  { top: "70%", left: "15%", size: 8, delay: 2 },
  { top: "80%", right: "10%", size: 12, delay: 0.8 },
  { top: "35%", left: "92%", size: 5, delay: 1.2 },
  { top: "90%", left: "50%", size: 7, delay: 0.3 },
];

export default function FloatingDots() {
  return (
    <div className="fixed inset-0 z-[2] pointer-events-none overflow-hidden" aria-hidden="true">
      {dots.map((dot, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-accent animate-pulse-glow"
          style={{
            top: dot.top,
            left: "left" in dot ? dot.left : undefined,
            right: "right" in dot ? dot.right : undefined,
            width: dot.size,
            height: dot.size,
            animationDelay: `${dot.delay}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
}
