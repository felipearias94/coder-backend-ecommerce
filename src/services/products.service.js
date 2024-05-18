import productsDB from "../database/products.js";

const getAllProducts = (limit) => {
  return productsDB.getAllProducts(limit);
};
const getProductById = (pid) => {
  return productsDB.getProductById(pid);
};
const createNewProduct = (newProduct) => {
  return productsDB.createNewProduct(newProduct);
};
const updateProduct = (product) => {
  return productsDB.updateProduct(product);
};
const deleteProduct = (pid) => {
  return productsDB.deleteProduct(pid);
};

export default {
  getAllProducts,
  getProductById,
  createNewProduct,
  updateProduct,
  deleteProduct,
};
