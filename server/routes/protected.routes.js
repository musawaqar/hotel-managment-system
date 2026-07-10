const express = require("express");
const verifyToken =  require ("../middleware/verifyToken");
const protectedRoutes = express.Router();

protectedRoutes.get('/protected-route', verifyToken, (req, res) => {
    res.status(200).json({success:true, user:req.username});
})


module.exports = protectedRoutes;
