import { request, response } from "express";
import { verifyToken } from "../utils/token.js";

export const checkToken = async (req = request, res = response, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ status: "Error", message: "Token not provided" });
    }
    const tokenVerify = verifyToken(token);

    if (!tokenVerify) {
      return res
        .status(401)
        .json({ status: "Error", message: "Invalid token" });
    }

    req.user = verifyToken;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};
