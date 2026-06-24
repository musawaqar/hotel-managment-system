const User = require ("../models/User");
const hashPassword  =require( "../utils/hashPassword");
const bcrypt = require( "bcrypt");

class AuthService {
    constructor() {

    }

    static async Signup (userName , email , password , role) {
        try {
            const existingUser = await User.findOne({ $or:[{email}]})
            if (existingUser) {
                return {success:false, already:true, message:"User Already Exists"};
            }
            const hashedPassword = await hashPassword(password);

            const newUser = new User({
                userName,
                email,
                password:hashedPassword,
                role
            });
            await newUser.save()
            return {success:true, already:false, message:"Signup Successful!"};

        } catch (error) {
            console.error("Error While Signup, ", error);
            return {success:false, message:"User Already Exists"};
        }
    }

    static async Login (userName , password) {
        try {
            const user = await User.findOne({username: userName})
            if(!user) {
                return {success:false, user:false, message:"User not found!"}
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return {success:false, message:"Signup Successful!"};
            }
        } catch (error) {
            console.error("Error While Signup, ", error);
            return {success:false, message:"User Already Exists"};
        }
    }

}



module.exports = AuthService;