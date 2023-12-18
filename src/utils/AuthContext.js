import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [jwt, setJwt] = useState('');

  const setAuthenticated = (data) => {
    const receivedJwt = data; 
    if (receivedJwt) {
      console.log('Setting JWT:', receivedJwt);
      setJwt(receivedJwt);
    }
  };

  return (
    <AuthContext.Provider value={{ jwt, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);