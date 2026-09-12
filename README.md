<<<<<<< HEAD
# Front — Nuvé (E-commerce Maquillaje, P2-6)

React + Vite + TypeScript. Por ahora solo están terminados **TopBar** y **Context**
(la franja de "por qué comprar aquí"); el resto del layout (`Hero`,
`Sidebar`, `Main`/catálogo, `Footer`) son placeholders marcados con
`TODO (equipo)` en `src/App.jsx` para que el resto del equipo los
reemplace sin pelearse con el layout.
=======
# Práctica 5 — Servidor GraphQL (e-commerce de maquillaje)

Servidor GraphQL con Node.js + Apollo Server, construido directamente sobre
el DER de 15 entidades (Rol, Usuario, Marca, Categoria, Producto,
VarianteProducto, ImagenProducto, Inventario, Carrito, DetalleCarrito,
Direccion, Favorito, Resena, Pedido, DetallePedido). No usa base de datos:
los datos viven en memoria en `src/data/mock.js`.
>>>>>>> 9b1665627b919303c170c207d6fac7a57857da1b

## Cómo correrlo

```bash
npm install
<<<<<<< HEAD
npm run dev
```

Abre `http://localhost:5173`.
=======
npm start
```

Abre `http://localhost:4000/` para el Apollo Sandbox (playground).
>>>>>>> 9b1665627b919303c170c207d6fac7a57857da1b

## Estructura

```
<<<<<<< HEAD
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
=======
p5-ecommerce-maquillaje/
├── package.json
├── index.js              # levanta el servidor Apollo
└── src/
    ├── schema.js         # SDL: types, enums, inputs, Query, Mutation
    ├── resolvers.js       # Query, Mutation y relaciones anidadas
    └── data/
        └── mock.js       # datos en memoria (simulan la base de datos)
```

## Decisiones de diseño

- **Query**: lista + consulta por id de las 11 entidades principales.
  `DetalleCarrito`, `DetallePedido` e `Inventario` no tienen query propia:
  se consultan anidadas (`carrito.detalles`, `pedido.detalles`,
  `varianteProducto.inventario`), porque no tiene sentido pedirlas sueltas
  sin su entidad dueña.
- **Mutation**: CRUD completo (crear/actualizar/eliminar) de las 15
  entidades. La excepción es `Favorito`, que solo tiene crear/eliminar
  porque no tiene campos editables (es una marca de "me gusta").
- **Mutation de negocio — `crearPedido`**: no guarda directo lo que le
  mandan. Recibe una lista de `{ varianteId, cantidad }`, busca el precio
  vigente de cada variante, arma las líneas `DetallePedido` y calcula
  `subtotal`/`total` del pedido a partir de esas líneas.
- **`crearDetalleCarrito`** y **`crearDetallePedido`** aceptan
  `precioUnitario` opcional: si no se manda, se toma el precio vigente de
  la variante en ese momento.

## Queries de prueba

```graphql
query CatalogoConVariantes {
  productos {
    id
    nombre
    marca { nombre }
    categoria { nombre }
    variantes {
      tono
      precio
      sku
      inventario { cantidad }
    }
  }
}
```

```graphql
query PerfilDeUsuario {
  usuario(id: "1") {
    nombre
    correo
    direcciones { calle ciudad }
    pedidos { id total estado }
    favoritos { producto { nombre } }
    resenas { calificacion comentario }
  }
}
```

## Mutations de prueba

Crear un pedido (mutation de negocio — el total se calcula solo):

```graphql
mutation CrearPedido {
  crearPedido(
    datos: {
      usuarioId: "1"
      direccionId: "1"
      detalles: [
        { varianteId: "1", cantidad: 2 }
        { varianteId: "3", cantidad: 1 }
      ]
    }
  ) {
    id
    subtotal
    total
    estado
    detalles {
      cantidad
      precioUnitario
      subtotal
      variante { tono }
    }
  }
}
```

CRUD simple (Producto):

```graphql
mutation {
  crearProducto(
    datos: { categoriaId: "1", marcaId: "1", nombre: "Gloss Labial Brillante" }
  ) {
    id
    nombre
    activo
  }
}
```

```graphql
mutation {
  actualizarProducto(id: "4", datos: { categoriaId: "1", marcaId: "1", nombre: "Gloss Labial Brillante XL" }) {
    id
    nombre
  }
}
```

```graphql
mutation {
  eliminarProducto(id: "4")
}
```
>>>>>>> 9b1665627b919303c170c207d6fac7a57857da1b
