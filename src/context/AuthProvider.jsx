import { useCallback, useEffect, useMemo, useState } from 'react'
import * as auth from '../services/auth'
import { AuthContext } from './AuthContext'

// Mantiene el usuario logueado para toda la app. `cargando` es true mientras
// se intenta recuperar la sesión al abrir la página, para no mostrar
// "Ingresar" por un instante a alguien que ya tiene sesión.
export default function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    let ignorar = false

    auth.restaurarSesion().then((restaurado) => {
      if (ignorar) return
      // Si el usuario ya se logueó mientras tanto, no se pisa su sesión.
      setUsuario((actual) => actual ?? restaurado)
      setCargando(false)
    })

    return () => {
      ignorar = true
    }
  }, [])

  // Si falla, el error llega al formulario para mostrar el mensaje.
  const login = useCallback(async (identifier, password) => {
    setUsuario(await auth.login(identifier, password))
  }, [])

  const logout = useCallback(async () => {
    try {
      await auth.logout()
    } catch {
      // Aunque la API no responda, la sesión local se cierra igual.
    } finally {
      setUsuario(null)
    }
  }, [])

  const valor = useMemo(
    () => ({ usuario, cargando, login, logout }),
    [usuario, cargando, login, logout],
  )

  return <AuthContext value={valor}>{children}</AuthContext>
}
