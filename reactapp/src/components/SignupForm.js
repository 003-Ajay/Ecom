
// File: reactapp/src/components/SignupForm.js
// Updated for better error handling and password confirmation

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const { signup }  = useAuth();
  const navigate = useNavigate();
  const password = watch('passwordHash'); // For password confirmation

 const onSubmit = async (data) => {
  try {
    console.log("🔹 Form data before signup:", data); // ✅ Debug log
    await signup({
      username: data.username,
      email: data.email,
      passwordHash: data.passwordHash, // backend expects passwordHash
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      active: true,
      emailVerified: false
    });
    console.log("✅ Signup completed, navigating to /login"); // ✅ Debug log
    navigate('/login');
  } catch (error) {
    console.error("❌ Signup error:", error); // ✅ Debug log
    const message = error.response?.status === 409
      ? 'Username or email already exists'
      : error.message || 'Signup failed';
    alert(`Signup failed: ${message}`);
  }
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input
          {...register('username', { required: 'Username is required', minLength: { value: 3, message: 'Minimum 3 characters' } })}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          {...register('passwordHash', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
        {errors.passwordHash && <p className="text-red-500 text-sm">{errors.passwordHash.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          type="password"
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: value => value === password || 'Passwords do not match'
          })}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">First Name</label>
        <input
          {...register('firstName', { required: 'First name is required' })}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Last Name</label>
        <input
          {...register('lastName', { required: 'Last name is required' })}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <select
          {...register('role', { required: 'Role is required' })}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        >
          <option value="">Select a role</option>
          <option value="PRODUCT_MANAGER">Product Manager</option>
          <option value="ORDER_MANAGER">Order Manager</option>
          <option value="CUSTOMER_SERVICE">Customer Service</option>
          <option value="ECOMMERCE_MANAGER">E-Commerce Manager</option>
          <option value="SYSTEM_ADMIN">System Admin</option>
        </select>
        {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
