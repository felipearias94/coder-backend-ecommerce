import { cartModel } from "./models/cart.model.js";
import { productModel } from "./models/product.model.js";

const getAll = async () => {
  const cart = await cartModel.find({ status: true });
  return cart;
};

const getById = async (id) => {
  const cart = await cartModel
    .findById({ _id: id })
    .populate("products.product");
  return cart;
};

const create = async (data) => {
  const cart = await cartModel.create(data);
  return cart;
};

const update = async (id, data) => {
  await cartModel.findByIdAndUpdate(id, data, { new: true });
  const cartUpdated = await cartModel.findById(id);
  return cartUpdated;
};

const addProductToCart = async (cid, pid) => {
  const product = await productModel.findById(pid);
  if (!product) {
    return { product: false };
  }

  const cart = await cartModel.findById(cid);
  if (!cart) {
    return { cart: false };
  }
  
  const productInCart = await cartModel.findOneAndUpdate(
    { _id: cid, "products.product": pid },
    { $inc: { "products.$.quantity": 1 } }
  );

  if (!productInCart) {
    await cartModel.updateOne(
      { _id: cid },
      { $push: { products: { product: pid, quantity: 1 } } }
    );
  }

  const cartUpdated = await cartModel.findById(cid);
  return cartUpdated;
};

export default {
  getAll,
  getById,
  create,
  update,
  addProductToCart,
};
