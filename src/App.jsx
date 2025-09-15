// src/App.jsx
import { useRef } from "react";
import usePageSnap from "./Hooks/usePageSnap";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Skills from "./Components/Skills"
import Projects from "./Components/Projects";


export default function App() {
  const containerRef = useRef(null);
  usePageSnap(containerRef, { duration: 900 });

  return (
    <main
      ref={containerRef}
      className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black text-white"
    >
      <section className="h-screen snap-start"><Hero /></section>
      <section id="about" className="h-screen snap-start"><About /></section>
      <section id="skills" className="h-screen snap-start"><Skills/></section>
      <section id="projects" className="h-screen snap-start"><Projects /></section>
    </main>
  );
}
