import { Router } from "express";
import productsRoutes from "./products.routes.js";
import cartsRoutes from "./carts.routes.js";
import sessionRoutes from "./sessions.routes.js";

const router = Router();

router.use("/sessions", sessionRoutes);
router.use("/products", productsRoutes);
router.use("/carts", cartsRoutes);
router.get("*", async (req, res) => {
  try {
    res.status(404).json({ status: "error", message: "Route not found" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "Error", message: "Internal server error" });
  }
});

export default router;
