'use client';

import { Package, Tag, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

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

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const hasDiscount = product.discount && product.discount > 0;
  const finalPrice = hasDiscount 
    ? product.price * (1 - (product.discount! / 100))
    : product.price;

  const isLowStock = product.stock < 10;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      {/* صورة المنتج */}
      <div className="relative h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <Package className="h-16 w-16 text-gray-400" />
        )}
        
        {/* شارات */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {hasDiscount && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {product.discount}% تخفيض
            </span>
          )}
          {isLowStock && (
            <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              قليل
            </span>
          )}
        </div>
      </div>

      {/* معلومات المنتج */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-gray-800 text-right">
          {product.name}
        </h3>
        
        <div className="flex flex-col gap-2   justify-between mb-3">
          <div className="flex items-center gap-1 text-gray-600">
            <Package className="h-4 w-4" />
            <span className="text-sm">{product.stock} متوفر</span>
          </div>
          <span className="text-sm bg-gray-100 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>

        {/* الأسعار */}
        <div className="mb-4">
          {hasDiscount && (
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm text-gray-500 line-through">
                {product.price.toFixed(2)} ر.س
              </span>
              <Tag className="h-4 w-4 text-red-500" />
            </div>
          )}
          <div className="flex flex-col gap-2 justify-between">
            <span className="text-xl font-bold text-gray-900">
              {finalPrice.toFixed(2)} ر.س
            </span>
            <span className="text-sm text-gray-600">
              الباركود: {product.barcode}
            </span>
          </div>
        </div>

        {/* زر الإضافة */}
        <Button
          onClick={() => onAddToCart(product)}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
          disabled={product.stock === 0}
        >
          {product.stock > 0 ? 'أضف للسلة' : 'غير متوفر'}
        </Button>
      </div>
    </div>
  );
}