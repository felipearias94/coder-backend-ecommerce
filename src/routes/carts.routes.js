import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";

const router = Router();

router
  .post("/", (req, res) => {
    cartsController.createNewCart(req, res);
  })
  .get("/:cid", (req, res) => {
    cartsController.getAllProductInCart(req, res);
  })

  .post("/:cid/products/:pid", (req, res) => {
    cartsController.addProductToCart(req, res);
  })

export default router;
