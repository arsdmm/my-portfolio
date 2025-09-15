import { useEffect } from "react";

export default function useHorizontalSnap(containerRef, sectionSelector = "section") {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // 1) turn vertical wheel into horizontal scroll
    const onWheel = (e) => {
      // allow native horizontal; convert vertical to horizontal
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 2) return;
      e.preventDefault(); // IMPORTANT: passive: false on addEventListener
      el.scrollBy({ left: delta, behavior: "smooth" });
    };

    // 2) snap to nearest section and update hash (throttled)
    let rAF = 0;
    const onScroll = () => {
      cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(() => {
        const sections = Array.from(el.querySelectorAll(sectionSelector));
        const center = el.scrollLeft + el.clientWidth / 2;
        let best = sections[0];
        let bestDist = Infinity;
        for (const s of sections) {
          const mid = s.offsetLeft + s.offsetWidth / 2;
          const d = Math.abs(mid - center);
          if (d < bestDist) { best = s; bestDist = d; }
        }
        const id = best?.id;
        if (id && window.location.hash.slice(1) !== id) {
          history.replaceState(null, "", `#${id}`);
        }
      });
    };

    // 3) arrow keys (←/→) navigate section by section
    const onKey = (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      const sections = Array.from(el.querySelectorAll(sectionSelector));
      const x = el.scrollLeft;
      const w = el.clientWidth;
      const i = Math.round(x / w);
      const next = e.key === "ArrowRight" ? Math.min(i + 1, sections.length - 1)
                                          : Math.max(i - 1, 0);
      el.scrollTo({ left: sections[next].offsetLeft, behavior: "smooth" });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(rAF);
    };
  }, [containerRef, sectionSelector]);
}
