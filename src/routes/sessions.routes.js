import { Router } from "express";
import usersController from "../controllers/users.controller.js";
import passport from "passport";
import { passportCall } from "../middlewares/passport.middleware.js";
const router = Router();

router.post("/register", passportCall("register"), (req, res) => {
  usersController.register(req, res);
});

router.post("/login", passportCall("login"), (req, res) => {
  usersController.login(req, res);
});

router.get("/current", passportCall("current"), async (req, res) => {
  res.status(200).json({ status: "ok", user: req.user });
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
    session: false,
  }),
  (req, res) => {
    usersController.login(req, res);
  }
);

export default router;
