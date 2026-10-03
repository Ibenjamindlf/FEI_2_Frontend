import { createContext } from 'react'

// `{ tema, elegirTema }`. Lo provee TemaProvider y se lee con el hook useTema.
export const TemaContext = createContext(null)
