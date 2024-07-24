import { Router } from "express";
import usersController from "../controllers/users.controller.js";
import passport from "passport";
const router = Router();

router.post("/register", passport.authenticate("register"), (req, res) => {
  usersController.register(req, res);
});

router.post("/login", passport.authenticate("login"), (req, res) => {
  usersController.login(req, res);
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email	",
      "https://www.googleapis.com/auth/userinfo.profile	",
    ],
    session: false,
  }),
  (req, res) => {
    usersController.login(req, res);
  }
);

router.get("/current", (req, res) => {
  usersController.getCurrent(req, res);
});

export default router;
