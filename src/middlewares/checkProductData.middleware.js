import { request, response } from "express";
import Products from "../database/product.dao.js";

export const checkProductData = async (req = request, res = response, next) => {
  try {
    const { title, description, price, code, stock, category } = req.body;

    const newProduct = {
      title,
      description,
      price,
      code,
      stock,
      category,
    };

    const products = await Products.getAll();
    const productExist = products.find((prod) => prod.code === code);

    if (productExist)
      return res.status(400).json({
        status: "Error",
        message: `El producto ${newProduct.title} ya existe`,
      });

    const checkData = Object.values(newProduct).includes(undefined);

    if (checkData)
      return res.status(400).json({
        status: 400,
        message: "Todos los campos son obligatorios",
      });

    next();
  } catch (error) {
    res
      .status(500)
      .json({ status: "Error", message: "Error interno del servidor" });
  }
};
