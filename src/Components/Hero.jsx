import { useEffect, useState } from "react";

export default function Hero() {
  const [typed, setTyped] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const full = "D m y t r o \u00A0 L i t v i n o v";
    const startDelay = 1600;
    const speed = 70;

    let intervalId;
    const t0 = setTimeout(() => {
      setStarted(true);
      let i = 0;
      intervalId = setInterval(() => {
        i++;
        setTyped(full.slice(0, i));
        if (i >= full.length) {
          clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(t0);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="relative h-screen snap-start bg-black text-white overflow-hidden">

      {/* --- minimal background --- */}
      {/* мягкая виньетка: центр чуть светлее, края чуть темнее */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-vignette-min" />

      {/* очень деликатный горизонтальный «блик» у линии */}
      <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-full h-[12vh] z-10 horizon-soft opacity-50 blur-xl" />

      {/* линия: рисуется → поднимается; «звезда» уходит за правый край */}
      <div className="absolute left-0 top-1/2 w-full h-[2px] z-20 overflow-visible">
        <div className="relative h-[2px] bg-white animate-draw-rise">
          <div
            className="absolute left-full -top-[4px] translate-x-[16px]
                       w-[10px] h-[10px] rotate-45 bg-white
                       shadow-[0_0_12px_4px_rgba(255,255,255,0.85)]"
          />
        </div>
      </div>

      {/* имя + курсор (статичен при печати, мигает после) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-8 z-30">
        <p className="font-mono text-2xl md:text-4xl tracking-[0.35em] text-gray-300 whitespace-nowrap">
          {typed}
          {started && (
            <span
              className={
                "ml-1 inline-block h-[1.2em] w-px align-middle bg-gray-400 " +
                (done ? "animate-blink" : "")
              }
            />
          )}
        </p>
      </div>

      {/* header появляется, пока линия едет вверх */}
      <header
        className="absolute top-0 left-0 w-full flex justify-center gap-8
                   text-lg font-medium py-6 text-white
                   opacity-0 animate-header-in z-30"
      >
        <a href="#projects" className="hover:text-gray-400">Projects</a>
        <a href="#about"    className="hover:text-gray-400">About</a>
        <a href="#contact"  className="hover:text-gray-400">Contact</a>
      </header>
    </section>
  );
}
