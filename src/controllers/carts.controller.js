import cartsService from "../services/carts.service.js";

const createNewCart = async (req, res) => {
  try {
    const productsWithQuantity = req.body.products.map((product) => ({
      id: product.product.id,
      quantity: product.quantity,
    }));

    let newCart = {
      id: new Date().getMilliseconds(),
      products: productsWithQuantity,
    };

    const createdNewCart = await cartsService.createNewCart(newCart);
    res.status(200).json({ status: "OK", payload: createdNewCart });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "Error", message: error.message });
  }
};

const getAllProductInCart = async (req, res) => {
  try {
    const cid = Number(req.params.cid);
    const productsInCart = await cartsService.getAllProductsInCart(cid);
    const payload = { cartId: cid, productsInCart: productsInCart };
    res.status(200).json({ status: "OK", payload: payload });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "Error", message: error.message });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const newProductToCart = {
      quantity: 1,
      cid: Number(cid),
      pid: Number(pid),
    };
    const cartUpdated = await cartsService.addProductToCart(newProductToCart);
    res.status(200).json({ status: "OK", payload: cartUpdated });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "Error", message: error.message });
  }
};

export default {
  createNewCart,
  getAllProductInCart,
  addProductToCart,
};
