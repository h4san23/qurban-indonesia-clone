
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-emerald-100">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="flex justify-between items-center py-2 text-sm text-gray-600 border-b border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>+62 812-3456-7890</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>info@indonesiaqurban.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Facebook className="h-4 w-4 hover:text-emerald-600 cursor-pointer" />
              <Instagram className="h-4 w-4 hover:text-emerald-600 cursor-pointer" />
              <Twitter className="h-4 w-4 hover:text-emerald-600 cursor-pointer" />
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="flex items-center justify-between py-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">IQ</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-emerald-800">Indonesia Qurban</h1>
                <p className="text-sm text-gray-600">Hewan Qurban Berkualitas</p>
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
                to="/contact"
                className={cn(
                  "text-gray-700 hover:text-emerald-600 font-medium transition-colors",
                  isActive('/contact') && "text-emerald-600 border-b-2 border-emerald-600"
                )}
              >
                Kontak
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

      {/* Footer */}
      <footer className="bg-emerald-800 text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Indonesia Qurban</h3>
              <p className="text-emerald-100 mb-4">
                Menyediakan hewan qurban berkualitas terbaik untuk memenuhi kebutuhan ibadah Anda.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-5 w-5 hover:text-emerald-300 cursor-pointer" />
                <Instagram className="h-5 w-5 hover:text-emerald-300 cursor-pointer" />
                <Twitter className="h-5 w-5 hover:text-emerald-300 cursor-pointer" />
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Layanan</h4>
              <ul className="space-y-2 text-emerald-100">
                <li><Link to="/products" className="hover:text-white">Hewan Qurban</Link></li>
                <li><Link to="/about" className="hover:text-white">Konsultasi</Link></li>
                <li><Link to="/contact" className="hover:text-white">Pengiriman</Link></li>
                <li><Link to="/about" className="hover:text-white">Dokumentasi</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Informasi</h4>
              <ul className="space-y-2 text-emerald-100">
                <li><Link to="/about" className="hover:text-white">Tentang Kami</Link></li>
                <li><Link to="/contact" className="hover:text-white">Hubungi Kami</Link></li>
                <li><Link to="/products" className="hover:text-white">Katalog</Link></li>
                <li><Link to="/" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Kontak</h4>
              <div className="space-y-2 text-emerald-100">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Jakarta, Indonesia</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+62 812-3456-7890</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>info@indonesiaqurban.com</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-emerald-700 mt-8 pt-8 text-center text-emerald-100">
            <p>&copy; 2024 Indonesia Qurban. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
