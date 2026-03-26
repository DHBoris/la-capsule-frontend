/**
 * Clamps a number within the specified minimum and maximum range.
 *
 * @param {number} n - The number to be clamped.
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} The clamped number.
 */
export const minmax = (n: number, min: number, max: number): number => {
  if (min > max) {
    throw new Error('min must be less than or equal to max')
  }

  if (n < min) return min
  if (n > max) return max
  return n
}

/**
 * Formats a number into a string with a given precision and separator.
 *
 * @param {number|string} n - The number to be formatted, can be of type number or string.
 * @param {number} [precision=2] - The desired precision for the decimal number (default: 2).
 * @param {string} [separator='.'] - The separator used for the decimal point (default: '.').
 * @param {boolean} [trim=true] - Whether to trim trailing zeros from the formatted string (default: true).
 * @returns {string} The formatted string representation of the number with the given precision and separator.
 */
export const formatNumber = (
  n: number | string,
  precision: number = 2,
  separator: string = '.',
  trim: boolean = true
): string => {
  if (typeof n === 'string') n = parseFloat(n)

  n = n.toFixed(precision)

  if (trim) n = removeTrailingZeros(n)
  if (separator !== '.') n.replace('.', separator)

  return n
}

/**
 * Formats a number as a price with currency symbol.
 *
 * @param {number|String} n - The number to be formatted as a price.
 * @param {string} [currency='€'] - The currency to be appended to the formatted price.
 * @returns {string} The formatted price with the currency symbol.
 */
export const formatPrice = (
  n: number | string,
  currency: string = '€'
): string => {
  return formatNumber(n, 2) + currency
}

/**
 * Separates the integer and fractional parts of a number.
 *
 * @param {number | string} n - The number to be separated.
 * @returns {Array<string>} An array containing the integer and fractional parts of the number as strings.
 */
export const separateNumberParts = (n: number | string): Array<string> =>
  typeof n === 'string' ? n.split('.') : n.toString().split('.')

/**
 * Removes trailing zeros from a number's fractional part.
 *
 * @param {string} n - The string representation of the number to process.
 * @returns {string} The number without trailing zeros.
 */
export const removeTrailingZeros = (n: string): string => {
  let [integerPart, floatingPart] = separateNumberParts(n)

  if (floatingPart === undefined) return integerPart

  while (floatingPart.slice(-1) === '0')
    floatingPart = floatingPart.slice(0, -1)

  return floatingPart === ''
    ? integerPart
    : [integerPart, floatingPart].join('.')
}

/**
 * Retrieves the file extension from the given string.
 * @param {string} str - The input string.
 * @returns {string} The file extension (without the dot), or an empty string if not found.
 */
export const getFileExtension = (str: string): string => {
  const lastDotIndex = str.lastIndexOf('.')

  if (lastDotIndex >= 0) return str.substring(lastDotIndex + 1)

  return ''
}

/**
 * Get the file path without the extension from a string.
 *
 * @param {string} str - The string containing the file name.
 * @returns {string} The file path without the extension.
 */
export const getFilePath = (str: string): string => {
  const lastDotIndex = str.lastIndexOf('.')

  if (lastDotIndex >= 0) return str.substring(0, lastDotIndex)

  return ''
}