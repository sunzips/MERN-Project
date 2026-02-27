import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');
        const role = localStorage.getItem('role');
        const name = localStorage.getItem('name');
        if (token) {
            setUser({ token, refreshToken, role, name });
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const res = await axios.post('http://localhost:5001/api/auth/login', { email, password });
            const { token, refreshToken, role, name } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('role', role);
            localStorage.setItem('name', name);
            setUser({ token, refreshToken, role, name });
            if (role === 'admin') {
                router.push('/admin/dashboard');
            } else {
                router.push('/products');
            }
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Login failed' };
        }
    };

    const register = async (name, email, password) => {
        try {
            const res = await axios.post('http://localhost:5001/api/auth/register', { name, email, password });
            const { token, refreshToken, role, name: userName } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('role', role);
            localStorage.setItem('name', userName);
            setUser({ token, refreshToken, role, name: userName });
            router.push('/products');
            return { success: true };
        } catch (error) {
            console.error('Registration error:', error.response?.data || error.message);
            return { success: false, message: error.response?.data?.message || 'Registration failed' };
        }
    };

    const updateProfile = async (profileData) => {
        try {
            const res = await axios.put('http://localhost:5001/api/users/profile', profileData, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            const { name } = res.data.user;
            localStorage.setItem('name', name);
            setUser(prev => ({ ...prev, name }));
            return { success: true, message: res.data.message };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Update failed' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('role');
        localStorage.removeItem('name');
        setUser(null);
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updateProfile, isAdmin: user?.role === 'admin', loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
