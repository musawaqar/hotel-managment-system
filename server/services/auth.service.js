const User = require ("../models/User");
const hashPassword  =require( "../utils/hashPassword");
const bcrypt = require( "bcrypt");

class AuthService {
    constructor() {

    }

    static async Signup (signupCreds) {
        try {
            const {name, username , email , password , role} = signupCreds;
            const existingUser = await User.findOne({ $or:[{email}]})
            if (existingUser) {
                return {success:false, already:true, message:"User Already Exists"};
            }
            const existingUser2 = await User.findOne({ $or:[{username}]})
            if (existingUser2) {
                return {success:false, already:true, message:"User Already Exists"};
            }

            const hashedPassword = await hashPassword(password);

            const newUser = new User({
                name,
                username,
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

    static async Login (loginCreds) {
        try {
            const {username, password} = loginCreds;
            const user = await User.findOne({username: username})
            if(!user) {
                return {success:false, user:false, message:"User not found!"}
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return {success:false, message:"Invalid Credentials!", user:true};
            }
            return {success:true, message:"Login Successful!", user:true};

        } catch (error) {
            console.error("Error While Login, ", error);
            return {success:false, message:"Login Failed!"};
        }
    }

}



module.exports = AuthService;