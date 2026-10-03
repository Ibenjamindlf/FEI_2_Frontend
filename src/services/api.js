// Cliente HTTP mínimo para la API de Strapi (ver docs/api-backend.md).
// Por ahora solo hace peticiones públicas: la autenticación (jwt y refresh)
// se agrega en el issue de usuarios.
const API_URL = import.meta.env.VITE_API_URL

// Error con el formato de Strapi: `{ data: null, error: { status, message } }`.
export class ApiError extends Error {
  constructor(status, message) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

// `path` es relativo a /api, por ejemplo: api('/maquinas?populate=imagen').
export async function api(path, options = {}) {
  if (!API_URL) {
    throw new ApiError(0, 'Falta configurar VITE_API_URL en el archivo .env')
  }

  let res
  try {
    res = await fetch(`${API_URL}/api${path}`, options)
  } catch {
    // fetch solo falla así si no hay respuesta: backend apagado, CORS, red.
    throw new ApiError(0, 'No se pudo conectar con el servidor')
  }

  if (res.status === 204) return null

  const body = await res.json().catch(() => null)
  if (!res.ok) {
    throw new ApiError(
      res.status,
      body?.error?.message ?? `Error ${res.status} en la petición`,
    )
  }
  return body
}

// Las URLs de los archivos subidos son relativas ("/uploads/foto.jpg"): se les
// antepone el backend sin /api. Si ya son absolutas (ej. un proveedor externo),
// se dejan como están.
export function urlMedia(url) {
  if (!url) return null
  return /^https?:\/\//.test(url) ? url : `${API_URL}${url}`
}
