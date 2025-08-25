// File: reactapp/src/App.js
// Updated to add signup route and additional admin routes

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Categories from './pages/Categories';
import Inventory from './pages/Inventory';
import Analytics from './pages/Analytics';
// import ProductAnalytics from './pages/ProductAnalytics';
// import OrderAnalytics from './pages/OrderAnalytics';
import Configuration from './pages/Configuration';
import UserManagement from './pages/UserManagement';
// import SecuritySettings from './pages/SecuritySettings';
// import APIManagement from './pages/APIManagement';
// import AuditLogs from './pages/AuditLogs';
import ProtectedRoute from './components/ProtectedRoute';
import SecuritySettings from './pages/SecuritySettings';
import APIManagement from './pages/APIManagement';
import AuditLogs from './pages/AuditLogs';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/products" element={<ProtectedRoute roles={['PRODUCT_MANAGER', 'ECOMMERCE_MANAGER', 'SYSTEM_ADMIN']}><Products /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute roles={['ORDER_MANAGER', 'ECOMMERCE_MANAGER', 'SYSTEM_ADMIN']}><Orders /></ProtectedRoute>} />
          <Route path="/customers" element={<ProtectedRoute roles={['ORDER_MANAGER', 'CUSTOMER_SERVICE', 'ECOMMERCE_MANAGER', 'SYSTEM_ADMIN']}><Customers /></ProtectedRoute>} />
          <Route path="/categories" element={<ProtectedRoute roles={['PRODUCT_MANAGER', 'ECOMMERCE_MANAGER', 'SYSTEM_ADMIN']}><Categories /></ProtectedRoute>} />
          <Route path="/inventory" element={<ProtectedRoute roles={['PRODUCT_MANAGER', 'ECOMMERCE_MANAGER', 'SYSTEM_ADMIN']}><Inventory /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute roles={['ORDER_MANAGER','ECOMMERCE_MANAGER', 'SYSTEM_ADMIN']}><Analytics /></ProtectedRoute>} />
          <Route path="/configuraton" element={<ProtectedRoute roles={['ECOMMERCE_MANAGER', 'SYSTEM_ADMIN']}><Configuration /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute roles={['ECOMMERCE_MANAGER', 'SYSTEM_ADMIN']}><UserManagement /></ProtectedRoute>} />
          <Route path="/security-settings" element={<ProtectedRoute roles={['ECOMMERCE_MANAGER', 'SYSTEM_ADMIN']}><SecuritySettings /></ProtectedRoute>} />
          <Route path="/apis" element={<ProtectedRoute roles={['ECOMMERCE_MANAGER', 'SYSTEM_ADMIN']}><APIManagement /></ProtectedRoute>} />
          <Route path="/audit-logs" element={<ProtectedRoute roles={['ECOMMERCE_MANAGER', 'SYSTEM_ADMIN']}><AuditLogs /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;