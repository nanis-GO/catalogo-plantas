// src/logic.js
import { productosIniciales } from './data.js';

// Nombre de la clave para localStorage
const STORAGE_KEY = 'plantInventoryData';

// [Paso 32, 33] Guardar el inventario en localStorage usando JSON.
export function guardarInventario(inventario) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inventario));
}

// [Paso 34] Al recargar, la app debe conservar el estado.
export function obtenerInventario() {
    const datosGuardados = localStorage.getItem(STORAGE_KEY);
    // Si hay datos, los cargamos; si no, cargamos los datos iniciales y los guardamos
    if (datosGuardados) {
        return JSON.parse(datosGuardados);
    } else {
        guardarInventario(productosIniciales);
        return productosIniciales;
    }
}

// [Paso 23] Actualización inmutable: Usar map y spread.
export function descontarStock(inventario, idProducto) {
    return inventario.map(p => {
        if (p.id === idProducto) {
            // [Paso 22] Validación con if/else (se delega al componente UI pero esta es la lógica de datos)
            if (p.stock > 0) {
                // Devolvemos un NUEVO objeto con el stock actualizado, sin mutar el original
                return { ...p, stock: p.stock - 1 };
            }
            // Si no hay stock, devolvemos el objeto sin cambios (el control se hará en la UI)
            return p;
        }
        return p; // Devolvemos el resto de productos sin cambios
    });
}

// [Paso 24, 25] Resumen actualizado automáticamente.
export function calcularResumen(inventario) {
    // [Paso 26] Total de productos (conteo de tipos únicos)
    const totalProductosUnicos = inventario.length;

    // [Paso 27] Total de unidades (sumatoria de stock)
    const totalUnidades = inventario.reduce((sum, p) => sum + p.stock, 0);

    // [Paso 28] Valor total (precio * stock acumulado)
    const valorTotal = inventario.reduce((sum, p) => sum + (p.precio * p.stock), 0);

    // [Paso 29] Conteo por categoría (texto generado con Object.entries)
    const conteoCategorias = inventario.reduce((conteo, p) => {
        conteo[p.categoria] = (conteo[p.categoria] || 0) + 1;
        return conteo;
    }, {});

    const listaConteoTexto = Object.entries(conteoCategorias)
        .map(([categoria, cantidad]) => `${categoria}: ${cantidad}`)
        .join(", ");

    return {
        totalProductosUnicos,
        totalUnidades,
        valorTotal: valorTotal.toFixed(2), // Formatear a dos decimales
        conteoPorCategoriaTexto: listaConteoTexto
    };
}