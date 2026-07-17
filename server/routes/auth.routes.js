const express = require("express")
const authRoutes = express.Router()
const { signupController, loginController, logoutController } = require("../controllers/auth.controller.js");

authRoutes.post("/signup", signupController);

authRoutes.post("/login", loginController);

authRoutes.get('/logout', logoutController);

module.exports = authRoutes;