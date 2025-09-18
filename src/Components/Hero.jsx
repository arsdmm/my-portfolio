import { useEffect, useState } from "react";

// Full string (used both for typing and to reserve final width to prevent shifting)
const FULL_NAME_LINE = "Hi! \u00A0 I'm \u00A0 D m y t r o \u00A0 L i t v i n o v";

export default function Hero({ onNav, playedRef }) {
  // has the intro already been played this session?
  const alreadyPlayed = Boolean(playedRef?.current);

  // initialize state from alreadyPlayed to avoid re-animating on remount
  const [typed, setTyped]       = useState(alreadyPlayed ? FULL_NAME_LINE : "");
  const [started, setStarted]   = useState(alreadyPlayed);
  const [done, setDone]         = useState(alreadyPlayed);
  const [showInfo, setShowInfo] = useState(alreadyPlayed);

  useEffect(() => {
    if (alreadyPlayed) return;

    const startDelay = 3000; // when to start typing (synced with the line)
    const speed = 70;        // ms per character

    let intervalId;
    const t0 = setTimeout(() => {
      setStarted(true);
      let i = 0;
      intervalId = setInterval(() => {
        i++;
        setTyped(FULL_NAME_LINE.slice(0, i));
        if (i >= FULL_NAME_LINE.length) {
          clearInterval(intervalId);
          setDone(true);
          if (playedRef) playedRef.current = true; // mark as played once
        }
      }, speed);
    }, startDelay);

    // subtitle + bio (and button) appear 1s after typing starts
    const tInfo = setTimeout(() => setShowInfo(true), startDelay + 1000);

    return () => {
      clearTimeout(t0);
      clearTimeout(tInfo);
      if (intervalId) clearInterval(intervalId);
    };
  }, [alreadyPlayed, playedRef]);

  return (
    <section className="relative h-screen snap-start bg-black text-white overflow-hidden">
      {/* white light background */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-vignette-min" />

      {/* star (subtle horizontal glow behind the line) */}
      <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-full h-[12vh] z-10 horizon-soft opacity-50 blur-xl" />

      {/* a line: animated on first visit; static at top on subsequent visits */}
      {alreadyPlayed ? (
        <div
          className="absolute left-0 top-1/2 w-full h-[2px] z-20"
          style={{ transform: "translateY(calc(-50vh + 4rem))" }}
        >
          <div className="h-[2px] bg-white" />
        </div>
      ) : (
        <div className="absolute left-0 top-1/2 w-full h-[2px] z-20 overflow-visible">
          <div className="relative h-[2px] bg-white animate-draw-rise">
            <div
              className="absolute left-full -top-[4px] translate-x-[16px]
                         w-[10px] h-[10px] rotate-45 bg-white
                         shadow-[0_0_12px_4px_rgba(255,255,255,0.85)]"
            />
          </div>
        </div>
      )}

      {/* name typing + cursor + subtitle + bio + email button */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 ml-3 md:ml-4 -translate-y-12 md:-translate-y-20 z-30 text-center">
        {/* reserve width so the typed line doesn't shift */}
        <div className="relative inline-block">
          <span
            aria-hidden
            className="invisible font-mono text-2xl md:text-4xl tracking-[0.35em] whitespace-nowrap"
          >
            {FULL_NAME_LINE}
          </span>
          <span className="absolute inset-0">
            <span className="font-mono text-2xl md:text-4xl tracking-[0.35em] text-gray-300 whitespace-nowrap">
              {typed}
              {started && (
                <span
                  className={
                    "ml-1 inline-block h-[1.2em] w-px align-middle bg-gray-400 " +
                    (done ? "animate-blink" : "")
                  }
                />
              )}
            </span>
          </span>
        </div>

        {/* subtitle */}
        <p
          className={
            "mt-20 text-lg md:text-xl text-gray-300 " +
            (showInfo
              ? (alreadyPlayed ? "" : "animate-fade-up [animation-delay:0.05s]")
              : "opacity-0 translate-y-4")
          }
        >
          I'm turning raw data into real insights.
        </p>

        {/* bio */}
        <p
          className={
            "mt-3 max-w-2xl mx-auto text-sm md:text-base text-gray-400 leading-relaxed text-center " +
            (showInfo
              ? (alreadyPlayed ? "" : "animate-fade-up [animation-delay:0.18s]")
              : "opacity-0 translate-y-4")
          }
        >
          I'm a data analyst based in Toronto. I'm passionate about large-scale, high-impact work,
          where I turn messy data into meaningful decisions and minimal, easy-to-read visuals.
        </p>

        {/* Email me button */}
        <a
          href="mailto:dmlitvinov99@gmail.com"
          aria-label="Email me at dmlitvinov99@gmail.com"
          className={
            "mt-20 inline-flex items-center justify-center rounded-xl border px-8 py-3.5 " +
            "text-sm md:text-base border-white/70 text-white " +
            "transition-colors duration-200 " +
            "hover:bg-white hover:text-black active:bg-white active:text-black " +
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 " +
            (showInfo
              ? (alreadyPlayed ? "" : "animate-fade-up [animation-delay:0.30s]")
              : "opacity-0 translate-y-4 pointer-events-none")
          }
        >
          Let's connect
        </a>
      </div>

      {/* header */}
      <header
        className={
          "absolute top-0 left-0 w-full flex justify-center gap-8 py-6 " +
          "font-sans font-normal text-base md:text-lg text-gray-300 z-30 " +
          (alreadyPlayed ? "opacity-100" : "opacity-0 animate-header-in")
        }
      >
        <a
          href="#about"
          onClick={(e) => { e.preventDefault(); onNav?.("about"); }}
          className="hover:text-gray-400 transition-colors"
        >
          About
        </a>
        <a
          href="#skills"
          onClick={(e) => { e.preventDefault(); onNav?.("skills"); }}
          className="hover:text-gray-400 transition-colors"
        >
          Skills
        </a>
        <a
          href="#projects"
          onClick={(e) => { e.preventDefault(); onNav?.("projects"); }}
          className="hover:text-gray-400 transition-colors"
        >
          Projects
        </a>
      </header>
    </section>
  );
}
