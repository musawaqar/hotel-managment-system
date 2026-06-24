const  AuthService = require("../services/auth.service.js");
const { generateToken } = require ("../utils/generateToken.js");

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

const signupController = async(req,res) => {
    try {
        const {userName , email , password , role} = req.body;
        const result = await AuthService.Signup(userName , email , password , role);
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
        const {userName,password} = req.body
        const result = await AuthService.Login(userName , password);
        if (!result.success) {
            if (result?.already) {
                res.status(409).json(result);
            } else {
                res.status(400).json(result);
            }
        }
    const token = await generateToken()
    res.json({ message: "Login successful", userId: user._id });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    loginController,
    signupController
}
