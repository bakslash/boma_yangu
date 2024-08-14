import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin, logout as apiLogout } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    const data = await apiLogin(username, password);
    setUser(data.user);
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setUser({}); // Assume user is logged in if token exists
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
