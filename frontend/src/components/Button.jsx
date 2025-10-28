import React from 'react'
import { motion } from "framer-motion"
import { Loader } from 'lucide-react'

const Button = ({text, isLoading, loadingText, ...props}) => {
    return (
        <motion.button
            {...props}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600
                     text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900
                     transition duration-200"
        >
            {
                isLoading ? (
                    loadingText || <Loader className="animate-spin mx-auto size-4"/>
                ): text
            }
        </motion.button>
    )
}
export default Button
