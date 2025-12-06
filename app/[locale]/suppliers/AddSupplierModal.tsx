    // app/suppliers/components/AddSupplierModal.tsx
    'use client';

    import CustomSelect from '@/components/shared/reusableComponents/CustomSelect';
    import { useState } from 'react';
    import { useForm } from 'react-hook-form';
    import { FaTimes } from 'react-icons/fa';

    interface AddSupplierModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (supplier: any) => void;
    }

    export default function AddSupplierModal({ isOpen, onClose, onAdd }: AddSupplierModalProps) {
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
        name: '',
        category: 'مواد غذائية',
        phone: '',
        email: '',
        contactPerson: '',
        contactPhone: '',
        address: '',
        taxNumber: '',
        vatRate: 15,
        creditLimit: 50000,
        paymentTerms: '30 يوم',
        deliveryTime: '3-5 أيام',
        notes: ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd(formData);
        setFormData({
        name: '',
        category: 'مواد غذائية',
        phone: '',
        email: '',
        contactPerson: '',
        contactPhone: '',
        address: '',
        taxNumber: '',
        vatRate: 15,
        creditLimit: 50000,
        paymentTerms: '30 يوم',
        deliveryTime: '3-5 أيام',
        notes: ''
        });
        onClose();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    const categories = ['مواد غذائية', 'إلكترونيات', 'تكنولوجيا', 'قرطاسية', 'أثاث', 'بناء', 'تغليف', 'أخرى'];
    const paymentTermsOptions = [
    { value: "فوري", label: "فوري" },
    { value: "عند التسليم", label: "عند التسليم" },
    { value: "7 أيام", label: "7 أيام" },
    { value: "15 يوم", label: "15 يوم" },
    { value: "30 يوم", label: "30 يوم" },
    { value: "مقدمة 50% والباقي عند التسليم", label: "مقدمة 50% والباقي عند التسليم" },
    ];
    const deliveryTimeOptions = [
    { value: "فوري", label: "فوري" },
    { value: "1 يوم", label: "1 يوم" },
    { value: "2 يوم", label: "2 يوم" },
    { value: "3 أيام", label: "3 أيام" },
    { value: "أسبوع", label: "أسبوع" },
    { value: "10 أيام", label: "10 أيام" },
    { value: "14 يوم", label: "14 يوم" },
    ];
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* الهيدر */}
            <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex justify-between items-center">
            <div>
                <h3 className="text-xl font-bold text-gray-800">إضافة مورد جديد</h3>
                <p className="text-gray-600 text-sm mt-1">املأ البيانات التالية لإضافة مورد جديد</p>
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
                    placeholder="اسم الشركة أو المؤسسة"
                    />
                </div>

                {/* الفئة */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    فئة المورد <span className="text-red-500">*</span>
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
                    type="text"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="0xxxxxxxxx"
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
                    placeholder="info@example.com"
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
                    placeholder="اسم الشخص المسؤول"
                    />
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
                    type="text"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="05xxxxxxxx"
                    />
                </div>

                {/* حد الائتمان */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    حد الائتمان
                    </label>
                    <input
                    type="number"
                    name="creditLimit"
                    value={formData.creditLimit}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="50000"
                    min="0"
                    />
                </div>

                {/* شروط السداد */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    شروط السداد
                    </label>
                <CustomSelect
    control={control}
    name="paymentTerms"
    label="شروط الدفع"
    placeholder="اختر شرط الدفع"
    options={paymentTermsOptions}
    error={errors.paymentTerms?.message}
    />

                </div>

                {/* وقت التوصيل */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    وقت التوصيل
                    </label>
                    <CustomSelect
    control={control}
    name="deliveryTime"
    label="مدة التسليم"
    placeholder="اختر مدة التسليم"
    options={deliveryTimeOptions}
    error={errors.deliveryTime?.message}
    />
                </div>

                {/* الرقم الضريبي */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    الرقم الضريبي
                    </label>
                    <input
                    type="text"
                    name="taxNumber"
                    value={formData.taxNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="الرقم الضريبي (اختياري)"
                    />
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
                placeholder="أدخل عنوان المورد"
                />
            </div>

            {/* ملاحظات */}
            <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                ملاحظات
                </label>
                <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                placeholder="ملاحظات إضافية عن المورد"
                />
            </div>

            {/* الأزرار */}
            <div className="flex gap-3 pt-8 border-t border-gray-200 mt-6">
                <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-700 font-medium transition-all duration-200"
                >
                حفظ المورد الجديد
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