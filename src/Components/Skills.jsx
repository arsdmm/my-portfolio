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

  const palettes = [
    "from-[#0b0f14] to-[#0b0f14]",
    "from-[#0c1413] to-[#0b1110]",
    "from-[#131010] to-[#0e0b0b]",
    "from-[#0c0f16] to-[#0a0d13]",
  ];

  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { when: "beforeChildren", staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.96 },
    show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="w-full px-4 md:px-8 mx-auto max-w-6xl">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
        className="text-3xl font-semibold mb-8 text-center"
      >
        Skills
      </motion.h2>

      <motion.div
        variants={gridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        className="
          grid gap-5 md:gap-6
          h-[60vh] min-h-[420px]
          grid-cols-2 grid-rows-6
          md:grid-cols-3 md:grid-rows-4
          lg:grid-cols-4 lg:grid-rows-3
          xl:grid-cols-6 xl:grid-rows-2
        "
      >
        {items.map((item, i) => {
          const bg = palettes[i % palettes.length];
          return (
            <motion.div
              key={item.name}
              variants={cardVariants}
              className="
                relative rounded-3xl border border-white/10 overflow-hidden
                shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
                transition-[transform,filter] duration-300
                hover:brightness-110 hover:-translate-y-0.5
                flex items-center justify-center
              "
              title={item.name}
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${bg}`} />
              <div className="absolute inset-0 bg-[radial-gradient(85%_60%_at_50%_40%,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0)_60%)] pointer-events-none" />
              <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10 pointer-events-none" />

              <div className="relative z-10 text-center select-none">
                <img
                  src={item.logo}
                  alt={item.name}
                  className="mx-auto h-10 w-10 md:h-12 md:w-12 object-contain drop-shadow-sm mb-3"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <span className="tracking-[0.2em] text-[0.7rem] md:text-xs text-slate-200">
                  {item.name.toUpperCase()}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
