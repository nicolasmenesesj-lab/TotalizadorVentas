import Ventas from './ventas.js';

describe('Ventas', () => {
    it('deberia mostrar la cantidad de items ingresada', () => {
        const ventas = new Ventas();
        expect(ventas.getCantidad(20)).toEqual(20);
    });
    it('deberia mostrar el precio por item ingresado', () => {
        const ventas = new Ventas();
        expect(ventas.getPrecio(5)).toEqual(5);
    });
    it('deberia mostrar el precio neto', () => {
        const ventas = new Ventas();
        expect(ventas.calcularPrecioNeto(3, 5)).toEqual(15);
    });
    it('deberia calcular el impuesto para el estado CA (8.25%)', () => {
        const ventas = new Ventas();
        expect(ventas.calcularImpuesto(100, 'CA')).toEqual(8.25);
    });
    it('deberia calcular el impuesto para el estado UT (6.65%)', () => {
        const ventas = new Ventas();
        expect(ventas.calcularImpuesto(100, 'UT')).toEqual(6.65);
    });
    it('deberia calcular el impuesto para el estado NV (8.00%)', () => {
        const ventas = new Ventas();
        expect(ventas.calcularImpuesto(100, 'NV')).toEqual(8.00);
    });
    it('deberia calcular el impuesto para el estado TX (6.25%)', () => {
        const ventas = new Ventas();
        expect(ventas.calcularImpuesto(100, 'TX')).toEqual(6.25);
    });
    it('deberia calcular el impuesto para el estado AL (4.00%)', () => {
        const ventas = new Ventas();
        expect(ventas.calcularImpuesto(100, 'AL')).toEqual(4.00);
    });
    it('deberia listar los estados disponibles', () => {
        const ventas = new Ventas();
        expect(ventas.listarEstados()).toEqual(['CA', 'UT', 'NV', 'TX', 'AL']);
    });
    it('el estado por defecto deberia ser CA', () => {
        const ventas = new Ventas();
        expect(ventas.getEstadoPorDefecto()).toEqual('CA');
    });
    it('deberia aplicar 3% de descuento cuando el total es 1000', () => {
        const ventas = new Ventas();
        expect(ventas.calcularDescuento(1000)).toEqual(30);
    });
    it('deberia aplicar 5% de descuento cuando el total es 3000', () => {
        const ventas = new Ventas();
        expect(ventas.calcularDescuento(3000)).toEqual(150);
    });
    it('deberia aplicar 7% de descuento cuando el total es 7000', () => {
        const ventas = new Ventas();
        expect(ventas.calcularDescuento(7000)).toEqual(490);
    });
    it('deberia aplicar 10% de descuento cuando el total es 10000', () => {
        const ventas = new Ventas();
        expect(ventas.calcularDescuento(10000)).toEqual(1000);
    });
    it('deberia aplicar 15% de descuento cuando el total es 30000', () => {
        const ventas = new Ventas();
        expect(ventas.calcularDescuento(30000)).toEqual(4500);
    });
    it('deberia calcular el precio total con descuento e impuesto', () => {
        const ventas = new Ventas();
        expect(ventas.calcularPrecioTotal(20, 3, 'TX')).toEqual(63.75);
    });
    it('deberia calcular 0% de impuesto adicional para la categoria Alimentos', () => {
        const ventas = new Ventas();
        expect(ventas.calcularImpuestoCategoria(100, 'Alimentos')).toEqual(0);
    });
    it('deberia calcular 7% de impuesto adicional para la categoria Bebidas alcoholicas', () => {
        const ventas = new Ventas();
        expect(ventas.calcularImpuestoCategoria(100, 'Bebidas alcoholicas')).toEqual(7);
    });
    it('deberia calcular 0% de impuesto adicional para la categoria Material de escritorio', () => {
        const ventas = new Ventas();
        expect(ventas.calcularImpuestoCategoria(100, 'Material de escritorio')).toEqual(0);
    });
    it('deberia calcular 3% de impuesto adicional para la categoria Muebles', () => {
        const ventas = new Ventas();
        expect(ventas.calcularImpuestoCategoria(100, 'Muebles')).toEqual(3);
    });
    it('deberia calcular 4% de impuesto adicional para la categoria Electronicos', () => {
        const ventas = new Ventas();
        expect(ventas.calcularImpuestoCategoria(100, 'Electronicos')).toEqual(4);
    });
    it('deberia calcular 2% de impuesto adicional para la categoria Vestimenta', () => {
        const ventas = new Ventas();
        expect(ventas.calcularImpuestoCategoria(100, 'Vestimenta')).toEqual(2);
    });
    it('deberia calcular 0% de impuesto adicional para la categoria Varios', () => {
        const ventas = new Ventas();
        expect(ventas.calcularImpuestoCategoria(100, 'Varios')).toEqual(0);
    });
    it('deberia listar las categorias disponibles', () => {
        const ventas = new Ventas();
        expect(ventas.listarCategorias()).toEqual([
            'Alimentos', 'Bebidas alcoholicas', 'Material de escritorio',
            'Muebles', 'Electronicos', 'Vestimenta', 'Varios',
        ]);
    });
    it('la categoria por defecto deberia ser Varios', () => {
        const ventas = new Ventas();
        expect(ventas.getCategoriaPorDefecto()).toEqual('Varios');
    });
    it('deberia aplicar 2% de descuento adicional para la categoria Alimentos', () => {
        const ventas = new Ventas();
        expect(ventas.calcularDescuentoCategoria(100, 'Alimentos')).toEqual(2);
    });
    it('deberia aplicar 1.5% de descuento adicional para la categoria Material de escritorio', () => {
        const ventas = new Ventas();
        expect(ventas.calcularDescuentoCategoria(100, 'Material de escritorio')).toEqual(1.5);
    });
    it('deberia aplicar 1% de descuento adicional para la categoria Electronicos', () => {
        const ventas = new Ventas();
        expect(ventas.calcularDescuentoCategoria(100, 'Electronicos')).toEqual(1);
    });
    it('deberia costar $0 el envio por unidad cuando el peso volumetrico es 5 (rango 0-10)', () => {
        const ventas = new Ventas();
        expect(ventas.calcularCostoEnvioPorUnidad(5)).toEqual(0);
    });
    it('deberia costar $3.5 el envio por unidad cuando el peso volumetrico es 15 (rango 11-20)', () => {
        const ventas = new Ventas();
        expect(ventas.calcularCostoEnvioPorUnidad(15)).toEqual(3.5);
    });
    it('deberia costar $5 el envio por unidad cuando el peso volumetrico es 30 (rango 21-40)', () => {
        const ventas = new Ventas();
        expect(ventas.calcularCostoEnvioPorUnidad(30)).toEqual(5);
    });
    it('deberia costar $6 el envio por unidad cuando el peso volumetrico es 60 (rango 41-80)', () => {
        const ventas = new Ventas();
        expect(ventas.calcularCostoEnvioPorUnidad(60)).toEqual(6);
    });
    it('deberia costar $6.5 el envio por unidad cuando el peso volumetrico es 90 (rango 80-100)', () => {
        const ventas = new Ventas();
        expect(ventas.calcularCostoEnvioPorUnidad(90)).toEqual(6.5);
    });
    it('deberia costar $8 el envio por unidad cuando el peso volumetrico es 150 (rango 101-200)', () => {
        const ventas = new Ventas();
        expect(ventas.calcularCostoEnvioPorUnidad(150)).toEqual(8);
    });
    it('deberia costar $9 el envio por unidad cuando el peso volumetrico es 250 (mayor a 200)', () => {
        const ventas = new Ventas();
        expect(ventas.calcularCostoEnvioPorUnidad(250)).toEqual(9);
    });
    it('deberia calcular el costo de envio total multiplicando por la cantidad', () => {
        const ventas = new Ventas();
        // cantidad 20, peso volumetrico 15 (rango 11-20 => $3.5 por unidad)
        expect(ventas.calcularCostoEnvioTotal(20, 15)).toEqual(70);
    });
    it('deberia listar los tipos de cliente disponibles', () => {
        const ventas = new Ventas();
        expect(ventas.listarTiposCliente()).toEqual([
            'Normal', 'Recurrente', 'Antiguo Recurrente', 'Especial',
        ]);
    });

    it('el tipo de cliente por defecto deberia ser Normal', () => {
        const ventas = new Ventas();
        expect(ventas.getTipoClientePorDefecto()).toEqual('Normal');
    });
    it('deberia aplicar 0.5% de descuento en envio para cliente Recurrente', () => {
        const ventas = new Ventas();
        expect(ventas.calcularDescuentoEnvio(100, 'Recurrente')).toEqual(0.5);
    });
    it('deberia aplicar 1% de descuento en envio para cliente Antiguo Recurrente', () => {
        const ventas = new Ventas();
        expect(ventas.calcularDescuentoEnvio(100, 'Antiguo Recurrente')).toEqual(1);
    });
    it('deberia aplicar 1.5% de descuento en envio para cliente Especial', () => {
        const ventas = new Ventas();
        expect(ventas.calcularDescuentoEnvio(100, 'Especial')).toEqual(1.5);
    });
    it('deberia aplicar $100 de descuento fijo para cliente Recurrente con Alimentos y neto mayor a 3000', () => {
        const ventas = new Ventas();
        expect(ventas.calcularDescuentoFijo('Recurrente', 'Alimentos', 3500)).toEqual(100);
    });
    it('deberia aplicar $200 de descuento fijo para cliente Especial con Electronicos y neto mayor a 7000', () => {
        const ventas = new Ventas();
        expect(ventas.calcularDescuentoFijo('Especial', 'Electronicos', 8000)).toEqual(200);
    });
    it('deberia calcular el precio total completo integrando descuento, impuesto, envio y descuentos fijos', () => {
        const ventas = new Ventas();
        const resultado = ventas.calcularPrecioTotalCompleto({
            cantidad: 20,
            precio: 3,
            estado: 'TX',
            categoria: 'Varios',
            tipoCliente: 'Normal',
            pesoVolumetrico: 15,
        });
        // precioNeto = 60 (sin tramo de descuento)
        // impuesto TX = 60 * 0.0625 = 3.75, impuesto categoria Varios = 0
        // envio: 20 unidades * $3.5 (rango 11-20) = 70, sin descuento (cliente Normal)
        // total = 60 - 0 + 3.75 + 70 = 133.75
        expect(resultado).toEqual(133.75);
    });
    it('deberia mostrar el detalle completo del calculo', () => {
        const ventas = new Ventas();
        const detalle = ventas.obtenerDetalleCalculo({
            cantidad: 20,
            precio: 3,
            estado: 'TX',
            categoria: 'Varios',
            tipoCliente: 'Normal',
            pesoVolumetrico: 15,
        });
        expect(detalle).toEqual({
            precioNeto: 60,
            descuentoTramo: 0,
            descuentoCategoria: 0,
            descuentoFijo: 0,
            descuentoTotal: 0,
            impuestoEstado: 3.75,
            impuestoCategoria: 0,
            impuestoTotal: 3.75,
            costoEnvio: 70,
            descuentoEnvio: 0,
            envioTotal: 70,
            precioTotal: 133.75,
        });
    });
    it('deberia formatear una tasa como porcentaje con simbolo %', () => {
        const ventas = new Ventas();
        expect(ventas.formatearPorcentaje(0.0625)).toEqual('6.25%');
    });
    it('deberia lanzar un error si la cantidad es cero o negativa', () => {
        const ventas = new Ventas();
        expect(() => ventas.validarCantidad(0)).toThrow('La cantidad debe ser mayor a cero');
        expect(() => ventas.validarCantidad(-5)).toThrow('La cantidad debe ser mayor a cero');
    });

    it('no deberia lanzar error si la cantidad es valida', () => {
        const ventas = new Ventas();
        expect(() => ventas.validarCantidad(20)).not.toThrow();
    });

    it('deberia lanzar un error si el precio es cero o negativo', () => {
        const ventas = new Ventas();
        expect(() => ventas.validarPrecio(0)).toThrow('El precio debe ser mayor a cero');
        expect(() => ventas.validarPrecio(-3)).toThrow('El precio debe ser mayor a cero');
    });

    it('no deberia lanzar error si el precio es valido', () => {
        const ventas = new Ventas();
        expect(() => ventas.validarPrecio(5)).not.toThrow();
    });
    it('deberia lanzar un error si el estado no esta en la lista de estados disponibles', () => {
        const ventas = new Ventas();
        expect(() => ventas.validarEstado('ZZ')).toThrow('Estado invalido o no seleccionado');
        expect(() => ventas.validarEstado(undefined)).toThrow('Estado invalido o no seleccionado');
    });

    it('no deberia lanzar error si el estado es valido', () => {
        const ventas = new Ventas();
        expect(() => ventas.validarEstado('CA')).not.toThrow();
    });
});