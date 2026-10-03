// Markup adaptado de tailwind-ecommerce (MIT, Bogdan Bulakh):
// https://github.com/bbulakh/tailwind-ecommerce
export default function Login() {
  // El inicio de sesión real (POST /auth/local) se implementa en otra issue.
  const handleSubmit = (e) => e.preventDefault()

  return (
    <section className="relative mx-auto mt-10 mb-10 max-w-[1200px] px-5">
      {/* Formas decorativas detrás de la tarjeta, para que se note el vidrio */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-6 left-0 h-24 w-24 rotate-12 rounded-3xl bg-red-600 md:left-[20%] md:h-40 md:w-40" />
        <div className="franja-peligro absolute right-[6%] -bottom-6 h-28 w-64 -rotate-6 md:right-[18%]" />
      </div>

      <div className="vidrio relative container mx-auto rounded-2xl px-6 py-8 md:w-1/2 md:px-10">
        <div>
          <span className="mb-4 block h-1 w-16 bg-red-600" />
          <h1 className="text-4xl font-bold">Ingresar</h1>
          <p className="text-white/70">¡Bienvenido de nuevo!</p>
        </div>

        <form className="mt-6 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="identifier" className="text-sm text-white/80">
            Email o usuario
          </label>
          <input
            id="identifier"
            name="identifier"
            className="campo mt-2 mb-4"
            type="text"
            placeholder="tuemail@dominio.com"
            autoComplete="username"
          />

          <label htmlFor="password" className="text-sm text-white/80">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            className="campo mt-2"
            type="password"
            placeholder="•••••••"
            autoComplete="current-password"
          />

          <button type="submit" className="boton-primario my-6 w-full py-3">
            Ingresar
          </button>
        </form>
      </div>
    </section>
  )
}
