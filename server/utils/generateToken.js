const jwt = require("jsonwebtoken")

const generateToken = async (username, email, role) => {
    try {
        const token = jwt.sign({username, email, role}, process.env.JWT_SECRET, {expiresIn: "7d"});
        return token;
    } catch (error) {
        console.error("Error while making token, ", error);
    }
}

module.exports = {generateToken};