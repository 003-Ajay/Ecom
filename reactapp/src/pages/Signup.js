
// File: reactapp/src/pages/Signup.js
// Page to render the signup form

import React from 'react';
import SignupForm from '../components/SignupForm';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Signup</h2>
        <SignupForm />
        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
