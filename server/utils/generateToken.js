const jwt = require("jsonwebtoken")

const generateToken = async (userName, role) => {
    try {
        const token = jwt.sign({userName, role}, process.env.SEC_JWT_KEY, {expiresIn: "7d"});
        return token;
    } catch (error) {
        console.error("Error while making token, ", error);
    }
}

module.exports = {generateToken};