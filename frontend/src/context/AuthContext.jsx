import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const setUserInfo=(user)=>{
        setUser(user)
    }
    const router = useNavigate();
    const login = async (email, password) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/login`, { email, password });
            setUser(response.data.user);
            if (response.status === 200) {
                router.push('/')
            }
            const responseData = JSON.stringify(response.data.user);
            localStorage.setItem('userInfo', JSON.stringify(responseData));
            localStorage.setItem('token', response.data.token); // Save the token in local storage
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : error.message);
        }
    };

    const register = async (userData) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/register`, userData);
            setUser(response.data.user);
            const responseData = JSON.stringify(response?.data?.user);
            localStorage.setItem('userInfo',  JSON.stringify(responseData));
            localStorage.setItem('token', response.data.token); 
        } catch (error) {
            console.error('Registration error:', error.response ? error.response.data : error.message);
        }
    };
    const logout = async () => {
        try {
            await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            localStorage.removeItem('userInfo');
            localStorage.removeItem('token');
            setUser(null);
            router.push('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    // const logout = () => {
    //     localStorage.removeItem('userInfo');
    //     localStorage.removeItem('token');
    //     setUser(null);
    // };

    return (
        <AuthContext.Provider value={{ user, login, register, logout,setUserInfo }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
