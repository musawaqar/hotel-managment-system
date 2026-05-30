import AuthService from "../services/auth.service.js";
import { generateToken } from "../utils/generateToken.js";

const User = require("../Models/User.js")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const { default: AuthController } = require("../controllers/auth.controller.js");

export const signupController = async(req,res) => {
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


export const loginController = async(req,res)=>{
    try {
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user)
        {
            return res.status(400).json({message:"User not Found!"})
        }
        const isMatch = await bcrypt.compare(password, user.password);``
        if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = await generateToken()
    res.json({ message: "Login successful", userId: user._id });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = router;