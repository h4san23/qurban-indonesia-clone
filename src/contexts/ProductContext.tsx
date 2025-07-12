
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, products as initialProducts } from '@/data/products';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  getProductsByType: (type?: string) => Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = 'qurban_products';

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    // Load data dari localStorage saat inisialisasi
    try {
      const savedProducts = localStorage.getItem(STORAGE_KEY);
      if (savedProducts) {
        return JSON.parse(savedProducts);
      }
    } catch (error) {
      console.error('Error loading products from localStorage:', error);
    }
    return initialProducts;
  });

  // Simpan ke localStorage setiap kali products berubah
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (error) {
      console.error('Error saving products to localStorage:', error);
    }
  }, [products]);

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const getProductById = (id: string): Product | undefined => {
    return products.find(product => product.id === id);
  };

  const getProductsByType = (type?: string): Product[] => {
    if (!type || type === 'semua') return products;
    return products.filter(product => product.type === type);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        getProductById,
        getProductsByType,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
