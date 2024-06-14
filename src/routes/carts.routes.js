import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";
import { checkCartData } from "../middlewares/checkCartData.middleware.js";
import { cartExistance } from "../middlewares/cartExistance.middleware.js";
import { productExistance } from "../middlewares/productExistance.middleware.js";

const router = Router();

router
  .post("/", checkCartData, (req, res) => {
    cartsController.createNewCart(req, res);
  })

  .get("/:cid", cartExistance, (req, res) => {
    cartsController.getAllProductInCart(req, res);
  })

  .post("/:cid/products/:pid", cartExistance, productExistance, (req, res) => {
    cartsController.addProductToCart(req, res);
  })

  .put("/:cid/products/:pid", cartExistance, productExistance, (req, res) => {
    cartsController.updateProductQuantity(req, res);
  })

  .delete(
    "/:cid/products/:pid",
    cartExistance,
    productExistance,
    (req, res) => {
      cartsController.deleteProductFromCart(req, res);
    }
  )

  .delete("/:cid", cartExistance, (req, res) => {
    cartsController.deleteAllProductFromCart(req, res);
  });

export default router;
