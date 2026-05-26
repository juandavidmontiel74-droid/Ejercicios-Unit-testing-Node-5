function factorial(n) {
  if (typeof n !== 'number' || Number.isNaN(n)) {
    throw new TypeError('n debe ser un número');
  }

  if (!Number.isInteger(n)) {
    throw new TypeError('n debe ser un número entero');
  }

  if (n < 0) {
    throw new RangeError('n no puede ser negativo');
  }

  if (n === 0) return 1;

  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }

  return result;
}

function isPrime(n) {
  if (typeof n !== 'number' || Number.isNaN(n)) {
    throw new TypeError('n debe ser un número');
  }

  if (!Number.isInteger(n)) {
    throw new TypeError('n debe ser un número entero');
  }

  if (n < 2) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }

  return true;
}

function clamp(value, min, max) {
  if (min > max) {
    throw new RangeError('min no puede ser mayor que max');
  }

  return Math.min(Math.max(value, min), max);
}

module.exports = { factorial, isPrime, clamp };
