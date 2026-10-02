// Markup adaptado de tailwind-ecommerce (MIT, Bogdan Bulakh):
// https://github.com/bbulakh/tailwind-ecommerce
export default function MaquinaCard({ maquina }) {
  const { tipo, marca, modelo, interno, imagen } = maquina
  const portada = imagen?.[0]

  return (
    <article className="flex flex-col">
      <div className="relative flex">
        {portada && (
          <img
            className="aspect-3/2 w-full object-cover"
            src={portada.url}
            alt={portada.alternativeText ?? `${tipo} ${marca} ${modelo}`}
          />
        )}

        <div className="absolute right-1 mt-3 flex items-center justify-center bg-amber-400">
          <p className="px-2 py-2 text-sm">{tipo}</p>
        </div>
      </div>

      <div className="mb-5">
        <p className="mt-2 uppercase">
          {marca} {modelo}
        </p>
        <p className="font-medium text-violet-900">Interno: {interno}</p>
      </div>
    </article>
  )
}
