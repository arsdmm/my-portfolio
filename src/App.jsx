// src/App.jsx
import { useRef } from "react";
import usePageSnap from "./Hooks/usePageSnap"; // путь поправь, если файл лежит в другом месте

import Hero from "./Components/Hero";
import About from "./Components/About";
import Projects from "./Components/Projects";
import Contact from "./Components/Contact";

export default function App() {
  const containerRef = useRef(null);
  usePageSnap(containerRef, { duration: 900 }); // 500–800 мс обычно ок

  return (
    <main
      ref={containerRef}
      className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black text-white"
    >
      <section className="h-screen snap-start"><Hero /></section>
      <section id="about" className="h-screen snap-start"><About /></section>
      <section id="projects" className="h-screen snap-start"><Projects /></section>
      <section id="contact" className="h-screen snap-start"><Contact /></section>
    </main>
  );
}
