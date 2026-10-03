import { useCallback, useEffect, useState } from 'react'
import { getMaquinas } from '../services/maquinas'

// Carga las máquinas y expone los estados que necesita la UI.
// `reintentar` vuelve a pedirlas (ej. desde el botón del estado de error).
export default function useMaquinas({ sort } = {}) {
  const [maquinas, setMaquinas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    let ignorar = false

    getMaquinas({ sort })
      .then(({ data }) => {
        if (ignorar) return
        setMaquinas(data)
        setError(null)
      })
      .catch((err) => {
        if (!ignorar) setError(err)
      })
      .finally(() => {
        if (!ignorar) setCargando(false)
      })

    return () => {
      ignorar = true
    }
  }, [sort, intento])

  const reintentar = useCallback(() => {
    setCargando(true)
    setError(null)
    setIntento((n) => n + 1)
  }, [])

  return { maquinas, cargando, error, reintentar }
}
