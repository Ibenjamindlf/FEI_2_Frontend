import { use } from 'react'
import { FavoritosContext } from '../context/FavoritosContext'

// Favoritos del usuario logueado: `{ favoritos, alternarFavorito }`.
// `favoritos` es un Set de `documentId` (vacío sin sesión).
export default function useFavoritos() {
  const contexto = use(FavoritosContext)
  if (!contexto) {
    throw new Error('useFavoritos tiene que usarse dentro de <FavoritosProvider>')
  }
  return contexto
}
