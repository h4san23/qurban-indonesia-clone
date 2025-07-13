
export interface Product {
  id: string;
  name: string;
  type: 'kambing' | 'sapi' | 'domba';
  tagNumber: string;
  price: number;
  status: 'tersedia' | 'soldout';
  weight: number;
  image: string;
  video?: string;
  description: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Kambing Etawa Super',
    type: 'kambing',
    tagNumber: 'KMB001',
    price: 3500000,
    status: 'tersedia',
    weight: 47,
    description: 'Kambing Etawa berkualitas tinggi dengan bobot ideal untuk qurban. Sehat, gemuk, dan memenuhi syarat syariat Islam.',
    image: 'https://images.unsplash.com/photo-1551728088-6d4b1c663c7a?w=500&h=400&fit=crop'
  },
  {
    id: '2',
    name: 'Sapi Limosin Premium',
    type: 'sapi',
    tagNumber: 'SPI001',
    price: 18000000,
    status: 'tersedia',
    weight: 425,
    description: 'Sapi Limosin premium dengan kualitas daging terbaik. Cocok untuk qurban berjamaah hingga 7 orang.',
    image: 'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=500&h=400&fit=crop'
  },
  {
    id: '3',
    name: 'Domba Garut Unggul',
    type: 'domba',
    tagNumber: 'DMB001',
    price: 4200000,
    status: 'tersedia',
    weight: 52,
    description: 'Domba Garut dengan kualitas unggul, bulu tebal dan daging berkualitas. Pilihan tepat untuk qurban keluarga.',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=500&h=400&fit=crop'
  },
  {
    id: '4',
    name: 'Kambing Jawarandu',
    type: 'kambing',
    tagNumber: 'KMB002',
    price: 3200000,
    status: 'soldout',
    weight: 42,
    description: 'Kambing Jawarandu lokal dengan kualitas baik dan harga terjangkau. Cocok untuk qurban perorangan.',
    image: 'https://images.unsplash.com/photo-1551728088-6d4b1c663c7a?w=500&h=400&fit=crop'
  },
  {
    id: '5',
    name: 'Sapi Brahman Cross',
    type: 'sapi',
    tagNumber: 'SPI002',
    price: 16500000,
    status: 'tersedia',
    weight: 400,
    description: 'Sapi Brahman Cross dengan adaptasi baik terhadap iklim tropis. Daging berkualitas dan sehat.',
    image: 'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=500&h=400&fit=crop'
  },
  {
    id: '6',
    name: 'Domba Ekor Tipis',
    type: 'domba',
    tagNumber: 'DMB002',
    price: 3800000,
    status: 'tersedia',
    weight: 47,
    description: 'Domba ekor tipis dengan karakteristik daging yang lezat dan lemak yang tidak berlebihan.',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=500&h=400&fit=crop'
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
