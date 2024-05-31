import productsDB from "../database/products.js";

const getAllProducts = (limit) => {
  return productsDB.getAllProducts(limit);
};
const getProductById = (pid) => {
  return productsDB.getProductById(pid);
};
//Solo por la 2da entrega, moveré el generador de ID al servicio, para que no genere conflictos con el controlador a la hora de usar sockets.
//Porque al hacerlo por el controlador tiraba error 'Can't set headers after they are sent to the client'
const createNewProduct = (newProduct) => {
  const productWithId = { id: new Date().getMilliseconds(), ...newProduct };
  return productsDB.createNewProduct(productWithId);
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
