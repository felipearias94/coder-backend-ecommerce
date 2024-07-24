import usersService from "../services/users.service.js";
import { hashPassword, isValidPassword } from "../utils/hashPassword.js";

const register = async (req, res) => {
  try {
    res.status(201).json({ status: "OK", message: "User created" });
  } catch (error) {
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    return res.status(200).json({ status: "OK", payload: req.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

const getCurrent = async (req, res) => {
  try {
    const user = await usersService.getUserByEmail(req.session.user.email);
    return res.status(200).json({ status: "OK", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

const logout = () => {};

export default {
  register,
  login,
  logout,
  getCurrent,
};
