const express = require("express");
const router = express.Router();
const authControllers = require("../Controllers/auth");
const authMiddleware = require("../Middleware/auth");
router.post("/login", authControllers.LoginUser);
router.post("/register", authControllers.registerUser);
router.post(
  "/account_verification/:token",
  authMiddleware,
  authControllers.emailConfirmwithToken
);
router.get("/getCurrentUser", authMiddleware, authControllers.checkUser);
module.exports = router;
