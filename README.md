# Front — Nuvé (E-commerce Maquillaje, P2-6)

React + Vite + TypeScript. Por ahora solo están terminados **TopBar** y **Context**
(la franja de "por qué comprar aquí"); el resto del layout (`Hero`,
`Sidebar`, `Main`/catálogo, `Footer`) son placeholders marcados con
`TODO (equipo)` en `src/App.jsx` para que el resto del equipo los
reemplace sin pelearse con el layout.

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

## Estructura

```
front/
├── index.html
├── vite.config.ts
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── src/
│   ├── main.tsx
│   ├── vite-env.d.ts
│   ├── App.tsx             # arma el Home: TopBar + Hero + Sidebar + Context + Main + Footer
│   ├── App.css
│   ├── index.css           # tokens de diseño (color, tipografía)
│   └── components/
│       ├── TopBar.tsx
│       ├── TopBar.css
│       ├── ContextSection.tsx
│       └── ContextSection.css
```

## Diseño

Sigue el **Manual de Identidad Digital — Nuvé v1.0** (secciones 5, 6, 7 y 10.1):

- **Tipografía:** Lora (wordmark/display, itálica en el logo) + Poppins (todo lo demás), vía Google Fonts en `index.html`.
- **Paleta:** variables CSS en `src/index.css` con los nombres y HEX exactos del manual (`--oro-rosa`, `--ciruela`, `--beige`, `--tinta`, `--pizarra`, `--linea`, `--fondo`, `--superficie`). Cambien ahí si el manual se actualiza de versión, se propaga a todo.
- **TopBar:** encabezado en Ciruela con lockup reverso (10.1) — isotipo + wordmark en blanco, tagline en Beige Tostado. Nav con texto para Catálogo/Tonos; carrito, favoritos y cuenta solo con ícono (regla 7.3). Buscador y botón usan Oro Rosa como acento interactivo.
- **Context:** tarjetas en Superficie con borde Línea y radio 20px (dentro del rango 16–24px de la sección 10.1), ícono en círculo con el tinte Oro Rosa Claro (`--oro-rosa-selected-bg`) y trazo Ciruela.
- **Íconos:** trazo 1.5px sobre grilla de 24px, al estilo Phosphor Regular (sección 7), sin mezclar con otra familia de íconos.

## Pendiente para conectar con el backend

`TopBar` ya recibe `cartCount` y `onSearch` por props — cuando armen
el estado global (Zustand, según la práctica) o el fetch al GraphQL,
conéctenlo ahí en vez de tocar el componente.
