
export interface Product {
  id: string;
  name: string;
  type: 'kambing' | 'sapi' | 'domba';
  price: number;
  weight: string;
  age: string;
  description: string;
  image: string;
  features: string[];
  stock: number;
  location: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Kambing Etawa Super',
    type: 'kambing',
    price: 3500000,
    weight: '45-50 kg',
    age: '2-3 tahun',
    description: 'Kambing Etawa berkualitas tinggi dengan bobot ideal untuk qurban. Sehat, gemuk, dan memenuhi syarat syariat Islam.',
    image: 'https://images.unsplash.com/photo-1551728088-6d4b1c663c7a?w=500&h=400&fit=crop',
    features: ['Sehat dan Gemuk', 'Bersertifikat Halal', 'Gratis Pengiriman', 'Dokumentasi Lengkap'],
    stock: 15,
    location: 'Bogor, Jawa Barat'
  },
  {
    id: '2',
    name: 'Sapi Limosin Premium',
    type: 'sapi',
    price: 18000000,
    weight: '400-450 kg',
    age: '3-4 tahun',
    description: 'Sapi Limosin premium dengan kualitas daging terbaik. Cocok untuk qurban berjamaah hingga 7 orang.',
    image: 'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=500&h=400&fit=crop',
    features: ['Kualitas Premium', 'Untuk 7 Orang', 'Bersertifikat Halal', 'Proses Transparan'],
    stock: 8,
    location: 'Bandung, Jawa Barat'
  },
  {
    id: '3',
    name: 'Domba Garut Unggul',
    type: 'domba',
    price: 4200000,
    weight: '50-55 kg',
    age: '2-3 tahun',
    description: 'Domba Garut dengan kualitas unggul, bulu tebal dan daging berkualitas. Pilihan tepat untuk qurban keluarga.',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=500&h=400&fit=crop',
    features: ['Domba Garut Asli', 'Bulu Tebal', 'Daging Berkualitas', 'Harga Terjangkau'],
    stock: 12,
    location: 'Garut, Jawa Barat'
  },
  {
    id: '4',
    name: 'Kambing Jawarandu',
    type: 'kambing',
    price: 3200000,
    weight: '40-45 kg',
    age: '2 tahun',
    description: 'Kambing Jawarandu lokal dengan kualitas baik dan harga terjangkau. Cocok untuk qurban perorangan.',
    image: 'https://images.unsplash.com/photo-1551728088-6d4b1c663c7a?w=500&h=400&fit=crop',
    features: ['Kambing Lokal', 'Harga Ekonomis', 'Kualitas Terjamin', 'Sehat dan Aktif'],
    stock: 20,
    location: 'Sukabumi, Jawa Barat'
  },
  {
    id: '5',
    name: 'Sapi Brahman Cross',
    type: 'sapi',
    price: 16500000,
    weight: '380-420 kg',
    age: '3 tahun',
    description: 'Sapi Brahman Cross dengan adaptasi baik terhadap iklim tropis. Daging berkualitas dan sehat.',
    image: 'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=500&h=400&fit=crop',
    features: ['Adaptasi Iklim Baik', 'Daging Berkualitas', 'Untuk 7 Orang', 'Sehat dan Kuat'],
    stock: 6,
    location: 'Cianjur, Jawa Barat'
  },
  {
    id: '6',
    name: 'Domba Ekor Tipis',
    type: 'domba',
    price: 3800000,
    weight: '45-50 kg',
    age: '2-3 tahun',
    description: 'Domba ekor tipis dengan karakteristik daging yang lezat dan lemak yang tidak berlebihan.',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=500&h=400&fit=crop',
    features: ['Ekor Tipis', 'Daging Lezat', 'Lemak Seimbang', 'Harga Kompetitif'],
    stock: 18,
    location: 'Tasikmalaya, Jawa Barat'
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByType = (type?: string): Product[] => {
  if (!type || type === 'semua') return products;
  return products.filter(product => product.type === type);
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};
