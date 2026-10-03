import { useLocation, useNavigate } from 'react-router'
import useAuth from '../hooks/useAuth'
import useFavoritos from '../hooks/useFavoritos'

const AVISO_LOGIN =
  'Para agregar una máquina a favoritos, primero debés iniciar sesión'

// Corazón para marcar o desmarcar una máquina como favorita: relleno en rojo
// si ya lo es, solo contorno si no. Sin sesión no agrega nada: lleva al login
// con el aviso y la ruta actual, para volver acá después de ingresar.
export default function BotonFavorito({ maquina, className = '' }) {
  const { usuario, cargando } = useAuth()
  const { favoritos, alternarFavorito } = useFavoritos()
  const navigate = useNavigate()
  const location = useLocation()
  const activa = favoritos.has(maquina.documentId)

  const handleClick = () => {
    // Mientras se recupera la sesión todavía no se sabe si hay usuario.
    if (cargando) return

    if (!usuario) {
      navigate('/login', {
        state: {
          aviso: AVISO_LOGIN,
          desde: `${location.pathname}${location.search}`,
        },
      })
      return
    }

    alternarFavorito(maquina.documentId)
  }

  const etiqueta = activa
    ? `Quitar ${maquina.nombre} de favoritas`
    : `Agregar ${maquina.nombre} a favoritas`

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={etiqueta}
      aria-pressed={activa}
      title={etiqueta}
      className={`vidrio-denso flex h-9 w-9 items-center justify-center rounded-full transition hover:border-acento hover:text-acento ${
        activa ? 'text-acento' : 'text-tinta'
      } ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={activa ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </button>
  )
}
