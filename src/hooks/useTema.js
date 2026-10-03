import { use } from 'react'
import { TemaContext } from '../context/TemaContext'

// Tema del sitio: `{ tema, elegirTema }`, con `tema` 'claro' u 'oscuro'.
export default function useTema() {
  const contexto = use(TemaContext)
  if (!contexto) {
    throw new Error('useTema tiene que usarse dentro de <TemaProvider>')
  }
  return contexto
}
