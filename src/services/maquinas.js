// PROVISORIO: datos simulados hasta conectar la API real.
// Respeta la forma de respuesta de Strapi (`{ data, meta }`) y los campos del
// modelo Máquina (ver docs/api-backend.md), así las páginas no cambian cuando
// se reemplace por las llamadas a `api.js`.
// Las imágenes son placeholders del template tailwind-ecommerce (MIT, bbulakh).
// Con la API real, `imagen[].url` es relativa y hay que anteponer VITE_API_URL.
import kitchen from '../assets/images/kitchen.png'
import livingRoom from '../assets/images/living-room.png'
import outdoors from '../assets/images/outdoors.png'
import productBigsofa from '../assets/images/product-bigsofa.png'
import productChair from '../assets/images/product-chair.png'
import productMatrass from '../assets/images/product-matrass.png'
import productSofa from '../assets/images/product-sofa.png'
import productTable from '../assets/images/product-table.png'

const MAQUINAS = [
  { tipo: 'Excavadora', marca: 'Caterpillar', modelo: '320D', imagen: productChair },
  { tipo: 'Excavadora', marca: 'Komatsu', modelo: 'PC200', imagen: productSofa },
  { tipo: 'Retroexcavadora', marca: 'JCB', modelo: '3CX', imagen: productBigsofa },
  { tipo: 'Retroexcavadora', marca: 'Case', modelo: '580N', imagen: productTable },
  { tipo: 'Cargadora frontal', marca: 'Volvo', modelo: 'L120H', imagen: productMatrass },
  { tipo: 'Minicargadora', marca: 'Bobcat', modelo: 'S650', imagen: kitchen },
  { tipo: 'Motoniveladora', marca: 'John Deere', modelo: '670G', imagen: livingRoom },
  { tipo: 'Grúa', marca: 'Liebherr', modelo: 'LTM 1050', imagen: outdoors },
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
      pagination: { page: 1, pageSize: 25, pageCount: 1, total: MAQUINAS.length },
    },
  }
}
