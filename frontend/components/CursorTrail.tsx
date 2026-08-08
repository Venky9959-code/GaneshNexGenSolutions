"use client";

import { useEffect, useState } from "react";

export default function CursorTrail() {
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      if (target && (target.tagName === "BUTTON" || target.tagName === "A" || target.closest(".apple-glass"))) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div 
        className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out rounded-full bg-gradient-to-tr from-blue-500/25 to-indigo-500/25 blur-xl opacity-70"
        style={{
          left: `${pos.x - (isHovered ? 60 : 35)}px`,
          top: `${pos.y - (isHovered ? 60 : 35)}px`,
          width: isHovered ? "120px" : "70px",
          height: isHovered ? "120px" : "70px",
        }}
      />
      <div 
        className="fixed pointer-events-none z-50 w-3 h-3 bg-blue-400 rounded-full transition-transform duration-100 ease-out shadow-lg shadow-blue-400/80"
        style={{
          left: `${pos.x - 6}px`,
          top: `${pos.y - 6}px`,
          transform: isHovered ? "scale(1.8)" : "scale(1)",
        }}
      />
    </>
  );
}
