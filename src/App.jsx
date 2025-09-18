// src/App.jsx
import { useEffect, useRef, useState } from "react";

import Hero from "./Components/Hero";
import About from "./Components/About";
import Skills from "./Components/Skills";
import Projects from "./Components/Projects";

export default function App() {
  // Hero: помним, что интро уже играло (используется внутри Hero)
  const heroPlayedRef = useRef(false);

  // Секции как данные: в node прокидываем onNav и опции рендера
  const sections = [
    {
      id: "home",
      node: (onNav, opts) => (
        <Hero
          onNav={onNav}
          playedRef={heroPlayedRef}
          hideContent={opts?.hideContent}
          playIntro={opts?.playIntro}
          renderStatic={opts?.renderStatic}
        />
      ),
    },
    {
      id: "about",
      node: (_onNav, opts) => (
        <About
          hideContent={opts?.hideContent}
          playIntro={opts?.playIntro}
          renderStatic={opts?.renderStatic}
        />
      ),
    },
    {
      id: "skills",
      node: (_onNav, opts) => (
        <Skills
          hideContent={opts?.hideContent}
          playIntro={opts?.playIntro}
          renderStatic={opts?.renderStatic}
        />
      ),
    },
    {
      id: "projects",
      node: (_onNav, opts) => (
        <Projects
          hideContent={opts?.hideContent}
          playIntro={opts?.playIntro}
          renderStatic={opts?.renderStatic}
        />
      ),
    },
  ];

  const [index, setIndex] = useState(0);

  // Состояние wipe-перелистывания
  const [wipe, setWipe] = useState({
    active: false,
    dir: 1,         // 1 = next (право→лево), -1 = prev (лево→право)
    fromIdx: 0,
    toIdx: 0,
    duration: 1500, // мс — скорость перелистывания
  });

  // Переход с wipe
  const goToIndexWithWipe = (nextIdx) => {
    if (nextIdx === index || nextIdx < 0 || nextIdx >= sections.length) return;

    const dir = nextIdx > index ? 1 : -1;
    setWipe({ active: true, dir, fromIdx: index, toIdx: nextIdx, duration: wipe.duration });

    // После окончания анимации — переключаем живую секцию
    window.setTimeout(() => {
      setIndex(nextIdx);

      const id = sections[nextIdx].id;
      if (id && window.location.hash.slice(1) !== id) {
        history.replaceState(null, "", `#${id}`);
      }

      setWipe((w) => ({ ...w, active: false }));
    }, wipe.duration);
  };

  // Колесо мыши: листаем страница-за-страницей
  useEffect(() => {
    let lock = false;

    const onWheel = (e) => {
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 2) return;
      e.preventDefault();

      if (lock || wipe.active) return;
      lock = true;

      if (delta > 0) {
        goToIndexWithWipe(Math.min(index + 1, sections.length - 1));
      } else {
        goToIndexWithWipe(Math.max(index - 1, 0));
      }

      window.setTimeout(() => { lock = false; }, wipe.duration + 50);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [index, wipe.active, wipe.duration]);

  // Клавиатура ←/→, PageUp/PageDown
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


  // Навигация из Hero (клики в хедере)
  const onNav = (id) => {
    const nextIdx = sections.findIndex((s) => s.id === id);
    if (nextIdx >= 0) goToIndexWithWipe(nextIdx);
  };

  return (
    <>
      {/* Живая страница: всегда одна секция на экране */}
      <main className="relative h-[100svh] w-screen overflow-hidden bg-black text-white">
        <section className="absolute inset-0">
          {sections[index].node(onNav, {
            hideContent: false,          // контент не скрываем на живом экране
            playIntro: !wipe.active,     // после завершения wipe секция может играть интро
            renderStatic: wipe.active,   // если вдруг активно wipe (редко), рендерим статично
          })}
        </section>
      </main>

      {/* Wipe-overlay: две «копии» секций с клип-анимациями */}
      {wipe.active && (
        <div className="fixed inset-0 z-[60] pointer-events-none">
          {/* Уходящая секция — показываем статично */}
          <div
            className={`absolute inset-0 will-change-[clip-path] ${
              wipe.dir > 0 ? "animate-wipe-out-rtl" : "animate-wipe-out-ltr"
            }`}
            style={{ animationDuration: `${wipe.duration}ms` }}
          >
            {sections[wipe.fromIdx].node(onNav, {
              hideContent: false,  // видно
              playIntro: false,    // без интро
              renderStatic: true,  // статично
            })}
          </div>

          {/* Входящая секция — полностью скрыта в оверлее */}
          <div
            className={`absolute inset-0 will-change-[clip-path] ${
              wipe.dir > 0 ? "animate-wipe-in-rtl" : "animate-wipe-in-ltr"
            }`}
            style={{ animationDuration: `${wipe.duration}ms` }}
          >
            {sections[wipe.toIdx].node(onNav, {
              hideContent: true,   // ВАЖНО: прячем контент, чтобы не «подглядывал»
              playIntro: false,    // интро не играем в оверлее
              renderStatic: true,  // статично
            })}
          </div>
        </div>
      )}
    </>
  );
}
