// Máquinas favoritas de cada usuario. Por ahora se guardan en localStorage
// (solución de desarrollo: el backend todavía no tiene la relación de
// favoritos). Cada usuario tiene su propia clave con los `documentId` de sus
// máquinas, así un usuario nunca lee ni pisa los favoritos de otro.
const clave = (usuarioId) => `favoritos:${usuarioId}`

// Si no hay nada guardado, o lo guardado está roto, devuelve un Set vacío.
export function leerFavoritos(usuarioId) {
  try {
    const guardados = JSON.parse(localStorage.getItem(clave(usuarioId)))
    return new Set(Array.isArray(guardados) ? guardados : [])
  } catch {
    return new Set()
  }
}

// Puede fallar si el navegador bloquea el almacenamiento o está lleno: el
// error se deja pasar para que la UI no muestre un cambio que no se guardó.
export function guardarFavoritos(usuarioId, favoritos) {
  localStorage.setItem(clave(usuarioId), JSON.stringify([...favoritos]))
}
