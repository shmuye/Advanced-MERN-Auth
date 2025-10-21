import React, {useState} from 'react'
import {useAuthStore} from "../store/authStore.js";

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const { isLoading, forgotPassword, error } = useAuthStore()

    return (
        <div>ForgotPassword</div>
    )
}
export default ForgotPassword
