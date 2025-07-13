
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { useProducts } from '@/contexts/ProductContext';
import { formatPrice } from '@/data/products';

const Products = () => {
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('semua');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [weightRange, setWeightRange] = useState({ min: '', max: '' });
  const [showFilters, setShowFilters] = useState(false);

  // Get unique product types
  const productTypes = useMemo(() => {
    const types = [...new Set(products.map(product => product.type))];
    return ['semua', ...types];
  }, [products]);

  // Get price and weight ranges
  const ranges = useMemo(() => {
    const prices = products.map(p => p.price);
    const weights = products.map(p => p.weight);
    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
      minWeight: Math.min(...weights),
      maxWeight: Math.max(...weights)
    };
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.tagNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'semua' || product.type === selectedType;
      
      const minPrice = priceRange.min ? parseFloat(priceRange.min) : 0;
      const maxPrice = priceRange.max ? parseFloat(priceRange.max) : Infinity;
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
      
      const minWeight = weightRange.min ? parseFloat(weightRange.min) : 0;
      const maxWeight = weightRange.max ? parseFloat(weightRange.max) : Infinity;
      const matchesWeight = product.weight >= minWeight && product.weight <= maxWeight;

      return matchesSearch && matchesType && matchesPrice && matchesWeight;
    });
  }, [products, searchTerm, selectedType, priceRange, weightRange]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-emerald-800 mb-2">Produk Hewan Qurban</h1>
        <p className="text-gray-600">Pilih hewan qurban berkualitas sesuai kebutuhan Anda</p>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari berdasarkan nama atau nomor tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            {productTypes.map(type => (
              <option key={type} value={type}>
                {type === 'semua' ? 'Semua Jenis' : type}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <SlidersHorizontal className="mr-2" size={16} />
            Filter Lanjutan
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rentang Harga (Rp)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder={`Min (${formatPrice(ranges.minPrice)})`}
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <input
                  type="number"
                  placeholder={`Max (${formatPrice(ranges.maxPrice)})`}
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rentang Berat (kg)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder={`Min (${ranges.minWeight}kg)`}
                  value={weightRange.min}
                  onChange={(e) => setWeightRange(prev => ({ ...prev, min: e.target.value }))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <input
                  type="number"
                  placeholder={`Max (${ranges.maxWeight}kg)`}
                  value={weightRange.max}
                  onChange={(e) => setWeightRange(prev => ({ ...prev, max: e.target.value }))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-gray-600">
          Menampilkan {filteredProducts.length} dari {products.length} produk
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <img
              src={product.image || "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400&h=250&fit=crop"}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-medium">
                  {product.type}
                </span>
                <span className="text-gray-500 font-mono text-sm">#{product.tagNumber}</span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold text-emerald-600">
                  {formatPrice(product.price)}
                </span>
                <span className="text-gray-600 text-sm">{product.weight} kg</span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  product.status === 'available' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.status === 'available' ? 'Tersedia' : 'Terjual'}
                </span>
              </div>

              <Link
                to={`/product/${product.id}`}
                className="block w-full bg-emerald-600 text-white text-center py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Lihat Detail
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Tidak ada produk yang sesuai dengan kriteria pencarian.</p>
        </div>
      )}
    </div>
  );
};

export default Products;
