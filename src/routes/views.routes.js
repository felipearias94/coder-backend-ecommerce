import { Router } from "express";
import productsService from "../services/products.service.js";
import { io } from "../index.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    res.render("home", { products: await productsService.getAllProducts() });
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, message: "Error interno del servidor" });
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await productsService.getAllProducts();
    io.emit("getAllProducts", products);
    res.render("realTimeProducts");
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, message: "Error interno del servidor" });
  }
});

router.post("/realtimeproducts", async (req, res) => {
  try {
    const { title, price, description } = req.body;
    await productsService.createNewProduct({
      title: title,
      price: price,
      description: description,
    });

    const products = await productsService.getAllProducts();

    io.emit("getAllProducts", products);
    res.render("realTimeProducts");
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, message: "Error interno del servidor" });
  }
});

router.delete("/realtimeproducts", async (req, res) => {
  try {
    const { id } = req.body;
    await productsService.deleteProduct(Number(id));

    const products = await productsService.getAllProducts();

    io.emit("getAllProducts", products);
    res.render("realTimeProducts");
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, message: "Error interno del servidor" });
  }
});

export default router;
