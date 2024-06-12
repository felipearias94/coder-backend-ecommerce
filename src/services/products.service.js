import productsDB from "../database/product.dao.js";

const getAllProducts = (limit) => {
  return productsDB.getAll(limit);
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
  getProductById,
  createNewProduct,
  updateProduct,
  deleteProduct,
};
