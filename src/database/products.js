import fs from "fs";
import saveToDatabase from "./utils.js";

const pathToFile = "./src/database/products.json";
const productsJSON = await fs.promises.readFile(pathToFile, "utf-8");
const productParsed = await JSON.parse(productsJSON);

const getAllProducts = async () => {
  try {
    return productParsed;
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
    const isAlreadyAdded =
      productParsed.findIndex((prod) => prod.id === newProduct.id) > -1;

    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `El producto ${newProduct.name} ya existe`,
      };
    }
    productParsed.push(newProduct);
    saveToDatabase(pathToFile, productParsed);

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

    if (indexToUpdate < 0) {
      throw {
        status: 404,
        message: `No se encuentra el producto ${productToUpdate.name} para actualizarlo.`,
      };
    }

    let product = productParsed.find((prod) => prod.id === productToUpdate.id);
    product = {
      ...product,
      ...productToUpdate,
    };

    productParsed[indexToUpdate] = product;
    saveToDatabase(pathToFile, productParsed);
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
    saveToDatabase(pathToFile, productParsed);

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
