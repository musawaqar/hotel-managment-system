import User from "../Models/User";



class AuthController {
    constructor() {

    }

    static async Signup (userName , email , password , role) {
        try {
            const existingUser = await User.findOne({ $or:[{email}]})
                    if (existingUser) {
                        return {success:false, already:true, message:"User Already Exists"};
                    }
            const newUser = new User({
                userName,
                email,
                password,
                role
            });
            await newUser.save()
            return {success:true, already:false, message:"Signup Successful!"};

        } catch (error) {
            console.error("Error While Signup, ", error);
            return {success:false, message:"User Already Exists"};
        }
    }

    static async Login (userName , email , password , role) {
        try {
            const user = await User.findOne({email})
            if(!user) {
                return {success:false, user:false, message:"User not found!"}
            }
            const isMatch = await bcrypt.compare(password, user.password);``
        } catch (error) {
            console.error("Error While Signup, ", error);
            return {success:false, message:"User Already Exists"};
        }
    }

}



export default AuthController;