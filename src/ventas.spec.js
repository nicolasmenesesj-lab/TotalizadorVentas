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
});