// src/Components/About.jsx
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="relative w-full bg-black text-white">
      {/* subtle vignette like on Hero */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_35%,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0)_60%)]" />

      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        {/* header row */}
        <div className="mb-8 flex items-center gap-4">
          <span className="text-slate-400">/</span>
          <h2 className="text-3xl md:text-4xl font-semibold">About</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-white/40 via-white/20 to-transparent" />
        </div>

        {/* intro */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-slate-300 leading-relaxed max-w-3xl"
        >
          I’m a data analyst based in Toronto. I enjoy large-scale, high-impact work —
          turning messy datasets into meaningful decisions and minimal, readable visuals.
          My focus is clarity, performance and maintainability. I like problems where
          the output is obvious, the process is careful, and the result is calm.
        </motion.p>

        {/* stats row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
          className="mt-10 grid grid-cols-3 gap-4 max-w-xl"
        >
          <Stat k="5+" labelTop="Projects" labelBottom="Completed" />
          <Stat k="3+" labelTop="Years" labelBottom="of Experience" />
          <Stat k="∞"  labelTop="Curiosity" labelBottom="& Learning" />
        </motion.div>

        {/* thin divider */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        {/* principles + availability */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="text-sm uppercase tracking-[0.2em] text-slate-400 mb-3">
              Principles
            </div>
            <GlowChips
              items={[
                "Clarity over clever",
                "Small, composable steps",
                "Measure → Decide → Ship",
                "Visuals that breathe",
              ]}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400/60 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-sm text-slate-300">Available for freelance</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ k, labelTop, labelBottom }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-6 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      <div className="text-2xl font-semibold tracking-tight">{k}</div>
      <div className="mt-1 text-[13px] text-slate-200">{labelTop}</div>
      <div className="text-[12px] text-slate-500">{labelBottom}</div>
    </div>
  );
}

function GlowChips({ items }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {items.map((t) => (
        <motion.span
          key={t}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 250, damping: 20 }}
          className="relative rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-2 text-[12.5px] text-slate-300"
        >
          {/* tiny glow underline */}
          <span className="pointer-events-none absolute left-4 right-4 -bottom-[2px] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          {t}
        </motion.span>
      ))}
    </div>
  );
}
