"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Hammer, Lock, Star } from "lucide-react";
import { useCallback, useState } from "react";
import { building, caseStudies, flagship, projects, type CaseStudy, type Project } from "@/data/profile";
import { Modal } from "./Modal";
import { Chip, Reveal, SectionHeading, SpotlightCard } from "./ui";

const container = "mx-auto max-w-6xl px-5 md:px-8";

function Flow({ nodes }: { nodes: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-y-2">
      {nodes.map((n, i) => (
        <div key={n} className="flex items-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.08 }}
            className="rounded-lg border border-line-strong bg-bg/70 px-2.5 py-1.5 font-mono text-[11px] text-fg"
          >
            {n}
          </motion.span>
          {i < nodes.length - 1 && (
            <motion.span
              aria-hidden
              className="px-1.5 font-mono text-xs text-accent"
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.2 }}
            >
              →
            </motion.span>
          )}
        </div>
      ))}
    </div>
  );
}

function CaseCard({ c, i, onOpen }: { c: CaseStudy; i: number; onOpen: () => void }) {
  const wide = i === 0;
  return (
    <Reveal delay={i * 0.08} className={wide ? "lg:col-span-2" : ""}>
      <SpotlightCard as="button" onClick={onOpen} className="group h-full w-full cursor-pointer overflow-hidden text-left">
        <div className={`flex h-full flex-col gap-8 p-7 md:p-9 ${wide ? "lg:flex-row lg:items-stretch" : ""}`}>
          <div className={`flex flex-1 flex-col ${wide ? "lg:max-w-[52%]" : ""}`}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 font-mono text-[10px] tracking-wider text-amber-400 uppercase">
                <Lock size={10} /> Confidential client
              </span>
              <Chip>{c.kind}</Chip>
            </div>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight md:text-3xl">{c.title}</h3>
            <div className="mt-1.5 text-accent">For: {c.client}</div>
            <p className="mt-4 leading-relaxed text-muted">{c.summary}</p>
            <div className="mt-auto flex items-center gap-2 pt-8 text-sm font-medium">
              Read case study
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </div>
          </div>
          <div className={`flex flex-col justify-between gap-6 rounded-2xl border border-line bg-surface p-5 ${wide ? "lg:flex-1" : ""}`}>
            <div>
              <div className="mb-3 font-mono text-[10px] tracking-widest text-faint uppercase">Architecture</div>
              <Flow nodes={c.flow} />
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {c.highlights.map((h) => (
                <div key={h.label}>
                  <div className="text-2xl font-semibold tracking-tight text-gradient">{h.metric}</div>
                  <div className="mt-1 text-xs leading-snug text-muted">{h.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SpotlightCard>
    </Reveal>
  );
}

function CaseModal({ c, onClose }: { c: CaseStudy | null; onClose: () => void }) {
  return (
    <Modal open={!!c} onClose={onClose} label={c?.title ?? ""}>
      {c && (
        <div className="p-7 pt-16 md:p-12">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 font-mono text-[10px] tracking-wider text-amber-400 uppercase">
            <Lock size={10} /> Client name and screenshots withheld
          </span>
          <h3 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">{c.title}</h3>
          <div className="mt-2 text-lg text-accent">For: {c.client}</div>
          <p className="mt-5 text-lg leading-relaxed text-muted">{c.summary}</p>

          <div className="mt-8 rounded-2xl border border-line bg-surface p-5">
            <Flow nodes={c.flow} />
          </div>

          <h4 className="mt-10 font-mono text-xs tracking-widest text-faint uppercase">The challenge</h4>
          <p className="mt-3 leading-relaxed">{c.problem}</p>

          <h4 className="mt-10 font-mono text-xs tracking-widest text-faint uppercase">What I built</h4>
          <ul className="mt-4 space-y-3">
            {c.built.map((b, i) => (
              <motion.li key={b} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.05 }} className="flex gap-3 leading-relaxed text-muted">
                <span className="mt-1 font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                {b}
              </motion.li>
            ))}
          </ul>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {c.highlights.map((h) => (
              <div key={h.label} className="rounded-2xl border border-line bg-surface p-5">
                <div className="text-3xl font-semibold tracking-tight text-gradient">{h.metric}</div>
                <div className="mt-1 text-sm text-muted">{h.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {c.tech.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
}

function Device({ p, src, className = "" }: { p: Project; src: string; className?: string }) {
  if (p.device === "photo") {
    return (
      <div className={`relative aspect-square w-[130px] overflow-hidden rounded-2xl border-4 border-white/90 bg-neutral-900 shadow-2xl sm:w-[150px] ${className}`}>
        <Image src={src} alt="" fill sizes="150px" className="object-cover" />
      </div>
    );
  }
  if (p.device === "phone") {
    return (
      <div className={`relative aspect-[9/19] w-[130px] sm:w-[150px] overflow-hidden rounded-[1.6rem] border-[5px] border-neutral-800 bg-neutral-900 shadow-2xl md:w-[170px] ${className}`}>
        <Image src={src} alt="" fill sizes="170px" className="object-cover object-top" />
      </div>
    );
  }
  return (
    <div className={`relative w-full overflow-hidden rounded-xl border border-line-strong bg-bg-2 shadow-2xl ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        <span className="size-2 rounded-full bg-faint/50" />
        <span className="size-2 rounded-full bg-faint/50" />
        <span className="size-2 rounded-full bg-faint/50" />
      </div>
      <div className="relative aspect-[16/9]">
        <Image src={src} alt="" fill sizes="(max-width: 768px) 100vw, 500px" className="object-cover object-top" />
      </div>
    </div>
  );
}

function FlagshipCard({ onOpen }: { onOpen: () => void }) {
  const p = flagship;
  return (
    <Reveal>
      <SpotlightCard as="button" onClick={onOpen} className="group w-full cursor-pointer overflow-hidden text-left">
        <div className="grid lg:grid-cols-[1fr_1.15fr]">
          <div className="flex flex-col p-7 md:p-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/15 px-2.5 py-1 font-mono text-[10px] tracking-wider text-accent uppercase">
                <Star size={10} className="fill-current" /> Flagship · founder
              </span>
              <Chip>{p.year}</Chip>
            </div>
            <h3 className="mt-6 text-3xl font-semibold tracking-tight md:text-5xl">{p.title}</h3>
            <p className="mt-2 text-lg text-accent">{p.tagline}</p>
            <p className="mt-5 leading-relaxed text-muted">{p.description}</p>
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {p.stats?.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-semibold tracking-tight text-gradient">{s.metric}</div>
                  <div className="mt-1 text-xs leading-snug text-muted">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {p.tech.slice(0, 7).map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
            <div className="mt-auto flex items-center gap-2 pt-8 text-sm font-medium">
              Explore {p.images.length} screens <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </div>
          </div>
          <div className="relative min-h-[340px] overflow-hidden border-t border-line bg-gradient-to-br from-accent/20 via-accent-3/5 to-accent-2/15 lg:border-l lg:border-t-0">
            <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_75%)]" />
            <div className="absolute left-[8%] top-[12%] w-[88%] -rotate-2 transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:rotate-0">
              <Device p={p} src={p.images[3].src} />
            </div>
            <div className="absolute left-[18%] top-[46%] w-[80%] rotate-1 transition-transform duration-700 ease-out group-hover:translate-y-2 group-hover:rotate-0">
              <Device p={p} src={p.images[0].src} />
            </div>
            <div className="absolute bottom-[-12%] right-[4%] w-[26%] rotate-6 overflow-hidden rounded-[1.4rem] border-[5px] border-neutral-800 shadow-2xl transition-transform duration-700 group-hover:rotate-3 group-hover:-translate-y-3">
              <div className="relative aspect-[430/887]">
                <Image src={p.images[p.images.length - 1].src} alt="" fill sizes="200px" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </Reveal>
  );
}

function ProjectCard({ p, i, onOpen }: { p: Project; i: number; onOpen: () => void }) {
  return (
    <Reveal delay={i * 0.08} className={`min-w-0 ${p.featured ? "lg:col-span-3" : "lg:col-span-2"} ${i === projects.length - 1 ? "md:col-span-2" : ""}`}>
      <SpotlightCard as="button" onClick={onOpen} className="group flex h-full w-full cursor-pointer flex-col overflow-hidden text-left">
        <div className="relative flex h-72 items-end justify-center overflow-hidden bg-gradient-to-br from-accent/15 via-transparent to-accent-2/10 px-6 pt-8 md:h-80">
          <div className="bg-grid absolute inset-0 opacity-60 [mask-image:linear-gradient(#000,transparent)]" />
          {p.device !== "desktop" ? (
            <div className="relative flex translate-y-10 gap-4 transition-transform duration-700 ease-out group-hover:translate-y-4">
              <Device p={p} src={p.images[0].src} className="-rotate-6 transition-transform duration-700 group-hover:-rotate-3" />
              <Device p={p} src={p.images[p.images.length - 1].src} className="mt-8 rotate-6 transition-transform duration-700 group-hover:rotate-3" />
            </div>
          ) : (
            <div className="relative w-full max-w-md translate-y-8 transition-transform duration-700 ease-out group-hover:translate-y-3">
              <Device p={p} src={p.images[0].src} />
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col border-t border-line p-7">
          <div className="flex items-center justify-between font-mono text-xs text-faint">
            <span>{p.kind}</span>
            <span>{p.year}</span>
          </div>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">{p.title}</h3>
          <p className="mt-2 text-muted">{p.tagline}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {p.tech.slice(0, 4).map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
          <div className="mt-auto flex items-center gap-2 pt-6 text-sm font-medium">
            View project <ArrowUpRight size={16} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>
      </SpotlightCard>
    </Reveal>
  );
}

function ProjectModal({ p, onClose }: { p: Project | null; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const close = useCallback(() => {
    onClose();
    setIdx(0);
  }, [onClose]);
  if (!p) return <Modal open={false} onClose={close} label="">{null}</Modal>;
  const go = (d: number) => {
    setDir(d);
    setIdx((i) => (i + d + p.images.length) % p.images.length);
  };
  const phone = p.device !== "desktop";

  return (
    <Modal open onClose={close} label={p.title}>
      <div className="p-6 pt-16 md:p-10">
        <div className="font-mono text-xs text-faint">
          {p.kind} · {p.year}
        </div>
        <h3 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{p.title}</h3>
        <p className="mt-2 text-lg text-accent">{p.tagline}</p>
        {p.stats && (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {p.stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-line bg-surface p-4">
                <div className="text-2xl font-semibold tracking-tight text-gradient">{s.metric}</div>
                <div className="mt-1 text-xs text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="relative mt-8 overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-accent/10 to-accent-2/10">
          <div className={`relative mx-auto ${phone ? "aspect-[4/5] max-h-[560px] sm:aspect-[16/11]" : "aspect-[16/10]"}`}>
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={idx}
                custom={dir}
                initial={{ x: dir * 80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: dir * -80, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 p-4 sm:p-6"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => Math.abs(info.offset.x) > 60 && go(info.offset.x < 0 ? 1 : -1)}
              >
                <Image src={p.images[idx].src} alt={p.images[idx].alt} fill sizes="(max-width: 896px) 100vw, 896px" className="pointer-events-none object-contain p-4 sm:p-6" />
              </motion.div>
            </AnimatePresence>
          </div>
          <button onClick={() => go(-1)} aria-label="Previous image" className="absolute left-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-bg/80 md:backdrop-blur transition hover:bg-bg">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => go(1)} aria-label="Next image" className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-bg/80 md:backdrop-blur transition hover:bg-bg">
            <ChevronRight size={18} />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-bg/80 px-3 py-1 text-xs text-muted md:backdrop-blur">{p.images[idx].alt}</div>
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {p.images.map((im, i) => (
            <button
              key={im.src}
              onClick={() => {
                setDir(i > idx ? 1 : -1);
                setIdx(i);
              }}
              aria-label={`Show ${im.alt}`}
              className={`relative h-16 shrink-0 overflow-hidden rounded-lg border-2 transition ${phone ? "w-12" : "w-24"} ${i === idx ? "border-accent" : "border-transparent opacity-50 hover:opacity-100"}`}
            >
              <Image src={im.src} alt="" fill sizes="96px" className="object-cover object-top" />
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h4 className="font-mono text-xs tracking-widest text-faint uppercase">About</h4>
            <p className="mt-3 leading-relaxed text-muted">{p.description}</p>
          </div>
          <div>
            <h4 className="font-mono text-xs tracking-widest text-faint uppercase">Features</h4>
            <ul className="mt-3 space-y-2">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2.5 text-sm text-muted">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-accent-2" /> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>
      </div>
    </Modal>
  );
}

export function Work() {
  const [openCase, setOpenCase] = useState<CaseStudy | null>(null);
  const closeCase = useCallback(() => setOpenCase(null), []);
  return (
    <section id="work" className="py-24 md:py-32">
      <div className={container}>
        <SectionHeading
          index="03"
          kicker="Company work"
          title="Production systems,"
          accent="real clients."
          intro="Client names and screenshots stay private. Here is what each system does, who it serves, and what I built."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {caseStudies.map((c, i) => (
            <CaseCard key={c.id} c={c} i={i} onOpen={() => setOpenCase(c)} />
          ))}
        </div>
      </div>
      <CaseModal c={openCase} onClose={closeCase} />
    </section>
  );
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);
  const close = useCallback(() => setOpen(null), []);
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className={container}>
        <SectionHeading index="04" kicker="Projects" title="Things I built" accent="on my own." intro="My own products and side projects: a booking platform I run, a Flutter game for anglers, an event app on Vercel, and university work." />
        <FlagshipCard onOpen={() => setOpen(flagship)} />
        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} onOpen={() => setOpen(p)} />
          ))}
        </div>
        <Reveal className="mt-5">
          <div className="rounded-3xl border border-dashed border-line-strong p-6 md:p-8">
            <div className="mb-5 flex items-center gap-2 font-mono text-xs tracking-widest text-faint uppercase">
              <Hammer size={14} className="text-accent" /> Currently building
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {building.map((b) => (
                <div key={b.title} className="flex gap-4">
                  <span className="relative mt-2 flex size-2 shrink-0">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-accent" />
                  </span>
                  <div>
                    <div className="font-semibold">
                      {b.title} <span className="ml-1 font-mono text-xs font-normal text-faint">{b.tech}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted">{b.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
      <ProjectModal p={open} onClose={close} />
    </section>
  );
}
