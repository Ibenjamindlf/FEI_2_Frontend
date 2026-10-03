// Markup adaptado de tailwind-ecommerce (MIT, Bogdan Bulakh):
// https://github.com/bbulakh/tailwind-ecommerce
import { Link } from 'react-router'
import useAuth from '../../hooks/useAuth'
import Logo from '../Logo'
import { NAV_LINKS } from './navLinks'

export default function Footer() {
  const { usuario } = useAuth()
  const links = usuario
    ? NAV_LINKS
    : [...NAV_LINKS, { to: '/login', label: 'Ingresar' }]

  return (
    <footer className="vidrio-denso mt-10 border-x-0! border-b-0!">
      <div className="franja-peligro h-1.5" />

      {/* Footer escritorio */}
      <div className="mx-auto hidden w-full max-w-[1200px] justify-between pb-10 md:flex">
        <div className="ml-5">
          <Logo className="mt-10 mb-5" />
          <p className="text-white/70">
            Catálogo de maquinaria <br />
            Frameworks e Interoperabilidad · UNCo
          </p>
        </div>

        <div className="mx-5 mt-10">
          <p className="font-display font-semibold tracking-wider text-white/60">
            NAVEGACIÓN
          </p>
          <ul className="text-sm leading-8">
            {links.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="transition hover:text-red-500">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer móvil */}
      <div className="flex justify-center pb-10 md:hidden">
        <div className="flex flex-col items-center">
          <Logo className="mt-10" />
          <p className="mt-3 text-center text-white/70">
            Catálogo de maquinaria
          </p>
        </div>
      </div>

      {/* Créditos del template */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-[1200px] px-5 py-3 text-sm text-white/60">
          <p>
            Diseño basado en{' '}
            <a
              className="underline transition hover:text-red-500"
              href="https://github.com/bbulakh/tailwind-ecommerce"
              target="_blank"
              rel="noreferrer"
            >
              tailwind-ecommerce
            </a>{' '}
            de Bogdan Bulakh (MIT)
          </p>
        </div>
      </section>
    </footer>
  )
}
