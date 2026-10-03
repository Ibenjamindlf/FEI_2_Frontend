// Markup adaptado de tailwind-ecommerce (MIT, Bogdan Bulakh):
// https://github.com/bbulakh/tailwind-ecommerce
import { useState } from 'react'
import { Navigate } from 'react-router'
import useAuth from '../hooks/useAuth'

// Traduce los errores de POST /auth/local (docs/api-backend.md, sección 7).
function mensajeError(error) {
  if (error?.status === 0) return error.message
  if (error?.status === 400 && /blocked/i.test(error.message)) {
    return 'Tu cuenta está bloqueada. Contactá a un administrador.'
  }
  if (error?.status === 400) return 'Usuario o contraseña incorrectos.'
  if (error?.status === 429) {
    return 'Hiciste demasiados intentos. Esperá un minuto y probá de nuevo.'
  }
  if (error?.status >= 500) {
    return 'El servidor tuvo un problema. Probá de nuevo en unos minutos.'
  }
  return 'No se pudo iniciar sesión. Probá de nuevo.'
}

export default function Login() {
  const { usuario, login } = useAuth()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null)

  // Con sesión iniciada (recién logueado o entrando a /login a mano) se vuelve
  // al home, que muestra el saludo.
  if (usuario) return <Navigate to="/" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEnviando(true)
    setError(null)

    try {
      await login(identifier.trim(), password)
    } catch (err) {
      setError(mensajeError(err))
      setPassword('')
      setEnviando(false)
    }
  }

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

        {error && (
          <div
            role="alert"
            className="mt-6 flex items-start gap-3 rounded-md border border-red-500/60 bg-red-600/15 px-4 py-3 text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5 shrink-0 text-red-500"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
            <p>{error}</p>
          </div>
        )}

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
            required
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
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
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={enviando}
            className="boton-primario my-6 w-full py-3 disabled:cursor-wait disabled:opacity-60"
          >
            {enviando ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>
      </div>
    </section>
  )
}
