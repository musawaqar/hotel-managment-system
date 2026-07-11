const  AuthService = require("../services/auth.service.js");
const { generateToken } = require ("../utils/generateToken.js");

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

const signupController = async(req,res) => {
    try {
        const {signupCreds} = req.body;
        const result = await AuthService.Signup(signupCreds);
        if (!result.success) {
            if (result?.already) {
                res.status(409).json(result);
            } else {
                res.status(400).json(result);
            }
        }
        res.status(201).json(result);
    } catch (err) {
        console.error("Error at Signup Endpoint, ", err);
        res.status(500).json({ success:false, message: "Server error" });
    }
};


const loginController = async(req,res)=>{
    try {
        const {loginCreds} = req.body
        const result = await AuthService.Login(loginCreds);
        if (!result.success) {
            if (result?.already) {
                res.status(409).json(result);
            } else {
                res.status(400).json(result);
            }
        }
    const token = await generateToken(loginCreds.username, result.email, "customer",);
    res.cookie('authToken', token, {
        sameSite: 'strict',
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.status(200).json(result);
    } catch (error) {
        console.error("Error While Logging In (controller), ", error);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    loginController,
    signupController
}
