const express = require("express")
const authRoutes = express.Router()
const { signupController, loginController } = require("../controllers/auth.controller.js");

authRoutes.post("/signup", signupController);

authRoutes.post("/login", loginController);

module.exports = authRoutes;