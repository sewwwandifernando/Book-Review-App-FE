import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = async (name, email, username, password) => {
        setLoading(true);
        try {
            const response = await fetch('http://51.21.2.113:3000/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    username,
                    password,
                    roleId: user?.roleId || 2, // Default role ID, you can change this as needed
                }),
            });
            const data = await response.json();
            setLoading(false);
            if (!data.error) {
                alert('User Successfully Created');
                return data.payload; // Handle success message
            } else {
                throw new Error('Sign-up failed');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error during sign-up:', error);
            throw error;
        }
    };

    const login = async (username, password) => {
        setLoading(true);
        try {
            const response = await fetch('http://51.21.2.113:3000/users/sign-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            const data = await response.json();
            setLoading(false);

            if (!data.error) {
                // Save JWT to localStorage and set user details
                localStorage.setItem('token', data.payload); // Storing the JWT token
                const tokenPayload = JSON.parse(atob(data.payload.split('.')[1]));
                setUser({
                    username: tokenPayload.username,
                    role: tokenPayload.role,
                    roleId: tokenPayload.roleId,
                    id: tokenPayload.id
                });
                alert('Login Successful');
                return data.payload;
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error during login:', error);
            throw error;
        }
    };

    const logOut = () => {
        // Remove token from localStorage
        localStorage.removeItem('token');

        // Clear user state
        setUser(null);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const tokenPayload = JSON.parse(atob(token.split('.')[1]));
            setUser({
                username: tokenPayload.username,
                role: tokenPayload.role,
                roleId: tokenPayload.roleId,
                id: tokenPayload.id
            });
        } else {
            setUser(null)
        }
        setLoading(false);
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        login,
        logOut
    }

  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider