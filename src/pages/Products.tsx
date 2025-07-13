import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowUpDown } from 'lucide-react';
import { useProducts } from '@/contexts/ProductContext';
import { formatPrice } from '@/data/products';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Products = () => {
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('semua');
  const [sortBy, setSortBy] = useState('default');

  // Get unique product types
  const productTypes = useMemo(() => {
    const types = [...new Set(products.map(product => product.type))];
    return ['semua', ...types];
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'semua' || product.type === selectedType;
      return matchesSearch && matchesType;
    });

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'weight-low':
        filtered.sort((a, b) => a.weight - b.weight);
        break;
      case 'weight-high':
        filtered.sort((a, b) => b.weight - a.weight);
        break;
      default:
        // Keep original order
        break;
    }

    return filtered;
  }, [products, searchTerm, selectedType, sortBy]);

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
              placeholder="Cari berdasarkan nama produk..."
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
                {type === 'semua' ? 'Semua Jenis' : type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[200px]">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-low">Harga Terendah</SelectItem>
              <SelectItem value="price-high">Harga Tertinggi</SelectItem>
              <SelectItem value="weight-low">Bobot Terendah</SelectItem>
              <SelectItem value="weight-high">Bobot Tertinggi</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-gray-600">
          Menampilkan {filteredAndSortedProducts.length} dari {products.length} produk
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <img
              src={product.images?.[0] || "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400&h=250&fit=crop"}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-medium">
                  {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
                </span>
                {product.images && product.images.length > 1 && (
                  <span className="text-gray-500 text-xs">{product.images.length} foto</span>
                )}
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
                  product.status === 'tersedia' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.status === 'tersedia' ? 'Tersedia' : 'Terjual'}
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

      {filteredAndSortedProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Tidak ada produk yang sesuai dengan kriteria pencarian.</p>
        </div>
      )}
    </div>
  );
};

export default Products;
