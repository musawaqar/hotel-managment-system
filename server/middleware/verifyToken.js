const { configDotenv } = require("dotenv");
configDotenv();
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) {
        return res.status(401).json({success:false, user:null, message:"Unauthorized"});
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.status(403).json({success:false, user:null, message:"Forbidden"});
        }
        req.email = decoded.email;
        req.username = decoded.username;
        req.role = decoded.role;
        next();
    })
    
};

module.exports = verifyToken;

