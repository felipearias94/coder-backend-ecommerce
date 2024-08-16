import cartsDB from "../database/cart.dao.js";

const createNewCart = (data) => {
  return cartsDB.create(data);
};

const getAllProductsInCart = (cid) => {
  return cartsDB.getAllProductsInCart(cid);
};

const addProductToCart = (id, productId) => {
  return cartsDB.addProductToCart(id, productId);
};

const getCartById = (cid) => {
  return cartsDB.getById(cid);
};

const updateProductQuantity = async (cid, pid, quantity) => {
  return cartsDB.updateProductQuantity(cid, pid, quantity);
};

const deleteProductFromCart = (cid, pid) => {
  return cartsDB.deleteProductFromCart(cid, pid);
};

const deleteAllProductFromCart = (cid) => {
  return cartsDB.deleteAllProductFromCart(cid);
};

export default {
  createNewCart,
  getAllProductsInCart,
  addProductToCart,
  getCartById,
  updateProductQuantity,
  deleteProductFromCart,
  deleteAllProductFromCart,
};
