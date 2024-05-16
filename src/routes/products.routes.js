import { Router } from "express";
import productController from "../controllers/products.controller.js";

const router = Router();

router
  .get("/", (req, res) => {
    productController.getAllProducts(req, res);
  })

  .get("/:pid", (req, res) => {
    productController.getProductById(req, res);
  })

  .post("/", (req, res) => {
    productController.createNewProduct(req, res);
  })

  .put("/:pid", (req, res) => {
    productController.updateProduct(req, res);
  })

  .delete("/:pid", (req, res) => {
    productController.deleteProduct(req, res);
  });

export default router;
