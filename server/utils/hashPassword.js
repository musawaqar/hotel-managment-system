import brcypt from "bcrypt";

export const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hashPassword(password, saltRounds);
        return hashedPassword;

    } catch (error) {
        console.error("Error while hashing, ", error);
        throw new Error("Error while hashing password");
    }
}


