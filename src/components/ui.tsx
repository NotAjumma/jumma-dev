"use client";

import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "motion/react";
import { useRef, type ReactNode, type MouseEvent } from "react";

export function Reveal({ children, delay = 0, y = 24, className, ...rest }: { children: ReactNode; delay?: number; y?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ index, kicker, title, accent, intro }: { index: string; kicker: string; title: string; accent?: string; intro?: string }) {
  return (
    <Reveal className="mb-12 max-w-3xl md:mb-16">
      <div className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-muted uppercase">
        <span className="text-accent">{index}</span>
        <span className="h-px w-10 bg-line-strong" />
        {kicker}
      </div>
      <h2 className="text-4xl font-semibold tracking-tight text-balance md:text-6xl">
        {title}{" "}
        {accent && <span className="font-serif font-normal italic text-gradient">{accent}</span>}
      </h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-muted text-pretty">{intro}</p>}
    </Reveal>
  );
}

/** Card with a cursor-following glow on its border and body. */
export function SpotlightCard({ children, className = "", as = "div", ...rest }: { children: ReactNode; className?: string; as?: "div" | "button" } & Record<string, unknown>) {
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const Tag = as;
  return (
    <Tag onMouseMove={onMove} className={`spotlight rounded-3xl ${className}`} {...rest}>
      <div className="relative z-10 h-full">{children}</div>
    </Tag>
  );
}

export function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full border border-line bg-surface px-3 py-1 font-mono text-[11px] tracking-wide text-muted ${className}`}>
      {children}
    </span>
  );
}

/** Element that leans gently towards the cursor. Mouse only: a tap never fires a leave, so touch would leave it stuck. */
export function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className="inline-block"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
