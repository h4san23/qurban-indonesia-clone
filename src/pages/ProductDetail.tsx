
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Star, Truck } from 'lucide-react';
import { useProducts } from '@/contexts/ProductContext';
import { formatPrice } from '@/data/products';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById } = useProducts();
  
  const product = id ? getProductById(id) : undefined;

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Produk Tidak Ditemukan</h1>
          <Link to="/products" className="text-emerald-600 hover:text-emerald-700">
            ← Kembali ke Produk
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        to="/products" 
        className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6"
      >
        <ArrowLeft className="mr-2" size={20} />
        Kembali ke Produk
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image || "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=600&h=400&fit=crop"}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
          {product.video && (
            <div className="mt-4">
              <video
                src={product.video}
                controls
                className="w-full rounded-lg shadow-lg"
              >
                Video tidak dapat diputar
              </video>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
              {product.type}
            </span>
            <span className="text-gray-600 font-mono">#{product.tagNumber}</span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <span className="text-3xl font-bold text-emerald-600">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Calendar className="mr-3" size={20} />
              <span>Berat: {product.weight} kg</span>
            </div>
            
            <div className="flex items-center">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                product.status === 'available' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.status === 'available' ? 'Tersedia' : 'Terjual'}
              </span>
            </div>
          </div>

          {product.description && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Deskripsi</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          )}

          <div className="space-y-4">
            {product.status === 'available' ? (
              <>
                <button className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors font-semibold">
                  Hubungi Kami untuk Pemesanan
                </button>
                <div className="text-center text-sm text-gray-600">
                  <p>Hubungi +62 812-3456-7890 untuk informasi lebih lanjut</p>
                </div>
              </>
            ) : (
              <button disabled className="w-full bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold cursor-not-allowed">
                Produk Sudah Terjual
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
