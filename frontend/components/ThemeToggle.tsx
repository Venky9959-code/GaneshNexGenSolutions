"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    setMounted(true);
    const syncTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    };

    syncTheme();

    window.addEventListener("theme-change", syncTheme);
    return () => window.removeEventListener("theme-change", syncTheme);
  }, []);

  const applyTheme = (newTheme: "dark" | "light") => {
    const root = document.documentElement;
    if (newTheme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      root.style.colorScheme = "light";
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
    window.dispatchEvent(new Event("theme-change"));
  };

  if (!mounted) {
    return (
      <div className="w-14 h-7 rounded-full bg-white/10 border border-white/15 animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-14 h-7 rounded-full p-1 transition-all duration-300 flex items-center justify-between border cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
        theme === "dark"
          ? "bg-zinc-900/90 border-white/20 text-zinc-200 shadow-inner"
          : "bg-slate-200/90 border-slate-300 text-slate-800 shadow-inner"
      }`}
      aria-label="Toggle Dark and Light Mode"
      title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
    >
      <Sun className={`w-3.5 h-3.5 z-10 transition-colors duration-300 ml-0.5 ${
        theme === "light" ? "text-amber-500 font-bold" : "text-zinc-500"
      }`} />
      <Moon className={`w-3.5 h-3.5 z-10 transition-colors duration-300 mr-0.5 ${
        theme === "dark" ? "text-blue-400 font-bold" : "text-slate-400"
      }`} />

      <div
        className={`absolute top-0.5 bottom-0.5 w-6 rounded-full transition-transform duration-300 ease-out flex items-center justify-center shadow-md ${
          theme === "dark"
            ? "translate-x-7 bg-blue-600 border border-blue-400/30 text-white"
            : "translate-x-0 bg-white border border-slate-200 text-amber-500"
        }`}
      >
        {theme === "dark" ? (
          <Moon className="w-3 h-3 text-white" />
        ) : (
          <Sun className="w-3 h-3 text-amber-500" />
        )}
      </div>
    </button>
  );
}
