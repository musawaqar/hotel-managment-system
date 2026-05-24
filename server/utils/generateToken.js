import jwt from "jsonwebtoken";




export const generateToken = async (username, role) => {
    try {
        const token = jwt.sign({username, role}, process.env.SEC_JWT_KEY, {expiresIn: "1"});
        return token;
    } catch (error) {
        console.error("Error while making token, ", error);
    }
}