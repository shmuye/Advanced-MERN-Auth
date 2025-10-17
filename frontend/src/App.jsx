import React from 'react'
import FloatingShape from "./components/FloatingShape.jsx";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import EmailVerificationPage from "./pages/EmailVerificationPage.jsx";

const App = () => {
    return (
        <div className="z-0 min-h-screen bg-gradient-to-br from-cyan-300  to-sky-400
        flex justify-center items-center relative overflow-hidden ">
              <FloatingShape color="bg-black" size="w-64 h-64" top="-5%" left="10%" delay={0} />
              <FloatingShape color="bg-black" size="w-48 h-48" top="70%" left="80%" delay={5} />
              <FloatingShape color="bg-black"  size="w-32 h-32" top="40%" left="-10%" delay={2} />
            <Routes>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/login" element={< Login />} />
                <Route path="/signup" element={< Signup />} />
                <Route path="/forgot-password" element={<div>Forgot Password</div>} />
                <Route path="/reset-password" element={<div>Reset Password</div>} />
                <Route path="/verify-email" element={<EmailVerificationPage />} />

            </Routes>
        </div>
    )
}
export default App
