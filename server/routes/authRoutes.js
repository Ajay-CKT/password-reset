const express = require("express");
const authController = require("../controller/authController");

const authRoutes = express.Router();

authRoutes.post("/register", authController.register);

authRoutes.post("/login", authController.login);

authRoutes.post("/forgot", authController.forgot);

authRoutes.post("/reset/:token", authController.reset);

module.exports = authRoutes;
