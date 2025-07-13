import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { useProducts } from '@/contexts/ProductContext';
import { formatPrice } from '@/data/products';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById } = useProducts();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  
  if (!id) {
    return <div>Product ID not found</div>;
  }

  const product = getProductById(id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Produk tidak ditemukan</h1>
          <Link to="/products" className="text-emerald-600 hover:text-emerald-700">
            Kembali ke daftar produk
          </Link>
        </div>
      </div>
    );
  }

  // Safely handle images array
  const productImages = product.images || [];
  const currentImage = productImages[selectedImageIndex] || productImages[0] || 'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=500&h=400&fit=crop';

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoomLevel > 1) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * -100;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -100;
      setImagePosition({ x, y });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link 
        to="/products" 
        className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6"
      >
        <ArrowLeft className="mr-2" size={20} />
        Kembali ke Produk
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="mb-4 relative">
            <div 
              className="w-full h-96 rounded-lg shadow-sm overflow-hidden cursor-pointer relative"
              onClick={handleImageClick}
            >
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-200"
                style={{
                  transform: `scale(${zoomLevel}) translate(${imagePosition.x}px, ${imagePosition.y}px)`,
                  transformOrigin: 'center'
                }}
              />
            </div>
            
            {/* Zoom Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 bg-white/90 rounded-lg p-2 shadow-sm">
              <button
                onClick={handleZoomIn}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                disabled={zoomLevel >= 3}
              >
                <ZoomIn size={16} className={zoomLevel >= 3 ? 'text-gray-400' : 'text-gray-700'} />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                disabled={zoomLevel <= 0.5}
              >
                <ZoomOut size={16} className={zoomLevel <= 0.5 ? 'text-gray-400' : 'text-gray-700'} />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
              >
                <RotateCcw size={16} className="text-gray-700" />
              </button>
            </div>

            {/* Zoom Level Indicator */}
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
              {Math.round(zoomLevel * 100)}%
            </div>
          </div>
          
          {/* Image Thumbnails */}
          {productImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {productImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all ${
                    index === selectedImageIndex 
                      ? 'border-emerald-500' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => {
                    setSelectedImageIndex(index);
                    handleResetZoom();
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-4">
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
              {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          
          <div className="mb-6">
            <span className="text-3xl font-bold text-emerald-600">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="text-gray-600 text-sm">Berat</span>
              <p className="font-semibold">{product.weight} kg</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="text-gray-600 text-sm">Status</span>
              <p className={`font-semibold ${
                product.status === 'tersedia' ? 'text-green-600' : 'text-red-600'
              }`}>
                {product.status === 'tersedia' ? 'Tersedia' : 'Terjual'}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Deskripsi</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                product.status === 'tersedia'
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={product.status !== 'tersedia'}
            >
              <ShoppingCart className="inline mr-2" size={20} />
              {product.status === 'tersedia' ? 'Pesan Sekarang' : 'Tidak Tersedia'}
            </button>
            
            <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Heart className="inline" size={20} />
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Informasi Penting</h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Hewan telah diperiksa kesehatan dan kualitasnya</li>
              <li>• Memenuhi syarat syariat Islam untuk qurban</li>
              <li>• Gratis konsultasi sebelum pembelian</li>
              <li>• Garansi kualitas 100%</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
