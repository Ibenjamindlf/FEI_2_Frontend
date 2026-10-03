// Markup adaptado de tailwind-ecommerce (MIT, Bogdan Bulakh):
// https://github.com/bbulakh/tailwind-ecommerce
import { Link } from 'react-router'
import heroImg from '../assets/images/hero.svg'
import EstadoCarga from '../components/EstadoCarga'
import MaquinaCard from '../components/MaquinaCard'
import useAuth from '../hooks/useAuth'
import useMaquinas from '../hooks/useMaquinas'

// Esqueleto de las tarjetas de "Tipos de maquinaria" (solo imagen).
function TipoEsqueleto() {
  return (
    <div className="aspect-3/2 animate-pulse rounded-xl border border-white/10 bg-white/10" />
  )
}

const BADGES = [
  {
    titulo: 'Amplio catálogo',
    texto: 'Máquinas de varias marcas',
    icono:
      'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12',
  },
  {
    titulo: 'Búsqueda simple',
    texto: 'Por tipo, marca o modelo',
    icono:
      'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z',
  },
  {
    titulo: 'Consultas',
    texto: 'Te ayudamos a elegir',
    icono:
      'M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z',
  },
]

export default function Home() {
  const { usuario } = useAuth()
  // Ordenadas de la más nueva a la más vieja, para "Últimas incorporaciones".
  const { maquinas, cargando, error, reintentar } = useMaquinas({
    sort: 'createdAt:desc',
  })
  const vacio = maquinas.length === 0

  // Un tipo por tarjeta, usando la imagen de la máquina más nueva de ese tipo
  // (la primera que aparece, porque vienen ordenadas por fecha).
  const tipos = maquinas.filter(
    (m, i) => maquinas.findIndex((otra) => otra.tipo === m.tipo) === i,
  )

  return (
    <>
      {/* Hero */}
      <div className="mx-auto mt-6 max-w-[1200px] px-5">
        <div className="relative overflow-hidden rounded-2xl border border-white/10">
          <img
            className="h-[460px] w-full object-cover object-right lg:h-[500px]"
            src={heroImg}
            alt=""
          />

          <div className="vidrio absolute inset-x-4 bottom-4 flex flex-col rounded-xl p-6 text-center lg:top-1/2 lg:right-auto lg:bottom-auto lg:left-10 lg:w-[560px] lg:-translate-y-1/2 lg:p-10 lg:text-left">
            <span className="mx-auto mb-4 h-1 w-16 bg-red-600 lg:mx-0" />
            {usuario && (
              <p className="font-display mb-1 truncate text-xl font-semibold tracking-wider text-red-500 lg:text-2xl">
                Hola {usuario.username}
              </p>
            )}
            <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
              Maquinaria para cada obra
            </h1>
            <p className="pt-3 text-sm text-white/80 lg:pt-5 lg:text-base">
              Explorá nuestro catálogo de excavadoras, retroexcavadoras,
              cargadoras y más. Encontrá la máquina que necesitás por tipo,
              marca o modelo.
            </p>
            <Link
              to="/catalogo"
              className="boton-primario mx-auto mt-6 px-10 py-3 lg:mx-0 lg:w-fit"
            >
              Ver catálogo
            </Link>
          </div>
        </div>
      </div>

      {/* Badges */}
      <section className="mx-auto my-8 grid max-w-[1200px] gap-3 px-5 lg:grid-cols-3">
        {BADGES.map(({ titulo, texto, icono }) => (
          <div
            key={titulo}
            className="vidrio flex flex-row items-center rounded-xl px-5 py-4"
          >
            <div className="vidrio-rojo esquina-cortada p-2.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d={icono} />
              </svg>
            </div>

            <div className="ml-5 flex flex-col justify-center">
              <h3 className="text-left text-sm font-bold lg:text-base">
                {titulo}
              </h3>
              <p className="text-left text-xs text-white/70 lg:text-sm">
                {texto}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Tipos de maquinaria */}
      <h2 className="mx-auto mb-5 max-w-[1200px] px-5 text-2xl font-bold">
        Tipos de maquinaria
      </h2>

      {/* Si falla o no hay máquinas, el aviso se muestra una sola vez acá. */}
      <EstadoCarga
        cargando={cargando}
        error={error}
        vacio={vacio}
        onReintentar={reintentar}
        cantidadEsqueletos={3}
        Esqueleto={TipoEsqueleto}
        className="mx-auto grid max-w-[1200px] grid-cols-2 gap-4 px-5 lg:grid-cols-3"
      >
        {tipos.map(({ tipo, imagenes }) => (
          <Link
            key={tipo}
            to="/catalogo"
            className="group relative overflow-hidden rounded-xl border border-white/10 transition hover:border-red-500/60"
          >
            {imagenes[0] ? (
              <img
                className="mx-auto aspect-3/2 w-full object-cover transition duration-300 group-hover:scale-105"
                src={imagenes[0].src}
                alt=""
              />
            ) : (
              <div className="aspect-3/2 w-full bg-white/5" />
            )}
            <p className="vidrio-denso font-display pointer-events-none absolute inset-x-2 bottom-2 rounded-md px-2 py-1 text-center text-xs font-semibold tracking-wider uppercase lg:px-3 lg:py-1.5 lg:text-lg">
              {tipo}
            </p>
          </Link>
        ))}
      </EstadoCarga>

      {/* Últimas incorporaciones (reemplaza al slider del template) */}
      {!error && (cargando || !vacio) && (
        <>
          <h2 className="mx-auto mt-10 mb-5 max-w-[1200px] px-5 text-2xl font-bold">
            Últimas incorporaciones
          </h2>

          <EstadoCarga
            cargando={cargando}
            cantidadEsqueletos={4}
            className="mx-auto grid max-w-[1200px] grid-cols-2 gap-4 px-5 lg:grid-cols-4"
          >
            {maquinas.slice(0, 4).map((maquina) => (
              <MaquinaCard key={maquina.documentId} maquina={maquina} />
            ))}
          </EstadoCarga>
        </>
      )}

      {/* Banner */}
      <div className="mx-auto max-w-[1200px] px-5 pb-10">
        <section className="vidrio relative mt-10 flex justify-between overflow-hidden rounded-2xl">
          <div className="relative z-10 px-6 py-10 lg:px-16">
            <p className="font-display tracking-[0.3em] text-white/70">
              EXPLORÁ TODO
            </p>
            <h2 className="pt-4 text-5xl font-bold text-red-500 lg:text-6xl">
              Catálogo
            </h2>
            <p className="font-display pt-4 tracking-wider text-white/90">
              EXCAVADORAS, RETROEXCAVADORAS, <br />
              CARGADORAS Y MÁS
            </p>
            <Link
              to="/catalogo"
              className="boton-primario mt-6 inline-block px-8 py-3"
            >
              Ver catálogo
            </Link>
          </div>

          {/* Franjas decorativas (reemplazan a la imagen del template) */}
          <div className="franja-peligro absolute inset-y-0 right-0 hidden w-2/5 opacity-70 [clip-path:polygon(30%_0,100%_0,100%_100%,0_100%)] md:block" />
        </section>
      </div>
    </>
  )
}
