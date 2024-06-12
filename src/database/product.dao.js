import { productModel } from "./models/product.model.js";

const getAll = async () => {
  const products = await productModel.find({ status: true });
  return products;
};

const getById = async (id) => {
  const products = await productModel.findById(id);
  return products;
};

const create = async (data) => {
  const products = await productModel.create(data);
  return products;
};

const update = async (id, data) => {
  const productUpdated = await productModel.findByIdAndUpdate(
    id,
    { ...data },
    { new: true }
  );
  return productUpdated;
};

const deleteOne = async (id) => {
  await productModel.findByIdAndUpdate(id, { status: false }, { new: true });
  const productUpdated = await productModel.findById(id);
  return productUpdated;
};

export default {
  getAll,
  getById,
  create,
  update,
  deleteOne,
};
