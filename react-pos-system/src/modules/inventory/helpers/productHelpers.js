import { v4 as uuidv4 } from "uuid";

export const normalizeProduct = (productData) => ({
  ...productData,
  id: productData.id ?? uuidv4(),
  priceUSD: parseFloat(productData.priceUSD),
  stock: parseInt(productData.stock, 10),
});
