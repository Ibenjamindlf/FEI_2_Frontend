// Markup adaptado de tailwind-ecommerce (MIT, Bogdan Bulakh):
// https://github.com/bbulakh/tailwind-ecommerce
export default function Login() {
  // El inicio de sesión real (POST /auth/local) se implementa en otra issue.
  const handleSubmit = (e) => e.preventDefault()

  return (
    <section className="mx-auto mt-10 mb-10 max-w-[1200px] px-5">
      <div className="container mx-auto border px-5 py-5 shadow-xs md:w-1/2">
        <div>
          <h1 className="text-4xl font-bold">INGRESAR</h1>
          <p>¡Bienvenido de nuevo!</p>
        </div>

        <form className="mt-6 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="identifier">Email o usuario</label>
          <input
            id="identifier"
            name="identifier"
            className="mt-3 mb-3 border px-4 py-2"
            type="text"
            placeholder="tuemail@dominio.com"
            autoComplete="username"
          />

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            className="mt-3 border px-4 py-2"
            type="password"
            placeholder="•••••••"
            autoComplete="current-password"
          />

          <button
            type="submit"
            className="my-5 w-full bg-violet-900 py-2 text-white"
          >
            INGRESAR
          </button>
        </form>
      </div>
    </section>
  )
}
