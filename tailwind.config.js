// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        /* 0-50%: рисуем линию слева-направо (width 0->100)
           50-100%: поднимаем линию вверх и останавливаем под header.
           4rem можно подогнать под твою высоту хедера. */
        'draw-rise': {
          '0%':  { width: '0%',  transform: 'translateY(0)' },
          '50%': { width: '100%',transform: 'translateY(0)' },
          '100%':{ width: '100%',transform: 'translateY(calc(-50vh + 4rem))' }
        },
        /* печатающееся имя — под длину строки, 26ch подгоняй при желании */
        typing: {
          '0%':  { width: '0ch' },
          '100%':{ width: '26ch' }
        },
        /* header выплывает вниз (пока линия едет вверх) */
        'header-in': {
          '0%':  { opacity: 0, transform: 'translateY(-16px)' },
          '100%':{ opacity: 1, transform: 'translateY(0)' }
        },
        blink: { '0%,49%': { opacity: 1 }, '50%,100%': { opacity: 0 } },
      },
      animation: {
        // итого 3s: 1.5s рисуем, 1.5s поднимаем
        'draw-rise': 'draw-rise 4s ease-in-out forwards',
        // имя печатается одновременно с рисованием (1.5s)
        'typing': 'typing 2s steps(26, end) 0s forwards',
        // header начинает чуть позже — когда линия поехала вверх
        'header-in': 'header-in 1.3s ease-out 1.6s forwards',
        blink: 'blink 1s steps(1, end) infinite',
      }
    }
  },
  plugins: [],
}
