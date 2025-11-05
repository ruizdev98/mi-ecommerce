// src/core/utils/textFormat.js

/**
 * Pone la primera letra en mayúscula y el resto en minúsculas.
 * Ejemplo: "hOMBRES" → "Hombres"
 */
export function capitalizeFirstLetter(text) {
  if (!text) return ''
  const lower = text.toLowerCase()
  return lower.charAt(0).toUpperCase() + lower.slice(1)
}

/**
 * Capitaliza todas las palabras de una cadena.
 * Ejemplo: "ropa deportiva" → "Ropa Deportiva"
 */
export function capitalizeWords(text) {
  if (!text) return ''
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}