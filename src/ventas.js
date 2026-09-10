const TASAS_IMPUESTO_POR_ESTADO = {
    CA: 0.0825,
    UT: 0.0665,
    NV: 0.08,
    TX: 0.0625,
    AL: 0.04,
};

const ESTADOS_DISPONIBLES = ['CA', 'UT', 'NV', 'TX', 'AL'];
const ESTADO_POR_DEFECTO = 'CA';

const TRAMOS_DESCUENTO = [
    { minimo: 30000, tasa: 0.15 },
    { minimo: 10000, tasa: 0.10 },
    { minimo: 7000, tasa: 0.07 },
    { minimo: 3000, tasa: 0.05 },
    { minimo: 1000, tasa: 0.03 },
];

const CATEGORIAS_IMPUESTO_ADICIONAL = {
    Alimentos: 0,
    'Bebidas alcoholicas': 0.07,
    'Material de escritorio': 0,
    Muebles: 0.03,
    Electronicos: 0.04,
    Vestimenta: 0.02,
    Varios: 0,
};

const CATEGORIAS_DISPONIBLES = [
    'Alimentos', 'Bebidas alcoholicas', 'Material de escritorio',
    'Muebles', 'Electronicos', 'Vestimenta', 'Varios',
];
const CATEGORIA_POR_DEFECTO = 'Varios';


const CATEGORIAS_DESCUENTO_ADICIONAL = {
    Alimentos: 0.02,
    'Material de escritorio': 0.015,
    Electronicos: 0.01,
};

const RANGOS_ENVIO = [
    { maximo: 10, costo: 0 },
    { maximo: 20, costo: 3.5 },
    { maximo: 40, costo: 5 },
    { maximo: 80, costo: 6 },
    { maximo: 100, costo: 6.5 },
    { maximo: 200, costo: 8 },
    { maximo: Infinity, costo: 9 },
];

const TIPOS_CLIENTE_DISPONIBLES = ['Normal', 'Recurrente', 'Antiguo Recurrente', 'Especial'];
const TIPO_CLIENTE_POR_DEFECTO = 'Normal';

const DESCUENTO_ENVIO_POR_TIPO_CLIENTE = {
    Recurrente: 0.005,
    'Antiguo Recurrente': 0.01,
    Especial: 0.015,
};

class Ventas {
    getCantidad(cantidad) {
        return cantidad;
    }
    getPrecio(precio) {
        return precio;
    }
    calcularPrecioNeto(cantidad, precio) {
        return cantidad * precio;
    }
    calcularImpuesto(precioNeto, estado) {
        const tasa = TASAS_IMPUESTO_POR_ESTADO[estado];
        return precioNeto * tasa;
    }
    listarEstados() {
        return ESTADOS_DISPONIBLES;
    }
    getEstadoPorDefecto() {
        return ESTADO_POR_DEFECTO;
    }
    calcularDescuento(precioNeto) {
    if (precioNeto >= 1000) {
        return precioNeto * 0.03;
    }
    return 0;
    }
    calcularDescuento(precioNeto) {
        const tramo = TRAMOS_DESCUENTO.find(t => precioNeto >= t.minimo);
        const tasa = tramo ? tramo.tasa : 0;
        return Math.round(precioNeto * tasa);
    }
    calcularPrecioTotal(cantidad, precio, estado) {
        const precioNeto = this.calcularPrecioNeto(cantidad, precio);
        const descuento = this.calcularDescuento(precioNeto);
        const impuesto = this.calcularImpuesto(precioNeto, estado);
        return precioNeto - descuento + impuesto;
    }
    listarCategorias() {
        return CATEGORIAS_DISPONIBLES;
    }
    getCategoriaPorDefecto() {
        return CATEGORIA_POR_DEFECTO;
    }
    calcularImpuestoCategoria(precioNeto, categoria) {
        const tasa = CATEGORIAS_IMPUESTO_ADICIONAL[categoria];
        return Math.round(precioNeto * tasa);
    }
    calcularDescuentoCategoria(precioNeto, categoria) {
        const tasa = CATEGORIAS_DESCUENTO_ADICIONAL[categoria] || 0;
        return precioNeto * tasa;
    }
    calcularCostoEnvioPorUnidad(pesoVolumetrico) {
        const rango = RANGOS_ENVIO.find(r => pesoVolumetrico <= r.maximo);
        return rango.costo;
    }
    calcularCostoEnvioTotal(cantidad, pesoVolumetrico) {
        const costoPorUnidad = this.calcularCostoEnvioPorUnidad(pesoVolumetrico);
        return cantidad * costoPorUnidad;
    }
    listarTiposCliente() {
        return TIPOS_CLIENTE_DISPONIBLES;
    }
    getTipoClientePorDefecto() {
        return TIPO_CLIENTE_POR_DEFECTO;
    }
    calcularDescuentoEnvio(costoEnvioTotal, tipoCliente) {
        const tasa = DESCUENTO_ENVIO_POR_TIPO_CLIENTE[tipoCliente] || 0;
        return costoEnvioTotal * tasa;
    }
    calcularDescuentoFijo(tipoCliente, categoria, precioNeto) {
    if (tipoCliente === 'Recurrente' && categoria === 'Alimentos' && precioNeto > 3000) {
        return 100;
    }
    if (tipoCliente === 'Especial' && categoria === 'Electronicos' && precioNeto > 7000) {
        return 200;
    }
    return 0;
    }
    calcularPrecioTotalCompleto(datos) {
        return this.obtenerDetalleCalculo(datos).precioTotal;
    }
    obtenerDetalleCalculo({ cantidad, precio, estado, categoria, tipoCliente, pesoVolumetrico }) {
        const precioNeto = this.calcularPrecioNeto(cantidad, precio);

        const descuentoTramo = this.calcularDescuento(precioNeto);
        const descuentoCategoria = this.calcularDescuentoCategoria(precioNeto, categoria);
        const descuentoFijo = this.calcularDescuentoFijo(tipoCliente, categoria, precioNeto);
        const descuentoTotal = descuentoTramo + descuentoCategoria + descuentoFijo;

        const impuestoEstado = this.calcularImpuesto(precioNeto, estado);
        const impuestoCategoria = this.calcularImpuestoCategoria(precioNeto, categoria);
        const impuestoTotal = impuestoEstado + impuestoCategoria;

        const costoEnvio = this.calcularCostoEnvioTotal(cantidad, pesoVolumetrico);
        const descuentoEnvio = this.calcularDescuentoEnvio(costoEnvio, tipoCliente);
        const envioTotal = costoEnvio - descuentoEnvio;

        const precioTotal = precioNeto - descuentoTotal + impuestoTotal + envioTotal;

        return {
            precioNeto, descuentoTramo, descuentoCategoria, descuentoFijo, descuentoTotal,
            impuestoEstado, impuestoCategoria, impuestoTotal,
            costoEnvio, descuentoEnvio, envioTotal, precioTotal,
        };
    }
    formatearPorcentaje(tasa) {
        return `${(tasa * 100).toFixed(2).replace(/\.?0+$/, '')}%`;
    }
    validarCantidad(cantidad) {
        if (cantidad <= 0) {
            throw new Error('La cantidad debe ser mayor a cero');
        }
        return true;
    }
    validarPrecio(precio) {
        if (precio <= 0) {
            throw new Error('El precio debe ser mayor a cero');
        }
        return true;
    }
}
export default Ventas;