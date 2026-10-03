// Markup adaptado de tailwind-ecommerce (MIT, Bogdan Bulakh):
// https://github.com/bbulakh/tailwind-ecommerce
import { Link, useSearchParams } from 'react-router'
import EstadoCarga from '../components/EstadoCarga'
import MaquinaCard from '../components/MaquinaCard'
import useAuth from '../hooks/useAuth'
import useFavoritos from '../hooks/useFavoritos'
import useMaquinas from '../hooks/useMaquinas'

// Cuenta cuántas máquinas hay por valor de un campo (ej: por tipo o marca).
function contarPor(maquinas, campo) {
  const conteo = new Map()
  for (const maquina of maquinas) {
    conteo.set(maquina[campo], (conteo.get(maquina[campo]) ?? 0) + 1)
  }
  return [...conteo]
}

function ChevronDown() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="mx-2 h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  )
}

function HeartIcon({ relleno }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={relleno ? 'currentColor' : 'none'}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="mr-2 h-4 w-4"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  )
}

// Grupo de filtros del sidebar. Por ahora es solo visual: el filtrado queda
// para un issue futuro.
function FiltroGrupo({ titulo, opciones, ultimo }) {
  return (
    <div className={`flex py-5 ${ultimo ? '' : 'border-b border-white/10'}`}>
      <div className="w-full">
        <p className="font-display mb-3 font-semibold tracking-wider">
          {titulo}
        </p>

        {opciones.map(([valor, cantidad]) => (
          <label
            key={valor}
            className="flex w-full cursor-pointer justify-between py-1 transition hover:text-red-500"
          >
            <span className="flex">
              <input type="checkbox" className="accent-red-600" />
              <span className="ml-4">{valor}</span>
            </span>
            <span className="text-white/60">({cantidad})</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default function Catalogo() {
  const { maquinas, cargando, error, reintentar } = useMaquinas()
  const { usuario, cargando: cargandoSesion } = useAuth()
  const { favoritos } = useFavoritos()
  const [searchParams, setSearchParams] = useSearchParams()

  // El filtro "Mis favoritas" va en la URL (?favoritas=1) para que se mantenga
  // al recargar o al volver del login. Sin sesión no aplica.
  const pideFavoritas = searchParams.get('favoritas') === '1'
  const soloFavoritas = Boolean(usuario) && pideFavoritas
  const visibles = soloFavoritas
    ? maquinas.filter((m) => favoritos.has(m.documentId))
    : maquinas
  // Con ?favoritas=1 se espera a saber si hay sesión, para no mostrar todo el
  // catálogo por un instante antes de filtrar.
  const cargandoLista = cargando || (pideFavoritas && cargandoSesion)

  const alternarSoloFavoritas = () => {
    setSearchParams(
      (params) => {
        if (soloFavoritas) {
          params.delete('favoritas')
        } else {
          params.set('favoritas', '1')
        }
        return params
      },
      { replace: true },
    )
  }

  return (
    <>
      {/* Breadcrumbs */}
      <nav className="mx-auto mt-6 max-w-[1200px] px-5" aria-label="Breadcrumb">
        <ul className="flex items-center text-sm">
          <li className="cursor-pointer">
            <Link
              to="/"
              aria-label="Inicio"
              className="text-white/70 transition hover:text-red-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
            </Link>
          </li>
          <li>
            <span className="mx-2 text-white/40">/</span>
          </li>
          <li className="font-display tracking-wider text-white uppercase">
            Catálogo
          </li>
        </ul>
      </nav>

      <section className="container mx-auto max-w-[1200px] py-5 lg:flex lg:flex-row lg:py-8">
        {/* Sidebar */}
        <aside className="hidden w-[300px] shrink-0 pl-5 lg:block">
          <div className="vidrio rounded-xl px-5">
            <FiltroGrupo titulo="TIPO" opciones={contarPor(visibles, 'tipo')} />
            <FiltroGrupo
              titulo="MARCA"
              opciones={contarPor(visibles, 'marca')}
              ultimo
            />
          </div>
        </aside>

        <div className="flex-1">
          <div className="mb-5 flex items-center justify-between gap-3 px-5">
            <div className="flex flex-wrap gap-3">
              <button className="vidrio font-display flex items-center justify-center rounded-md px-4 py-2 tracking-wider sm:px-6 uppercase transition hover:border-red-500/60">
                Ordenar
                <ChevronDown />
              </button>

              <button className="vidrio font-display flex items-center justify-center rounded-md px-4 py-2 tracking-wider sm:px-6 uppercase transition hover:border-red-500/60 lg:hidden">
                Filtros
                <ChevronDown />
              </button>

              {usuario && (
                <button
                  type="button"
                  onClick={alternarSoloFavoritas}
                  aria-pressed={soloFavoritas}
                  className={`font-display flex items-center justify-center rounded-md px-4 py-2 tracking-wider uppercase transition sm:px-6 ${
                    soloFavoritas
                      ? 'vidrio-rojo hover:bg-red-700'
                      : 'vidrio hover:border-red-500/60'
                  }`}
                >
                  <HeartIcon relleno={soloFavoritas} />
                  Mis favoritas
                </button>
              )}
            </div>

            {!cargandoLista && !error && (
              <p className="text-sm whitespace-nowrap text-white/60">
                {visibles.length}{' '}
                {visibles.length === 1 ? 'resultado' : 'resultados'}
              </p>
            )}
          </div>

          <EstadoCarga
            cargando={cargandoLista}
            error={error}
            vacio={visibles.length === 0}
            textoVacio={
              soloFavoritas
                ? 'Todavía no marcaste ninguna máquina como favorita. Tocá el corazón de una máquina para agregarla.'
                : undefined
            }
            onReintentar={reintentar}
            className="mx-auto grid max-w-[1200px] grid-cols-2 gap-4 px-5 pb-10 lg:grid-cols-3"
          >
            {visibles.map((maquina) => (
              <MaquinaCard key={maquina.documentId} maquina={maquina} />
            ))}
          </EstadoCarga>
        </div>
      </section>
    </>
  )
}
