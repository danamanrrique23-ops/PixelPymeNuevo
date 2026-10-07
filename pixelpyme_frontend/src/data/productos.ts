export interface Producto {
  id_producto: number;
  nombre: string;
  descripcion: string;
  marca: string;
  caracteristicas: string;
  imagen: string;
  imagenes: string[];
  cantidad: number;
  estado: "disponible" | "reservado" | "vendido";
  nombre_categoria: string;
}

export const productos: Producto[] = [
  { id_producto: 1, nombre: "Sala", descripcion: "Sala en L , 3 sofas", marca: "Muebles JR", caracteristicas: "Tela antirrasguños , color azul oscuro", imagen: "/img/sala.jpeg", imagenes: ["/img/sala.jpeg"], cantidad: 2, estado: "disponible", nombre_categoria: "Muebles" },
  { id_producto: 2, nombre: "Ropero", descripcion: "Ropero 3 puertas con cajones", marca: "Muebles JR", caracteristicas: "Alto 2 metros, Ancho 1.50 metros, Color caramelo (acabado caoba), Material MDF enchapado en melamina, 3 cuerpos con puertas, 2 puertas inferiores, 4 cajones, Cerradura con llave en las puertas laterales, Barras para colgar ropa, Repisas internas, Caja de seguridad interna, Manijas metálicas", imagen: "/img/ropero.jpeg", imagenes: ["/img/closert1.1.jpeg" ,"/img/ropero.jpeg "], cantidad: 0, estado: "disponible", nombre_categoria: "Muebles" },
  { id_producto: 3, nombre: "Nevera", descripcion: "Nevera no frost 400L", marca: "LG", caracteristicas: "Dispensador de agua , 2 puertas, color gris , marca LG", imagen: "/img/nevera.jpg", imagenes: ["/img/nevera.jpg"], cantidad: 1, estado: "reservado", nombre_categoria: "Electrodomésticos" },
  { id_producto: 4, nombre: "Estufa", descripcion: "Estufa a gas 4 puestos", marca: "Haceb", caracteristicas: "Encendido eléctrico, color negra, con horno y gratinador, con vidrio templado", imagen: "/img/estufa.jpg", imagenes: ["/img/estufa.jpg"], cantidad: 3, estado: "disponible", nombre_categoria: "Electrodomésticos" },
  { id_producto: 5, nombre: "Comedor", descripcion: "Comedor de 6 puestos en cedro", marca: "Maderas del Norte", caracteristicas: "Madera de cedro, color caramelo, tapizado de las sillas en cuerotex", imagen: "/img/comedor.jpg", imagenes: ["/img/comedor.jpg"], cantidad: 1, estado: "disponible", nombre_categoria: "Muebles" },
  { id_producto: 6, nombre: "Lavadora", descripcion: "Lavadora 18kg carga superior", marca: "Whirlpool", caracteristicas: "automatica, color gris, de 40 libras, con una garantia de 1 año", imagen: "/img/lavadora.jpg", imagenes: ["/img/lavadora.jpg"], cantidad: 2, estado: "disponible", nombre_categoria: "Electrodomésticos" },
  { id_producto: 7, nombre: "Licuadora", descripcion: "Licuadora de vaso de vidrio, 3 velocidades", marca: "Oster", caracteristicas: "Vaso de vidrio 1.5L", imagen: "/img/licuadora.jpg", imagenes: ["/img/licuadora.jpg"], cantidad: 5, estado: "disponible", nombre_categoria: "Utensilios de cocina" },
  { id_producto: 8, nombre: "Sanduchera", descripcion: "Sanduchera antiadherente 2 puestos", marca: "Oster", caracteristicas: "Placas antiadherentes", imagen: "/img/sanduchera.jpg", imagenes: ["/img/sanduchera.jpg"], cantidad: 4, estado: "disponible", nombre_categoria: "Utensilios de cocina" },
  { id_producto: 9, nombre: "Olla exprés", descripcion: "Olla a presión 7 litros", marca: "Imusa", caracteristicas: "Capacidad 7L", imagen: "/img/olla-expres.jpg", imagenes: ["/img/olla-expres.jpg"], cantidad: 3, estado: "disponible", nombre_categoria: "Utensilios de cocina" },
];