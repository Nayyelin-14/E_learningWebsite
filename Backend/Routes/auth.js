const express = require("express");
const router = express.Router();
const authControllers = require("../Controllers/auth");
router.post("/login", authControllers.LoginUser);
router.post("/register", authControllers.registerUser);
router.post(
  "/account_verification/:token",
  authControllers.emailConfirmwithToken
);
module.exports = router;
