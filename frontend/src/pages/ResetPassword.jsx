import React, {useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {Loader, Lock} from 'lucide-react'
import { motion }  from "framer-motion"
import Input from "../components/Input.jsx";
import {useAuthStore} from "../store/authStore.js";
import toast from "react-hot-toast";
import Button from "../components/Button.jsx";

const ResetPassword = () => {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const { resetPassword, isLoading, error, message } = useAuthStore()

    const { token } = useParams()
    const navigate = useNavigate()

    const handleResetPassword = async (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            alert("Passwords do not match")
            return;
        }
        try{
            await resetPassword(token, password)
            toast.success("Password reset successfully, redirecting to login page...")
            setTimeout(() => {
                navigate("/login")
            }, 2000)

        }catch(error) {
            console.log(error)
            toast.error(error.message || "Error resetting password")
        }

    }
    return (
        <motion.div
            initial={{opacity: 0, y:20}}
            animate={{opacity: 1, y:0}}
            transition={{duration: 0.5}}
            className="max-w-md w-full bg-slate-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl
            shadow-xl overflow-hidden"
        >
            <div className="p-8">
                <h2 className="text-3xl text-center font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                    Reset Password
                </h2>
                { error && <p className="text-red-500 font-semibold mb-2">{error}</p>}
                { message && <p className="text-green-500 font-semibold mb-2">{message}</p>}

                <form onSubmit={handleResetPassword}>
                    <Input
                        icon={Lock}
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Input
                        icon={Lock}
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}

                    />
                    <Button
                        type="submit"
                        isLoading={isLoading}
                        disabled={isLoading}
                        text="Reset Password"
                        loadingText="Resetting..."
                    />
                </form>
            </div>
        </motion.div>
    )
}
export default ResetPassword
