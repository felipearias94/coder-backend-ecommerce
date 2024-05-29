import DB from "./utils.js";

const pathToFile = "./src/database/products.json";
const productsJSON = await DB.readFromDataBase(pathToFile);
const productParsed = await JSON.parse(productsJSON);

const getAllProducts = async (limit) => {
  try {
    let products = productParsed || [];

    if (!limit) return products;

    return productParsed.slice(0, limit);
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getProductById = async (pid) => {
  try {
    const productId = Number(pid);
    const product = productParsed.find((prod) => prod.id === productId);

    if (!product) {
      throw {
        status: 404,
        message: `No se encontró el producto con ID: ${pid}`,
      };
    }

    return product;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewProduct = async (newProduct) => {
  try {
    productParsed.push(newProduct);
    DB.saveToDatabase(pathToFile, productParsed);

    return newProduct;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const updateProduct = async (productToUpdate) => {
  try {
    const indexToUpdate = productParsed.findIndex(
      (prod) => prod.id === productToUpdate.id
    );
    console.log(productToUpdate);
    if (indexToUpdate < 0) {
      throw {
        status: 404,
        message: `El producto con ID: ${productToUpdate.id} no se encuentra para actualizarlo.`,
      };
    }

    let product = productParsed.find((prod) => prod.id === productToUpdate.id);
    product = {
      ...product,
      ...productToUpdate,
    };

    productParsed[indexToUpdate] = product;
    DB.saveToDatabase(pathToFile, productParsed);
    return product;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteProduct = (pid) => {
  try {
    const productDeleted = productParsed.find((prod) => prod.id === pid);
    const indexForDeletion = productParsed.findIndex((prod) => prod.id === pid);
    if (indexForDeletion < 0) {
      throw {
        status: 404,
        message: `No se encuentra el producto con ID ${pid}`,
      };
    }
    productParsed.splice(indexForDeletion, 1);
    DB.saveToDatabase(pathToFile, productParsed);

    return productDeleted;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

export default {
  getAllProducts,
  getProductById,
  createNewProduct,
  updateProduct,
  deleteProduct,
};
