// Markup adaptado de tailwind-ecommerce (MIT, Bogdan Bulakh):
// https://github.com/bbulakh/tailwind-ecommerce
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import heroImg from '../assets/images/header-bg-image.png'
import bannerImg from '../assets/images/sale-bage-picture.png'
import MaquinaCard from '../components/MaquinaCard'
import { getMaquinas } from '../services/maquinas'

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
  const [maquinas, setMaquinas] = useState([])

  useEffect(() => {
    let ignorar = false
    getMaquinas().then(({ data }) => {
      if (!ignorar) setMaquinas(data)
    })
    return () => {
      ignorar = true
    }
  }, [])

  // Un tipo por tarjeta, usando la imagen de la primera máquina de ese tipo.
  const tipos = [...new Map(maquinas.map((m) => [m.tipo, m])).values()]

  return (
    <>
      {/* Hero */}
      <div className="relative">
        <img
          className="w-full object-cover brightness-50 lg:h-[500px]"
          src={heroImg}
          alt=""
        />

        <div className="absolute top-1/2 left-1/2 mx-auto flex w-11/12 max-w-[1200px] -translate-x-1/2 -translate-y-1/2 flex-col text-center text-white lg:ml-5">
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-left">
            Maquinaria para cada obra
          </h1>
          <p className="pt-3 text-xs lg:w-3/5 lg:pt-5 lg:text-left lg:text-base">
            Explorá nuestro catálogo de excavadoras, retroexcavadoras,
            cargadoras y más. Encontrá la máquina que necesitás por tipo, marca
            o modelo.
          </p>
          <Link
            to="/catalogo"
            className="mx-auto mt-5 w-1/2 bg-amber-400 px-3 py-1 text-black transition duration-100 hover:bg-yellow-300 lg:mx-0 lg:flex lg:h-10 lg:w-fit lg:items-center lg:px-10"
          >
            Ver catálogo
          </Link>
        </div>
      </div>

      {/* Badges */}
      <section className="container mx-auto my-8 flex flex-col justify-center gap-3 lg:flex-row">
        {BADGES.map(({ titulo, texto, icono }) => (
          <div
            key={titulo}
            className="mx-5 flex flex-row items-center justify-center border-2 border-yellow-400 px-5 py-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6 text-violet-900 lg:mr-2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d={icono} />
            </svg>

            <div className="ml-6 flex flex-col justify-center">
              <h3 className="text-left text-xs font-bold lg:text-sm">
                {titulo}
              </h3>
              <p className="text-left text-xs lg:text-sm">{texto}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Tipos de maquinaria */}
      <h2 className="mx-auto mb-5 max-w-[1200px] px-5">TIPOS DE MAQUINARIA</h2>

      <section className="mx-auto grid max-w-[1200px] grid-cols-2 px-5 lg:grid-cols-3 lg:gap-5">
        {tipos.map(({ tipo, imagen }) => (
          <Link key={tipo} to="/catalogo">
            <div className="relative cursor-pointer">
              <img
                className="mx-auto aspect-3/2 w-full object-cover brightness-50 transition duration-300 hover:brightness-100"
                src={imagen[0].url}
                alt=""
              />
              <p className="pointer-events-none absolute top-1/2 left-1/2 w-11/12 -translate-x-1/2 -translate-y-1/2 text-center text-white lg:text-xl">
                {tipo}
              </p>
            </div>
          </Link>
        ))}
      </section>

      {/* Últimas incorporaciones (reemplaza al slider del template) */}
      <p className="mx-auto mt-10 mb-5 max-w-[1200px] px-5">
        ÚLTIMAS INCORPORACIONES
      </p>

      <section className="mx-auto grid max-w-[1200px] grid-cols-2 gap-3 px-5 lg:grid-cols-4">
        {maquinas.slice(0, 4).map((maquina) => (
          <MaquinaCard key={maquina.documentId} maquina={maquina} />
        ))}
      </section>

      {/* Banner */}
      <div className="mx-auto max-w-[1200px] px-5 pb-10">
        <section className="mt-5 flex justify-between bg-violet-900 px-5">
          <div className="px-3 py-8 lg:px-16">
            <p className="text-white">EXPLORÁ TODO</p>
            <h2 className="pt-6 text-5xl font-bold text-yellow-400">
              CATÁLOGO
            </h2>
            <p className="pt-4 text-white">
              EXCAVADORAS, RETROEXCAVADORAS, <br />
              CARGADORAS Y MÁS
            </p>
            <Link
              to="/catalogo"
              className="mt-6 inline-block bg-amber-400 px-4 py-2 transition duration-100 hover:bg-yellow-300"
            >
              Ver catálogo
            </Link>
          </div>

          <img
            className="-mr-5 hidden w-[550px] object-cover md:block"
            src={bannerImg}
            alt=""
          />
        </section>
      </div>
    </>
  )
}
