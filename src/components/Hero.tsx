"use client";

import { AnimatePresence, animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { Magnetic } from "./ui";
import { Github, Linkedin, Whatsapp } from "./icons";

function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % profile.roles.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-grid h-[1.2em] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif italic text-gradient"
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const terminal = [
  { cmd: "whoami", out: `${profile.shortName.toLowerCase()} — aka ${profile.nickname}` },
  { cmd: "cat stack.txt", out: "laravel · php · next.js · postgres · aws" },
  { cmd: "git log --author=akmal | wc -l", out: "840+ commits across work & own products" },
  { cmd: "php artisan verify:orders", out: "✓ 32,714 orders · 0 differences" },
];

function Terminal() {
  const [line, setLine] = useState(0);
  const [typed, setTyped] = useState("");
  useEffect(() => {
    if (line >= terminal.length) return;
    const cmd = terminal[line].cmd;
    if (typed.length < cmd.length) {
      const t = setTimeout(() => setTyped(cmd.slice(0, typed.length + 1)), 45);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLine((l) => l + 1);
      setTyped("");
    }, 500);
    return () => clearTimeout(t);
  }, [line, typed]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-line-strong bg-bg-2/95 font-mono text-[13px] shadow-2xl md:bg-bg-2/80 md:backdrop-blur-xl">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs text-faint">~/jumma — zsh</span>
      </div>
      <div className="min-h-[232px] space-y-3 p-5 leading-relaxed">
        {terminal.slice(0, line).map((l) => (
          <div key={l.cmd}>
            <div>
              <span className="text-accent-2">➜</span> <span className="text-accent">~</span> {l.cmd}
            </div>
            <div className="text-muted">{l.out}</div>
          </div>
        ))}
        <div>
          <span className="text-accent-2">➜</span> <span className="text-accent">~</span> {line < terminal.length ? typed : ""}
          <span className="caret ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-fg/80" />
        </div>
      </div>
    </div>
  );
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => Math.round(v).toLocaleString("en-US") + suffix);
  useEffect(() => {
    if (inView) animate(mv, value, { duration: 1.8, ease: [0.22, 1, 0.36, 1] });
  }, [inView, mv, value]);
  return <motion.span ref={ref}>{text}</motion.span>;
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    ref.current!.style.setProperty("--hx", `${e.clientX - r.left}px`);
    ref.current!.style.setProperty("--hy", `${e.clientY - r.top}px`);
  };

  return (
    <section id="top" ref={ref} onMouseMove={onMove} className="noise relative isolate overflow-hidden pb-20 pt-36 md:pb-28 md:pt-44">
      {/* Background: grid, drifting aurora, and a glow that follows the cursor */}
      <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]" />
      {/* Radial gradients rather than filter: blur, which phones redraw on every repaint. Drift is desktop-only. */}
      <div className="absolute -left-[280px] -top-[280px] -z-10 size-[800px] bg-[radial-gradient(closest-side,var(--color-accent),transparent)] opacity-30 md:motion-safe:animate-[drift-a_18s_ease-in-out_infinite]" />
      <div className="absolute -right-[248px] -top-10 -z-10 size-[720px] bg-[radial-gradient(closest-side,var(--color-accent-2),transparent)] opacity-20 md:motion-safe:animate-[drift-b_22s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(600px_circle_at_var(--hx,50%)_var(--hy,30%),var(--glow),transparent_45%)]" />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <div className="enter mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs text-muted md:backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            {profile.availability}
          </div>

          <h1
            style={{ "--enter-delay": "0.1s", "--enter-y": "30px" } as React.CSSProperties}
            className="enter text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl"
          >
            Hey, I&apos;m {profile.shortName}.
            <br />
            <span className="text-muted">You can call me </span>
            <span className="font-serif font-normal italic text-gradient">{profile.nickname}</span>
            <span className="text-muted">.</span>
          </h1>

          <p style={{ "--enter-delay": "0.3s" } as React.CSSProperties} className="enter mt-7 text-2xl font-medium tracking-tight sm:text-3xl">
            <RotatingRole />
          </p>

          <p style={{ "--enter-delay": "0.4s" } as React.CSSProperties} className="enter mt-5 max-w-xl text-lg leading-relaxed text-muted text-pretty">
            {profile.tagline}
          </p>

          <div style={{ "--enter-delay": "0.5s" } as React.CSSProperties} className="enter mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a href="#work" className="group inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3.5 font-medium text-bg transition hover:shadow-[0_0_40px_var(--glow)]">
                See my work
                <ArrowDown size={17} className="transition group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href={profile.resume} download className="group inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3.5 font-medium transition hover:bg-surface-strong">
                Download resume
                <ArrowUpRight size={17} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <div className="ml-1 flex items-center gap-1">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid size-11 place-items-center rounded-full text-muted transition hover:bg-surface-strong hover:text-fg">
                <Github size={19} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid size-11 place-items-center rounded-full text-muted transition hover:bg-surface-strong hover:text-fg">
                <Linkedin size={19} />
              </a>
              <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid size-11 place-items-center rounded-full text-muted transition hover:bg-surface-strong hover:text-[#25d366]">
                <Whatsapp size={19} />
              </a>
            </div>
          </div>

          <p style={{ "--enter-delay": "0.7s", "--enter-y": "0px" } as React.CSSProperties} className="enter mt-8 flex items-center gap-2 text-sm text-faint">
            <MapPin size={14} /> {profile.location}
          </p>
        </div>

        <div style={{ "--enter-delay": "0.35s", "--enter-y": "40px" } as React.CSSProperties} className="enter relative">
          <div className="absolute -inset-6 -z-10 hidden rounded-[2rem] md:block bg-gradient-to-br from-accent/25 via-accent-3/10 to-accent-2/20 blur-2xl" />
          <Terminal />
        </div>
      </div>

      <div className="mt-20 px-5 md:mt-28 md:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-4">
        {profile.stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-bg p-6 md:p-8">
            <div className="text-3xl font-semibold tracking-tight md:text-4xl">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-2 text-sm leading-snug text-muted">{s.label}</div>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
}
