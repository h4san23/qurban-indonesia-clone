import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-emerald-100">
        <div className="container mx-auto px-4">
          {/* Main Navigation */}
          <nav className="flex items-center justify-between py-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">AM</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-emerald-800">Al-Munawwir Farm</h1>
                <p className="text-sm text-gray-600">Solusi Hewan Qurban Anda</p>
              </div>
            </Link>

            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className={cn(
                  "text-gray-700 hover:text-emerald-600 font-medium transition-colors",
                  isActive('/') && "text-emerald-600 border-b-2 border-emerald-600"
                )}
              >
                Beranda
              </Link>
              <Link
                to="/products"
                className={cn(
                  "text-gray-700 hover:text-emerald-600 font-medium transition-colors",
                  isActive('/products') && "text-emerald-600 border-b-2 border-emerald-600"
                )}
              >
                Produk
              </Link>
              <Link
                to="/about"
                className={cn(
                  "text-gray-700 hover:text-emerald-600 font-medium transition-colors",
                  isActive('/about') && "text-emerald-600 border-b-2 border-emerald-600"
                )}
              >
                Tentang Kami
              </Link>
              <Link
                to="/admin"
                className={cn(
                  "text-gray-700 hover:text-emerald-600 font-medium transition-colors",
                  isActive('/admin') && "text-emerald-600 border-b-2 border-emerald-600"
                )}
              >
                Admin
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Enhanced Footer */}
      <footer className="bg-emerald-800 text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Al-Munawwir Farm</h3>
              <p className="text-emerald-100 mb-4">
                Solusi hewan qurban terpercaya di Bandung dan sekitarnya. 
                Melayani dengan amanah dan kualitas terjamin.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-5 w-5 hover:text-emerald-300 cursor-pointer" />
                <Instagram className="h-5 w-5 hover:text-emerald-300 cursor-pointer" />
                <Twitter className="h-5 w-5 hover:text-emerald-300 cursor-pointer" />
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Kontak Kami</h4>
              <div className="space-y-3 text-emerald-100">
                <div className="flex items-start space-x-3">
                  <Phone className="h-4 w-4 mt-1" />
                  <div>
                    <p>+62 812-3456-7890</p>
                    <p>+62 821-9876-5432</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="h-4 w-4 mt-1" />
                  <div>
                    <p>info@almunawwirfarm.com</p>
                    <p>cs@almunawwirfarm.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 mt-1" />
                  <div>
                    <p>Jl. Raya Bandung KM 15</p>
                    <p>Bandung, Jawa Barat 40123</p>
                    <p>Indonesia</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Jam Operasional</h4>
              <div className="space-y-2 text-emerald-100">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Senin - Jumat: 08:00 - 17:00</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Sabtu - Minggu: 08:00 - 15:00</span>
                </div>
                <div className="mt-3">
                  <span className="text-emerald-300 font-medium">24/7 WhatsApp Support</span>
                </div>
                <div className="mt-4 space-y-2">
                  <a
                    href="tel:+6281234567890"
                    className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center text-sm"
                  >
                    <Phone className="mr-2" size={16} />
                    Telepon Sekarang
                  </a>
                  <a
                    href="https://wa.me/6281234567890"
                    className="w-full border border-emerald-300 text-emerald-100 py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center text-sm"
                  >
                    Chat WhatsApp
                  </a>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Layanan Kami</h4>
              <ul className="space-y-2 text-emerald-100">
                <li><Link to="/products" className="hover:text-white">Hewan Qurban Berkualitas</Link></li>
                <li><Link to="/about" className="hover:text-white">Konsultasi Gratis</Link></li>
                <li><span className="hover:text-white">Pengiriman Bandung & Sekitar</span></li>
                <li><span className="hover:text-white">Dokumentasi Qurban</span></li>
                <li><span className="hover:text-white">Garansi Kesehatan Hewan</span></li>
                <li><span className="hover:text-white">Pembayaran Fleksibel</span></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-emerald-700 mt-8 pt-8 text-center text-emerald-100">
            <p>&copy; 2024 Al-Munawwir Farm. Semua hak dilindungi.</p>
            <p className="text-sm mt-2">Melayani Area Bandung dan Sekitarnya</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
