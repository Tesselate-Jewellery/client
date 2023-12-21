import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState({
        jwt: '',
        role: '', // Add the role state
        userID: '', 
    });
    

    const setAuthenticated = ({ jwt, role, userID }) => {
        // console.log(`Setting JWT: ${jwt} and Role: ${role} and userID: ${userID}`);
        setAuthData({ jwt, role, userID });
    };


    return (
        <AuthContext.Provider value={{ ...authData, setAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);