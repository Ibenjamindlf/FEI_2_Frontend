import { useCallback, useEffect, useMemo, useState } from 'react'
import { guardarTema, leerTema } from '../services/tema'
import { TemaContext } from './TemaContext'

const CONSULTA_OSCURO = '(prefers-color-scheme: dark)'
// Color de la barra del navegador en móviles (<meta name="theme-color">).
const COLOR_BARRA = { claro: '#ffffff', oscuro: '#000000' }

// El script del <head> de index.html ya aplicó el tema inicial (el guardado o,
// si no hay, el del sistema) antes del primer render: se parte de ese.
function temaAplicado() {
  return document.documentElement.classList.contains('dark')
    ? 'oscuro'
    : 'claro'
}

// Mantiene el tema claro/oscuro para toda la app y lo aplica con la clase
// `dark` en <html>, que es la que usa Tailwind.
export default function TemaProvider({ children }) {
  const [tema, setTema] = useState(temaAplicado)
  const [elegido, setElegido] = useState(() => leerTema() !== null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', tema === 'oscuro')
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', COLOR_BARRA[tema])
  }, [tema])

  // Mientras el visitante no elija un tema, se sigue al sistema también si
  // este cambia con la página abierta.
  useEffect(() => {
    if (elegido) return

    const consulta = window.matchMedia(CONSULTA_OSCURO)
    const alCambiar = (e) => setTema(e.matches ? 'oscuro' : 'claro')

    consulta.addEventListener('change', alCambiar)
    return () => consulta.removeEventListener('change', alCambiar)
  }, [elegido])

  const elegirTema = useCallback((nuevo) => {
    guardarTema(nuevo)
    setElegido(true)
    setTema(nuevo)
  }, [])

  const valor = useMemo(() => ({ tema, elegirTema }), [tema, elegirTema])

  return <TemaContext value={valor}>{children}</TemaContext>
}
