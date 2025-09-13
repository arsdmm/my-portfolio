import { useEffect } from "react";

export default function usePageSnap(ref, { duration = 650 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let anim = false;

    const pageIndex = () => Math.round(el.scrollTop / el.clientHeight);
    const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

    const onWheel = (e) => {
      if (anim) { e.preventDefault(); return; }

      const dir = Math.sign(e.deltaY);      // 1 вниз, -1 вверх
      if (!dir) return;

      e.preventDefault();                   // отключаем нативный рывок
      const current = pageIndex();
      const total = Math.ceil(el.scrollHeight / el.clientHeight) - 1;
      const target = clamp(current + (dir > 0 ? 1 : -1), 0, total);

      anim = true;
      el.scrollTo({ top: target * el.clientHeight, behavior: "smooth" });
      setTimeout(() => { anim = false; }, duration); // подстрой под себя
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [ref, duration]);
}
