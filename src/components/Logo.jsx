// Logo genérico del sitio: isotipo (brazo de excavadora sobre un
// paralelogramo) y nombre. No representa a ninguna empresa real.
export default function Logo({ className = '' }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 40"
        className="h-9 w-auto"
        aria-hidden="true"
      >
        <path className="fill-red-600" d="M11 0H48L37 40H0Z" />
        <path
          className="stroke-white"
          d="M12 31 21 11 33 15 32 24"
          fill="none"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path className="fill-white" d="M28 23h9l-3 7h-7z" />
        <circle className="fill-white" cx="21" cy="11" r="2.5" />
      </svg>

      <span className="font-display leading-none uppercase">
        <span className="block text-xl font-bold tracking-wider">
          Maquinaria
        </span>
        <span className="block text-[0.65rem] font-medium tracking-[0.3em] text-white/70">
          Catálogo
        </span>
      </span>
    </span>
  )
}
