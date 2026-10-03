// Markup adaptado de tailwind-ecommerce (MIT, Bogdan Bulakh):
// https://github.com/bbulakh/tailwind-ecommerce
import { Link } from 'react-router'
import logo from '../../assets/images/company-logo.svg'
import logoInvertido from '../../assets/images/company-logo-inverted.svg'
import { NAV_LINKS } from './navLinks'

export default function Footer() {
  return (
    <>
      {/* Footer escritorio */}
      <footer className="mx-auto hidden w-full max-w-[1200px] justify-between border-t pb-10 md:flex">
        <div className="ml-5">
          <img className="mt-10 mb-5" src={logo} alt="" />
          <p>
            Catálogo de maquinaria <br />
            Frameworks e Interoperabilidad · UNCo
          </p>
        </div>

        <div className="mx-5 mt-10">
          <p className="font-medium text-gray-500">NAVEGACIÓN</p>
          <ul className="text-sm leading-8">
            {[...NAV_LINKS, { to: '/login', label: 'Ingresar' }].map(
              ({ to, label }) => (
                <li key={to}>
                  <Link to={to}>{label}</Link>
                </li>
              ),
            )}
          </ul>
        </div>
      </footer>

      {/* Footer móvil */}
      <footer className="mx-auto mt-10 flex w-full max-w-[1200px] justify-center bg-violet-900 pb-10 md:hidden">
        <div>
          <img className="mt-10" src={logoInvertido} alt="" />
          <p className="text-center text-white">Catálogo de maquinaria</p>
        </div>
      </footer>

      {/* Créditos del template */}
      <section className="bg-amber-400">
        <div className="mx-auto max-w-[1200px] px-4 py-3 text-sm">
          <p>
            Diseño basado en{' '}
            <a
              className="underline"
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
    </>
  )
}
