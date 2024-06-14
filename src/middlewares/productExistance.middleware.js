import { request, response } from "express";
import Products from "../database/product.dao.js";
import { isValidObjectId } from "mongoose";

export const productExistance = async (req = request, res = response, next) => {
  const { pid } = req.params;

  if (!isValidObjectId(pid)) {
    return res.status(500).json({
      status: "Error",
      message: "Id de producto invalido",
    });
  }
  
  const product = await Products.getById(pid);
  if (!product) {
    return res.status(404).json({
      status: "Error",
      message: `Producto con ID ${pid} no se encuentra`,
    });
  }

  next();
};
