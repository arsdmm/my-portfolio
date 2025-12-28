import { motion, useAnimation } from "framer-motion";
import { useRef, useState } from "react";

export default function Projects() {
  return (
    <section id="projects" className="relative w-full bg-black text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_35%,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0)_60%)]" />

      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 space-y-12">
        <div className="mb-2 flex items-center gap-4">
          <span className="text-slate-400">/</span>
          <h2 className="text-3xl md:text-4xl font-semibold">Projects</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-white/40 via-white/20 to-transparent" />
        </div>

        <MiniHero />

        <ProjectsGrid />
      </div>
    </section>
  );
}

function MiniHero() {
  const slides = [
    {
      k: "01",
      title: "Customer Segmentation",
      text:
        "RFM scoring, behavioral clustering, and revenue-focused insights that strengthen retention and targeting.",
    },
    {
      k: "02",
      title: "Time-Series Forecasting",
      text:
        "Clean daily pipelines, baseline benchmarking, and SARIMA models delivering reliable forward-looking forecasts.",
    },
    {
      k: "03",
      title: "Data Quality Intelligence",
      text:
        "Rule engines, automated thresholds, and Power BI dashboards that expose issues before they hit production.",
    },
  ];

  const [index, setIndex] = useState(0);
  const controls = useAnimation();
  const dirRef = useRef(1);

  const hero = {
    hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.55, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.06 }
    }
  };
  const piece = {
    hidden: { opacity: 0, y: 10 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const goTo = async (next) => {
    const newIdx = (next + slides.length) % slides.length;
    dirRef.current = next > index ? 1 : -1;

    await controls.start({
      x: dirRef.current * -40,
      opacity: 0,
      filter: "blur(4px)",
      transition: { duration: 0.25, ease: "easeOut" },
    });
    setIndex(newIdx);
    controls.set({ x: dirRef.current * 40, opacity: 0, filter: "blur(6px)" });
    await controls.start({
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.35, ease: "easeOut" },
    });
  };

  return (
    <motion.div
      variants={hero}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="
        relative overflow-hidden rounded-3xl border border-white/10
        bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
        px-6 md:px-10 py-10 md:py-12
      "
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_70%_0%,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0)_50%)]" />

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(_, info) => {
          if (info.offset.x < -40) goTo(index + 1);
          else if (info.offset.x > 40) goTo(index - 1);
        }}
        className="cursor-grab active:cursor-grabbing"
      >
        <motion.div
          animate={controls}
          className="grid gap-8 items-center"
        >
          <motion.div variants={piece}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[11px] tracking-wide text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/80" />
              FEATURED • {slides[index].k}
            </div>
            <h3 className="mt-4 text-2xl md:text-3xl font-semibold">
              {slides[index].title}
            </h3>
            <p className="mt-3 text-slate-300 leading-relaxed max-w-3xl">
              {slides[index].text}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute right-4 md:right-6 bottom-4 md:bottom-6 flex items-center gap-2">
        <button
          onClick={() => goTo(index - 1)}
          className="rounded-full border border-white/15 bg-white/[0.05] px-3 py-2 text-sm hover:bg-white/[0.1] transition"
          aria-label="Previous"
        >
          ←
        </button>
        <button
          onClick={() => goTo(index + 1)}
          className="rounded-full border border-white/15 bg-white/[0.05] px-3 py-2 text-sm hover:bg-white/[0.1] transition"
          aria-label="Next"
        >
          →
        </button>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 md:bottom-6 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-emerald-300/80" : "w-3 bg-white/30"
            }`}
            aria-label={`Go to ${i + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
}


function ProjectsGrid() {
  const projects = [
    {
      title: "Customer Segmentation (RFM Analysis)",
      desc:
        "Python-based RFM segmentation pipeline. Full cleaning, quantile scoring, and behavioral clustering with clear business insights.",
      stack: ["Python", "Pandas", "Matplotlib"],
      demo: "https://github.com/arsdmm/RFM-clustering-of-retail.git",
    },
    {
      title: "Retail Sales Forecasting (SARIMA)",
      desc:
        "End-to-end daily sales forecasting: baselines, SARIMA(2,1,1)x(1,1,1,7), event flags, and 30-day forward forecast with confidence intervals.",
      stack: ["Python", "Pandas", "statsmodels"],
      demo: "https://github.com/arsdmm/Time-Series-Analysis.git",
    },
    {
      title: "Data Quality Monitor Dashboard",
      desc:
        "Power BI dashboard with SQL-based DQ rule engine: thresholds, completeness/validity checks, KPI tiles, and rule-level insights.",
      stack: ["Power BI", "SQL", "Python"],
      demo: "https://github.com/arsdmm/Data-Quality-Business-Insights.git",
    },
    {
      title: "QA UI Automation – Playwright (SauceDemo)",
      desc:
        "End-to-end UI automation framework built with Playwright and pytest. Covers login scenarios, cart logic, and full checkout flow using Page Object Model, reusable fixtures, and clean test architecture.",
      stack: ["Python", "Playwright", "pytest", "POM"],
      demo: "https://github.com/arsdmm/QA-playwright-saucedemo.git",
    },
    {
      title: "QA API Automation – Mock-based REST Testing",
      desc:
        "Client-based API automation framework using pytest, requests, and Pydantic. Focused on contract validation, mock-based testing with responses, and clean separation between HTTP layer and business logic.",
      stack: ["Python", "pytest", "requests", "Pydantic", "responses"],
      demo: "https://github.com/arsdmm/QA-api-automation-reqres.git",
    },
  ];

  const grid = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { when: "beforeChildren", staggerChildren: 0.06, delayChildren: 0.05 },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 14, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <motion.div
      variants={grid}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="grid gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    >
      {projects.map((p) => (
        <motion.article
          key={p.title}
          variants={card}
          className="
            relative rounded-2xl border border-white/10 bg-white/[0.035]
            shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] overflow-hidden isolate
            flex flex-col
          "
        >
          <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(255,255,255,0.16)_0deg,rgba(255,255,255,0)_120deg,rgba(255,255,255,0)_240deg,rgba(255,255,255,0.16)_360deg)]" />

          <div className="p-5 md:p-6 flex-1 flex flex-col">
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/[0.05] text-slate-200">
                📂
              </div>
              <div className="flex items-center gap-2">
                <IconLink href={p.demo} label="Open">↗</IconLink>
              </div>
            </div>

            <h3 className="mt-4 text-lg md:text-xl font-semibold">{p.title}</h3>
            <p className="mt-2 text-slate-300 leading-relaxed">{p.desc}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {p.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-1 text-[11px] tracking-wide text-slate-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}

function IconLink({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="
        inline-flex h-8 w-8 items-center justify-center rounded-lg
        border border-white/15 bg-white/[0.05] text-slate-200
        hover:bg-white/[0.1] transition
      "
    >
      <span className="text-sm">{children}</span>
    </a>
  );
}
