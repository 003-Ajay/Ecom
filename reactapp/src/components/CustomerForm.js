// File: reactapp/src/components/CustomerForm.js

import React from 'react';
import { useForm } from 'react-hook-form';

const CustomerForm = ({ onSubmit, defaultValues }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>First Name</label>
        <input {...register('firstName', { required: 'Required' })} className="block w-full border p-2" />
        {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
      </div>
      <div>
        <label>Last Name</label>
        <input {...register('lastName', { required: 'Required' })} className="block w-full border p-2" />
        {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
      </div>
      <div>
        <label>Email</label>
        <input type="email" {...register('email', { required: 'Required' })} className="block w-full border p-2" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label>Phone</label>
        <input {...register('phone')} className="block w-full border p-2" />
      </div>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save</button>
    </form>
  );
};

export default CustomerForm;