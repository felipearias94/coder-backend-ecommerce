import cartsService from "../services/carts.service.js";
import productsService from "../services/products.service.js";
import { Types } from "mongoose";

const createNewCart = async (req, res) => {
  try {
    const createdNewCart = await cartsService.createNewCart(req.body);
    res.status(201).json({ status: "OK", payload: createdNewCart });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "Error", message: error.message });
  }
};

const getAllProductInCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartsService.getCartById(cid);
    if (!cart)
      return res
        .status(404)
        .json({ status: "Error", message: "Carrito no encontrado" });
    res.status(200).json({ status: "OK", payload: cart });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "Error", message: error.message });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const cartUpdated = await cartsService.addProductToCart(cid, pid);

    if (cartUpdated.product === false) {
      res.status(404).json({
        status: "Error",
        message: `No se encontró el producto con ID: ${pid}`,
      });
    }
    if (cartUpdated.cart === false) {
      res.status(404).json({
        status: "Error",
        message: `No se encontró el carrito con ID: ${cid}`,
      });
    }

    res.status(200).json({ status: "OK", payload: cartUpdated });
  } catch (error) {
    console.log(error);
    res
      .status(error?.status || 500)
      .json({ status: "Error", message: error.message });
  }
};

const updateProductQuantity = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const product = await productsService.getProductById(pid);
    if (!product) {
      return res
        .status(404)
        .json({ status: "Error", message: "Producto no encontrado" });
    }

    const cart = await cartsService.getCartById(cid);
    if (!cart) {
      return res
        .status(404)
        .json({ status: "Error", message: "Carrito no encontrado" });
    }

    const cartUpdated = await cartsService.updateProductQuantity(
      cid,
      pid,
      quantity
    );

    res.status(201).json({ status: "Ok", payload: cartUpdated });
  } catch (error) {
    console.log(error);
    res
      .status(error?.status || 500)
      .json({ status: "Error", message: error.message });
  }
};

const deleteProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const product = await productsService.getProductById(pid);
    if (!product) {
      return res
        .status(404)
        .json({ status: "Error", message: "Producto no encontrado" });
    }

    const cart = await cartsService.getCartById(cid);

    if (!cart) {
      return res
        .status(404)
        .json({ status: "Error", message: "Carrito no encontrado" });
    }
    const productDeleted = await cartsService.deleteProductFromCart(cid, pid);

    res.status(201).json({ status: "Ok", payload: productDeleted });
  } catch (error) {
    console.log(error);
    res
      .status(error?.status || 500)
      .json({ status: "Error", message: error.message });
  }
};

const deleteAllProductFromCart = async (req, res) => {
  try {
    const { cid } = req.params;

    const productDeleted = await cartsService.deleteAllProductFromCart(cid);

    res.status(200).json({ status: "Ok", payload: productDeleted });
  } catch (error) {
    console.log(error);
    res
      .status(error?.status || 500)
      .json({ status: "Error", message: error.message });
  }
};

export default {
  createNewCart,
  getAllProductInCart,
  addProductToCart,
  updateProductQuantity,
  deleteProductFromCart,
  deleteAllProductFromCart,
};
