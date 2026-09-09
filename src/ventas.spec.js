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
});