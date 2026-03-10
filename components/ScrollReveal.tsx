"use client";
import { useEffect, useRef, ReactNode } from "react";

type AnimationType = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "zoom-out";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 650,
  threshold = 0.12,
  className = "",
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "none";
            }, delay);
            if (once) observer.unobserve(el);
          } else if (!once) {
            el.style.opacity = "0";
            el.style.transform = getTransform(animation);
          }
        });
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animation, delay, duration, threshold, once]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: getTransform(animation),
        transition: `opacity ${duration}ms cubic-bezier(0.25,0.46,0.45,0.94), transform ${duration}ms cubic-bezier(0.25,0.46,0.45,0.94)`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

function getTransform(animation: AnimationType): string {
  switch (animation) {
    case "fade-up": return "translateY(48px)";
    case "fade-down": return "translateY(-48px)";
    case "fade-left": return "translateX(48px)";
    case "fade-right": return "translateX(-48px)";
    case "zoom-in": return "scale(0.88)";
    case "zoom-out": return "scale(1.12)";
    default: return "translateY(48px)";
  }
}
