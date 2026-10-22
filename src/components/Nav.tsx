"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import Image from "next/image";
import { Command, Menu, Moon, Sun, X } from "lucide-react";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { profile } from "@/data/profile";
import { CommandPalette } from "./CommandPalette";

export const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

// The theme lives on <html data-theme>, set before paint by the script in layout.tsx.
const subscribeTheme = (cb: () => void) => {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
};
const readTheme = () => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

export function useTheme() {
  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => "dark" as const);
  const toggle = useCallback(() => {
    const next = readTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }, []);
  return { theme, toggle };
}

export function Nav() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [palette, setPalette] = useState(false);
  const { theme, toggle } = useTheme();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      io.disconnect();
    };
  }, []);

  return (
    <>
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-accent via-accent-3 to-accent-2" />
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
        <nav
          className={`flex w-full max-w-5xl items-center justify-between gap-2 rounded-full border px-2 py-2 transition-all duration-500 ${
            scrolled ? "border-line bg-bg/95 shadow-lg shadow-black/10 md:bg-bg/70 md:backdrop-blur-xl" : "border-transparent"
          }`}
        >
          <a href="#top" className="group flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3">
            <Image src="/brand/logo.png" alt="" width={36} height={36} priority className="size-9 rounded-full shadow-[0_0_20px_var(--glow)] transition duration-500 group-hover:rotate-[360deg]" />
            <span className="font-semibold tracking-tight">{profile.nickname}</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className={`relative rounded-full px-3.5 py-2 text-sm transition ${active === s.id ? "text-fg" : "text-muted hover:text-fg"}`}>
                  {active === s.id && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-surface-strong" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                  )}
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setPalette(true)}
              className="hidden items-center gap-1.5 rounded-full border border-line px-3 py-2 font-mono text-xs text-muted transition hover:border-line-strong hover:text-fg sm:flex"
              aria-label="Open command palette"
            >
              <Command size={13} /> K
            </button>
            <button onClick={toggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} className="grid size-9 place-items-center rounded-full text-muted transition hover:bg-surface-strong hover:text-fg">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={theme} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
                </motion.span>
              </AnimatePresence>
            </button>
            <a href={profile.resume} download className="hidden rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition hover:opacity-85 sm:block">
              Resume
            </a>
            <button onClick={() => setMenu(true)} className="grid size-9 place-items-center rounded-full text-muted md:hidden" aria-label="Open menu">
              <Menu size={19} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div className="fixed inset-0 z-[65] bg-bg/95 md:backdrop-blur-xl md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button onClick={() => setMenu(false)} className="absolute right-6 top-6 grid size-10 place-items-center rounded-full border border-line" aria-label="Close menu">
              <X size={18} />
            </button>
            <ul className="flex h-full flex-col justify-center gap-2 px-8">
              {sections.map((s, i) => (
                <motion.li key={s.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                  <a href={`#${s.id}`} onClick={() => setMenu(false)} className="flex items-baseline gap-4 py-2 text-4xl font-semibold tracking-tight">
                    <span className="font-mono text-sm text-accent">0{i + 1}</span>
                    {s.label}
                  </a>
                </motion.li>
              ))}
              <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-8">
                <a href={profile.resume} download className="inline-block rounded-full bg-fg px-6 py-3 font-medium text-bg">
                  Download resume
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <CommandPalette open={palette} onClose={() => setPalette(false)} toggleTheme={toggle} />
    </>
  );
}
