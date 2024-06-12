import productsServices from "../services/products.service.js";

const getAllProducts = async (req, res) => {
  try {
    const { limit } = req.query;
    const allProducts = await productsServices.getAllProducts(limit);
    res.status(200).json({ status: "OK", payload: allProducts });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "Error", message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { pid } = req.params;

    const productById = await productsServices.getProductById(pid);
    res.status(200).json({ status: "OK", payload: productById });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "Error", message: error.message });
  }
};

const createNewProduct = async (req, res) => {
  try {
    let { title, description, price, thumbnail, code, stock, category } =
      req.body;

    let newProduct = {
      title,
      description,
      price,
      thumbnail: thumbnail || [],
      code,
      stock,
      category,
      status: true,
    };

    const createdNewProduct = await productsServices.createNewProduct(
      newProduct
    );

    res.status(201).json({ status: "OK", payload: createdNewProduct });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "Error", message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const updatedProduct = await productsServices.updateProduct(pid, {
      ...req.body,
    });
    
    res.status(200).json({ status: "OK", payload: updatedProduct });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "Error", message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productsServices.deleteProduct(req.params.pid);
    res.status(200).json({ status: "OK", payload: deletedProduct });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "Error", message: error.message });
  }
};

export default {
  getAllProducts,
  getProductById,
  createNewProduct,
  updateProduct,
  deleteProduct,
};
