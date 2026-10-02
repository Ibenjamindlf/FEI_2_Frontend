// Markup adaptado de tailwind-ecommerce (MIT, Bogdan Bulakh):
// https://github.com/bbulakh/tailwind-ecommerce
import { NavLink } from 'react-router'
import { NAV_LINKS } from './navLinks'

const linkClass = ({ isActive }) =>
  `font-light transition duration-100 hover:text-yellow-400 hover:underline ${
    isActive ? 'text-yellow-400' : 'text-white'
  }`

export default function NavBar() {
  return (
    <nav className="relative bg-violet-900">
      <div className="mx-auto hidden h-12 w-full max-w-[1200px] items-center md:flex">
        <div className="mx-5 flex gap-8">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} end className={linkClass}>
              {label}
            </NavLink>
          ))}
        </div>

        <div className="ml-auto flex gap-4 px-5">
          <NavLink to="/login" className={linkClass}>
            Ingresar
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
