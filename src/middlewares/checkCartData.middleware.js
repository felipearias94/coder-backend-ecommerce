import { request, response } from "express";

export const checkCartData = (req = request, res = response, next) => {
  const { products } = req.body;

  if (!products) {
    req.body.products = [];
  }

  next();
};
