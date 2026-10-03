import { useEffect, useId, useRef, useState } from 'react'
import useAuth from '../hooks/useAuth'

// Ícono genérico de perfil: el usuario de Strapi no tiene foto.
function AvatarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  )
}

// Botón de perfil del header con un desplegable para cerrar sesión.
// `panelClassName` posiciona el desplegable respecto del botón.
export default function MenuPerfil({ panelClassName = 'right-0' }) {
  const { usuario, logout } = useAuth()
  const [abierto, setAbierto] = useState(false)
  const [cerrando, setCerrando] = useState(false)
  const contenedor = useRef(null)
  const panelId = useId()

  // Se cierra con un clic afuera o con Escape.
  useEffect(() => {
    if (!abierto) return

    const alClicAfuera = (e) => {
      if (!contenedor.current?.contains(e.target)) setAbierto(false)
    }
    const alTeclear = (e) => {
      if (e.key === 'Escape') setAbierto(false)
    }

    document.addEventListener('mousedown', alClicAfuera)
    document.addEventListener('keydown', alTeclear)
    return () => {
      document.removeEventListener('mousedown', alClicAfuera)
      document.removeEventListener('keydown', alTeclear)
    }
  }, [abierto])

  const cerrarSesion = async () => {
    setCerrando(true)
    // Al cerrar la sesión este componente se desmonta (el header vuelve a
    // mostrar "Ingresar"), así que no hace falta resetear el estado.
    await logout()
  }

  return (
    <div ref={contenedor} className="relative">
      <button
        type="button"
        onClick={() => setAbierto((a) => !a)}
        aria-label={`Perfil de ${usuario.username}`}
        aria-expanded={abierto}
        aria-controls={panelId}
        className={`vidrio flex h-10 w-10 items-center justify-center rounded-full transition hover:border-red-500 hover:text-red-500 ${
          abierto ? 'border-red-500! text-red-500' : ''
        }`}
      >
        <AvatarIcon />
      </button>

      {abierto && (
        <div
          id={panelId}
          className={`vidrio-denso absolute top-full z-50 mt-3 w-60 overflow-hidden rounded-xl ${panelClassName}`}
        >
          <div className="franja-peligro h-1" />
          <div className="px-4 py-3 text-left">
            <p className="text-xs text-white/60">Sesión iniciada como</p>
            <p className="font-display truncate text-lg font-semibold tracking-wide">
              {usuario.username}
            </p>
            <p className="truncate text-xs text-white/60">{usuario.email}</p>
          </div>
          <div className="border-t border-white/10 p-2">
            <button
              type="button"
              onClick={cerrarSesion}
              disabled={cerrando}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition hover:bg-red-600/20 hover:text-red-500 disabled:cursor-wait disabled:opacity-60"
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
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
              {cerrando ? 'Cerrando sesión…' : 'Cerrar sesión'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
