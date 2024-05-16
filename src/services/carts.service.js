import cartsDB from "../database/carts.js";

const createNewCart = (newCart) => {
  return cartsDB.createNewCart(newCart);
};
const getAllProductsInCart = (cid) => {
  return cartsDB.getAllProductsInCart(cid);
};
const addProductToCart = (newProductToCart) => {
  return cartsDB.addProductToCart(newProductToCart);
};

export default {
  createNewCart,
  getAllProductsInCart,
  addProductToCart,
};
