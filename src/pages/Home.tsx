
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, CheckCircle, Users, Award, Heart } from 'lucide-react';
import { formatPrice } from '../data/products';
import { useProducts } from '@/contexts/ProductContext';

const Home = () => {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-800 to-green-600 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Al-Munawwir Farm
                <span className="block text-green-200">Solusi Hewan Qurban Anda</span>
              </h1>
              <p className="text-xl mb-8 text-green-100">
                Penyedia hewan qurban terpercaya di Bandung dan sekitarnya. 
                Kami menawarkan hewan berkualitas tinggi dengan pelayanan profesional 
                dan sesuai syariat Islam.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="bg-white text-green-800 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center justify-center"
                >
                  Lihat Produk Qurban
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=600&h=400&fit=crop"
                alt="Al-Munawwir Farm"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Tentang Al-Munawwir Farm
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Al-Munawwir Farm adalah penyedia hewan qurban yang telah berpengalaman melayani 
              masyarakat Bandung dan sekitarnya. Kami berkomitmen menyediakan hewan qurban 
              berkualitas tinggi dengan pelayanan yang amanah dan transparan. Setiap hewan 
              yang kami sediakan telah melalui seleksi ketat dan pemeriksaan kesehatan yang 
              menyeluruh untuk memastikan kualitas terbaik bagi ibadah qurban Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Terpercaya & Amanah</h3>
              <p className="text-gray-600">
                Pengalaman bertahun-tahun melayani qurban dengan transparansi penuh
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Kualitas Terjamin</h3>
              <p className="text-gray-600">
                Hewan qurban pilihan dengan sertifikat kesehatan dan sesuai syariat
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Layanan Area Bandung</h3>
              <p className="text-gray-600">
                Melayani Bandung dan sekitarnya dengan pengiriman yang aman
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Siap Melaksanakan Qurban?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Lihat koleksi hewan qurban berkualitas kami dan temukan pilihan terbaik 
            sesuai kebutuhan dan budget Anda.
          </p>
          <Link
            to="/products"
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center"
          >
            Pilih Hewan Qurban
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
