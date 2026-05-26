const { factorial, isPrime, clamp } = require('../src/numberUtils');
-
describe('factorial', () => {
  test('debe devolver 1 cuando n = 0', () => {
    expect(factorial(0)).toBe(1);
  });

  test('debe calcular factorial(5) correctamente', () => {
    expect(factorial(5)).toBe(120);
  });

  test('debe lanzar RangeError si n es negativo', () => {
    expect(() => factorial(-3)).toThrow(RangeError);
  });

  test('debe lanzar TypeError si n es decimal', () => {
    expect(() => factorial(3.5)).toThrow(TypeError);
  });
});


describe('isPrime', () => {
  test('debe identificar números primos', () => {
    expect(isPrime(2)).toBe(true);
    expect(isPrime(11)).toBe(true);
  });

  test('debe identificar números no primos', () => {
    expect(isPrime(4)).toBe(false);
    expect(isPrime(9)).toBe(false);
  });

  test('debe devolver false para 0, 1 y negativos', () => {
    expect(isPrime(0)).toBe(false);
    expect(isPrime(1)).toBe(false);
    expect(isPrime(-10)).toBe(false);
  });
});


describe('clamp', () => {
  test('debe devolver el valor si está dentro del rango', () => {
    expect(clamp(5, 1, 10)).toBe(5);
  });

  test('debe devolver min si value es menor', () => {
    expect(clamp(-3, 0, 10)).toBe(0);
  });

  test('debe devolver max si value es mayor', () => {
    expect(clamp(20, 0, 10)).toBe(10);
  });

  test('debe funcionar cuando min === max', () => {
    expect(clamp(5, 7, 7)).toBe(7);
  });

  test('debe lanzar RangeError si min > max', () => {
    expect(() => clamp(5, 10, 1)).toThrow(RangeError);
  });
});