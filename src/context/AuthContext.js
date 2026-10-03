import { createContext } from 'react'

// `{ usuario, cargando, login, logout }`. Lo provee AuthProvider y se lee con
// el hook useAuth.
export const AuthContext = createContext(null)
