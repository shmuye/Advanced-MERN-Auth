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
    }
}))