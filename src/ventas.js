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
    calcularImpuestoCategoria(precioNeto, categoria) {
        const tasa = CATEGORIAS_IMPUESTO_ADICIONAL[categoria];
        return Math.round(precioNeto * tasa);
    }
}
export default Ventas;