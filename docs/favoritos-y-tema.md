# Favoritos y tema

Las dos funcionalidades que guardan datos en el navegador (`localStorage`) en
vez de en el backend.

## Favoritos

Código: [`services/favoritos.js`](../src/services/favoritos.js),
[`context/FavoritosProvider.jsx`](../src/context/FavoritosProvider.jsx),
[`components/BotonFavorito.jsx`](../src/components/BotonFavorito.jsx).

### Dónde se guardan

> **Solución provisoria:** el backend todavía no tiene una relación de
> favoritos, así que se guardan en el `localStorage` del navegador. No se
> sincronizan entre dispositivos ni navegadores.

Cada usuario tiene su propia clave con los `documentId` de sus máquinas:

```
favoritos:<id del usuario>  →  ["a1b2c3...", "d4e5f6..."]
```

Así, si varias personas usan el mismo navegador, ninguna lee ni pisa los
favoritos de otra. Si lo guardado está roto o no existe, se parte de una lista
vacía.

Como todo el acceso está en `services/favoritos.js`, pasarlos al backend el día
que exista la relación solo requiere cambiar ese archivo (y volverlo
asíncrono).

### Cómo funciona

- `FavoritosProvider` carga los favoritos del usuario logueado. Al iniciar o
  cerrar sesión cambia al conjunto de ese usuario, o a ninguno.
- Se exponen con el hook `useFavoritos()`:

  ```js
  const { favoritos, alternarFavorito } = useFavoritos()
  favoritos.has(maquina.documentId)   // `favoritos` es un Set
  alternarFavorito(maquina.documentId) // agrega o quita
  ```

- **Solo se actualiza la UI si se pudo guardar.** Si `localStorage` falla
  (almacenamiento bloqueado o lleno), el corazón queda como estaba y aparece un
  aviso flotante que se cierra solo a los 5 segundos.

### Botón de favorito

El corazón de cada [`MaquinaCard`](../src/components/MaquinaCard.jsx):

| Situación | Qué pasa al tocarlo |
|---|---|
| Recuperando la sesión | Nada (todavía no se sabe si hay usuario) |
| Sin sesión | Lleva al login con un aviso y vuelve acá después de ingresar |
| Con sesión | Marca o desmarca la máquina |

Relleno en rojo si la máquina es favorita, solo contorno si no. Tiene
`aria-pressed` y una etiqueta que dice qué va a hacer ("Agregar ... a
favoritas" / "Quitar ... de favoritas").

### Filtro "Mis favoritas"

En el catálogo, con sesión iniciada, aparece el botón **Mis favoritas**. El
filtro va en la URL como `?favoritas=1`, así:

- se mantiene al recargar la página;
- se conserva al ir al login desde un corazón y volver.

Sin sesión el parámetro se ignora. Si la URL trae `?favoritas=1`, el catálogo
espera a saber si hay sesión antes de mostrar resultados, para no mostrar todas
las máquinas por un instante. Si el usuario no tiene favoritas, el panel vacío
explica cómo agregarlas.

## Modo claro/oscuro

Código: [`services/tema.js`](../src/services/tema.js),
[`context/TemaProvider.jsx`](../src/context/TemaProvider.jsx),
[`components/SelectorTema.jsx`](../src/components/SelectorTema.jsx) y un
script en [`index.html`](../index.html).

### Comportamiento

- La primera vez se usa la **preferencia del sistema**
  (`prefers-color-scheme`). Si el sistema cambia con la página abierta, la
  página también cambia.
- Cuando el visitante **elige** un tema en el selector del header, se guarda en
  `localStorage` (clave `tema`, valores `claro` u `oscuro`) y a partir de ahí
  deja de seguir al sistema.
- No depende de la sesión: vale para cualquiera que entre desde ese navegador.
- Si el navegador bloquea el almacenamiento, el tema cambia igual pero no se
  recuerda al recargar.

### Sin parpadeo al cargar

React tarda un momento en montarse. Si el tema se aplicara recién ahí, se vería
por un instante el tema equivocado. Para evitarlo, un **script en el `<head>`
de `index.html`** lee la clave `tema` y aplica la clase `dark` en `<html>`
antes de que se pinte la página. Después `TemaProvider` toma el control a partir
de esa clase.

> Si se cambia la clave `tema` en `services/tema.js`, hay que cambiarla también
> en el script de `index.html`.

### Cómo se aplica

`TemaProvider`:

1. Pone o saca la clase `dark` en `<html>`. Es la que usa Tailwind para el modo
   oscuro (ver [estilos.md](estilos.md)).
2. Actualiza `<meta name="theme-color">`, el color de la barra del navegador en
   celulares: blanco en claro, negro en oscuro.

Se accede con el hook `useTema()`:

```js
const { tema, elegirTema } = useTema() // tema: 'claro' | 'oscuro'
```
