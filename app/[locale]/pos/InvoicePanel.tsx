'use client';

import { Trash2, Plus, Minus, UserPlus, Receipt } from 'lucide-react';
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

interface InvoiceItem {
  product: Product;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  balance: number;
}

interface InvoicePanelProps {
  items: InvoiceItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onSelectCustomer: () => void;
  customer?: Customer;
}

export default function InvoicePanel({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onSelectCustomer,
  customer,
}: InvoicePanelProps) {
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.15;
  const total = subtotal + tax;

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 h-full flex flex-col">
      {/* عنوان الفاتورة */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b">
        <div className="flex items-center gap-2">
          <Receipt className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">فاتورة البيع</h2>
        </div>
        <span className="text-sm text-gray-500">
          {new Date().toLocaleDateString('ar-EG')}
        </span>
      </div>

      {/* اختيار العميل */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-700">العميل</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={onSelectCustomer}
            className="flex items-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            {customer ? 'تغيير العميل' : 'اختر عميل'}
          </Button>
        </div>
        {customer ? (
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800">{customer.name}</p>
                <p className="text-sm text-gray-600">{customer.phone}</p>
              </div>
              <span className="text-sm text-green-600">
                رصيد: {customer.balance.toFixed(2)} ر.س
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
            لم يتم اختيار عميل
          </div>
        )}
      </div>

      {/* قائمة المنتجات + ملخص الفاتورة */}
      <div className="flex-1 flex flex-col">
        {/* المنتجات */}
        <div className="flex-1 mb-4 ">
          <h3 className="font-semibold text-gray-700 mb-3">المنتجات المضافة</h3>
          {items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="mb-2">
                <Receipt className="h-12 w-12 mx-auto text-gray-300" />
              </div>
              <p>لا توجد منتجات في الفاتورة</p>
              <p className="text-sm">أضف منتجات من القائمة</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-gray-800">
                        {item.product.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        سعر الوحدة: {item.unitPrice.toFixed(2)} ر.س
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>

                      <span className="w-12 text-center font-medium">
                        {item.quantity}
                      </span>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        {item.total.toFixed(2)} ر.س
                      </p>
                      {item.discount > 0 && (
                        <p className="text-sm text-red-500">
                          خصم: {item.discount}%
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ملخص الفاتورة */}
        <div className="border-t pt-4 space-y-2 mt-auto">
          <div className="flex justify-between">
            <span className="text-gray-600">المجموع الجزئي:</span>
            <span className="font-medium">{subtotal.toFixed(2)} ر.س</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">الضريبة (15%):</span>
            <span className="font-medium">{tax.toFixed(2)} ر.س</span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-2 border-t">
            <span>الإجمالي:</span>
            <span className="text-blue-600">{total.toFixed(2)} ر.س</span>
          </div>
        </div>
      </div>
    </div>
  );
}
