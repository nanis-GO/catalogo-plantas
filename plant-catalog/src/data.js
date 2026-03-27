// src/data.js
// [Paso 9] Arreglo de objetos para representar productos.
// [Paso 10] Cada producto incluye: id, nombre, categoría, precio, stock.
export const productosIniciales = [
    {
        id: 101,
        nombre: "Monstera Deliciosa",
        categoria: "Interiores",
        precio: 309.00,
        stock: 5,
        imageUrl: "https://i.pinimg.com/1200x/cb/68/a2/cb68a20cdb904bd8a4efac04e52d77de.jpg" // Imagen de ejemplo
    },
    {
        id: 102,
        nombre: "Haworthia Cooperi",
        categoria: "Escritorio",
        precio: 359.00,
        stock: 12,
        imageUrl: "https://i.pinimg.com/1200x/55/ad/69/55ad69ff0857ada9ae7920b063af5711.jpg"
    },
    {
        id: 103,
        nombre: "Medinilla Magnifica",
        categoria: "Exóticas",
        precio: 399.00,
        stock: 3,
        imageUrl: "https://i.pinimg.com/1200x/4b/b2/6b/4bb26b3ec72ec21f6800d2d0a008e07d.jpg"
    },
    {
        id: 104,
        nombre: "Calathea Orbifolia",
        categoria: "Interiores",
        precio: 259.00,
        stock: 0, // Sin stock para probar validaciones
        imageUrl: "https://i.pinimg.com/736x/f2/d0/74/f2d074ee9355c827774c93189d352906.jpg"
    },
    {
        id: 105,
        nombre: "Maranta Leuconeura",
        categoria: "Decorativas",
        precio: 759.00,
        stock: 8,
        imageUrl: "https://i.pinimg.com/1200x/ad/8b/6a/ad8b6aece86d3ea51456a116db143d3f.jpg"
    },
    {
        id: 106,
        nombre: "Alocasia Polly",
        categoria: "Interiores",
        precio: 659.00,
        stock: 15,
        imageUrl: "https://i.pinimg.com/1200x/68/a9/3a/68a93a30ef95803cd5d3d229f3324308.jpg"
    },
        {
        id: 106,
        nombre: "Ceropegia Woodii",
        categoria: "Decorativas",
        precio: 659.00,
        stock: 15,
        imageUrl: "https://i.pinimg.com/736x/dd/b0/b9/ddb0b910f253eb7571d04dd73c24f864.jpg"
    },
        {
        id: 106,
        nombre: "Trachyandra Tortilis",
        categoria: "Exóticas",
        precio: 659.00,
        stock: 15,
        imageUrl: "https://i.pinimg.com/736x/c7/21/4e/c7214e508532b3e413a5c530e1681726.jpg"
    },
        {
        id: 106,
        nombre: "Peperomia Watermelon",
        categoria: "Escritorio",
        precio: 659.00,
        stock: 15,
        imageUrl: "https://i.pinimg.com/1200x/a1/ed/92/a1ed92ba4a78bdb8f652bd4da425b247.jpg"
    },
    {
        id: 106,
        nombre: "Dionaea Muscipula",
        categoria: "Exóticas",
        precio: 659.00,
        stock: 15,
        imageUrl: "https://i.pinimg.com/1200x/5d/55/cc/5d55ccb7f92e4ee74d646b7fda7a875a.jpg"
    }
];

// Generar lista única de categorías para el filtro
export const categoriasUnicas = ["Todas", ...new Set(productosIniciales.map(p => p.categoria))];