// app/customers/components/EditCustomerModal.tsx
'use client';

import { useState, useEffect } from 'react';

interface EditCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: any;
  onEdit: (customer: any) => void;
}

export default function EditCustomerModal({ isOpen, onClose, customer, onEdit }: EditCustomerModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    nationalId: '',
    phone: '',
    altPhone: '',
    hall: '',
    taxNo: ''
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || '',
        nationalId: customer.nationalId || '',
        phone: customer.phone || '',
        altPhone: customer.altPhone || '',
        hall: customer.hall || 'القاعة الرئيسية',
        taxNo: customer.taxNo || ''
      });
    }
  }, [customer]);

  if (!isOpen || !customer) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit({ ...customer, ...formData });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b bg-gray-50">
          <h3 className="text-xl font-semibold text-gray-800">تعديل بيانات العميل</h3>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">اسم العميل</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">رقم الهوية</label>
              <input
                type="text"
                name="nationalId"
                value={formData.nationalId}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">رقم الجوال</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">جوال آخر</label>
              <input
                type="text"
                name="altPhone"
                value={formData.altPhone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">القاعة</label>
              <select
                name="hall"
                value={formData.hall}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg outline-none bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="القاعة الرئيسية">القاعة الرئيسية</option>
                <option value="القاعة الفرعية">القاعة الفرعية</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">الرقم الضريبي</label>
              <input
                type="text"
                name="taxNo"
                value={formData.taxNo}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              حفظ التعديلات
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              إلغاء
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
