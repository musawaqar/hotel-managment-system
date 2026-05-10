const express = require("express")
const router = express.Router()
const User = require("../Models/User.js")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const { default: AuthController } = require("../controllers/auth.controller.js");

router.post("/signup",async(req,res)=>{
    try {
        const {userName , email , password , role} = req.body;
        const result = await AuthController.Signup(userName , email , password , role);
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
});


router.post("/login",async(req,res)=>{
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
    res.json({ message: "Login successful", userId: user._id });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})
module.exports = router;