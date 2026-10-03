// Autenticación con Users & Permissions de Strapi (ver docs/api-backend.md,
// sección 2). Las rutas de usuarios no vienen envueltas en `data`.
import { api, refrescarToken, setAccessToken } from './api'

// Solo lo que usa la UI. El usuario por defecto de Strapi no tiene un campo de
// nombre real ni foto: el saludo usa `username`.
function mapearUsuario({ id, username, email }) {
  return { id, username, email }
}

// `identifier` acepta email o username.
export async function login(identifier, password) {
  const { jwt, user } = await api('/auth/local', {
    method: 'POST',
    body: JSON.stringify({ identifier, password }),
  })
  setAccessToken(jwt)
  return mapearUsuario(user)
}

// Borra la cookie de refresh en el backend. El jwt en memoria se borra aunque
// la petición falle.
export async function logout() {
  try {
    await api('/auth/logout', { method: 'POST', body: '{}' })
  } finally {
    setAccessToken(null)
  }
}

// Al cargar la app el jwt en memoria no existe: si la cookie de refresh sigue
// vigente se pide uno nuevo y se trae el usuario. Sin sesión devuelve null.
export async function restaurarSesion() {
  if (!(await refrescarToken())) return null

  try {
    return mapearUsuario(await api('/users/me'))
  } catch {
    setAccessToken(null)
    return null
  }
}
