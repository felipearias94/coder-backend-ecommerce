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
    return res.status(200).json({ status: "OK", payload: req.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

const auth = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await usersService.getUserByEmail(email);
    if (!user || !isValidPassword(password, user.password)) {
      return res
        .status(401)
        .json({ status: "Error", message: "User or email invalid" });
    }
    const token = createToken(user);
    
    res.cookie("token", token, { httpOnly: true });
    return res.status(200).json({ status: "ok", user, token });
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
  auth,
  login,
  logout,
  getCurrent,
};
