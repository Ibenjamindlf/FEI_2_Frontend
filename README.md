# Catálogo de maquinaria — Frontend

Front-end de un catálogo de maquinaria pesada (excavadoras, retroexcavadoras,
cargadoras, etc.), hecho para el **TP N°2 de Frameworks e Interoperabilidad
(UNCo)**. Consume una API REST hecha con **Strapi 5**.

## Funcionalidades

- **Inicio**: hero, accesos por tipo de maquinaria y las últimas máquinas
  incorporadas. Si hay sesión, saluda al usuario por su nombre.
- **Catálogo**: listado de todas las máquinas con imagen, tipo, marca y modelo,
  y un conteo por tipo y por marca en el panel lateral.
- **Login**: inicio de sesión con email o usuario. La sesión se mantiene al
  recargar la página y se cierra desde el menú de perfil.
- **Favoritos**: con sesión iniciada se puede marcar cualquier máquina con el
  corazón y filtrar el catálogo por "Mis favoritas". Sin sesión, el corazón
  lleva al login y después vuelve a la página de origen.
- **Modo claro/oscuro**: selector en el header. Sigue la preferencia del
  sistema hasta que el visitante elige uno, y lo recuerda.
- **Estados de carga**: esqueletos mientras carga, panel de error con
  "Reintentar" y aviso cuando no hay máquinas para mostrar.

## Stack

| Herramienta | Versión | Uso |
|---|---|---|
| [React](https://react.dev) | 19 | UI |
| [Vite](https://vite.dev) | 8 | Servidor de desarrollo y build |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Estilos (plugin `@tailwindcss/vite`, configuración en CSS) |
| [React Router](https://reactrouter.com) | 8 | Ruteo (paquete `react-router`) |
| ESLint | 10 | Linter |

No hay librerías de estado ni de HTTP: el estado global usa Context de React y
las peticiones usan `fetch`.

## Requisitos

- **Node.js** `^20.19` o `>=22.12` (lo exige Vite 8).
- El **backend de Strapi** corriendo (por defecto en `http://localhost:1337`),
  con estos permisos habilitados en
  *Settings → Users & Permissions plugin → Roles*:

  | Rol | Permisos |
  |---|---|
  | Public | `Maquina › find`, `Auth › callback` (login), `Auth › refresh` |
  | Authenticated | `Maquina › find`, `Auth › logout`, `User › me` |

  Más detalle en [docs/api-consumida.md](docs/api-consumida.md).

## Puesta en marcha

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar la URL del backend
cp .env.example .env
#    y editar VITE_API_URL si el backend no está en http://localhost:1337

# 3. Levantar el servidor de desarrollo
npm run dev
```

La app queda en `http://localhost:5173`.

> La URL del backend va **sin** `/api` al final. Si falta `VITE_API_URL`, la
> app lo avisa en pantalla en vez de hacer peticiones.

### Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Sirve el build de `dist/` para probarlo |
| `npm run lint` | Corre ESLint sobre todo el proyecto |

## Estructura del proyecto

```
src/
├── main.jsx            # Punto de entrada: providers y router
├── App.jsx             # Definición de rutas
├── index.css           # Tailwind v4: tema, modo oscuro y utilidades propias
├── pages/              # Una por ruta: Home, Catalogo, Login
├── components/         # Componentes reutilizables (cards, menús, estados)
│   └── layout/         # Layout, Header, NavBar, Footer y links compartidos
├── context/            # Contextos y providers: sesión, favoritos y tema
├── hooks/              # useAuth, useFavoritos, useTema, useMaquinas
└── services/           # Acceso a datos: cliente HTTP, API y localStorage
```

## Documentación

| Documento | Contenido |
|---|---|
| [Arquitectura](docs/arquitectura.md) | Capas, flujo de datos, rutas y providers |
| [Autenticación](docs/autenticacion.md) | Login, sesión con refresh token y logout |
| [Favoritos y tema](docs/favoritos-y-tema.md) | Cómo se guardan los favoritos y el modo claro/oscuro |
| [Estilos](docs/estilos.md) | Tailwind v4, paleta, tokens del tema y utilidades propias |
| [API consumida](docs/api-consumida.md) | Endpoints de Strapi que usa el front y permisos necesarios |

## Pendientes conocidos

- El **buscador** del header, el botón **Ordenar** y los **filtros** por tipo
  y marca del catálogo son solo visuales todavía.
- Los **favoritos** se guardan en el `localStorage` del navegador, porque el
  backend todavía no tiene esa relación. No se sincronizan entre dispositivos.
- No hay registro de usuarios ni página de detalle de máquina.

## Créditos

El diseño está basado en
[tailwind-ecommerce](https://github.com/bbulakh/tailwind-ecommerce) de
**Bogdan Bulakh** (licencia MIT), un template de Tailwind v3. El markup se
reescribió en JSX con clases de Tailwind v4 y se adaptó al dominio
(paleta rojo/negro/blanco y estilo glassmorphism). Los archivos que parten del
template lo indican en un comentario al inicio, y el footer de la app incluye
el crédito.
