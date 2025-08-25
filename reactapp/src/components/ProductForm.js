// File: reactapp/src/components/ProductForm.js

import React from 'react';
import { useForm } from 'react-hook-form';

const ProductForm = ({ onSubmit, defaultValues }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Name</label>
        <input {...register('name', { required: 'Required', maxLength: 255 })} className="block w-full border p-2" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <label>Description</label>
        <textarea {...register('description', { required: 'Required' })} className="block w-full border p-2" />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
      </div>
      <div>
        <label>Price</label>
        <input type="number" {...register('price', { required: 'Required', min: 0.01 })} className="block w-full border p-2" />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      </div>
      <div>
        <label>Category</label>
        <input {...register('category', { required: 'Required' })} className="block w-full border p-2" />
        {errors.category && <p className="text-red-500">{errors.category.message}</p>}
      </div>
      <div>
        <label>Stock Quantity</label>
        <input type="number" {...register('stockQuantity', { required: 'Required', min: 0 })} className="block w-full border p-2" />
        {errors.stockQuantity && <p className="text-red-500">{errors.stockQuantity.message}</p>}
      </div>
      <div>
        <label>Image URL</label>
        <input {...register('imageUrl')} className="block w-full border p-2" />
      </div>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save</button>
    </form>
  );
};

export default ProductForm;