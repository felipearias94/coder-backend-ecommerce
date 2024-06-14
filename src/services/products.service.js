import productsDB from "../database/product.dao.js";

const getAllProducts = () => {
  return productsDB.getAll();
};

const getProducts = (query, options) => {
  return productsDB.getProducts(query, options);
};

const getProductById = (pid) => {
  return productsDB.getById(pid);
};

const createNewProduct = (newProduct) => {
  return productsDB.create(newProduct);
};

const updateProduct = (id, data) => {
  return productsDB.update(id, data);
};

const deleteProduct = (pid) => {
  return productsDB.deleteOne(pid);
};

export default {
  getAllProducts,
  getProducts,
  getProductById,
  createNewProduct,
  updateProduct,
  deleteProduct,
};
