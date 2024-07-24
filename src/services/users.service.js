import usersDB from "../database/user.dao.js";

const getAllUsers = () => {
  return usersDB.getAll();
};

const getUsers = (query, options) => {
  return usersDB.getUsers(query, options);
};

const getUserById = (pid) => {
  return usersDB.getById(pid);
};

const getUserByEmail = (email) => {
  return usersDB.getByEmail(email);
};

const createNewUser = (newUser) => {
  return usersDB.create(newUser);
};

const updateUser = (id, data) => {
  return usersDB.update(id, data);
};

const deleteUser = (pid) => {
  return usersDB.deleteOne(pid);
};

export default {
  getAllUsers,
  getUsers,
  getUserById,
  getUserByEmail,
  createNewUser,
  updateUser,
  deleteUser,
};
