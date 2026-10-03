// Markup adaptado de tailwind-ecommerce (MIT, Bogdan Bulakh):
// https://github.com/bbulakh/tailwind-ecommerce
import { useState } from 'react'
import { Link } from 'react-router'
import logo from '../../assets/images/company-logo.svg'
import { NAV_LINKS } from './navLinks'

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="mx-3 h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>
  )
}

// Buscador visual: la búsqueda se implementa cuando se conecte la API.
function SearchForm({ className }) {
  return (
    <form
      role="search"
      className={`h-9 items-center border ${className}`}
      onSubmit={(e) => e.preventDefault()}
    >
      <SearchIcon />
      <input
        className="w-11/12 outline-hidden"
        type="search"
        placeholder="Buscar maquinaria"
        aria-label="Buscar maquinaria"
      />
      <button className="ml-auto h-full bg-amber-400 px-4 hover:bg-yellow-300">
        Buscar
      </button>
    </form>
  )
}

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const cerrarMenu = () => setMenuAbierto(false)

  return (
    <>
      <header className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-5">
        <Link to="/" onClick={cerrarMenu}>
          <img className="cursor-pointer" src={logo} alt="Inicio" />
        </Link>

        <div className="md:hidden">
          <button
            onClick={() => setMenuAbierto((abierto) => !abierto)}
            aria-label="Abrir menú"
            aria-expanded={menuAbierto}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        <SearchForm className="hidden w-2/5 md:flex" />

        <div className="hidden gap-3 md:flex">
          <Link
            to="/login"
            className="flex cursor-pointer flex-col items-center justify-center"
          >
            <UserIcon />
            <p className="text-xs">Ingresar</p>
          </Link>
        </div>
      </header>

      {/* Menú hamburguesa (móvil) */}
      {menuAbierto && (
        <section className="absolute right-0 left-0 z-50 h-screen w-full bg-white md:hidden">
          <div className="mx-auto flex w-full justify-center gap-3 py-4">
            <Link
              to="/login"
              onClick={cerrarMenu}
              className="flex cursor-pointer flex-col items-center justify-center"
            >
              <UserIcon />
              <p className="text-xs">Ingresar</p>
            </Link>
          </div>

          <SearchForm className="mx-5 my-4 flex" />

          <ul className="text-center font-medium">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to} className="py-2">
                <Link to={to} onClick={cerrarMenu}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}
