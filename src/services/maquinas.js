// PROVISORIO: datos simulados hasta conectar la API real.
// Respeta la forma de respuesta de Strapi (`{ data, meta }`) y los campos del
// modelo Máquina (ver docs/api-backend.md), así las páginas no cambian cuando
// se reemplace por las llamadas a `api.js`.
// Las imágenes son ilustraciones SVG genéricas, una por tipo de máquina.
// Con la API real, `imagen[].url` es relativa y hay que anteponer VITE_API_URL.
import cargadora from '../assets/images/maquinas/cargadora.svg'
import excavadora from '../assets/images/maquinas/excavadora.svg'
import grua from '../assets/images/maquinas/grua.svg'
import minicargadora from '../assets/images/maquinas/minicargadora.svg'
import motoniveladora from '../assets/images/maquinas/motoniveladora.svg'
import retroexcavadora from '../assets/images/maquinas/retroexcavadora.svg'

const MAQUINAS = [
  {
    tipo: 'Excavadora',
    marca: 'Caterpillar',
    modelo: '320D',
    imagen: excavadora,
  },
  { tipo: 'Excavadora', marca: 'Komatsu', modelo: 'PC200', imagen: excavadora },
  {
    tipo: 'Retroexcavadora',
    marca: 'JCB',
    modelo: '3CX',
    imagen: retroexcavadora,
  },
  {
    tipo: 'Retroexcavadora',
    marca: 'Case',
    modelo: '580N',
    imagen: retroexcavadora,
  },
  {
    tipo: 'Cargadora frontal',
    marca: 'Volvo',
    modelo: 'L120H',
    imagen: cargadora,
  },
  {
    tipo: 'Minicargadora',
    marca: 'Bobcat',
    modelo: 'S650',
    imagen: minicargadora,
  },
  {
    tipo: 'Motoniveladora',
    marca: 'John Deere',
    modelo: '670G',
    imagen: motoniveladora,
  },
  { tipo: 'Grúa', marca: 'Liebherr', modelo: 'LTM 1050', imagen: grua },
].map(({ imagen, ...maquina }, i) => ({
  id: i + 1,
  documentId: `mock-maquina-${i + 1}`,
  ...maquina,
  interno: `INT-${String(i + 1).padStart(3, '0')}`,
  imagen: [
    {
      id: i + 1,
      url: imagen,
      alternativeText: `${maquina.tipo} ${maquina.marca} ${maquina.modelo}`,
    },
  ],
}))

export async function getMaquinas() {
  return {
    data: MAQUINAS,
    meta: {
      pagination: {
        page: 1,
        pageSize: 25,
        pageCount: 1,
        total: MAQUINAS.length,
      },
    },
  }
}
