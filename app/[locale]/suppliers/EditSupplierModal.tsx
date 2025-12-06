// app/suppliers/components/EditSupplierModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { FaTimes, FaStar, FaShippingFast, FaCalendarAlt, FaPercentage } from 'react-icons/fa';
import { MdAttachMoney, MdDescription } from 'react-icons/md';

interface EditSupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  supplier: any;
  onEdit: (supplier: any) => void;
}

export default function EditSupplierModal({ isOpen, onClose, supplier, onEdit }: EditSupplierModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    phone: '',
    email: '',
    contactPerson: '',
    contactPhone: '',
    address: '',
    taxNumber: '',
    vatRate: 15,
    creditLimit: 50000,
    paymentTerms: '',
    deliveryTime: '',
    rating: 4.0,
    status: 'active',
    notes: ''
  });

  useEffect(() => {
    if (supplier) {
      setFormData({
        name: supplier.name || '',
        category: supplier.category || 'مواد غذائية',
        phone: supplier.phone || '',
        email: supplier.email || '',
        contactPerson: supplier.contactPerson || '',
        contactPhone: supplier.contactPhone || '',
        address: supplier.address || '',
        taxNumber: supplier.taxNumber || '',
        vatRate: supplier.vatRate || 15,
        creditLimit: supplier.creditLimit || 50000,
        paymentTerms: supplier.paymentTerms || '30 يوم',
        deliveryTime: supplier.deliveryTime || '3-5 أيام',
        rating: supplier.rating || 4.0,
        status: supplier.status || 'active',
        notes: supplier.notes || ''
      });
    }
  }, [supplier]);

  if (!isOpen || !supplier) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedSupplier = { 
      ...supplier, 
      ...formData,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    onEdit(updatedSupplier);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) : value
    });
  };

  const categories = ['مواد غذائية', 'إلكترونيات', 'تكنولوجيا', 'قرطاسية', 'أثاث', 'بناء', 'تغليف', 'أخرى'];
  const paymentTerms = ['نقداً', '15 يوم', '30 يوم', '45 يوم', '60 يوم', '90 يوم'];
  const deliveryTimes = ['فوري', '1-2 أيام', '2-3 أيام', '3-5 أيام', '5-7 أيام', 'أكثر من أسبوع'];
  const ratings = [1, 2, 3, 4, 5];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* الهيدر */}
        <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-gray-800">تعديل المورد</h3>
            <p className="text-gray-600 text-sm mt-1">تعديل بيانات المورد: {supplier.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <FaTimes className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* الفورم */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* العمود الأول */}
            <div className="space-y-4">
              {/* اسم المورد */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم المورد <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* الفئة */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  فئة المورد
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* هاتف المورد */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  هاتف المورد <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* البريد الإلكتروني */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* جهة الاتصال */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم جهة الاتصال
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* الحالة */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الحالة
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="active">نشط</option>
                  <option value="inactive">غير نشط</option>
                </select>
              </div>
            </div>

            {/* العمود الثاني */}
            <div className="space-y-4">
              {/* هاتف جهة الاتصال */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  هاتف جهة الاتصال
                </label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* حد الائتمان */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  حد الائتمان
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="creditLimit"
                    value={formData.creditLimit}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    min="0"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <MdAttachMoney className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* شروط السداد */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  شروط السداد
                </label>
                <div className="relative">
                  <select
                    name="paymentTerms"
                    value={formData.paymentTerms}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                  >
                    {paymentTerms.map(term => (
                      <option key={term} value={term}>{term}</option>
                    ))}
                  </select>
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <FaCalendarAlt className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* وقت التوصيل */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  وقت التوصيل
                </label>
                <div className="relative">
                  <select
                    name="deliveryTime"
                    value={formData.deliveryTime}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                  >
                    {deliveryTimes.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <FaShippingFast className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* التقييم */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  التقييم
                </label>
                <div className="relative">
                  <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                  >
                    {ratings.map(rating => (
                      <option key={rating} value={rating}>{rating} ★</option>
                    ))}
                  </select>
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <FaStar className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* نسبة الضريبة */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نسبة الضريبة المضافة
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="vatRate"
                    value={formData.vatRate}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    min="0"
                    max="100"
                    step="0.5"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <FaPercentage className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* العنوان */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              العنوان
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          {/* الرقم الضريبي */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الرقم الضريبي
            </label>
            <input
              type="text"
              name="taxNumber"
              value={formData.taxNumber}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="الرقم الضريبي"
            />
          </div>

          {/* ملاحظات */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ملاحظات
            </label>
            <div className="relative">
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                placeholder="ملاحظات إضافية عن المورد"
              />
              <div className="absolute left-3 top-4">
                <MdDescription className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* معلومات إضافية (للعرض فقط) */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-3">معلومات إضافية</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">رقم المورد:</span>
                <span className="font-bold text-blue-600">#{supplier.id}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">تاريخ الإضافة:</span>
                <span className="font-bold">{supplier.createdAt}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">آخر عملية شراء:</span>
                <span className="font-bold">{supplier.lastPurchase}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">إجمالي المشتريات:</span>
                <span className="font-bold text-green-600">
                  {supplier.totalPurchases?.toLocaleString('ar-SA')} ر.س
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">الرصيد الحالي:</span>
                <span className={`font-bold ${supplier.balance < 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(supplier.balance).toLocaleString('ar-SA')} ر.س
                  <span className="text-xs ml-2">
                    ({supplier.balance < 0 ? 'دائن' : 'مدين'})
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* الأزرار */}
          <div className="flex gap-3 pt-8 border-t border-gray-200 mt-6">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-cyan-700 font-medium transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>حفظ التعديلات</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 font-medium border border-gray-300 transition-all duration-200"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}