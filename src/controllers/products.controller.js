import productsServices from "../services/products.service.js";

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await productsServices.getAllProducts();
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
    let newProduct = {
      ...req.body,
    };

    if (
      !newProduct.name ||
      !newProduct.description ||
      !newProduct.price ||
      !newProduct.code ||
      !newProduct.stock ||
      !newProduct.category ||
      !newProduct.thumbnails
    ) {
      throw {
        status: 400,
        message: "Todos los campos son obligatorios",
      };
    }

    if (!newProduct.status) {
      newProduct = {
        ...newProduct,
        status: true,
      };
    }

    newProduct = {
      ...req.body,
      id: new Date().getMilliseconds(),
    };

    const createdNewProduct = await productsServices.createNewProduct(
      newProduct
    );
    res.status(200).json({ status: "OK", payload: createdNewProduct });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "Error", message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productsServices.updateProduct({
      ...req.body,
      id: Number(req.params.pid),
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
    const deletedProduct = await productsServices.deleteProduct(Number(req.params.pid));
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
