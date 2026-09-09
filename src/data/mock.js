// src/data/mock.js
// Datos en memoria que simulan la base de datos del e-commerce de maquillaje.
// Cada tabla del DER es un arreglo de objetos planos; las relaciones se
// guardan como <entidad>Id (igual que en el DER, ej. id_categoria FK).

export const roles = [
  { id: '1', nombre: 'CLIENTE', descripcion: 'Usuario que compra en la tienda' },
  { id: '2', nombre: 'ADMIN', descripcion: 'Usuario que administra el catalogo' },
];

export const usuarios = [
  { id: '1', rolId: '1', nombre: 'Valeria Gomez', correo: 'valeria@example.com', password: 'hash1', activo: true, fechaRegistro: '2026-07-01' },
  { id: '2', rolId: '2', nombre: 'Admin Root', correo: 'admin@example.com', password: 'hash2', activo: true, fechaRegistro: '2026-06-01' },
  { id: '3', rolId: '1', nombre: 'Karla Ruiz', correo: 'karla@example.com', password: 'hash3', activo: true, fechaRegistro: '2026-08-10' },
];

export const marcas = [
  { id: '1', nombre: 'Bella Rosa', descripcion: 'Marca nacional de maquillaje color', activo: true },
  { id: '2', nombre: 'GlowUp', descripcion: 'Marca especializada en bases y tratamiento', activo: true },
];

export const categorias = [
  { id: '1', nombre: 'Labiales', descripcion: 'Labiales en distintos acabados', activo: true },
  { id: '2', nombre: 'Bases', descripcion: 'Bases de maquillaje liquidas y en polvo', activo: true },
  { id: '3', nombre: 'Rubor', descripcion: 'Rubores en polvo y crema', activo: true },
];

export const productos = [
  { id: '1', categoriaId: '1', marcaId: '1', nombre: 'Labial Mate Pasion', descripcion: 'Labial mate de larga duracion', activo: true, fechaRegistro: '2026-07-05' },
  { id: '2', categoriaId: '2', marcaId: '2', nombre: 'Base Liquida Natural', descripcion: 'Base de cobertura media, acabado natural', activo: true, fechaRegistro: '2026-07-10' },
  { id: '3', categoriaId: '3', marcaId: '1', nombre: 'Rubor en Polvo Durazno', descripcion: 'Rubor compacto tono durazno', activo: true, fechaRegistro: '2026-07-15' },
];

export const variantesProducto = [
  { id: '1', productoId: '1', tono: 'Rojo Pasion', codigoHex: '#C0392B', presentacion: '3.5g', precio: 189.0, sku: 'LAB-ROJ-001', activo: true },
  { id: '2', productoId: '1', tono: 'Rojo Vino', codigoHex: '#7B241C', presentacion: '3.5g', precio: 189.0, sku: 'LAB-VIN-001', activo: true },
  { id: '3', productoId: '2', tono: 'Beige Claro', codigoHex: '#E8C39E', presentacion: '30ml', precio: 259.0, sku: 'BAS-BEI-001', activo: true },
  { id: '4', productoId: '3', tono: 'Durazno', codigoHex: '#F5B183', presentacion: '8g', precio: 149.0, sku: 'RUB-DUR-001', activo: true },
];

export const imagenesProducto = [
  { id: '1', productoId: '1', urlImagen: 'https://cdn.example.com/labial-pasion.jpg', principal: true },
  { id: '2', productoId: '2', urlImagen: 'https://cdn.example.com/base-natural.jpg', principal: true },
  { id: '3', productoId: '3', urlImagen: 'https://cdn.example.com/rubor-durazno.jpg', principal: true },
];

export const inventarios = [
  { id: '1', varianteId: '1', cantidad: 40, fechaActualizacion: '2026-09-01' },
  { id: '2', varianteId: '2', cantidad: 25, fechaActualizacion: '2026-09-01' },
  { id: '3', varianteId: '3', cantidad: 15, fechaActualizacion: '2026-09-01' },
  { id: '4', varianteId: '4', cantidad: 60, fechaActualizacion: '2026-09-01' },
];

export const direcciones = [
  { id: '1', usuarioId: '1', calle: 'Av. Vallarta', numero: '1500', colonia: 'Americana', ciudad: 'Guadalajara', estado: 'Jalisco', codigoPostal: '44160', referencias: 'Edificio azul, depto 4', latitud: 20.6736, longitud: -103.373 },
  { id: '2', usuarioId: '3', calle: 'Calzada Independencia', numero: '800', colonia: 'Centro', ciudad: 'Guadalajara', estado: 'Jalisco', codigoPostal: '44100', referencias: null, latitud: null, longitud: null },
];

export const carritos = [
  { id: '1', usuarioId: '1', estado: 'ACTIVO', fechaCreacion: '2026-09-01' },
  { id: '2', usuarioId: '3', estado: 'ACTIVO', fechaCreacion: '2026-09-05' },
];

export const detallesCarrito = [
  { id: '1', carritoId: '1', varianteId: '1', cantidad: 2, precioUnitario: 189.0 },
  { id: '2', carritoId: '1', varianteId: '3', cantidad: 1, precioUnitario: 259.0 },
  { id: '3', carritoId: '2', varianteId: '4', cantidad: 3, precioUnitario: 149.0 },
];

export const favoritos = [
  { id: '1', usuarioId: '1', productoId: '2', fechaAgregado: '2026-08-28' },
  { id: '2', usuarioId: '3', productoId: '1', fechaAgregado: '2026-09-02' },
];

export const resenas = [
  { id: '1', usuarioId: '1', productoId: '1', calificacion: 5, comentario: 'Excelente pigmentacion y no reseca los labios', compraVerificada: true, fecha: '2026-08-15' },
  { id: '2', usuarioId: '3', productoId: '3', calificacion: 4, comentario: 'Buen color pero se acaba rapido', compraVerificada: true, fecha: '2026-08-20' },
];

export const pedidos = [
  { id: '1', usuarioId: '1', direccionId: '1', fecha: '2026-08-20', subtotal: 378.0, total: 378.0, estado: 'PAGADO', transaccionPagoId: 'TXN-0001' },
];

export const detallesPedido = [
  { id: '1', pedidoId: '1', varianteId: '1', cantidad: 2, precioUnitario: 189.0, subtotal: 378.0 },
];

export let nextIds = {
  rol: roles.length + 1,
  usuario: usuarios.length + 1,
  marca: marcas.length + 1,
  categoria: categorias.length + 1,
  producto: productos.length + 1,
  varianteProducto: variantesProducto.length + 1,
  imagenProducto: imagenesProducto.length + 1,
  inventario: inventarios.length + 1,
  direccion: direcciones.length + 1,
  carrito: carritos.length + 1,
  detalleCarrito: detallesCarrito.length + 1,
  favorito: favoritos.length + 1,
  resena: resenas.length + 1,
  pedido: pedidos.length + 1,
  detallePedido: detallesPedido.length + 1,
};
