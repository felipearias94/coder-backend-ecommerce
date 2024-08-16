import usersService from "../services/users.service.js";
import { hashPassword, isValidPassword } from "../utils/hashPassword.js";
import { createToken } from "../utils/token.js";

const register = async (req, res) => {
  try {
    res.status(201).json({ status: "OK", message: "User created" });
  } catch (error) {
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const token = createToken(req.user);

    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({ status: "ok", payload: req.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
};

const getCurrent = async (req, res) => {
  try {
    return res.status(200).json({ status: "OK", user: req.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

export default {
  register,
  login,
  getCurrent,
};
