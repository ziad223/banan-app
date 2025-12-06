'use client';

import { Package } from 'lucide-react';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  barcode: string;
  price: number;
  cost: number;
  stock: number;
  category: string;
  image?: string;
  discount?: number;
  isActive: boolean;
}

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export default function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      {products.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Package className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            لا توجد منتجات
          </h3>
          <p className="text-gray-500">
            ابدأ بالبحث عن المنتجات لإضافتها للفاتورة
          </p>
        </div>
      ) : (
<div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}