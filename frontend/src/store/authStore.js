import { create } from 'zustand'
import axios from 'axios'

const API_URL = "http://localhost:3000";
console.log(API_URL)
axios.defaults.withCredentials = true;

export const useAuthStore = create(set => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

    signup: async ( email, password, name) => {
        set({isLoading: true, error: null})
        try {
            const response = await axios.post(`${API_URL}/auth/signup`, {email, password, name})
            set({user: response.data.user, isAuthenticated: true, isLoading: false})
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Error creating account"
            set({error: errorMessage , isLoading: false})
            throw error;
        }
    },
    login: async (email, password) => {
        set({isLoading: true, error: null})
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {email, password})
            set({user: response.data.user, isAuthenticated: true, isLoading: false, error: null})
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Error logging in"
            set({error: errorMessage , isLoading: false})
            throw error
        }
    },
    logout: async () => {
        set({isLoading: true, error: null})
        try {
            const response = await axios.post(`${API_URL}/auth/logout`)
            set({user: null, isAuthenticated: false, isLoading: false, error: null})
        }catch(error) {
           set({error: "Error logging out", isLoading: false})
            throw error;
        }
    },
    verifyEmail: async (code) => {
          set({isLoading: true, error: null})
        try {
            const response = await axios.post(`${API_URL}/auth/verify-email`, {code})
            set({user: response.data.user, isAuthenticated: true, isLoading: false})
            return response.data
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Error verifying email"
            set({error: errorMessage , isLoading: false})
            throw error;
        }
    },
    checkAuth: async () => {
        set({error: null, isCheckingAuth: true})
        try {
           const response = await axios.get(`${API_URL}/check-auth`, {})
            set({user: response.data.user, isCheckingAuth: false, isAuthenticated: true })
        }catch(error) {
            set({error: null, isCheckingAuth: false, isAuthenticated: false })
        }
    },
    forgotPassword: async (email) => {
        set({isLoading: true, error: null})
        try {
            const response = await axios.post(`${API_URL}/auth/forgot-password`, {email})
            set({message: response.data.message, isAuthenticated: true, isLoading: false})
        } catch (error) {
           set({isLoading: false, error: error.response?.data?.message || "Error sending forgot password email"})
            throw error;
        }
    },
    resetPassword: async (token, password) => {
        set({isLoading: true, error: null})
        try {
            const response = await axios.post(`${API_URL}/auth/reset-password/${token}`, {password})
            set({message: response.data.message, isLoading: false, error: null})
        } catch (error) {
            set({isLoading: false, error: error.response?.data?.message || "Error resetting password"})
            throw error;
        }
    }
}))