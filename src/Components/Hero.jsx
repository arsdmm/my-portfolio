import { useEffect, useState } from "react";

// Full string (used both for typing and to reserve final width to prevent shifting)
const FULL_NAME_LINE = "Hi! \u00A0 I'm \u00A0 D m y t r o \u00A0 L i t v i n o v";

export default function Hero() {
  const [typed, setTyped] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const startDelay = 2800; // when to start typing (synced with the line)
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
        }
      }, speed);
    }, startDelay);

    // subtitle + bio appear 1s after typing starts
    const tInfo = setTimeout(() => setShowInfo(true), startDelay + 1000);

    return () => {
      clearTimeout(t0);
      clearTimeout(tInfo);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="relative h-screen snap-start bg-black text-white overflow-hidden">

      {/* white light background */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-vignette-min" />

      {/* star */}
      <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-full h-[12vh] z-10 horizon-soft opacity-50 blur-xl" />

      {/* a line */}
      <div className="absolute left-0 top-1/2 w-full h-[2px] z-20 overflow-visible">
        <div className="relative h-[2px] bg-white animate-draw-rise">
          <div
            className="absolute left-full -top-[4px] translate-x-[16px]
                       w-[10px] h-[10px] rotate-45 bg-white
                       shadow-[0_0_12px_4px_rgba(255,255,255,0.85)]"
          />
        </div>
      </div>

      {/* name typing + cursor */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 ml-3 md:ml-4 -translate-y-12 md:-translate-y-20   z-30 text-center">
        {/* width is fixed by an invisible ghost so the line doesn't shift while typing */}
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

        {/* subtitle (appears 1s after typing has started) */}
        <p
          className={
            "mt-20 text-lg md:text-xl text-gray-300 " +
            (showInfo ? "animate-fade-up [animation-delay:0.05s]" : "opacity-0 translate-y-4")
          }
        >
          I'm turning raw data into real insights.
        </p>

        {/* short bio centered */}
        <p
          className={
            "mt-3 max-w-2xl mx-auto text-sm md:text-base text-gray-400 leading-relaxed text-center " +
            (showInfo ? "animate-fade-up [animation-delay:0.18s]" : "opacity-0 translate-y-4")
          }
        >
          I'm a data analyst based in Toronto. I'm passionate about large-scale, high-impact work,
          where I turn messy data into meaningful decisions and minimal, easy-to-read visuals.
        </p>
      </div>

      {/* header */}
      <header
        className="absolute top-0 left-0 w-full flex justify-center gap-8
                  py-6
                  font-sans font-normal text-base md:text-lg text-gray-300   /* ← same as subtitle */
                  opacity-0 animate-header-in z-30"
      >
        <a href="#about"    className="hover:text-gray-400">About</a>
        <a href="#skills" className="hover:text-gray-400">Skills</a>
        <a href="#projects" className="hover:text-gray-400">Projects</a>
      </header>
    </section>
  );
}
