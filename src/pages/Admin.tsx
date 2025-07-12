
import React from 'react';
import { AddProductDialog } from '@/components/admin/AddProductDialog';
import { ProductTable } from '@/components/admin/ProductTable';

const Admin = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-emerald-800 mb-2">Admin Panel</h1>
        <p className="text-gray-600">Kelola data produk hewan qurban</p>
      </div>

      <AddProductDialog />
      <ProductTable />
    </div>
  );
};

export default Admin;
