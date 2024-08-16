import { Router } from "express";
import productController from "../controllers/products.controller.js";
import { checkProductData } from "../middlewares/checkProductData.middleware.js";
import { productExistance } from "../middlewares/productExistance.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";

const router = Router();

router
  .get("/", (req, res) => {
    productController.getAllProducts(req, res);
  })

  .get("/:pid", productExistance, (req, res) => {
    productController.getProductById(req, res);
  })

  .post("/", authorization("admin"), checkProductData, (req, res) => {
    productController.createNewProduct(req, res);
  })

  .put("/:pid", authorization("admin"), productExistance, (req, res) => {
    productController.updateProduct(req, res);
  })

  .delete("/:pid", authorization("admin"), productExistance, (req, res) => {
    productController.deleteProduct(req, res);
  });

export default router;
