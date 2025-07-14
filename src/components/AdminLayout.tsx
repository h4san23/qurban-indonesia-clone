
import React from 'react';
import { Link, useLocation, Routes, Route } from 'react-router-dom';
import { Home, Package, Info, LogOut, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import ProductDetail from '@/pages/ProductDetail';
import About from '@/pages/About';
import Admin from '@/pages/Admin';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path === '/admin/home' && location.pathname === '/admin/home') return true;
    if (path === '/admin/products' && location.pathname === '/admin/products') return true;
    if (path === '/admin/about' && location.pathname === '/admin/about') return true;
    if (path.startsWith('/admin/product/') && location.pathname.startsWith('/admin/product/')) return true;
    return false;
  };

  const handleLogout = () => {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
      window.location.href = '/';
    }
  };

  const renderContent = () => {
    const path = location.pathname;
    
    if (path === '/admin/home') {
      return <Home />;
    } else if (path === '/admin/products') {
      return <Products />;
    } else if (path.startsWith('/admin/product/')) {
      return <ProductDetail />;
    } else if (path === '/admin/about') {
      return <About />;
    } else {
      return children;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-emerald-800 text-white shadow-sm">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between py-4">
            <Link to="/admin" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">AM</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">Al-Munawwir Farm</h1>
                <p className="text-sm text-emerald-100">Panel Admin</p>
              </div>
            </Link>

            <div className="flex items-center space-x-6">
              <Link
                to="/admin"
                className={cn(
                  "text-emerald-100 hover:text-white font-medium transition-colors flex items-center space-x-1",
                  isActive('/admin') && "text-white border-b-2 border-emerald-300"
                )}
              >
                <Settings className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              
              <div className="border-l border-emerald-600 pl-6 flex items-center space-x-4">
                <span className="text-emerald-100 text-sm">Lihat Website:</span>
                <Link
                  to="/admin/home"
                  className={cn(
                    "text-emerald-100 hover:text-white font-medium transition-colors flex items-center space-x-1",
                    isActive('/admin/home') && "text-white border-b-2 border-emerald-300"
                  )}
                >
                  <Home className="h-4 w-4" />
                  <span>Beranda</span>
                </Link>
                <Link
                  to="/admin/products"
                  className={cn(
                    "text-emerald-100 hover:text-white font-medium transition-colors flex items-center space-x-1",
                    isActive('/admin/products') && "text-white border-b-2 border-emerald-300"
                  )}
                >
                  <Package className="h-4 w-4" />
                  <span>Produk</span>
                </Link>
                <Link
                  to="/admin/about"
                  className={cn(
                    "text-emerald-100 hover:text-white font-medium transition-colors flex items-center space-x-1",
                    isActive('/admin/about') && "text-white border-b-2 border-emerald-300"
                  )}
                >
                  <Info className="h-4 w-4" />
                  <span>Tentang</span>
                </Link>
              </div>
              
              <button
                onClick={handleLogout}
                className="text-emerald-100 hover:text-white font-medium transition-colors flex items-center space-x-1"
              >
                <LogOut className="h-4 w-4" />
                <span>Keluar</span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>{renderContent()}</main>
    </div>
  );
};

export default AdminLayout;
