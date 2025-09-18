// src/App.jsx
import Hero from "./Components/Hero";
import About from "./Components/About";
import Skills from "./Components/Skills";
import Projects from "./Components/Projects";

export default function App() {
  return (
    <main className="bg-black text-white">
      {/* Каждая секция тянется минимум на высоту экрана */}
      <section id="home" className="min-h-screen flex items-center">
        <Hero />
      </section>

      <section id="about" className="min-h-screen flex items-center">
        <About />
      </section>

      <section id="skills" className="min-h-screen flex items-center">
        <Skills />
      </section>

      <section id="projects" className="min-h-screen flex items-center">
        <Projects />
      </section>
    </main>
  );
}
