import { request, response } from "express";

export const isUserCart = async (req = request, res = response, next) => {
  const { cid } = req.params;
  if (req.user.cart !== cid)
    return res
      .status(401)
      .json({ status: "Error", message: "Wrong cart user" });

  next();
};
