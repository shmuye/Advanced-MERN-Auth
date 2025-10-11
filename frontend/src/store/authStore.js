import { create } from 'zustand'
import axios from 'axios'

const API_URL = 'http://localhost:3000'
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
    }
}))