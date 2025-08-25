import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, token, logout, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  if (!user || !token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    if (decoded.exp < now) {
      logout(); // clear token + user
      return <Navigate to="/login" />;
    }
  } catch (e) {
    logout();
    return <Navigate to="/login" />;
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
