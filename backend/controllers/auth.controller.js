import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {generateTokenAndSetCookie} from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail }  from "../mailtrap/emails.js";
export const signup = async (req, res) => {
    const { email, password,name } = req.body;
    try {
        if(!email || !password || !name) {
            throw new Error("All fields are required");
        }

        const userAlreadyExists = await User.findOne({email})
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

        /*jwt*/

        generateTokenAndSetCookie(res, user._id)
        await sendVerificationEmail(user.email, verificationToken)
        res.status(201).json({
            success: true,
            message: "user created successfully",
            user: {
                ...user._doc,
                  password: undefined,
            }
        })


    }catch(err){
        return res.status(400).json({success: false, message: err.message})
    }



}

export const verifyEmail = async (req, res) => {

    const { code } = req.body;
    try{
        const user = User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: {$gt: Date.now()}
        })
        if(!user){
            res.send.status(400).json({
                success: false,
                message: "invalid or expired verification code" });
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        await user.save()
        await sendWelcomeEmail(user.email, user.name)
        res.status(200).json({
            success: true,
            message: "email verification successfully",
            user:{
                ...user_doc,
                password: undefined,

            }
        })
    }catch(err){
        console.log("error verifying your email", email)
        return res.status(500).json({success: false, message: "server error" });
    }

}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email})
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!user || !passwordMatch) {
            res.status(400).json({
                success: false,
                message: "invalid credentials"
            });
        }

        generateTokenAndSetCookie(res, user._id)
        user.lastLogin = new Date();

        await user.save()

        res.status(200).json({
            success: true,
            message: "login successful",
            user:{
                ...user._doc,
                  password: undefined,
            }
        })

    }catch(error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "logged out successfully",
    })
}