import {
  randomIntBetween,
  randomString,
  randomItem,
  uuidv4,
  findBetween,
} from '../libs/k6-utils/1.4.0/index.js';

/**
 * Genera un token único combinando la fecha actual, un número aleatorio de 4 dígitos y el timestamp actual.
 *
 * @returns {string} - Un token en formato YYYYMMDDNNNNTIMESTAMP, donde YYYYMMDD es la fecha actual, NNNN es un número aleatorio de 4 dígitos, y TIMESTAMP es el timestamp actual en milisegundos.
 *
 * @example
 * // Devuelve un token como '2024100412341696412345678' si la fecha es 4 de octubre de 2024, el número aleatorio es 1234 y el timestamp es 1696412345678
 * getTokenBancs();
 */
export function getTokenBancs() {
  const today = getTodayDate();
  const nnnn = randomIntBetween(1000, 9999);
  const timestamp = Date.now();

  return `${today}${nnnn}${timestamp}`;
}


/**
 * Obtiene la fecha actual en formato YYYYMMDD o YYYY[sep]MM[sep]DD.
 * 
 * @param {string} [sep] - El separador opcional para formatear la fecha. Si no se proporciona, la fecha se devuelve sin separadores.
 * @returns {string} - La fecha actual en formato YYYYMMDD si no se proporciona 'sep', o en formato YYYY[sep]MM[sep]DD si se proporciona 'sep'.
 *
 * @example
 * // Devuelve '20241004' si la fecha actual es 4 de octubre de 2024 y no se proporciona 'sep'
 * getTodayDate();
 *
 * @example
 * // Devuelve '2024-10-04' si la fecha actual es 4 de octubre de 2024 y 'sep' es '-'
 * getTodayDate('-');
 */
export function getTodayDate(sep) {
  const currentDate = new Date();

  const yyyy = currentDate.getFullYear().toString();
  const mm = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const dd = currentDate.getDate().toString().padStart(2, '0');

  return sep == undefined ? `${yyyy}${mm}${dd}` : `${yyyy}${sep}${mm}${sep}${dd}`;
}

/**
 * Obtiene los últimos dígitos de un timestamp.
 *
 * @param {number|string} timestamp - El timestamp del cual se obtendrán los últimos dígitos.
 * @param {number} last - El número de dígitos que se desean obtener del final del timestamp.
 * @returns {string|undefined} - Una cadena con los últimos dígitos del timestamp o `undefined` si 'last' es mayor a 13.
 *
 * @example
 * // Devuelve '567890' si el timestamp es 1234567890 y last es 6
 * getTimestamp(1234567890, 6);
 *
 * @example
 * // Devuelve 'undefined' si last es mayor a 13
 * getTimestamp(1234567890, 14);
 */
export function getTimestamp(timestamp, last) {
  const timestampStr = timestamp.toString();

  // Obtener los últimos dígitos indicados por el parámetro 'last'
  return last <= 13 ? timestampStr.slice(-last) : undefined;
}
