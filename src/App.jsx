// src/App.jsx
import { useEffect, useRef, useState } from "react";

import Hero from "./Components/Hero";
import About from "./Components/About";
import Skills from "./Components/Skills";
import Projects from "./Components/Projects";

export default function App() {
  // remember that Hero intro has already been played in this session
  const heroPlayedRef = useRef(false);

  // sections as data: we render exactly one page + two copies inside the wipe overlay
  const sections = [
    { id: "home",     node: (onNav) => <Hero onNav={onNav} playedRef={heroPlayedRef} /> },
    { id: "about",    node: () => <About /> },
    { id: "skills",   node: () => <Skills /> },
    { id: "projects", node: () => <Projects /> },
  ];

  const [index, setIndex] = useState(0);

  // wipe overlay state
  const [wipe, setWipe] = useState({
    active: false,
    dir: 1,            // 1 = next (right→left wipe), -1 = prev (left→right wipe)
    fromIdx: 0,
    toIdx: 0,
    duration: 1500,     // ms — adjust for speed
  });

  // go to a specific index using the wipe transition
  const goToIndexWithWipe = (nextIdx) => {
    if (nextIdx === index || nextIdx < 0 || nextIdx >= sections.length) return;

    const dir = nextIdx > index ? 1 : -1;
    setWipe({ active: true, dir, fromIdx: index, toIdx: nextIdx, duration: wipe.duration });

    // after the animation completes, switch the "live" section and hide overlay
    window.setTimeout(() => {
      setIndex(nextIdx);
      // keep URL in sync for deep links
      const id = sections[nextIdx].id;
      if (id && window.location.hash.slice(1) !== id) {
        history.replaceState(null, "", `#${id}`);
      }
      setWipe((w) => ({ ...w, active: false }));
    }, wipe.duration);
  };

  // wheel → strictly page-by-page with wipe (no free scrolling in between)
  useEffect(() => {
    let animating = false;

    const onWheel = (e) => {
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 2) return;
      e.preventDefault();

      if (animating || wipe.active) return;
      animating = true;

      if (delta > 0) {
        goToIndexWithWipe(Math.min(index + 1, sections.length - 1));
      } else {
        goToIndexWithWipe(Math.max(index - 1, 0));
      }

      // lock until the wipe finishes
      window.setTimeout(() => { animating = false; }, wipe.duration + 50);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [index, wipe.active, wipe.duration]);

  // keyboard arrows/PageUp/PageDown also navigate
  useEffect(() => {
    const onKey = (e) => {
      if (wipe.active) return;
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        goToIndexWithWipe(Math.min(index + 1, sections.length - 1));
      }
      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        goToIndexWithWipe(Math.max(index - 1, 0));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, wipe.active]);

  // deep link on first load (no animation)
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const idx = sections.findIndex((s) => s.id === hash);
    if (idx >= 0) setIndex(idx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // nav handler passed into Hero header
  const onNav = (id) => {
    const nextIdx = sections.findIndex((s) => s.id === id);
    if (nextIdx >= 0) goToIndexWithWipe(nextIdx);
  };

  return (
    <>
      {/* Live page: render exactly one section (full-screen) */}
      <main className="relative h-[100svh] w-screen overflow-hidden bg-black text-white">
        <section className="absolute inset-0">{sections[index].node(onNav)}</section>
      </main>

      {/* Wipe overlay: two layers with complementary clip-path animations */}
      {wipe.active && (
        <div className="fixed inset-0 z-[60] pointer-events-none">
          {/* OUTGOING layer */}
          <div
            className={`absolute inset-0 will-change-[clip-path] ${
              wipe.dir > 0 ? "animate-wipe-out-rtl" : "animate-wipe-out-ltr"
            }`}
            style={{ animationDuration: `${wipe.duration}ms` }}
          >
            {sections[wipe.fromIdx].node(onNav)}
          </div>

          {/* INCOMING layer */}
          <div
            className={`absolute inset-0 will-change-[clip-path] ${
              wipe.dir > 0 ? "animate-wipe-in-rtl" : "animate-wipe-in-ltr"
            }`}
            style={{ animationDuration: `${wipe.duration}ms` }}
          >
            {sections[wipe.toIdx].node(onNav)}
          </div>
        </div>
      )}
    </>
  );
}
