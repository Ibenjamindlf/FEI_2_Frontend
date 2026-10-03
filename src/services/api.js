// Cliente HTTP mínimo para la API de Strapi (ver docs/api-backend.md).
// El access token (jwt) vive solo en memoria; la sesión se mantiene con la
// cookie httpOnly de refresh que setea el backend, por eso todas las
// peticiones van con `credentials: 'include'`.
const API_URL = import.meta.env.VITE_API_URL

let accessToken = null
let refrescando = null

// Rutas en las que un 401 no se reintenta: son las que dan o renuevan el jwt.
const SIN_REINTENTO = ['/auth/local', '/auth/refresh']

// Error con el formato de Strapi: `{ data: null, error: { status, message } }`.
export class ApiError extends Error {
  constructor(status, message) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export function setAccessToken(token) {
  accessToken = token
}

// Pide un jwt nuevo usando la cookie de refresh. Devuelve true si lo consiguió.
// Las llamadas simultáneas comparten la misma petición: el backend rota la
// cookie en cada refresh, así que un segundo refresh en paralelo usaría una
// cookie ya invalidada.
export function refrescarToken() {
  refrescando ??= fetch(`${API_URL}/api/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: '{}',
  })
    .then(async (res) => {
      accessToken = res.ok ? (await res.json()).jwt : null
      return Boolean(accessToken)
    })
    .catch(() => false)
    .finally(() => {
      refrescando = null
    })

  return refrescando
}

// `path` es relativo a /api, por ejemplo: api('/maquinas?populate=imagen').
export async function api(path, options = {}, reintentar = true) {
  if (!API_URL) {
    throw new ApiError(0, 'Falta configurar VITE_API_URL en el archivo .env')
  }

  const headers = { ...options.headers }
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`

  let res
  try {
    res = await fetch(`${API_URL}/api${path}`, {
      ...options,
      headers,
      credentials: 'include',
    })
  } catch {
    // fetch solo falla así si no hay respuesta: backend apagado, CORS, red.
    throw new ApiError(0, 'No se pudo conectar con el servidor')
  }

  // jwt vencido (dura 10 minutos): se renueva y se reintenta una sola vez.
  if (
    res.status === 401 &&
    reintentar &&
    !SIN_REINTENTO.some((ruta) => path.startsWith(ruta)) &&
    (await refrescarToken())
  ) {
    return api(path, options, false)
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
