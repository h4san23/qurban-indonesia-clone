
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Search } from 'lucide-react';
import { formatPrice } from '../data/products';
import { useProducts } from '@/contexts/ProductContext';

const Products = () => {
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [minWeight, setMinWeight] = useState<string>('');
  const [maxWeight, setMaxWeight] = useState<string>('');

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const priceFilter = (!minPrice || product.price >= parseInt(minPrice)) &&
                         (!maxPrice || product.price <= parseInt(maxPrice));
      
      const weightNum = parseInt(product.weight.replace(/[^\d]/g, ''));
      const weightFilter = (!minWeight || weightNum >= parseInt(minWeight)) &&
                          (!maxWeight || weightNum <= parseInt(maxWeight));
      
      return matchesSearch && priceFilter && weightFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'weight-low':
          const aWeight = parseInt(a.weight.replace(/[^\d]/g, ''));
          const bWeight = parseInt(b.weight.replace(/[^\d]/g, ''));
          return aWeight - bWeight;
        case 'weight-high':
          const aWeightHigh = parseInt(a.weight.replace(/[^\d]/g, ''));
          const bWeightHigh = parseInt(b.weight.replace(/[^\d]/g, ''));
          return bWeightHigh - aWeightHigh;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const sortOptions = [
    { value: 'name', label: 'Nama A-Z' },
    { value: 'price-low', label: 'Harga Terendah' },
    { value: 'price-high', label: 'Harga Tertinggi' },
    { value: 'weight-low', label: 'Berat Teringan' },
    { value: 'weight-high', label: 'Berat Terberat' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Produk Qurban</h1>
          <p className="text-green-200 text-lg">
            Pilihan hewan qurban berkualitas dari Al-Munawwir Farm
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <Filter className="text-gray-600 mr-2" size={20} />
            <h3 className="text-lg font-semibold">Filter & Pencarian</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className="relative col-span-full md:col-span-1">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari produk qurban..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="number"
              placeholder="Harga minimum"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Harga maksimum"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Berat minimum (kg)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              value={minWeight}
              onChange={(e) => setMinWeight(e.target.value)}
            />
            <input
              type="number"
              placeholder="Berat maksimum (kg)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              value={maxWeight}
              onChange={(e) => setMaxWeight(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            Menampilkan {filteredProducts.length} dari {products.length} produk
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    No Tag: {product.id}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    product.stock > 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.stock > 0 ? 'Tersedia' : 'Terjual'}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold mb-2 capitalize">{product.type}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Berat:</span>
                    <span className="font-medium">{product.weight}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Harga:</span>
                    <span className="font-bold text-green-600">{formatPrice(product.price)}</span>
                  </div>
                </div>

                <Link
                  to={`/product/${product.id}`}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-center block"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Tidak ada produk ditemukan
            </h3>
            <p className="text-gray-500">
              Coba ubah kata kunci pencarian atau filter yang dipilih
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
