import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";
import { checkCartData } from "../middlewares/checkCartData.middleware.js";
import {
  cartExistance,
  isQuantityZero,
} from "../middlewares/cart.middleware.js";
import { productExistance } from "../middlewares/productExistance.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { passportCall } from "../middlewares/passport.middleware.js";

const router = Router();

router
  .post("/", checkCartData, (req, res) => {
    cartsController.createNewCart(req, res);
  })

  .get("/:cid", cartExistance, (req, res) => {
    cartsController.getAllProductInCart(req, res);
  })

  .get(
    "/:cid/purchase",
    passportCall("jwt"),
    authorization("user"),
    (req, res) => {
      cartsController.purchaseCart(req, res);
    }
  )

  .post(
    "/:cid/products/:pid",
    passportCall("jwt"),
    authorization("user"),
    cartExistance,
    productExistance,
    (req, res) => {
      cartsController.addProductToCart(req, res);
    }
  )

  .put(
    "/:cid/products/:pid",
    passportCall("jwt"),
    authorization("user"),
    cartExistance,
    productExistance,
    isQuantityZero,
    (req, res) => {
      cartsController.updateProductQuantity(req, res);
    }
  )

  .delete(
    "/:cid/products/:pid",
    passportCall("jwt"),
    authorization("user"),
    cartExistance,
    productExistance,
    (req, res) => {
      cartsController.deleteProductFromCart(req, res);
    }
  )

  .delete(
    "/:cid",
    passportCall("jwt"),
    authorization("user"),
    cartExistance,
    (req, res) => {
      cartsController.clearProductFromCart(req, res);
    }
  );

export default router;
