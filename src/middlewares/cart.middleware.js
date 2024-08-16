import { request, response } from "express";
import { isValidObjectId } from "mongoose";
import Cart from "../database/cart.repository.js";

export const cartExistance = async (req = request, res = response, next) => {
  const { cid } = req.params;

  if (!isValidObjectId(cid)) {
    return res.status(500).json({
      status: "Error",
      message: "Id de carrito invalido",
    });
  }

  const cart = await Cart.getById(cid);
  if (!cart) {
    return res.status(404).json({
      status: "Error",
      message: `Carrito con ID ${cid} no se encuentra`,
    });
  }

  next();
};

export const isQuantityZero = async (req = request, res = response, next) => {
  const { quantity } = req.body;
  if (quantity === 0) { return res.status(400).json({ status: "Error", message: "La cantidad no puede ser 0" }); }

  next();}
