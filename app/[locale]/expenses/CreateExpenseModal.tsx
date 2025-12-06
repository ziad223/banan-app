// app/expenses/components/CreateExpenseModal.tsx
'use client';

import { useState } from 'react';
import { FaTimes, FaPaperclip, FaCalculator } from 'react-icons/fa';
import CustomSelect from '@/components/shared/reusableComponents/CustomSelect';
import { useForm } from 'react-hook-form';

interface CreateExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (expense: any) => void;
  categories: any[];
}

export default function CreateExpenseModal({ 
  isOpen, 
  onClose, 
  onCreate,
  categories 
}: CreateExpenseModalProps) {
     const { control, register, watch } = useForm({
    defaultValues: {
      category: "",
      subCategory: "",
      paymentMethod: "",
    },
  });
  



  const [formData, setFormData] = useState({
    category: '',
    subCategory: '',
    vendor: '',
    vendorPhone: '',
    description: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'cash',
    referenceNumber: '',
    notes: '',
    attachment: null as File | null
  });

  const [subCategories, setSubCategories] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const expenseData = {
      ...formData,
      amount: parseFloat(formData.amount.toString()),
      attachment: formData.attachment ? formData.attachment.name : ''
    };

    onCreate(expenseData);
    
    // إعادة تعيين النموذج
    setFormData({
      category: '',
      subCategory: '',
      vendor: '',
      vendorPhone: '',
      description: '',
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      paymentMethod: 'cash',
      referenceNumber: '',
      notes: '',
      attachment: null
    });
  };

  const handleCategoryChange = (categoryName: string) => {
    const selectedCategory = categories.find(c => c.name === categoryName);
    setSubCategories(selectedCategory?.subCategories || []);
    setFormData({
      ...formData,
      category: categoryName,
      subCategory: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        attachment: e.target.files[0]
      });
    }
  };

  const paymentMethods = [
    { value: "cash", label: "نقداً" },
    { value: "bank_transfer", label: "تحويل بنكي" },
    { value: "cheque", label: "شيك" },
    { value: "card", label: "بطاقة ائتمان" },
    { value: "wallet", label: "محفظة إلكترونية" }
  ];

  const categoryOptions = categories.map(category => ({
    value: category.name,
    label: category.name
  }));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* الهيدر */}
        <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-gray-800">إضافة مصروف جديد</h3>
            <p className="text-gray-600 text-sm mt-1">أضف تفاصيل المصروف والتوثيق</p>
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
          {/* المعلومات الأساسية */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
             
                 <CustomSelect
        control={control}
        name="category"
        label="التصنيف الرئيسي"
        placeholder="اختر التصنيف"
        options={categories.map((cat) => ({ value: cat.name, label: cat.name }))}
        error={""}
      />
            </div>

            <div>
             
               <CustomSelect
        control={control}
        name="subCategory"
        label="التصنيف الفرعي"
        placeholder="اختر التصنيف الفرعي"
        options={subCategories.map((sub) => ({ value: sub, label: sub }))}
        error={""}
      />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                المورد / المستلم <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="vendor"
                required
                value={formData.vendor}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                placeholder="اسم المورد أو المستلم"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                هاتف المورد
              </label>
              <input
                type="tel"
                name="vendorPhone"
                value={formData.vendorPhone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                placeholder="05xxxxxxxx"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                وصف المصروف <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                placeholder="وصف مفصل للمصروف"
              />
            </div>
          </div>

          {/* المبلغ والدفع */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                المبلغ <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="amount"
                  required
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  ر.س
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                التاريخ <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>

            <div>
            
            <CustomSelect
        control={control}
        name="paymentMethod"
        label="طريقة الدفع"
        placeholder="اختر طريقة الدفع"
        options={paymentMethods}
        error={""}
      />
            </div>
          </div>

          {/* رقم المرجع */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              رقم المرجع / الفاتورة
            </label>
            <input
              type="text"
              name="referenceNumber"
              value={formData.referenceNumber}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              placeholder="رقم الفاتورة أو المرجع"
            />
          </div>

          {/* المرفق */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaPaperclip className="inline w-4 h-4 mr-2" />
              إرفاق مستند
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                id="attachment"
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <label htmlFor="attachment" className="cursor-pointer">
                <div className="space-y-2">
                  <div className="text-gray-500">
                    {formData.attachment ? (
                      <div className="text-green-600 font-medium">
                        ✓ {formData.attachment.name}
                      </div>
                    ) : (
                      <>
                        <div>اسحب وأفلت الملف هنا</div>
                        <div className="text-sm">أو انقر للاختيار</div>
                      </>
                    )}
                  </div>
                  <div className="text-xs text-gray-400">
                    PDF, JPG, PNG حتى 10MB
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* الملاحظات */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ملاحظات إضافية
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none resize-none"
              placeholder="ملاحظات إضافية حول المصروف"
            />
          </div>

          {/* الأزرار */}
          <div className="flex gap-3 pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-red-500 to-orange-600 text-white py-3 rounded-lg hover:from-red-600 hover:to-orange-700 font-medium transition-all duration-200 flex items-center justify-center gap-2"
            >
              <FaCalculator className="w-5 h-5" />
              <span>إضافة المصروف</span>
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