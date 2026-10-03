import { useEffect, useId, useRef, useState } from 'react'
import useTema from '../hooks/useTema'

function IconoSol({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      />
    </svg>
  )
}

function IconoLuna({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
      />
    </svg>
  )
}

function IconoCheck() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="ml-auto h-4 w-4"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  )
}

const OPCIONES = [
  { valor: 'claro', etiqueta: 'Claro', Icono: IconoSol },
  { valor: 'oscuro', etiqueta: 'Oscuro', Icono: IconoLuna },
]

// Selector de tema del header: un botón con el ícono del tema actual que abre
// un menú con las dos opciones. Sigue el patrón de "menu button" de WAI-ARIA:
// flechas para moverse, Enter/Espacio para elegir y Escape o Tab para cerrar.
export default function SelectorTema() {
  const { tema, elegirTema } = useTema()
  const [abierto, setAbierto] = useState(false)
  const contenedor = useRef(null)
  const boton = useRef(null)
  const menu = useRef(null)
  const menuId = useId()
  const actual = OPCIONES.find((o) => o.valor === tema)

  // Se cierra con un clic afuera.
  useEffect(() => {
    if (!abierto) return

    const alClicAfuera = (e) => {
      if (!contenedor.current?.contains(e.target)) setAbierto(false)
    }

    document.addEventListener('mousedown', alClicAfuera)
    return () => document.removeEventListener('mousedown', alClicAfuera)
  }, [abierto])

  const cerrar = () => {
    setAbierto(false)
    boton.current?.focus()
  }

  const elegir = (valor) => {
    elegirTema(valor)
    cerrar()
  }

  // Con la flecha abajo/arriba sobre el botón también se abre el menú.
  const alTeclearBoton = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      setAbierto(true)
    }
  }

  const alTeclearMenu = (e) => {
    const items = [...menu.current.querySelectorAll('[role="menuitemradio"]')]
    const indice = items.indexOf(document.activeElement)
    const enfocar = (i) => items[(i + items.length) % items.length].focus()

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        enfocar(indice + 1)
        break
      case 'ArrowUp':
        e.preventDefault()
        enfocar(indice - 1)
        break
      case 'Home':
        e.preventDefault()
        enfocar(0)
        break
      case 'End':
        e.preventDefault()
        enfocar(items.length - 1)
        break
      case 'Escape':
        e.preventDefault()
        cerrar()
        break
      case 'Tab':
        // El foco sigue su curso normal; solo se cierra el menú.
        setAbierto(false)
        break
    }
  }

  return (
    <div ref={contenedor} className="relative">
      <button
        ref={boton}
        type="button"
        onClick={() => setAbierto((a) => !a)}
        onKeyDown={alTeclearBoton}
        aria-label={`Tema: ${actual.etiqueta.toLowerCase()}. Cambiar tema`}
        title="Cambiar tema"
        aria-haspopup="menu"
        aria-expanded={abierto}
        aria-controls={abierto ? menuId : undefined}
        className={`vidrio flex h-10 w-10 items-center justify-center rounded-full transition hover:border-acento hover:text-acento ${
          abierto ? 'border-acento! text-acento' : ''
        }`}
      >
        <actual.Icono className="h-5 w-5" />
      </button>

      {abierto && (
        <div
          ref={menu}
          id={menuId}
          role="menu"
          aria-label="Tema"
          onKeyDown={alTeclearMenu}
          className="vidrio-denso absolute top-full right-0 z-50 mt-3 w-44 overflow-hidden rounded-xl"
        >
          <div className="franja-peligro h-1" />
          <p className="px-4 pt-3 text-xs text-tinta/60" aria-hidden="true">
            Tema
          </p>
          <div className="p-2">
            {OPCIONES.map(({ valor, etiqueta, Icono }) => {
              const elegida = valor === tema
              return (
                <button
                  key={valor}
                  type="button"
                  role="menuitemradio"
                  aria-checked={elegida}
                  // Las opciones se recorren con flechas, no con Tab. Al abrir,
                  // el foco arranca en la opción actual.
                  tabIndex={-1}
                  autoFocus={elegida}
                  onClick={() => elegir(valor)}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition outline-none hover:bg-red-600/20 hover:text-acento focus-visible:bg-red-600/20 focus-visible:text-acento ${
                    elegida ? 'font-semibold text-acento' : ''
                  }`}
                >
                  <Icono className="h-5 w-5" />
                  {etiqueta}
                  {elegida && <IconoCheck />}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
