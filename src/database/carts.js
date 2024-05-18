import DB from "./utils.js";

const pathToFile = "./src/database/carts.json";
const cartsJSON = await DB.readFromDataBase(pathToFile);
const cartsParsed = await JSON.parse(cartsJSON);

const createNewCart = async (newCart) => {
  try {
    const isAlreadyAdded =
      cartsParsed.findIndex((cart) => cart.id === newCart.id) > -1;

    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: "El carrito ya existe",
      };
    }

    cartsParsed.push(newCart);
    DB.saveToDatabase(pathToFile, cartsParsed);

    return cartsParsed;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const getAllProductsInCart = (cid) => {
  try {
    const cartById = cartsParsed.find((cart) => cart.id === cid);
    if (!cartById) {
      throw {
        status: 404,
        message: `El carrito con ID ${cid} no se encuentra`,
      };
    }

    return cartById.products;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const addProductToCart = (newProductToCart) => {
  try {
    const cartIndex = cartsParsed.findIndex(
      (cart) => cart.id === newProductToCart.cid
    );

    if (cartIndex < 0) {
      throw {
        status: 404,
        message: `No se encontró el carrito con ID ${newProductToCart.cid}`,
      };
    }

    const updatedCart = { ...cartsParsed[cartIndex] };

    const existingProductIndex = updatedCart.products.findIndex(
      (product) => product.id === newProductToCart.pid
    );

    if (existingProductIndex === -1) {
      updatedCart.products.push({
        id: newProductToCart.pid,
        quantity: 1,
      });
    } else {
      updatedCart.products[existingProductIndex].quantity++;
    }

    cartsParsed[cartIndex] = updatedCart;

    DB.saveToDatabase(pathToFile, cartsParsed);

    return updatedCart;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

export default {
  createNewCart,
  getAllProductsInCart,
  addProductToCart,
};
