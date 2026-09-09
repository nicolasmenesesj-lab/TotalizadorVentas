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
});