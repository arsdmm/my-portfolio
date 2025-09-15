// src/App.jsx
import { useRef, useEffect } from "react";
import useHorizontalSnap from "./Hooks/useHorizontalSnap";

import Hero from "./Components/Hero";
import About from "./Components/About";
import Skills from "./Components/Skills";
import Projects from "./Components/Projects";

export default function App() {
  const containerRef = useRef(null);

  // 1) turn wheel into smooth horizontal scroll + hash sync inside the container
  useHorizontalSnap(containerRef);

  // 2) on first load, jump to current hash (#about, #projects, ...)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const id = window.location.hash.slice(1);
    if (!id) return;
    const target = el.querySelector(`#${id}`);
    if (target) el.scrollTo({ left: target.offsetLeft, behavior: "instant" });
  }, []);

  // 3) helper for menu clicks (we'll pass it into Hero to handle header links)
  const onNav = (id) => {
    const el = containerRef.current;
    if (!el) return;
    const target = el.querySelector(`#${id}`);
    if (target) el.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
  };

  return (
    <main
      ref={containerRef}
      className="
        h-[100svh] w-screen
        flex                /* horizontal row of sections */
        overflow-x-scroll overflow-y-hidden
        snap-x snap-mandatory [scroll-snap-stop:always]
        scroll-smooth no-scrollbar
        bg-black text-white
      "
    >
      {/* each section = full viewport width/height and a snap target */}
      <section id="home"     className="snap-start shrink-0 w-screen h-[100svh]">
        <Hero onNav={onNav} />
      </section>

      <section id="about"    className="snap-start shrink-0 w-screen h-[100svh]">
        <About />
      </section>

      <section id="skills"   className="snap-start shrink-0 w-screen h-[100svh]">
        <Skills />
      </section>

      <section id="projects" className="snap-start shrink-0 w-screen h-[100svh]">
        <Projects />
      </section>
    </main>
  );
}
