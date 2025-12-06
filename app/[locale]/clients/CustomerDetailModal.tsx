// app/customers/components/CustomerDetailModal.tsx
'use client';

import { X, Phone, Mail, Calendar, CreditCard } from 'lucide-react';

interface CustomerDetailModalProps {
  customer: any;
  onClose: () => void;
}

export default function CustomerDetailModal({ customer, onClose }: CustomerDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full">
        {/* الهيدر */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-bold text-gray-800">تفاصيل العميل</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* المحتوى */}
        <div className="p-4 space-y-4">
          {/* معلومات أساسية */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold text-lg">
                {customer.name.charAt(0)}
              </span>
            </div>
            <div>
              <h4 className="font-bold text-gray-800">{customer.name}</h4>
              <p className="text-sm text-gray-600">
                {customer.type === 'customer' ? 'عميل' : 'مورد'}
              </p>
            </div>
          </div>

          {/* تفاصيل الاتصال */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="w-4 h-4" />
              <span>{customer.phone}</span>
            </div>
            {customer.email && (
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{customer.email}</span>
              </div>
            )}
          </div>

          {/* المعلومات المالية */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">الرصيد الحالي</span>
              <span className={`font-bold ${
                customer.balance > 0 ? 'text-red-600' : 
                customer.balance < 0 ? 'text-green-600' : 
                'text-gray-800'
              }`}>
                {customer.balance.toLocaleString('ar-SA')} ر.س
              </span>
            </div>
          </div>

          {/* الحالة */}
          <div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              customer.status === 'active' 
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {customer.status === 'active' ? 'نشط' : 'غير نشط'}
            </span>
          </div>
        </div>

        {/* الأزرار */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <button
              onClick={() => console.log('تعديل:', customer.id)}
              className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              تعديل
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}