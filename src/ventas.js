const TASAS_IMPUESTO_POR_ESTADO = {
    CA: 0.0825,
    UT: 0.0665,
    NV: 0.08,
    TX: 0.0625,
    AL: 0.04,
};

const ESTADOS_DISPONIBLES = ['CA', 'UT', 'NV', 'TX', 'AL'];
const ESTADO_POR_DEFECTO = 'CA';

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
        const tramos = [
            { minimo: 3000, tasa: 0.05 },
            { minimo: 1000, tasa: 0.03 },
        ];
        const tramo = tramos.find(t => precioNeto >= t.minimo);
        const tasa = tramo ? tramo.tasa : 0;
        return precioNeto * tasa;
    }
}
export default Ventas;