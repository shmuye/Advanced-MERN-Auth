import React, {useState} from 'react'
import {motion} from "framer-motion"
import Input from "../components/Input.jsx";
import { User, Mail, Lock, Loader } from 'lucide-react'
import {Link} from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter.jsx";
import {useNavigate} from "react-router-dom";
import {useAuthStore} from "../store/authStore.js";
import Button from "../components/Button.jsx";

const Signup = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const { signup, error, isLoading } = useAuthStore()

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await  signup(email, password, name)
            navigate("/verify-email")
        }catch (error) {
           console.log(error)
        }
    }
    return (
        <motion.div
         initial={{opacity: 0, y:100}}
         animate={{opacity: 1, y:0}}
         transition={{duration: 0.5}}
         className="max-w-md w-full bg-slate-800 bg-opacity-50 backdrop-filter backdrop-blur-xl  rounded-2xl
         shadow-xl overflow-hidden"
        >
            <div className="p-8">
              <h2 className="text-3xl text-center font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-500
              text-transparent bg-clip-text">Create Account</h2>

                <form onSubmit={handleSignUp}>
                   <Input
                       type="text"
                       placeholder="Full Name"
                       icon={User}
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                   />
                    <Input
                       type="email"
                       placeholder="Email Address"
                       icon={Mail}
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                   />
                    <Input
                       type="password"
                       placeholder="Password"
                       icon={Lock}
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                   />
                    {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
                   <PasswordStrengthMeter password={password}/>
                    <Button
                        type="submit"
                        isLoading={isLoading}
                        disabled={isLoading}
                        text="Sign Up"
                    />
                </form>
            </div>
            <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
                <p className="text-sm text-gray-400">
                    Already have an account? <Link to="/login" className="text-green-400 hover:underline">Login</Link>
                </p>
            </div>
        </motion.div>
    )
}
export default Signup
