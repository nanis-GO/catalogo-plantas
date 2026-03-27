// src/main.js
// [Criterios Arquitectura] Implementación de módulos ES (import/export)
import { categoriasUnicas } from './data.js';
import { obtenerInventario, guardarInventario, descontarStock, calcularResumen } from './logic.js';
import './style.css'; // Importamos el CSS para que Vite lo cargue

// --- ESTADO DE LA APLICACIÓN ---
// Obtenemos los datos persistentes de localStorage [Paso 34]
let inventarioActual = obtenerInventario();
let filtroActivo = "Todas"; // Filtro inicial


// --- REFERENCIAS A ELEMENTOS DEL DOM ---
const selectFiltro = document.getElementById('filtroCategoria');
const catalogGrid = document.getElementById('catalogGrid');
const resumenTotalUnicos = document.getElementById('resumenTotalUnicos');
const resumenTotalUnidades = document.getElementById('resumenTotalUnidades');
const resumenValorTotal = document.getElementById('resumenValorTotal');
const resumenCategoriasTexto = document.getElementById('resumenCategorias');
const messageBox = document.getElementById('validationMessage');


// --- FUNCIONES DE RENDERIZADO (UI) ---

// Función para inicializar el control de filtro select [Paso 14]
function poblarFiltro() {
    categoriasUnicas.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        selectFiltro.appendChild(option);
    });
}

// Función para mostrar mensajes de validación [Paso 54]
function mostrarMensaje(texto, tipo = 'error') {
    messageBox.textContent = texto;
    messageBox.className = `validation-message ${tipo}`;
    
    // Ocultar automáticamente después de 3 segundos
    setTimeout(() => {
        messageBox.classList.add('hidden');
    }, 3000);
}

// Función para renderizar el resumen actualizado [Paso 24]
function renderizarResumen() {
    const resumen = calcularResumen(inventarioActual);
    
    resumenTotalUnicos.textContent = resumen.totalProductosUnicos;
    resumenTotalUnidades.textContent = resumen.totalUnidades;
    resumenValorTotal.textContent = resumen.valorTotal;
    resumenCategoriasTexto.textContent = resumen.conteoPorCategoriaTexto;
}

// Función para renderizar el catálogo filtrado y actualizado
function renderizarCatalogo() {
    // 1. Limpiar el grid actual
    catalogGrid.innerHTML = '';

    // 2. Aplicar Filtro usando SWITCH [Paso 12, 19]
    // [Criterios]: Uso real de switch para el filtro
    let productosFiltrados;
    
    switch (filtroActivo) {
        case "Todas": // [Paso 16] "Todas"
            productosFiltrados = inventarioActual;
            break;
        
        // [Paso 18] Una categoría específica. 
        // El 'switch' nos sirve para controlar casos especiales de categorías si quisiéramos.
        // Por defecto, asumimos que cualquier otra cosa es una categoría específica.
        default: 
            productosFiltrados = inventarioActual.filter(p => p.categoria === filtroActivo);
            break;
    }

    // 3. Crear HTML para cada producto [Paso 20, 21]
    productosFiltrados.forEach(planta => {
        const plantCardHTML = `
            <div class="plant-card" data-id="${planta.id}">
                <div class="plant-image-container">
                    <img src="${planta.imageUrl}" alt="${planta.nombre}">
                </div>
                
                <div class="card-dark card-content">
                    <p class="plant-category">${planta.categoria}</p>
                    <h3 class="plant-name">${planta.nombre}</h3>
                    
                    <p class="plant-price">Rs. ${planta.precio.toFixed(2)}/-</p>
                    <p class="plant-stock">Stock: <span class="stock-value">${planta.stock}</span> unidades</p>
                    
                    <div class="card-action-container">
                        <button class="btn-vender" ${planta.stock === 0 ? 'disabled' : ''}>
                           ${planta.stock === 0 ? 'Sin Stock' : 'Vender'}
                        </button>
                    </div>
                </div>
            </div>
        `;
        catalogGrid.insertAdjacentHTML('beforeend', plantCardHTML);
    });
}


// --- GESTIÓN DE EVENTOS ---

// 1. Evento para cambiar el filtro [Paso 12]
selectFiltro.addEventListener('change', (e) => {
    filtroActivo = e.target.value;
    renderizarCatalogo(); // Re-renderizar con el nuevo filtro aplicado [Paso 53]
});

// 2. Evento para la acción "Vender" (Event Delegation en el Grid) [Paso 20]
catalogGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-vender')) {
        // Obtener el ID del producto de la tarjeta padre
        const plantCardElement = e.target.closest('.plant-card');
        const idProductoClickado = parseInt(plantCardElement.getAttribute('data-id'));
        
        // Buscar el producto en el inventario actual (para la validación)
        const productoActual = inventarioActual.find(p => p.id === idProductoClickado);

        // [Paso 22] Validación con if/else que el stock no quede negativo.
        // [Criterios]: Uso real de if/else para validación de la acción.
        if (productoActual.stock > 0) {
            // [Criterios]: Uso real de actualización inmutable.
            // Actualizamos inmutablemente usando la función lógica (map+spread)
            inventarioActual = descontarStock(inventarioActual, idProductoClickado);
            
            // [Paso 33] Guardar el inventario en localStorage tras el cambio
            guardarInventario(inventarioActual);
            
            // Re-renderizar UI completa (catálogo y resumen [Paso 24]) [Paso 54]
            renderizarCatalogo();
            renderizarResumen();
            mostrarMensaje(`¡Vendida una unidad de ${productoActual.nombre}!`, 'success');

        } else {
            // Regla equivalente: No permitir vender si el stock es cero.
            mostrarMensaje(`Error: No hay stock suficiente de ${productoActual.nombre}.`, 'error');
            // Nota: El botón ya está deshabilitado visualmente, pero esta es la validación lógica.
        }
    }
});


// --- ARRANQUE DE LA APLICACIÓN ---
// [Criterios Arquitectura] Separando lógica y arranque

function inicializarApp() {
    poblarFiltro();
    renderizarResumen();  // Render inicial del resumen [Paso 52]
    renderizarCatalogo(); // Render inicial del catálogo completo [Paso 52]
}

inicializarApp();