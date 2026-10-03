import { createContext } from 'react'

// `{ favoritos, alternarFavorito }`. Lo provee FavoritosProvider y se lee con
// el hook useFavoritos.
export const FavoritosContext = createContext(null)
