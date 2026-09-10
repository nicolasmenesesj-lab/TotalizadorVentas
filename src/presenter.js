import Ventas from './ventas.js';

const ventas = new Ventas();

const cantidadInput = document.getElementById('cantidad-item');
const precioInput = document.getElementById('precio-item');
const estadoSelect = document.getElementById('estado');
const categoriaSelect = document.getElementById('categoria');
const tipoClienteSelect = document.getElementById('tipo-cliente');
const pesoInput = document.getElementById('peso-volumetrico');
const totalizarBtn = document.getElementById('totalizar-btn');
const cancelarBtn = document.getElementById('cancelar-btn');
const resultadoTabla = document.getElementById('resultado-tabla');

function llenarSelect(select, opciones, valorPorDefecto) {
    select.innerHTML = '';
    opciones.forEach((opcion) => {
        const option = document.createElement('option');
        option.value = opcion;
        option.textContent = opcion;
        if (opcion === valorPorDefecto) {
            option.selected = true;
        }
        select.appendChild(option);
    });
}

function inicializarSelects() {
    llenarSelect(estadoSelect, ventas.listarEstados(), ventas.getEstadoPorDefecto());
    llenarSelect(categoriaSelect, ventas.listarCategorias(), ventas.getCategoriaPorDefecto());
    llenarSelect(tipoClienteSelect, ventas.listarTiposCliente(), ventas.getTipoClientePorDefecto());
}

function leerDatosFormulario() {
    return {
        cantidad: Number(cantidadInput.value),
        precio: Number(precioInput.value),
        estado: estadoSelect.value,
        categoria: categoriaSelect.value,
        tipoCliente: tipoClienteSelect.value,
        pesoVolumetrico: Number(pesoInput.value),
    };
}

function fila(texto, valor, resaltado) {
    return `<tr class="${resaltado ? 'fila-total' : ''}"><td>${texto}</td><td>${valor}</td></tr>`;
}

function renderizarDetalle(datos, detalle) {
    resultadoTabla.innerHTML =
        fila(`Precio neto (${datos.cantidad}*$${datos.precio}):`, `$${detalle.precioNeto.toFixed(2)}`) +
        fila('Descuento por monto de la orden:', `-$${detalle.descuentoTramo.toFixed(2)}`) +
        fila(`Descuento categoria (${datos.categoria}):`, `-$${detalle.descuentoCategoria.toFixed(2)}`) +
        fila(`Descuento fijo (${datos.tipoCliente}):`, `-$${detalle.descuentoFijo.toFixed(2)}`) +
        fila(`Impuesto estado (${datos.estado}):`, `+$${detalle.impuestoEstado.toFixed(2)}`) +
        fila(`Impuesto categoria (${datos.categoria}):`, `+$${detalle.impuestoCategoria.toFixed(2)}`) +
        fila(`Costo de envio (peso ${datos.pesoVolumetrico}):`, `+$${detalle.costoEnvio.toFixed(2)}`) +
        fila(`Descuento en envio (${datos.tipoCliente}):`, `-$${detalle.descuentoEnvio.toFixed(2)}`) +
        fila('Precio total:', `$${detalle.precioTotal.toFixed(2)}`, true);
}

function renderizarError(mensaje) {
    resultadoTabla.innerHTML = `<tr><td colspan="2" class="error-texto">${mensaje}</td></tr>`;
}

function renderizarCancelado() {
    resultadoTabla.innerHTML = `<tr><td colspan="2">Compra cancelada</td></tr>`;
}

totalizarBtn.addEventListener('click', () => {
    const datos = leerDatosFormulario();
    try {
        const resultado = ventas.confirmarCompra(datos);
        renderizarDetalle(datos, resultado.detalle);
    } catch (error) {
        renderizarError(error.message);
    }
});

cancelarBtn.addEventListener('click', () => {
    cantidadInput.value = '';
    precioInput.value = '';
    pesoInput.value = '';
    inicializarSelects();
    ventas.cancelarCompra();
    renderizarCancelado();
});

inicializarSelects();
