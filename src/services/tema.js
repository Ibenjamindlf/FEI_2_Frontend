// Tema elegido por el visitante ('claro' u 'oscuro'), guardado en el
// navegador. No depende de la sesión: vale para cualquiera que entre al sitio.
// El script del <head> de index.html lee la misma clave para aplicar el tema
// antes del primer render; si se cambia acá, hay que cambiarla allá también.
const CLAVE = 'tema'
const TEMAS = ['claro', 'oscuro']

// Devuelve null si no hay elección guardada (o lo guardado no es válido): en
// ese caso se sigue la preferencia del sistema.
export function leerTema() {
  try {
    const tema = localStorage.getItem(CLAVE)
    return TEMAS.includes(tema) ? tema : null
  } catch {
    return null
  }
}

// Si el navegador bloquea el almacenamiento, el tema cambia igual pero no se
// recuerda al recargar.
export function guardarTema(tema) {
  try {
    localStorage.setItem(CLAVE, tema)
  } catch {
    // Sin almacenamiento disponible: el cambio dura hasta recargar.
  }
}
