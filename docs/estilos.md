# Estilos

Todo el sistema visual está en [`src/index.css`](../src/index.css).

## Tailwind CSS v4

El proyecto usa **Tailwind v4** con el plugin `@tailwindcss/vite`. A
diferencia de v3, **no hay `tailwind.config.js`**: la configuración se escribe
en CSS.

| En v3 | En este proyecto (v4) |
|---|---|
| `theme.extend` en `tailwind.config.js` | Bloque `@theme { ... }` en `index.css` |
| `darkMode: 'class'` | `@custom-variant dark (&:where(.dark, .dark *));` |
| Plugins o `@layer components` | `@utility nombre { ... }` |
| `@tailwind base/components/utilities` | `@import "tailwindcss";` |

Como v4 cambió algunos valores por defecto, la capa `base` incluye el snippet de
compatibilidad de la guía oficial de migración: los bordes sin color usan un
gris sutil en vez de `currentcolor`, y los botones recuperan
`cursor: pointer`.

## Paleta

La identidad visual es **rojo, negro y blanco**, con un look industrial. La
línea `--color-*: initial` **borra la paleta por defecto de Tailwind**: solo
existen los colores definidos acá, así que una clase con otro color (por
ejemplo, una que haya quedado del template) no genera CSS.

| Token | Valor | Uso |
|---|---|---|
| `black` / `white` | `#000` / `#fff` | Lo que no cambia con el tema: texto sobre rojo, logo |
| `red-500` | `#ef3a41` | Acentos sobre fondo negro (contraste 5.3:1) |
| `red-600` | `#d11a21` | Rojo principal; texto blanco encima con 5.4:1 |
| `red-700` | `#a3121a` | Hover de superficies rojas y acento en modo claro |

Los grises se logran **con opacidad**: `text-tinta/60`, `bg-fondo/50`,
`border-tinta/10`.

### Tokens que cambian con el tema

Para no escribir `dark:` en cada clase, los componentes usan tokens que se
invierten solos:

| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `tinta` | negro | blanco | Texto e íconos |
| `fondo` | blanco | negro | Fondo de la página |
| `acento` | `red-700` | `red-500` | Rojo para texto, íconos y bordes |

Ejemplo: `text-tinta/70` es gris oscuro en claro y gris claro en oscuro, sin
variantes. `dark:` queda solo para casos puntuales.

El acento cambia de tono porque `red-500` sobre blanco no llega al contraste
mínimo de 4.5:1.

### Tipografías

Desde Google Fonts (cargadas en `index.html`):

- **Barlow** (`font-sans`): texto general.
- **Barlow Condensed** (`font-display`): títulos, botones y etiquetas. Los
  `h1`, `h2` y `h3` la usan siempre, en mayúsculas.

## Modo oscuro

Se activa con la clase **`dark` en `<html>`** (no con la media query). La pone
el script de `index.html` antes del primer render y después la maneja
`TemaProvider` (ver [favoritos-y-tema.md](favoritos-y-tema.md)).

En la capa `base`, `:root` define los valores del modo claro y `.dark` los pisa:
los tokens `tinta`/`fondo`/`acento`, las variables `--vidrio-*` y las manchas
rojas del fondo.

## Fondo

El `body` tiene tres manchas rojas desenfocadas (`radial-gradient`) fijas. Están
para que el efecto de vidrio tenga algo detrás y el desenfoque se note. En modo
claro son más suaves para no perder contraste.

## Utilidades propias

Definidas con `@utility`, se usan como cualquier clase de Tailwind (y aceptan
variantes como `hover:` o `md:`):

| Clase | Qué es | Dónde se usa |
|---|---|---|
| `vidrio` | Glassmorphism: superficie translúcida, `backdrop-filter: blur`, borde sutil, brillo interno y sombra | Tarjetas, paneles, botones secundarios |
| `vidrio-denso` | Vidrio más opaco, del color del fondo | Barra superior, footer, menús desplegables, avisos |
| `vidrio-rojo` | Vidrio tintado de rojo, siempre con texto blanco | Etiquetas de tipo, íconos destacados |
| `esquina-cortada` | Esquinas en diagonal con `clip-path` | Botones y etiquetas, para el look industrial |
| `franja-peligro` | Franjas diagonales rojas, como cinta de seguridad | Bordes de menús, footer, decoración |
| `boton-primario` | `vidrio-rojo` + `esquina-cortada` + tipografía display | Botones de acción principal |
| `campo` | Input de formulario sobre vidrio, con foco rojo | Formulario de login |

Los valores de cada tema para las superficies de vidrio están en las
variables `--vidrio-*`, así las utilidades no necesitan variantes `dark:`.

### Sobrescribir bordes del vidrio

Las utilidades de vidrio ponen un borde completo. Para sacar algún lado se usa
el modificador `!` de v4 (importante), que va al final:

```jsx
<div className="vidrio-denso border-x-0! border-t-0!">
```

## Gráficos SVG

El [`Logo`](../src/components/Logo.jsx) y la
[`HeroIlustracion`](../src/components/HeroIlustracion.jsx) son SVG **inline**
(no `<img>`), así sus colores salen de los tokens (`fill-fondo`,
`stroke-tinta`) y se invierten con el tema. El rojo queda igual en los dos.

## Relación con el template

El markup parte de
[tailwind-ecommerce](https://github.com/bbulakh/tailwind-ecommerce) (Tailwind
v3, MIT, Bogdan Bulakh), reescrito en JSX con clases válidas para v4. Las
imágenes del template se reemplazaron por gráficos propios (hero, logo, franjas)
y el slider del Home por la grilla de "Últimas incorporaciones". Los archivos
adaptados lo indican con un comentario al inicio.
