import { use } from 'react'
import { AuthContext } from '../context/AuthContext'

// Sesión actual: `{ usuario, cargando, login, logout }`.
export default function useAuth() {
  const contexto = use(AuthContext)
  if (!contexto) {
    throw new Error('useAuth tiene que usarse dentro de <AuthProvider>')
  }
  return contexto
}
