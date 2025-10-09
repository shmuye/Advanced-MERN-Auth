import bcrypt from "bcryptjs";
import crypto from "crypto";

import {generateTokenAndSetCookie} from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendPasswordResetEmail, sendResetSuccessEmail }  from "../mailtrap/emails.js";

import {User} from "../models/user.model.js";
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

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try{
        const user = await User.findOne({email})
        if(!user){
            res.status(400).json({message: "user not found"});
        }
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;
        await user.save()

        /*   send email*/

        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`)
        res.status(200).json({
            success: true,
            message: "Password reset link sent to your email"
        })
    }catch(error){
        console.log("error sending password reset email", email)
        res.status(400).json({success: false, message: error.message})
    }
}

export const resetPassword = async (req, res) => {
     const { token } = req.params;
     const { password } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: {$gt: Date.now()},
        })

        if (!user) {
            res.status(400).json({status: false, message: "invalid or expired token"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;

        await user.save()
        await sendResetSuccessEmail(user.email)

        res.status(200).json({
            success: true,
            message: "Password reset successful",
        })
    }catch(error){
        console.log("Error in reset password", error);
        res.status(400).json({success: false, message: error.message})
    }
}

export const checkAuth = async (req, res) => {

    try {
        const user = await User.findById(req.userId).select('-password')
        if (!user) {
            res.status(401).json({success: false, message: "user not found"});
        }
        res.status(200).json({success: true, user});
    }catch(error){
        console.log("Error in checking authentication", error)
        res.status(400).json({success: false, message: error.message})
    }

}