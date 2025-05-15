import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem('token');
  const storedUserId = localStorage.getItem('userId');

  const [token, setToken] = useState(storedToken || null);
  const [userId, setUserId] = useState(storedUserId || null);

  const login = (id, token) => {
    setUserId(id);
    setToken(token);
    localStorage.setItem('userId', id);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUserId(null);
    setToken(null);
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ userId, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
