"use client";

import { motion, useScroll } from "motion/react";
import { ArrowUpRight, Award, Bot, Check, Copy, GraduationCap, Mail, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { aiWorkflow, awards, education, experience, profile, skills } from "@/data/profile";
import { Chip, Magnetic, Reveal, SectionHeading, SpotlightCard } from "./ui";
import { Github, Linkedin, Whatsapp } from "./icons";

const container = "mx-auto max-w-6xl px-5 md:px-8";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className={container}>
        <SectionHeading index="01" kicker="About" title="Engineer first," accent="product-minded." />
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Reveal className="space-y-5 text-lg leading-relaxed text-muted md:text-xl">
            {profile.about.map((p, i) => (
              <p key={i} className={i === 0 ? "text-fg" : ""}>
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.15}>
            <SpotlightCard className="p-7">
              <div className="mb-5 font-mono text-xs tracking-widest text-faint uppercase">Right now</div>
              <ul className="space-y-4 text-[15px]">
                {[
                  ["Working at", "LLL Inc. as Software Engineer"],
                  ["Shipping", "Laravel & Next.js for Japan and Malaysia clients"],
                  ["Building", "Sistem Kami, my own booking platform"],
                  ["Looking for", "Software engineering roles in Malaysia or remote"],
                ].map(([k, v]) => (
                  <li key={k} className="flex flex-col gap-0.5">
                    <span className="text-xs text-faint">{k}</span>
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });

  return (
    <section id="experience" className="py-24 md:py-32">
      <div className={container}>
        <SectionHeading index="02" kicker="Experience" title="Where I've" accent="shipped." intro="From intern to engineer: four teams, real users, production systems." />
        <div ref={ref} className="relative">
          <div className="absolute bottom-0 left-[7px] top-2 w-px bg-line md:left-[calc(28%+7px)]" />
          <motion.div style={{ scaleY: scrollYProgress }} className="absolute bottom-0 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-accent via-accent-3 to-accent-2 md:left-[calc(28%+7px)]" />
          <ol className="space-y-14">
            {experience.map((job, i) => (
              <li key={job.company} className="relative grid gap-4 pl-10 md:grid-cols-[28%_1fr] md:gap-0 md:pl-0">
                <div className="md:pr-12 md:text-right">
                  <Reveal delay={0.05}>
                    <div className="font-mono text-xs tracking-wide text-faint">{job.period}</div>
                    <div className="mt-1 text-sm text-muted">{job.location}</div>
                  </Reveal>
                </div>
                <span className={`absolute left-0 top-1 grid size-[15px] place-items-center rounded-full border md:left-[28%] ${job.current ? "border-accent bg-accent/20" : "border-line-strong bg-bg"}`}>
                  {job.current && <span className="size-1.5 animate-pulse rounded-full bg-accent" />}
                </span>
                <Reveal delay={0.1 + i * 0.02} className="md:pl-12">
                  <SpotlightCard className="p-6 md:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{job.role}</h3>
                        <div className="mt-1 text-accent">{job.company}</div>
                      </div>
                      {job.current && <Chip className="!border-emerald-400/30 !text-emerald-400">Current</Chip>}
                    </div>
                    <p className="mt-3 text-sm text-faint">{job.summary}</p>
                    <ul className="mt-5 space-y-2.5">
                      {job.points.map((p) => (
                        <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                          <span className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {job.tech.map((t) => (
                        <Chip key={t}>{t}</Chip>
                      ))}
                    </div>
                  </SpotlightCard>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  const all = skills.flatMap((s) => s.items);
  return (
    <section id="skills" className="overflow-hidden py-24 md:py-32">
      <div className={container}>
        <SectionHeading index="05" kicker="Skills" title="The tools I" accent="reach for." />
      </div>
      <div className="marquee-mask mb-14 flex overflow-hidden">
        <div className="animate-marquee flex shrink-0 gap-3 pr-3">
          {[...all, ...all].map((s, i) => (
            <span key={i} className="whitespace-nowrap rounded-full border border-line bg-surface px-5 py-2.5 text-sm text-muted">
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className={`${container} grid gap-4 sm:grid-cols-2 lg:grid-cols-3`}>
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={i * 0.06}>
            <SpotlightCard className="h-full p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold">{g.group}</h3>
                <span className="font-mono text-xs text-faint">0{i + 1}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span key={s} className="rounded-lg bg-surface-strong px-2.5 py-1 text-sm">
                    {s}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
        <Reveal delay={0.3}>
          <SpotlightCard className="relative h-full overflow-hidden p-6">
            <div className="absolute -right-10 -top-10 size-40 rounded-full bg-accent/20 blur-3xl" />
            <div className="mb-4 flex items-center gap-2">
              <Bot size={18} className="text-accent" />
              <h3 className="font-semibold">AI-assisted engineering</h3>
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
              {aiWorkflow.tools.map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 rounded-lg bg-accent/15 px-2.5 py-1 text-sm text-accent">
                  <Sparkles size={12} /> {t}
                </span>
              ))}
            </div>
            <p className="text-sm leading-relaxed text-muted">{aiWorkflow.text}</p>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section id="education" className="py-24 md:py-32">
      <div className={container}>
        <SectionHeading index="06" kicker="Education & awards" title="Consistently" accent="top of class." />
        <div className="grid gap-4 lg:grid-cols-2">
          {education.map((e, i) => (
            <Reveal key={e.degree} delay={i * 0.1}>
              <SpotlightCard className="flex h-full gap-5 p-7">
                <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-surface-strong text-accent">
                  <GraduationCap size={22} />
                </div>
                <div>
                  <div className="font-mono text-xs text-faint">{e.period}</div>
                  <h3 className="mt-1 text-lg font-semibold">{e.degree}</h3>
                  <div className="mt-1 text-muted">{e.school}</div>
                  <div className="mt-4 inline-flex items-baseline gap-2">
                    <span className="text-3xl font-semibold tracking-tight text-gradient">{e.grade.split(" ")[1]}</span>
                    <span className="text-sm text-faint">CGPA</span>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {awards.map((a, i) => (
            <Reveal key={a.detail} delay={0.1 + i * 0.06}>
              <SpotlightCard className="h-full p-6">
                <Award size={20} className={i < 2 ? "text-amber-400" : "text-accent-2"} />
                <div className="mt-4 font-semibold">{a.title}</div>
                <div className="mt-1 text-sm text-muted">{a.detail}</div>
                <div className="mt-3 font-mono text-xs text-faint">{a.year}</div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(profile.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <section id="contact" className="relative overflow-hidden py-28 md:py-40">
      <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,#000_10%,transparent_65%)]" />
      <div className="absolute left-1/2 top-1/2 -z-10 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[140px]" />
      <div className={`${container} text-center`}>
        <Reveal className="mb-6 flex justify-center">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 6 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, type: "spring", stiffness: 300, damping: 20 }}
              className="absolute -right-28 top-2 whitespace-nowrap rounded-2xl rounded-bl-sm border border-line-strong bg-bg-2 px-3 py-1.5 text-sm shadow-lg sm:-right-36"
            >
              Hai! Let&apos;s talk 👋
            </motion.div>
            <motion.div animate={{ y: [0, -8, 0], rotate: [0, -2, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              <Image src="/brand/kancil.png" alt="Sang Kancil, Jumma's mascot" width={120} height={159} className="drop-shadow-[0_12px_30px_var(--glow)]" />
            </motion.div>
          </div>
        </Reveal>
        <Reveal>
          <div className="mb-6 font-mono text-xs tracking-[0.2em] text-muted uppercase">
            <span className="text-accent">07</span> · Contact
          </div>
          <h2 className="mx-auto max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-balance md:text-7xl">
            Let&apos;s build something <span className="font-serif font-normal italic text-gradient">that works.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
            I&apos;m open to software engineering roles, backend or full-stack. Email or WhatsApp me. I usually reply within a day.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="mt-10 flex flex-col items-center gap-4">
          <Magnetic strength={0.15}>
            <div className="flex items-center gap-1 rounded-full border border-line-strong bg-bg/60 p-1.5 pl-6 backdrop-blur">
              <span className="font-mono text-sm sm:text-base">{profile.email}</span>
              <button onClick={copy} aria-label="Copy email" className="ml-2 grid size-10 place-items-center rounded-full text-muted transition hover:bg-surface-strong hover:text-fg">
                {copied ? <Check size={17} className="text-emerald-400" /> : <Copy size={17} />}
              </button>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 font-medium text-bg transition hover:opacity-85">
                <Mail size={16} /> <span className="hidden sm:inline">Email me</span>
              </a>
            </div>
          </Magnetic>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { href: profile.whatsapp, label: `WhatsApp ${profile.phone}`, icon: <Whatsapp size={16} /> },
              { href: profile.linkedin, label: "LinkedIn", icon: <Linkedin size={16} /> },
              { href: profile.github, label: "GitHub", icon: <Github size={16} /> },
            ].map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-muted transition hover:border-line-strong hover:text-fg">
                {l.icon} {l.label}
                <ArrowUpRight size={14} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
            <a href={profile.resume} download className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-muted transition hover:border-line-strong hover:text-fg">
              Resume (PDF)
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className={`${container} flex flex-col items-center justify-between gap-4 text-sm text-faint sm:flex-row`}>
        <div className="flex items-center gap-2.5">
          <Image src="/brand/kancil.png" alt="" width={22} height={29} className="transition hover:-rotate-12" />
          <span>
            © {new Date().getFullYear()} {profile.name} · <span className="font-serif italic">{profile.nickname}</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span>Built with Next.js, Tailwind & Motion</span>
          <a href="#top" className="text-muted transition hover:text-fg">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
