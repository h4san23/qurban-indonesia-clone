
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Package, Info, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
      window.location.href = '/';
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

            <button
              onClick={handleLogout}
              className="text-emerald-100 hover:text-white font-medium transition-colors flex items-center space-x-1"
            >
              <LogOut className="h-4 w-4" />
              <span>Keluar</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
};

export default AdminLayout;
