import { useCallback, useEffect, useMemo, useState } from 'react'
import Aviso from '../components/Aviso'
import useAuth from '../hooks/useAuth'
import { guardarFavoritos, leerFavoritos } from '../services/favoritos'
import { FavoritosContext } from './FavoritosContext'

const DURACION_AVISO = 5000

// Mantiene las máquinas favoritas del usuario logueado para toda la app.
// Tiene que ir dentro de AuthProvider.
export default function FavoritosProvider({ children }) {
  const { usuario } = useAuth()
  const usuarioId = usuario?.id ?? null
  const [guardados, setGuardados] = useState({
    usuarioId: null,
    ids: new Set(),
  })
  const [error, setError] = useState(null)

  // Al iniciar o cerrar sesión se cargan los favoritos de ese usuario (o
  // ninguno). Se ajusta durante el render y no en un efecto, como recomienda
  // React para un estado que depende de otro.
  if (guardados.usuarioId !== usuarioId) {
    setGuardados({
      usuarioId,
      ids: usuarioId ? leerFavoritos(usuarioId) : new Set(),
    })
  }

  // Agrega la máquina si no era favorita y la quita si ya lo era. Solo se
  // actualiza el estado si se pudo guardar; si no, el corazón queda como
  // estaba y se muestra el error.
  const alternarFavorito = useCallback(
    (documentId) => {
      if (!usuarioId) return

      const ids = new Set(guardados.ids)
      if (ids.has(documentId)) {
        ids.delete(documentId)
      } else {
        ids.add(documentId)
      }

      try {
        guardarFavoritos(usuarioId, ids)
        setGuardados({ usuarioId, ids })
        setError(null)
      } catch {
        // Objeto nuevo en cada error para que el aviso reinicie su tiempo.
        setError({
          mensaje: 'No se pudieron actualizar tus favoritas. Probá de nuevo.',
        })
      }
    },
    [guardados.ids, usuarioId],
  )

  useEffect(() => {
    if (!error) return
    const temporizador = setTimeout(() => setError(null), DURACION_AVISO)
    return () => clearTimeout(temporizador)
  }, [error])

  const valor = useMemo(
    () => ({ favoritos: guardados.ids, alternarFavorito }),
    [guardados.ids, alternarFavorito],
  )

  return (
    <FavoritosContext value={valor}>
      {children}
      {error && <Aviso onCerrar={() => setError(null)}>{error.mensaje}</Aviso>}
    </FavoritosContext>
  )
}
