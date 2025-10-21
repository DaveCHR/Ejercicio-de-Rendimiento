/**
 * Imprime una línea de separación en la consola utilizando un carácter específico repetido un número determinado de veces.
 *
 * @param {string} [char='-'] - El carácter que se utilizará para crear la línea de separación. Por defecto es '-'.
 * @param {number} [length=30] - La longitud de la línea de separación. Por defecto es 30.
 *
 * @example
 * // Imprime una línea de separación con el carácter '-' repetido 30 veces
 * printSeparator();
 *
 * @example
 * // Imprime una línea de separación con el carácter '*' repetido 50 veces
 * printSeparator('*', 50);
 *
 * @example
 * // Imprime una línea de separación con el carácter '#' repetido 10 veces
 * printSeparator('#', 10);
 */
export function printSeparator(char = '-', length = 30) {
  console.log(char.repeat(length));
}

/**
 * Imprime una línea de separación en la consola utilizando un carácter específico repetido un número determinado de veces.
 *
 * @param {Object} [options={}] - Objeto de opciones.
 * @param {string} [options.char='-'] - El carácter que se utilizará para crear la línea de separación. Por defecto es '-'.
 * @param {number} [options.length=30] - La longitud de la línea de separación. Por defecto es 30.
 *
 * @example
 * // Imprime una línea de separación con el carácter '-' repetido 30 veces
 * printSeparatorV02();
 *
 * @example
 * // Imprime una línea de separación con el carácter '*' repetido 50 veces
 * printSeparatorV02({ char: '*', length: 50 });
 *
 * @example
 * // Imprime una línea de separación con el carácter '#' repetido 10 veces
 * printSeparatorV02({ char: '#', length: 10 });
 */
export function printSeparatorV02({ char = '-', length = 30 } = {}) {
  console.log(char.repeat(length));
}
