// Mensaje flotante abajo de la pantalla, para errores que no tienen un lugar
// fijo en la página (ej. no se pudo guardar un favorito).
export default function Aviso({ children, onCerrar }) {
  return (
    <div
      role="alert"
      className="vidrio-denso fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-md items-start gap-3 rounded-xl border-red-500/60! px-4 py-3 text-sm"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-5 w-5 shrink-0 text-red-500"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
        />
      </svg>
      <p className="flex-1">{children}</p>
      <button
        type="button"
        onClick={onCerrar}
        aria-label="Cerrar aviso"
        className="text-white/60 transition hover:text-red-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  )
}
