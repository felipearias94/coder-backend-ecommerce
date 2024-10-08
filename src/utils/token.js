import jwt from "jsonwebtoken";
import envsConfig from "../config/envs.config.js";

export const createToken = (user) => {
  const { _id, email, role, cart } = user;
  const token = jwt.sign(
    { _id, email, role, cart },
    envsConfig.JWT_SECRET_CODE,
    {
      expiresIn: "2h",
    }
  );

  return token;
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, envsConfig.JWT_SECRET_CODE);
    return decoded;
  } catch (error) {
    return null;
  }
};
