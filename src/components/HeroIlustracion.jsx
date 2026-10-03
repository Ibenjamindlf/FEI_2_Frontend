// Ilustración decorativa del hero: una excavadora sobre una grilla, con
// franjas y un brillo rojo. Va inline (no como <img>) para que sus colores
// salgan de los tokens del tema: en oscuro es negra con trazos blancos y en
// claro se invierte. El rojo queda igual en los dos.
export default function HeroIlustracion({ className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 500"
      // Recorta como `object-cover` y deja visible el lado de la máquina.
      preserveAspectRatio="xMaxYMid slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="hero-brillo" cx=".78" cy=".65" r=".55">
          <stop offset="0" stopColor="#d11a21" stopOpacity=".55" />
          <stop offset="1" stopColor="#d11a21" stopOpacity="0" />
        </radialGradient>
        {/* Velo del color del fondo a la izquierda, detrás del texto. */}
        <linearGradient id="hero-velo" x2="1">
          <stop
            offset=".25"
            style={{ stopColor: 'var(--color-fondo)' }}
            stopOpacity=".85"
          />
          <stop
            offset=".6"
            style={{ stopColor: 'var(--color-fondo)' }}
            stopOpacity="0"
          />
        </linearGradient>
        <pattern
          id="hero-grilla"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M40 0H0v40"
            fill="none"
            className="stroke-tinta"
            strokeOpacity=".06"
          />
        </pattern>
      </defs>

      <rect width="1200" height="500" className="fill-fondo" />
      <rect width="1200" height="500" fill="url(#hero-brillo)" />
      <rect width="1200" height="500" fill="url(#hero-grilla)" />
      <path d="M760 0h90L650 500h-90z" className="fill-red-600" />
      <path
        d="M890 0h36L726 500h-36z"
        className="fill-red-600"
        fillOpacity=".55"
      />
      <path
        d="M970 0h14L784 500h-14z"
        className="fill-tinta"
        fillOpacity=".25"
      />
      <path
        d="M0 451h1200"
        className="stroke-tinta"
        strokeOpacity=".3"
        strokeWidth="2"
      />

      {/* Excavadora: relleno del color del fondo y contorno del de la tinta */}
      <g
        transform="translate(560 66) scale(2.3)"
        className="fill-fondo stroke-tinta"
        strokeWidth="1.2"
        strokeLinejoin="round"
      >
        <rect x="58" y="140" width="134" height="25" rx="12.5" />
        <path d="M100 130h50v10h-50zM66 130V102l14-10h70v38zM116 92V60h24l12 12v20z" />
        <path
          d="M146 104 190 50l42 20"
          fill="none"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M146 104 190 50l42 20"
          fill="none"
          className="stroke-fondo"
          strokeWidth="11.6"
          strokeLinecap="round"
        />
        <path
          d="M232 70l8 52"
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M232 70l8 52"
          fill="none"
          className="stroke-fondo"
          strokeWidth="7.6"
          strokeLinecap="round"
        />
        <path d="M226 118l26 3-4 25q-13 5-23-8z" />
        <path
          d="M121 88V65h17l9 9v14z"
          className="fill-red-600"
          stroke="none"
        />
        <g fill="none" strokeOpacity=".6">
          <circle cx="75" cy="152.5" r="6" />
          <circle cx="100" cy="152.5" r="6" />
          <circle cx="125" cy="152.5" r="6" />
          <circle cx="150" cy="152.5" r="6" />
          <circle cx="175" cy="152.5" r="6" />
        </g>
      </g>

      <rect width="1200" height="500" fill="url(#hero-velo)" />
    </svg>
  )
}
