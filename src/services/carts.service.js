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

export default {
  createNewCart,
  getAllProductsInCart,
  addProductToCart,
  getCartById,
};
