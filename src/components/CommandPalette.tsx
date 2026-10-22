"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Copy, Download, Hash, Mail, Palette, Search } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { profile } from "@/data/profile";
import { Github, Linkedin, Whatsapp } from "./icons";

const navTargets = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Company work" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education & awards" },
  { id: "contact", label: "Contact" },
];

type Item = { label: string; group: string; icon: ReactNode; run: () => void };

export function CommandPalette({ open, onClose, toggleTheme }: { open: boolean; onClose: () => void; toggleTheme: () => void }) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [toast, setToast] = useState("");

  const items = useMemo<Item[]>(
    () => [
      ...navTargets.map((t) => ({
        label: t.label,
        group: "Go to",
        icon: <Hash size={15} />,
        run: () => document.getElementById(t.id)?.scrollIntoView({ behavior: "smooth" }),
      })),
      {
        label: "Copy email address",
        group: "Actions",
        icon: <Copy size={15} />,
        run: () => {
          navigator.clipboard?.writeText(profile.email).then(() => {
            setToast("Email copied");
            setTimeout(() => setToast(""), 1800);
          });
        },
      },
      { label: "Send an email", group: "Actions", icon: <Mail size={15} />, run: () => (window.location.href = `mailto:${profile.email}`) },
      { label: "Download resume (PDF)", group: "Actions", icon: <Download size={15} />, run: () => window.open(profile.resume, "_blank") },
      { label: "Toggle light / dark theme", group: "Actions", icon: <Palette size={15} />, run: toggleTheme },
      { label: "GitHub", group: "Links", icon: <Github size={15} />, run: () => window.open(profile.github, "_blank") },
      { label: "LinkedIn", group: "Links", icon: <Linkedin size={15} />, run: () => window.open(profile.linkedin, "_blank") },
      { label: "WhatsApp", group: "Links", icon: <Whatsapp size={15} />, run: () => window.open(profile.whatsapp, "_blank") },
    ],
    [toggleTheme],
  );

  const filtered = items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()));

  const close = () => {
    onClose();
    setQuery("");
    setIndex(0);
  };

  const run = (item?: Item) => {
    if (!item) return;
    close();
    item.run();
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[80] flex items-start justify-center bg-black/50 px-4 pt-[15vh] md:backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}>
            <motion.div
              role="dialog"
              aria-label="Command palette"
              className="w-full max-w-lg overflow-hidden rounded-2xl border border-line-strong bg-bg-2 shadow-2xl"
              initial={{ scale: 0.96, y: -10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b border-line px-4">
                <Search size={16} className="text-muted" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setIndex(0);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setIndex((i) => Math.min(i + 1, filtered.length - 1));
                    } else if (e.key === "ArrowUp") {
                      e.preventDefault();
                      setIndex((i) => Math.max(i - 1, 0));
                    } else if (e.key === "Enter") run(filtered[index]);
                    else if (e.key === "Escape") close();
                  }}
                  placeholder="Type a command or search…"
                  className="h-14 flex-1 bg-transparent text-[15px] outline-none placeholder:text-faint"
                />
                <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-faint">ESC</kbd>
              </div>
              <ul className="max-h-80 overflow-y-auto p-2">
                {filtered.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">No results</li>}
                {filtered.map((item, i) => (
                  <li key={item.label}>
                    {(i === 0 || filtered[i - 1].group !== item.group) && <div className="px-3 pb-1 pt-3 font-mono text-[10px] tracking-widest text-faint uppercase">{item.group}</div>}
                    <button
                      onMouseEnter={() => setIndex(i)}
                      onClick={() => run(item)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${i === index ? "bg-surface-strong text-fg" : "text-muted"}`}
                    >
                      <span className={i === index ? "text-accent" : ""}>{item.icon}</span>
                      <span className="flex-1">{item.label}</span>
                      {i === index && <ArrowRight size={14} />}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {toast && (
          <motion.div className="fixed bottom-8 left-1/2 z-[90] -translate-x-1/2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg shadow-xl" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
