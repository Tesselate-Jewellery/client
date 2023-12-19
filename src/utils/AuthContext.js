import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState({
        jwt: '',
        role: '', // Add the role state
    });
    

    const setAuthenticated = ({ jwt, role }) => {
        console.log(`Setting JWT: ${jwt} and Role: ${role}`);
        setAuthData({ jwt, role });
    };


    return (
        <AuthContext.Provider value={{ ...authData, setAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);