
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: 'Beranda', path: '/' },
    { name: 'Produk Qurban', path: '/products' },
    { name: 'Tentang Kami', path: '/about' },
    { name: 'Kontak', path: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-green-800 text-white py-2 px-4">
        <div className="container mx-auto flex flex-wrap justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Phone size={14} />
              <span>+62 812-3456-7890</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail size={14} />
              <span>info@indonesiaqurban.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Facebook size={16} className="hover:text-green-200 cursor-pointer" />
            <Instagram size={16} className="hover:text-green-200 cursor-pointer" />
            <Youtube size={16} className="hover:text-green-200 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">Q</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-green-800">Indonesia Qurban</h1>
                <p className="text-sm text-gray-600">Al-Munawwir Farm</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`py-2 px-3 rounded-md transition-colors ${
                    isActive(item.path)
                      ? 'text-green-600 font-semibold border-b-2 border-green-600'
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="md:hidden pb-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block py-2 px-3 rounded-md transition-colors ${
                    isActive(item.path)
                      ? 'text-green-600 font-semibold bg-green-50'
                      : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-green-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-green-800 font-bold text-xl">Q</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Indonesia Qurban</h3>
                  <p className="text-green-200">Al-Munawwir Farm</p>
                </div>
              </div>
              <p className="text-green-100 mb-4">
                Menyediakan layanan qurban terpercaya dengan hewan berkualitas tinggi
                dan proses yang sesuai syariat Islam. Melayani seluruh Indonesia
                dengan transparansi dan amanah.
              </p>
              <div className="flex space-x-4">
                <Facebook size={20} className="hover:text-green-200 cursor-pointer" />
                <Instagram size={20} className="hover:text-green-200 cursor-pointer" />
                <Youtube size={20} className="hover:text-green-200 cursor-pointer" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Tautan Cepat</h4>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="text-green-100 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Kontak</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <MapPin size={16} className="mt-1 flex-shrink-0" />
                  <span className="text-green-100 text-sm">
                    Jl. Raya Bogor KM 25, Depok, Jawa Barat 16451
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={16} />
                  <span className="text-green-100">+62 812-3456-7890</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={16} />
                  <span className="text-green-100">info@indonesiaqurban.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-green-700 mt-8 pt-6 text-center">
            <p className="text-green-200">
              © 2024 Indonesia Qurban - Al-Munawwir Farm. Semua hak dilindungi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
