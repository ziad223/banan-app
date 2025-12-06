// app/invoices/components/CreateInvoiceModal.tsx
'use client';

import CustomSelect from '@/components/shared/reusableComponents/CustomSelect';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaTimes, FaPlus, FaTrash, FaPercent, FaCalculator } from 'react-icons/fa';

interface CreateInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (invoice: any) => void;
}

export default function CreateInvoiceModal({ isOpen, onClose, onCreate }: CreateInvoiceModalProps) {
     const {
        control,
        formState: { errors },
        } = useForm({
        defaultValues: {
            paymentTerms: "",
            deliveryTime: "",
        },
        });
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    type: 'sale',
    paymentMethod: 'cash',
    notes: '',
    items: [
      { id: 1, name: '', quantity: 1, price: 0, total: 0 }
    ],
    discount: 0,
    taxRate: 15
  });

  if (!isOpen) return null;

  // حساب الإجماليات
  const subtotal = formData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const discountAmount = (subtotal * formData.discount) / 100;
  const taxAmount = ((subtotal - discountAmount) * formData.taxRate) / 100;
  const total = subtotal - discountAmount + taxAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const invoiceData = {
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      type: formData.type,
      paymentMethod: formData.paymentMethod,
      notes: formData.notes,
      items: formData.items.filter(item => item.name && item.price > 0),
      subtotal,
      tax: taxAmount,
      discount: discountAmount,
      total,
      status: 'pending',
      paidAmount: 0,
      remainingAmount: total
    };

    onCreate(invoiceData);
    
    // إعادة تعيين النموذج
    setFormData({
      customerName: '',
      customerPhone: '',
      type: 'sale',
      paymentMethod: 'cash',
      notes: '',
      items: [{ id: 1, name: '', quantity: 1, price: 0, total: 0 }],
      discount: 0,
      taxRate: 15
    });
  };

  const invoiceTypes = [
  { value: "sale", label: "فاتورة مبيعات" },
  { value: "purchase", label: "فاتورة مشتريات" },
];

const paymentMethods = [
  { value: "cash", label: "نقداً" },
  { value: "bank_transfer", label: "تحويل بنكي" },
  { value: "cheque", label: "شيك" },
  { value: "card", label: "بطاقة ائتمان" },
];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: name === 'discount' || name === 'taxRate' ? parseFloat(value) : value
    });
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const updatedItems = [...formData.items];
    
    if (field === 'quantity' || field === 'price') {
      value = parseFloat(value) || 0;
    }
    
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };
    
    // حساب الإجمالي تلقائياً
    if (field === 'quantity' || field === 'price') {
      updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].price;
    }
    
    setFormData({
      ...formData,
      items: updatedItems
    });
  };

  const addItem = () => {
    const newId = formData.items.length > 0 ? Math.max(...formData.items.map(i => i.id)) + 1 : 1;
    setFormData({
      ...formData,
      items: [...formData.items, { id: newId, name: '', quantity: 1, price: 0, total: 0 }]
    });
  };

  const removeItem = (index: number) => {
    if (formData.items.length > 1) {
      const updatedItems = formData.items.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        items: updatedItems
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* الهيدر */}
        <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-gray-800">إنشاء فاتورة جديدة</h3>
            <p className="text-gray-600 text-sm mt-1">أضف تفاصيل الفاتورة والمنتجات</p>
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
          {/* معلومات العميل */}
          <div className="mb-8">
            <h4 className="text-lg font-bold text-gray-800 mb-4">معلومات العميل</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم العميل <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="customerName"
                  required
                  value={formData.customerName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="أدخل اسم العميل"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="05xxxxxxxx"
                />
              </div>

              <div>
                
               <CustomSelect
  control={control}
  name="type"
  label="نوع الفاتورة"
  placeholder="اختر نوع الفاتورة"
  options={invoiceTypes}
  error={errors.type?.message}
/>
              </div>

              <div>
               
             <CustomSelect
  control={control}
  name="paymentMethod"
  label="طريقة الدفع"
  placeholder="اختر طريقة الدفع"
  options={paymentMethods}
  error={errors.paymentMethod?.message}
/>
              </div>
            </div>
          </div>

          {/* قائمة المنتجات */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-bold text-gray-800">قائمة المنتجات</h4>
              <button
                type="button"
                onClick={addItem}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <FaPlus className="w-4 h-4" />
                <span>إضافة منتج</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 text-right text-sm font-medium text-gray-700">اسم المنتج</th>
                    <th className="p-3 text-center text-sm font-medium text-gray-700">الكمية</th>
                    <th className="p-3 text-center text-sm font-medium text-gray-700">سعر الوحدة</th>
                    <th className="p-3 text-center text-sm font-medium text-gray-700">الإجمالي</th>
                    <th className="p-3 text-center text-sm font-medium text-gray-700">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.items.map((item, index) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="p-3">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="اسم المنتج"
                          required
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                          className="w-24 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-center"
                          min="1"
                          required
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                          className="w-32 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-center"
                          min="0"
                          step="0.01"
                          required
                        />
                      </td>
                      <td className="p-3 text-center font-bold">
                        {item.total.toLocaleString('ar-SA')} ر.س
                      </td>
                      <td className="p-3 text-center">
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                          disabled={formData.items.length === 1}
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* الحسابات */}
          <div className="mb-8">
            <h4 className="text-lg font-bold text-gray-800 mb-4">الحسابات</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaPercent className="inline w-4 h-4 mr-2" />
                  نسبة الخصم (%)
                </label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  min="0"
                  max="100"
                  step="0.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaPercent className="inline w-4 h-4 mr-2" />
                  نسبة الضريبة (%)
                </label>
                <input
                  type="number"
                  name="taxRate"
                  value={formData.taxRate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  min="0"
                  max="100"
                  step="0.5"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">الإجمالي الفرعي:</span>
                    <span className="font-bold">{subtotal.toLocaleString('ar-SA')} ر.س</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الخصم:</span>
                    <span className="font-bold text-red-600">- {discountAmount.toLocaleString('ar-SA')} ر.س</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الضريبة:</span>
                    <span className="font-bold text-green-600">+ {taxAmount.toLocaleString('ar-SA')} ر.س</span>
                  </div>
                  <div className="pt-2 border-t border-gray-300">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-gray-800">الإجمالي النهائي:</span>
                      <span className="text-2xl font-bold text-blue-600">{total.toLocaleString('ar-SA')} ر.س</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* الملاحظات */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ملاحظات
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              placeholder="ملاحظات إضافية (اختياري)"
            />
          </div>

          {/* الأزرار */}
          <div className="flex gap-3 pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-700 font-medium transition-all duration-200 flex items-center justify-center gap-2"
            >
              <FaCalculator className="w-5 h-5" />
              <span>إنشاء الفاتورة</span>
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