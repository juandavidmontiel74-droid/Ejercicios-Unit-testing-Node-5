function isEven(n)  {
    if(typeof n !== 'number' || !Number.isInteger(n))   {
        throw new TypeError('Se esperaba un entero.');

    }
    return n % 2 === 0;
}

function safeSquareRoot(n)  {
    if(n < 0) throw new RangeError('No se puede calcular la raíz de un número negativo.');
    return Math.sqrt(n);
}
module.exports = { isEven, safeSquareRoot };


