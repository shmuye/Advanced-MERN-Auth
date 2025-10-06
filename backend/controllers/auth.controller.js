import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const signup = async (req, res) => {
    const { email, password,name } = req.body;
    try {
        if(!email || !password || !name) {
            throw new Error("All fields are required");
        }

        const userAlreadyExists = User.findOne({email})
        if(userAlreadyExists){
            return res.status(400).json({ success: false, message: "user already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        })
        await user.save();
        return res.status(201).json(user)

    }catch(err){
        return res.status(400).json({success: false, message: err.message})
    }



}

export const login = async (req, res) => {
    const { email, password } = req.body;
}

export const logout = async (req, res) => {
    console.log("logged out successfully")
}