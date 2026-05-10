const jwt = require("jsonwebtoken");

const verifyToken = async(req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) {
        res.status(401).json({success:false, user:null, message:"Unauthorized"});
    }

    jwt.verify(token, process.env.JWT_SECRET)
    
}

