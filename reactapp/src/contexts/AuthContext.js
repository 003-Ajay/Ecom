import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';
import { setToken, getToken, removeToken } from '../utils/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = getToken();
    if (savedToken) {
      try {
        const decoded = jwtDecode(savedToken);
        setUser({
          username: decoded.sub,
          role: decoded.authorities?.[0]?.authority?.replace('ROLE_', '') || 'USER'
        });
        setTokenState(savedToken);
      } catch (error) {
        console.error('Invalid token', error);
        removeToken();
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const receivedToken = response.data;

      setToken(receivedToken);     // save in localStorage
      setTokenState(receivedToken); // save in state

      const decoded = jwtDecode(receivedToken);
      setUser({
        email: decoded.sub,
        role: decoded.authorities[0].authority.replace('ROLE_', '')
      });
    } catch (error) {
      console.error("❌ Login failed:", error);
      throw new Error(error.response?.data || "Login failed");
    }
  };

  const signup = async (data) => {
    await api.post('/auth/register', data);
  };

  const logout = () => {
    removeToken();
    setUser(null);
    setTokenState(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
