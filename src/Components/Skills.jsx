// src/Components/Skills.jsx
import { motion } from "framer-motion";

export default function Skills() {
  const items = [
    { name: "SQL",     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "Oracle",  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg" },
    { name: "Azure",   logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
    { name: "AWS",     logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
    { name: "Python",  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Power BI",logo: "https://img.icons8.com/color/48/power-bi.png" },
    { name: "Tableau", logo: "https://cdn.worldvectorlogo.com/logos/tableau-software.svg" },
    { name: "Excel",   logo: "https://img.icons8.com/color/48/microsoft-excel-2019--v1.png" },
    { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "Hadoop",  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg" },
    { name: "Weka",    logo: "https://dashboard.snapcraft.io/site_media/appmedia/2021/10/weka.png" },
    { name: "Git",     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  ];

  const grid = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { when: "beforeChildren", staggerChildren: 0.06, delayChildren: 0.05, duration: 0.45, ease: "easeOut" },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 14, scale: 0.98 },
    show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <section id="skills" className="relative w-full bg-black text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_35%,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0)_60%)]" />

      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <div className="mb-8 flex items-center gap-4">
          <span className="text-slate-400">/</span>
          <h2 className="text-3xl md:text-4xl font-semibold">Skills</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-white/40 via-white/20 to-transparent" />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-slate-300 leading-relaxed max-w-3xl mb-8"
        >
          Tools I reach for when turning raw data into clear, actionable stories.
          Calm visuals, reproducible pipelines, and a bias toward maintainable choices.
        </motion.p>

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="
            grid gap-4 md:gap-5
            grid-cols-2 sm:grid-cols-3 lg:grid-cols-4
          "
        >
          {items.map((it) => (
            <motion.div
              key={it.name}
              variants={card}
              className="
                relative rounded-2xl border border-white/10
                bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
                overflow-hidden isolate
                group
              "
            >
              <div className="absolute inset-0 bg-[radial-gradient(85%_60%_at_50%_40%,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0)_60%)]" />

              <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(255,255,255,0.18)_0deg,rgba(255,255,255,0)_120deg,rgba(255,255,255,0)_240deg,rgba(255,255,255,0.18)_360deg)]" />

              <div className="relative z-10 flex flex-col items-center justify-center px-4 py-7">
                <img
                  src={it.logo}
                  alt={it.name}
                  className="h-10 w-10 md:h-12 md:w-12 object-contain drop-shadow-sm mb-3 transition-transform duration-300 group-hover:scale-[1.05]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <span className="text-[0.72rem] md:text-xs tracking-[0.18em] text-slate-200">
                  {it.name.toUpperCase()}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>
    </section>
  );
}
