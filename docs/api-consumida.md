# API consumida

Resumen de lo que el front usa del backend de **Strapi 5**. No es la
documentación completa de la API: solo cubre los endpoints que se llaman desde
este proyecto y los permisos que necesitan.

## Configuración

La URL del backend se toma de la variable `VITE_API_URL` del archivo `.env`
(ver [`.env.example`](../.env.example)):

```env
VITE_API_URL=http://localhost:1337
```

Va **sin** `/api` al final. El cliente
([`services/api.js`](../src/services/api.js)) se lo agrega a cada petición, y
las imágenes se sirven desde la URL sin `/api`
(`http://localhost:1337/uploads/...`).

Todas las peticiones salen de `api.js` con `credentials: 'include'`, para que
viaje la cookie de refresh (ver [autenticacion.md](autenticacion.md)).

## Endpoints

| Método | Ruta | Auth | Dónde se usa |
|---|---|---|---|
| `GET` | `/api/maquinas?populate=imagen&sort=...` | Opcional | Home y Catálogo (`services/maquinas.js`) |
| `POST` | `/api/auth/local` | No | Login (`services/auth.js`) |
| `POST` | `/api/auth/refresh` | Cookie | Al cargar la app y al recibir un `401` (`services/api.js`) |
| `POST` | `/api/auth/logout` | Sí | Menú de perfil (`services/auth.js`) |
| `GET` | `/api/users/me` | Sí | Al restaurar la sesión (`services/auth.js`) |

### `GET /api/maquinas`

```
GET /api/maquinas?populate=imagen&sort=marca:asc
```

- `populate=imagen` es obligatorio para que vengan las imágenes: Strapi no
  incluye los campos media por defecto.
- `sort`: el catálogo usa `marca:asc` y el Home `createdAt:desc`.

Campos que usa el front de cada máquina:

| Campo | Uso |
|---|---|
| `documentId` | Key de las listas e identificador de los favoritos |
| `tipo`, `marca`, `modelo` | Textos de la tarjeta y conteos del catálogo |
| `imagen[].url`, `imagen[].formats.small.url` | Imagen de la tarjeta (`small` si existe) |
| `imagen[].alternativeText` | Texto alternativo de la imagen |
| `createdAt` | Orden de "Últimas incorporaciones" (desde el `sort`) |

`id` e `interno` llegan en la respuesta pero se descartan al mapear.

> Strapi 5 devuelve los campos **planos** dentro de `data` (sin
> `data.attributes`).

### `POST /api/auth/local`

```json
{ "identifier": "juan@mail.com", "password": "secreto123" }
```

`identifier` acepta email o username. Responde `{ jwt, user }` y setea la cookie
de refresh. Las rutas `/auth/local*` tienen un límite de **10 peticiones por
minuto** por IP (`429` si se pasa).

### `POST /api/auth/refresh`

Cuerpo vacío (`{}`). Usa la cookie de refresh y responde `{ jwt }`. Además
**rota la cookie**: la anterior deja de valer. Si no hay cookie o es inválida
responde `400`/`401`, y el front lo toma como "sin sesión".

### `POST /api/auth/logout`

Cuerpo vacío (`{}`), con `Authorization: Bearer <jwt>`. Borra la cookie de
refresh.

### `GET /api/users/me`

Con `Authorization: Bearer <jwt>`. Devuelve el usuario **sin** envolver en
`data`. El front usa `id`, `username` y `email`.

## Permisos necesarios en Strapi

Strapi bloquea todas las rutas (`403`) hasta que se habilitan para un rol, en
**Settings → Users & Permissions plugin → Roles**:

| Recurso | Acción | Public | Authenticated | Por qué |
|---|---|:---:|:---:|---|
| Maquina | `find` | ✅ | ✅ | Listar máquinas con o sin sesión |
| Users-permissions › Auth | `callback` | ✅ | | Login (`/auth/local`) |
| Users-permissions › Auth | `refresh` | ✅ | | Renovar el `jwt` (se pide sin token) |
| Users-permissions › Auth | `logout` | | ✅ | Cerrar sesión |
| Users-permissions › User | `me` | | ✅ | Traer el usuario logueado |

Si el catálogo muestra "El servidor no permite consultar las máquinas en este
momento", es un `403`: falta habilitar `Maquina › find` para el rol
correspondiente.

## Errores

Strapi responde los errores con este formato:

```json
{ "data": null, "error": { "status": 400, "message": "..." } }
```

`api.js` los convierte en un `ApiError` con `status` y `message`. Si no hubo
respuesta (backend apagado, red, CORS), el `status` es `0`. Ver
[arquitectura.md](arquitectura.md#manejo-de-errores) para cómo se muestran.

> La API tiene `strictParams: true`: un parámetro de consulta o un campo que no
> existe devuelve `400` en vez de ignorarse.
