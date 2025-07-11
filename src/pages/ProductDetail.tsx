
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, MapPin, Calendar, Weight, Phone, MessageCircle } from 'lucide-react';
import { getProductById, formatPrice } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Produk Tidak Ditemukan</h2>
          <Link
            to="/products"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Kembali ke Produk
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-green-600">Beranda</Link>
            <span className="text-gray-400">/</span>
            <Link to="/products" className="text-gray-500 hover:text-green-600">Produk</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-800 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/products"
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Kembali ke Produk
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                {product.type}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
            
            <div className="text-3xl font-bold text-green-600 mb-6">
              {formatPrice(product.price)}
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Specifications */}
            <div className="bg-white rounded-lg p-6 shadow-md mb-6">
              <h3 className="text-lg font-semibold mb-4">Spesifikasi</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Weight className="text-green-600 mr-2" size={20} />
                  <div>
                    <div className="text-sm text-gray-500">Berat</div>
                    <div className="font-medium">{product.weight}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="text-green-600 mr-2" size={20} />
                  <div>
                    <div className="text-sm text-gray-500">Umur</div>
                    <div className="font-medium">{product.age}</div>
                  </div>
                </div>
                <div className="flex items-center col-span-2">
                  <MapPin className="text-green-600 mr-2" size={20} />
                  <div>
                    <div className="text-sm text-gray-500">Lokasi</div>
                    <div className="font-medium">{product.location}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg p-6 shadow-md mb-6">
              <h3 className="text-lg font-semibold mb-4">Keunggulan</h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="text-green-600 mr-3 flex-shrink-0" size={20} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stock Status */}
            <div className="bg-white rounded-lg p-6 shadow-md mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Status Ketersediaan:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.stock > 10 
                    ? 'bg-green-100 text-green-800' 
                    : product.stock > 5 
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock} Unit Tersedia
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <a
                href="tel:+6281234567890"
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center font-semibold"
              >
                <Phone className="mr-2" size={20} />
                Hubungi Sekarang
              </a>
              <a
                href="https://wa.me/6281234567890"
                className="w-full border-2 border-green-600 text-green-600 py-3 px-6 rounded-lg hover:bg-green-600 hover:text-white transition-colors flex items-center justify-center font-semibold"
              >
                <MessageCircle className="mr-2" size={20} />
                Chat WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-white rounded-lg p-8 shadow-md">
          <h2 className="text-2xl font-bold mb-6">Informasi Tambahan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-600">Proses Qurban</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Penyembelihan sesuai syariat Islam</li>
                <li>• Dokumentasi lengkap proses qurban</li>
                <li>• Pembagian daging kepada yang berhak</li>
                <li>• Laporan distribusi daging</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-600">Layanan Kami</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Konsultasi gratis pemilihan hewan</li>
                <li>• Pengiriman ke seluruh Indonesia</li>
                <li>• Garansi kesehatan hewan</li>
                <li>• Customer service 24/7</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
