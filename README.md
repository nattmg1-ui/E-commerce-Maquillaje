# Práctica 5 — Servidor GraphQL (e-commerce de maquillaje)

Servidor GraphQL con Node.js + Apollo Server, construido directamente sobre
el DER de 15 entidades (Rol, Usuario, Marca, Categoria, Producto,
VarianteProducto, ImagenProducto, Inventario, Carrito, DetalleCarrito,
Direccion, Favorito, Resena, Pedido, DetallePedido). No usa base de datos:
los datos viven en memoria en `src/data/mock.js`.

## Cómo correrlo

```bash
npm install
npm start
```

Abre `http://localhost:4000/` para el Apollo Sandbox (playground).

## Estructura

```
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
