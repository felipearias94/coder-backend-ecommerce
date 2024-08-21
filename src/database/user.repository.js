import { userModel } from "./models/user.model.js";

const getAll = async () => {
  const users = await userModel.find({ status: true });
  return users;
};

const getUsers = async (query, options) => {
  const users = await userModel.paginate(query, options);
  return users;
};

const getByEmail = async (email) => {
  return await userModel.findOne({ email: email });
};

const getById = async (id) => {
  const users = await userModel.findById(id);
  return users;
};

const create = async (data) => {
  const users = await userModel.create(data);
  return users;
};

const update = async (id, data) => {
  const userUpdated = await userModel.findByIdAndUpdate(
    id,
    { ...data },
    { new: true }
  );
  return userUpdated;
};

const deleteOne = async (id) => {
  await userModel.findByIdAndUpdate(id, { status: false }, { new: true });
  const userUpdated = await userModel.findById(id);
  return userUpdated;
};

export default {
  getAll,
  getUsers,
  getById,
  getByEmail,
  create,
  update,
  deleteOne,
};
