import React, {useEffect} from 'react'
import FloatingShape from "./components/FloatingShape.jsx";
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import EmailVerificationPage from "./pages/EmailVerificationPage.jsx";
import {Toaster} from "react-hot-toast";
import {useAuthStore} from "./store/authStore.js";
import HomePage from "./pages/HomePage.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";


// protect routes that need authentication

const ProtectedRoute = ({children}) => {
    const { isAuthenticated, user } = useAuthStore()
    if(!isAuthenticated) {
        return <Navigate to="/login" replace />
    }
    if(!user.isVerified) {
        return <Navigate to="/verify-email" replace />
    }
    return children
}

//redirect authenticated users to the home page

const RedirectAuthenticatedUser = ({children}) => {
    const { isAuthenticated, user } = useAuthStore()
    if(isAuthenticated && user.isVerified) {
        return <Navigate to="/" replace />
    }
    return children
}

const App = () => {
    const { isCheckingAuth, checkAuth } = useAuthStore()
    useEffect(() => {
        checkAuth()
    },[checkAuth])

    if(isCheckingAuth) return <LoadingSpinner />
    return (
        <div className="z-0 min-h-screen bg-gradient-to-br from-cyan-300  to-sky-400
        flex justify-center items-center relative overflow-hidden ">
              <FloatingShape color="bg-black" size="w-64 h-64" top="-5%" left="10%" delay={0} />
              <FloatingShape color="bg-black" size="w-48 h-48" top="70%" left="80%" delay={5} />
              <FloatingShape color="bg-black"  size="w-32 h-32" top="40%" left="-10%" delay={2} />
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                } />
                <Route path="/login" element={

                    <RedirectAuthenticatedUser>
                        < Login />
                    </RedirectAuthenticatedUser>

                } />
                <Route path="/signup" element={
                    <RedirectAuthenticatedUser>
                        < Signup />
                    </RedirectAuthenticatedUser>
                } />
                <Route path="/forgot-password" element={
                    <RedirectAuthenticatedUser>
                       <ForgotPassword />
                    </RedirectAuthenticatedUser>
                } />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/verify-email" element={<EmailVerificationPage />} />
            </Routes>
            <Toaster />
        </div>
    )
}
export default App
