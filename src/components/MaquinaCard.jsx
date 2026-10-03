// Markup adaptado de tailwind-ecommerce (MIT, Bogdan Bulakh):
// https://github.com/bbulakh/tailwind-ecommerce
export default function MaquinaCard({ maquina }) {
  const { tipo, marca, modelo, interno, imagen } = maquina
  const portada = imagen?.[0]

  return (
    <article className="vidrio flex flex-col overflow-hidden rounded-xl transition duration-300 hover:-translate-y-1 hover:border-red-500/50">
      <div className="relative flex">
        {portada && (
          <img
            className="aspect-3/2 w-full object-cover"
            src={portada.url}
            alt={portada.alternativeText ?? `${tipo} ${marca} ${modelo}`}
          />
        )}

        <div className="vidrio-rojo esquina-cortada absolute top-2 right-2 flex items-center justify-center">
          <p className="font-display px-3 py-1 text-xs font-semibold tracking-wider uppercase">
            {tipo}
          </p>
        </div>
      </div>

      <div className="px-4 py-3">
        <p className="font-display text-lg font-semibold tracking-wide uppercase">
          {marca} {modelo}
        </p>
        <p className="text-sm text-white/70">
          Interno: <span className="font-medium text-red-500">{interno}</span>
        </p>
      </div>
    </article>
  )
}
