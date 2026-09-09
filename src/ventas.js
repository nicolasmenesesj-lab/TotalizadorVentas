
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
    const tasasPorEstado = {
        CA: 0.0825,
    };
    const tasa = tasasPorEstado[estado];
    return precioNeto * tasa;
    }
}
export default Ventas;