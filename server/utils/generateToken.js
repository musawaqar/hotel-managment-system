const jwt = require("jsonwebtoken")

const generateToken = async (username, role) => {
    try {
        const token = jwt.sign({username, role}, process.env.JWT_SECRET, {expiresIn: "7d"});
        return token;
    } catch (error) {
        console.error("Error while making token, ", error);
    }
}

module.exports = {generateToken};