// src/resolvers.js
import {
  roles,
  usuarios,
  marcas,
  categorias,
  productos,
  variantesProducto,
  imagenesProducto,
  inventarios,
  carritos,
  detallesCarrito,
  direcciones,
  favoritos,
  resenas,
  pedidos,
  detallesPedido,
  nextIds,
} from './data/mock.js';

const hoy = () => new Date().toISOString().slice(0, 10);

export const resolvers = {
  // ------------------------------------------------------------------
  // QUERY
  // ------------------------------------------------------------------
  Query: {
    roles: () => roles,
    rol: (_, { id }) => roles.find((r) => r.id === id),

    usuarios: () => usuarios,
    usuario: (_, { id }) => usuarios.find((u) => u.id === id),

    marcas: () => marcas,
    marca: (_, { id }) => marcas.find((m) => m.id === id),

    categorias: () => categorias,
    categoria: (_, { id }) => categorias.find((c) => c.id === id),

    productos: (_, { limite, desde }) => {
      let result = productos;
      if (desde) result = result.slice(desde);
      if (limite) result = result.slice(0, limite);
      return result;
    },
    producto: (_, { id }) => productos.find((p) => p.id === id),

    variantesProducto: () => variantesProducto,
    varianteProducto: (_, { id }) => variantesProducto.find((v) => v.id === id),

    imagenesProducto: () => imagenesProducto,
    imagenProducto: (_, { id }) => imagenesProducto.find((i) => i.id === id),

    carritos: () => carritos,
    carrito: (_, { id }) => carritos.find((c) => c.id === id),

    direcciones: () => direcciones,
    direccion: (_, { id }) => direcciones.find((d) => d.id === id),

    favoritos: () => favoritos,
    favorito: (_, { id }) => favoritos.find((f) => f.id === id),

    resenas: () => resenas,
    resena: (_, { id }) => resenas.find((r) => r.id === id),

    pedidos: (_, { estado }) => (estado ? pedidos.filter((p) => p.estado === estado) : pedidos),
    pedido: (_, { id }) => pedidos.find((p) => p.id === id),
  },

  // ------------------------------------------------------------------
  // RELACIONES ANIDADAS (un resolver por cada campo que no viene ya
  // directo del objeto plano guardado en mock.js)
  // ------------------------------------------------------------------

  Rol: {
    usuarios: (rol) => usuarios.filter((u) => u.rolId === rol.id),
  },

  Usuario: {
    rol: (usuario) => roles.find((r) => r.id === usuario.rolId),
    direcciones: (usuario) => direcciones.filter((d) => d.usuarioId === usuario.id),
    carritos: (usuario) => carritos.filter((c) => c.usuarioId === usuario.id),
    pedidos: (usuario) => pedidos.filter((p) => p.usuarioId === usuario.id),
    favoritos: (usuario) => favoritos.filter((f) => f.usuarioId === usuario.id),
    resenas: (usuario) => resenas.filter((r) => r.usuarioId === usuario.id),
  },

  Marca: {
    productos: (marca) => productos.filter((p) => p.marcaId === marca.id),
  },

  Categoria: {
    productos: (categoria) => productos.filter((p) => p.categoriaId === categoria.id),
  },

  Producto: {
    categoria: (producto) => categorias.find((c) => c.id === producto.categoriaId),
    marca: (producto) => marcas.find((m) => m.id === producto.marcaId),
    variantes: (producto) => variantesProducto.filter((v) => v.productoId === producto.id),
    imagenes: (producto) => imagenesProducto.filter((i) => i.productoId === producto.id),
    favoritos: (producto) => favoritos.filter((f) => f.productoId === producto.id),
    resenas: (producto) => resenas.filter((r) => r.productoId === producto.id),
  },

  VarianteProducto: {
    producto: (variante) => productos.find((p) => p.id === variante.productoId),
    inventario: (variante) => inventarios.find((i) => i.varianteId === variante.id) || null,
  },

  ImagenProducto: {
    producto: (imagen) => productos.find((p) => p.id === imagen.productoId),
  },

  Inventario: {
    variante: (inventario) => variantesProducto.find((v) => v.id === inventario.varianteId),
  },

  Carrito: {
    usuario: (carrito) => usuarios.find((u) => u.id === carrito.usuarioId),
    detalles: (carrito) => detallesCarrito.filter((d) => d.carritoId === carrito.id),
  },

  DetalleCarrito: {
    carrito: (detalle) => carritos.find((c) => c.id === detalle.carritoId),
    variante: (detalle) => variantesProducto.find((v) => v.id === detalle.varianteId),
  },

  Direccion: {
    usuario: (direccion) => usuarios.find((u) => u.id === direccion.usuarioId),
  },

  Favorito: {
    usuario: (favorito) => usuarios.find((u) => u.id === favorito.usuarioId),
    producto: (favorito) => productos.find((p) => p.id === favorito.productoId),
  },

  Resena: {
    usuario: (resena) => usuarios.find((u) => u.id === resena.usuarioId),
    producto: (resena) => productos.find((p) => p.id === resena.productoId),
  },

  Pedido: {
    usuario: (pedido) => usuarios.find((u) => u.id === pedido.usuarioId),
    direccion: (pedido) => direcciones.find((d) => d.id === pedido.direccionId),
    detalles: (pedido) => detallesPedido.filter((d) => d.pedidoId === pedido.id),
  },

  DetallePedido: {
    pedido: (detalle) => pedidos.find((p) => p.id === detalle.pedidoId),
    variante: (detalle) => variantesProducto.find((v) => v.id === detalle.varianteId),
  },

  // ------------------------------------------------------------------
  // MUTATION
  // ------------------------------------------------------------------
  Mutation: {
    // --- Rol ---
    crearRol: (_, { datos }) => {
      const nuevo = { id: String(nextIds.rol++), ...datos };
      roles.push(nuevo);
      return nuevo;
    },
    actualizarRol: (_, { id, datos }) => {
      const idx = roles.findIndex((r) => r.id === id);
      if (idx === -1) return null;
      roles[idx] = { ...roles[idx], ...datos };
      return roles[idx];
    },
    eliminarRol: (_, { id }) => {
      const idx = roles.findIndex((r) => r.id === id);
      if (idx === -1) return false;
      roles.splice(idx, 1);
      return true;
    },

    // --- Usuario ---
    crearUsuario: (_, { datos }) => {
      const nuevo = { id: String(nextIds.usuario++), activo: true, fechaRegistro: hoy(), ...datos };
      usuarios.push(nuevo);
      return nuevo;
    },
    actualizarUsuario: (_, { id, datos }) => {
      const idx = usuarios.findIndex((u) => u.id === id);
      if (idx === -1) return null;
      usuarios[idx] = { ...usuarios[idx], ...datos };
      return usuarios[idx];
    },
    eliminarUsuario: (_, { id }) => {
      const idx = usuarios.findIndex((u) => u.id === id);
      if (idx === -1) return false;
      usuarios.splice(idx, 1);
      return true;
    },

    // --- Marca ---
    crearMarca: (_, { datos }) => {
      const nueva = { id: String(nextIds.marca++), activo: true, ...datos };
      marcas.push(nueva);
      return nueva;
    },
    actualizarMarca: (_, { id, datos }) => {
      const idx = marcas.findIndex((m) => m.id === id);
      if (idx === -1) return null;
      marcas[idx] = { ...marcas[idx], ...datos };
      return marcas[idx];
    },
    eliminarMarca: (_, { id }) => {
      const idx = marcas.findIndex((m) => m.id === id);
      if (idx === -1) return false;
      marcas.splice(idx, 1);
      return true;
    },

    // --- Categoria ---
    crearCategoria: (_, { datos }) => {
      const nueva = { id: String(nextIds.categoria++), activo: true, ...datos };
      categorias.push(nueva);
      return nueva;
    },
    actualizarCategoria: (_, { id, datos }) => {
      const idx = categorias.findIndex((c) => c.id === id);
      if (idx === -1) return null;
      categorias[idx] = { ...categorias[idx], ...datos };
      return categorias[idx];
    },
    eliminarCategoria: (_, { id }) => {
      const idx = categorias.findIndex((c) => c.id === id);
      if (idx === -1) return false;
      categorias.splice(idx, 1);
      return true;
    },

    // --- Producto ---
    crearProducto: (_, { datos }) => {
      const nuevo = { id: String(nextIds.producto++), activo: true, fechaRegistro: hoy(), ...datos };
      productos.push(nuevo);
      return nuevo;
    },
    actualizarProducto: (_, { id, datos }) => {
      const idx = productos.findIndex((p) => p.id === id);
      if (idx === -1) return null;
      productos[idx] = { ...productos[idx], ...datos };
      return productos[idx];
    },
    eliminarProducto: (_, { id }) => {
      const idx = productos.findIndex((p) => p.id === id);
      if (idx === -1) return false;
      productos.splice(idx, 1);
      return true;
    },

    // --- VarianteProducto ---
    crearVarianteProducto: (_, { datos }) => {
      const nueva = { id: String(nextIds.varianteProducto++), activo: true, ...datos };
      variantesProducto.push(nueva);
      return nueva;
    },
    actualizarVarianteProducto: (_, { id, datos }) => {
      const idx = variantesProducto.findIndex((v) => v.id === id);
      if (idx === -1) return null;
      variantesProducto[idx] = { ...variantesProducto[idx], ...datos };
      return variantesProducto[idx];
    },
    eliminarVarianteProducto: (_, { id }) => {
      const idx = variantesProducto.findIndex((v) => v.id === id);
      if (idx === -1) return false;
      variantesProducto.splice(idx, 1);
      return true;
    },

    // --- ImagenProducto ---
    crearImagenProducto: (_, { datos }) => {
      const nueva = { id: String(nextIds.imagenProducto++), principal: false, ...datos };
      imagenesProducto.push(nueva);
      return nueva;
    },
    actualizarImagenProducto: (_, { id, datos }) => {
      const idx = imagenesProducto.findIndex((i) => i.id === id);
      if (idx === -1) return null;
      imagenesProducto[idx] = { ...imagenesProducto[idx], ...datos };
      return imagenesProducto[idx];
    },
    eliminarImagenProducto: (_, { id }) => {
      const idx = imagenesProducto.findIndex((i) => i.id === id);
      if (idx === -1) return false;
      imagenesProducto.splice(idx, 1);
      return true;
    },

    // --- Inventario ---
    crearInventario: (_, { datos }) => {
      const nuevo = { id: String(nextIds.inventario++), fechaActualizacion: hoy(), ...datos };
      inventarios.push(nuevo);
      return nuevo;
    },
    actualizarInventario: (_, { id, cantidad }) => {
      const idx = inventarios.findIndex((i) => i.id === id);
      if (idx === -1) return null;
      inventarios[idx] = { ...inventarios[idx], cantidad, fechaActualizacion: hoy() };
      return inventarios[idx];
    },
    eliminarInventario: (_, { id }) => {
      const idx = inventarios.findIndex((i) => i.id === id);
      if (idx === -1) return false;
      inventarios.splice(idx, 1);
      return true;
    },

    // --- Carrito ---
    crearCarrito: (_, { datos }) => {
      const nuevo = { id: String(nextIds.carrito++), estado: 'ACTIVO', fechaCreacion: hoy(), ...datos };
      carritos.push(nuevo);
      return nuevo;
    },
    actualizarCarrito: (_, { id, estado }) => {
      const idx = carritos.findIndex((c) => c.id === id);
      if (idx === -1) return null;
      carritos[idx] = { ...carritos[idx], estado };
      return carritos[idx];
    },
    eliminarCarrito: (_, { id }) => {
      const idx = carritos.findIndex((c) => c.id === id);
      if (idx === -1) return false;
      carritos.splice(idx, 1);
      return true;
    },

    // --- DetalleCarrito ---
    // Si no se manda precioUnitario, se toma el precio vigente de la variante
    // (asi el carrito siempre refleja lo que costaba el producto al agregarlo).
    crearDetalleCarrito: (_, { datos }) => {
      const variante = variantesProducto.find((v) => v.id === datos.varianteId);
      const precioUnitario = datos.precioUnitario ?? variante?.precio ?? 0;
      const nuevo = { id: String(nextIds.detalleCarrito++), ...datos, precioUnitario };
      detallesCarrito.push(nuevo);
      return nuevo;
    },
    actualizarDetalleCarrito: (_, { id, cantidad }) => {
      const idx = detallesCarrito.findIndex((d) => d.id === id);
      if (idx === -1) return null;
      detallesCarrito[idx] = { ...detallesCarrito[idx], cantidad };
      return detallesCarrito[idx];
    },
    eliminarDetalleCarrito: (_, { id }) => {
      const idx = detallesCarrito.findIndex((d) => d.id === id);
      if (idx === -1) return false;
      detallesCarrito.splice(idx, 1);
      return true;
    },

    // --- Direccion ---
    crearDireccion: (_, { datos }) => {
      const nueva = { id: String(nextIds.direccion++), ...datos };
      direcciones.push(nueva);
      return nueva;
    },
    actualizarDireccion: (_, { id, datos }) => {
      const idx = direcciones.findIndex((d) => d.id === id);
      if (idx === -1) return null;
      direcciones[idx] = { ...direcciones[idx], ...datos };
      return direcciones[idx];
    },
    eliminarDireccion: (_, { id }) => {
      const idx = direcciones.findIndex((d) => d.id === id);
      if (idx === -1) return false;
      direcciones.splice(idx, 1);
      return true;
    },

    // --- Favorito ---
    crearFavorito: (_, { datos }) => {
      const nuevo = { id: String(nextIds.favorito++), fechaAgregado: hoy(), ...datos };
      favoritos.push(nuevo);
      return nuevo;
    },
    eliminarFavorito: (_, { id }) => {
      const idx = favoritos.findIndex((f) => f.id === id);
      if (idx === -1) return false;
      favoritos.splice(idx, 1);
      return true;
    },

    // --- Resena ---
    crearResena: (_, { datos }) => {
      const nueva = { id: String(nextIds.resena++), compraVerificada: false, fecha: hoy(), ...datos };
      resenas.push(nueva);
      return nueva;
    },
    actualizarResena: (_, { id, datos }) => {
      const idx = resenas.findIndex((r) => r.id === id);
      if (idx === -1) return null;
      resenas[idx] = { ...resenas[idx], ...datos };
      return resenas[idx];
    },
    eliminarResena: (_, { id }) => {
      const idx = resenas.findIndex((r) => r.id === id);
      if (idx === -1) return false;
      resenas.splice(idx, 1);
      return true;
    },

    // --- Pedido: mutation de negocio ---
    // No solo guarda lo que le mandan: por cada variante recibida busca su
    // precio vigente, arma las lineas DetallePedido y calcula subtotal/total
    // del pedido a partir de esas lineas.
    crearPedido: (_, { datos }) => {
      const { usuarioId, direccionId, detalles } = datos;

      const lineas = detalles.map((linea) => {
        const variante = variantesProducto.find((v) => v.id === linea.varianteId);
        const precioUnitario = variante?.precio ?? 0;
        const subtotal = precioUnitario * linea.cantidad;
        return { varianteId: linea.varianteId, cantidad: linea.cantidad, precioUnitario, subtotal };
      });

      const subtotalPedido = lineas.reduce((acc, l) => acc + l.subtotal, 0);
      // No se modelan impuestos ni envio en esta practica: total = subtotal.
      const totalPedido = subtotalPedido;

      const nuevoPedido = {
        id: String(nextIds.pedido++),
        usuarioId,
        direccionId,
        fecha: hoy(),
        subtotal: subtotalPedido,
        total: totalPedido,
        estado: 'PENDIENTE',
        transaccionPagoId: null,
      };
      pedidos.push(nuevoPedido);

      lineas.forEach((linea) => {
        detallesPedido.push({
          id: String(nextIds.detallePedido++),
          pedidoId: nuevoPedido.id,
          ...linea,
        });
      });

      return nuevoPedido;
    },
    actualizarPedido: (_, { id, estado }) => {
      const idx = pedidos.findIndex((p) => p.id === id);
      if (idx === -1) return null;
      pedidos[idx] = { ...pedidos[idx], estado };
      return pedidos[idx];
    },
    eliminarPedido: (_, { id }) => {
      const idx = pedidos.findIndex((p) => p.id === id);
      if (idx === -1) return false;
      pedidos.splice(idx, 1);
      return true;
    },

    // --- DetallePedido ---
    crearDetallePedido: (_, { datos }) => {
      const variante = variantesProducto.find((v) => v.id === datos.varianteId);
      const precioUnitario = datos.precioUnitario ?? variante?.precio ?? 0;
      const subtotal = precioUnitario * datos.cantidad;
      const nuevo = { id: String(nextIds.detallePedido++), ...datos, precioUnitario, subtotal };
      detallesPedido.push(nuevo);
      return nuevo;
    },
    actualizarDetallePedido: (_, { id, cantidad }) => {
      const idx = detallesPedido.findIndex((d) => d.id === id);
      if (idx === -1) return null;
      const actual = detallesPedido[idx];
      const subtotal = actual.precioUnitario * cantidad;
      detallesPedido[idx] = { ...actual, cantidad, subtotal };
      return detallesPedido[idx];
    },
    eliminarDetallePedido: (_, { id }) => {
      const idx = detallesPedido.findIndex((d) => d.id === id);
      if (idx === -1) return false;
      detallesPedido.splice(idx, 1);
      return true;
    },
  },
};
