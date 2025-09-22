import { v4 as uuidv4 } from "uuid";

export const normalizeProduct = (productData) => ({
  id: productData.id ?? uuidv4(),
  name: productData.name?.trim() || "Producto sin nombre",
  category: productData.category || "General",
  priceUSD: parseFloat(productData.priceUSD) || 0,
  stock: parseInt(productData.stock, 10) || 0,
});

/**
 * Valida los datos de un producto antes de guardarlo.
 * Retorna un string con el error o null si todo está correcto.
 */

export const validateProduct = (product) => {
  if (!product.name || product.name.trim() === "") {
    return "El nombre del producto es obligatorio";
  }
  if (product.priceUSD < 0) {
    return "El precio no puede ser negativo";
  }
  if (product.stock < 0) {
    return "El stock no puede ser negativo";
  }
  return null;
};

/**
 * Calcula el precio en bolívares a partir de la tasa actual.
 */
export const calculatePriceBs = (product, rate) => {
  if (!rate || isNaN(rate)) return 0;
  return parseFloat(product.priceUSD * rate).toFixed(2);
};

/**
 * Calcula el valor total en USD de un producto en inventario.
 */
export const calculateTotalValueUsd = (product) => {
  return parseFloat(product.priceUSD * product.stock).toFixed(2);
};

/**
 * Calcula el valor total en Bs de un producto en inventario.
 */
export const calculateTotalValueBs = (product, rate) => {
  if (!rate || isNaN(rate)) return 0;
  return parseFloat(product.priceUSD * product.stock * rate).toFixed(2);
};
