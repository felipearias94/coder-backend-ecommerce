import { Router } from "express";
import productController from "../controllers/products.controller.js";
import { checkProductData } from "../middlewares/checkProductData.middleware.js";
import { productExistance } from "../middlewares/productExistance.middleware.js";

const router = Router();

router
  .get("/", (req, res) => {
    productController.getAllProducts(req, res);
  })

  .get("/:pid", productExistance, (req, res) => {
    productController.getProductById(req, res);
  })

  .post("/", checkProductData, (req, res) => {
    productController.createNewProduct(req, res);
  })

  .put("/:pid", productExistance, (req, res) => {
    productController.updateProduct(req, res);
  })

  .delete("/:pid", productExistance, (req, res) => {
    productController.deleteProduct(req, res);
  });

export default router;
