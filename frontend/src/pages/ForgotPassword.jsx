import React, {useState} from 'react'
import { motion } from 'framer-motion'
import {Link} from "react-router-dom";
import {ArrowLeft} from 'lucide-react'

import {useAuthStore} from "../store/authStore.js";
import Input  from "../components/Input.jsx";
import {Mail, Loader} from 'lucide-react'

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const { isLoading, forgotPassword, error } = useAuthStore()

    const handleSubmit = async (e) => {

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
                    Forgot Password
                </h2>
                {
                    isSubmitted ? (
                        <form onSubmit={handleSubmit}>
                            <p>Enter your email address and we will send you a link to reset your password</p>
                            <Input
                               icon={Mail}
                               type="email"
                               placeholder="Email Address"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               required
                            />
                            <motion.button
                                whileHover={{scale: 1.02}}
                                whileTap={{scale: 0.98}}
                                type="submit"
                                className="cursor-pointer mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600
                     text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900
                     transition duration-200"
                            >
                                {
                                    isLoading ? <Loader className="size-6 animate-spin mx-auto" />: "Send Reset Link"
                                }

                            </motion.button>
                        </form>
                    ) : (
                       <div>
                           <motion.div
                               initial={{scale: 0}}
                               animate={{scale: 1}}
                               transition={{type: "spring", stiffness: 500, damping: 30}}
                               className="w-16 h-16  bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                           >
                            <Mail className="h-8 w-8  text-white"/>
                           </motion.div>
                           <p className="text-gray-300 mb-6">
                               if the account exists for this {email}, we will send you a link to reset your password.
                           </p>

                       </div>
                    )
                }
            </div>
            <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
               <Link to="/login" className="text-sm text-green-400 hover:underline flex items-center">
                   <ArrowLeft className="h-4 w-4 mr-2"/>
                   Back to Login
               </Link>
            </div>

        </motion.div>
    )
}
export default ForgotPassword
