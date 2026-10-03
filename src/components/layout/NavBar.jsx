// Markup adaptado de tailwind-ecommerce (MIT, Bogdan Bulakh):
// https://github.com/bbulakh/tailwind-ecommerce
import { NavLink } from 'react-router'
import useAuth from '../../hooks/useAuth'
import { NAV_LINKS } from './navLinks'

const linkClass = ({ isActive }) =>
  `font-display text-sm font-medium tracking-wider uppercase transition duration-100 hover:text-red-500 ${
    isActive
      ? 'text-white underline decoration-red-600 decoration-2 underline-offset-8'
      : 'text-white/70'
  }`

export default function NavBar() {
  // Con sesión, el acceso al perfil ya está en el header.
  const { usuario, cargando } = useAuth()

  return (
    <nav className="relative border-t border-white/10">
      <div className="mx-auto hidden h-11 w-full max-w-[1200px] items-center md:flex">
        <div className="mx-5 flex gap-8">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} end className={linkClass}>
              {label}
            </NavLink>
          ))}
        </div>

        {!cargando && !usuario && (
          <div className="ml-auto flex gap-4 px-5">
            <NavLink to="/login" className={linkClass}>
              Ingresar
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  )
}
