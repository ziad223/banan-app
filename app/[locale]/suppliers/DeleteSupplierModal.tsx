// app/suppliers/components/DeleteSupplierModal.tsx
'use client';

import { FaTimes, FaExclamationTriangle, FaTrash, FaShoppingCart, FaCreditCard } from 'react-icons/fa';
import { MdAttachMoney } from 'react-icons/md';

interface DeleteSupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  supplier: any;
  onDelete: () => void;
}

export default function DeleteSupplierModal({ isOpen, onClose, supplier, onDelete }: DeleteSupplierModalProps) {
  if (!isOpen || !supplier) return null;

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-3xl w-full">
        {/* الهيدر */}
        <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <FaExclamationTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-800">تأكيد الحذف</h3>
              <p className="text-gray-600 text-sm mt-1">حذف مورد من النظام</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <FaTimes className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* المحتوى */}
        <div className="p-6">
          {/* تحذير */}
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
            <div className="flex items-start gap-3">
              <FaExclamationTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-red-800">تحذير هام!</p>
                <p className="text-sm text-red-600 mt-1">
                  حذف مورد يؤدي إلى إزالة جميع بياناته ولا يمكن التراجع عن هذه العملية.
                </p>
              </div>
            </div>
          </div>

          {/* معلومات المورد */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {supplier.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-gray-800">{supplier.name}</h4>
                <p className="text-sm text-gray-600">{supplier.category}</p>
              </div>
            </div>

            {/* التفاصيل المالية */}
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <FaShoppingCart className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">إجمالي المشتريات</span>
                </div>
                <span className="font-bold text-gray-800">
                  {supplier.totalPurchases?.toLocaleString('ar-SA')} ر.س
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <FaCreditCard className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">حد الائتمان</span>
                </div>
                <span className="font-bold text-gray-800">
                  {supplier.creditLimit?.toLocaleString('ar-SA')} ر.س
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <MdAttachMoney className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">الرصيد الحالي</span>
                </div>
                <span className={`font-bold ${supplier.balance < 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(supplier.balance).toLocaleString('ar-SA')} ر.س
                  <span className="text-xs ml-2">
                    ({supplier.balance < 0 ? 'دائن' : 'مدين'})
                  </span>
                </span>
              </div>
            </div>

            {/* معلومات الاتصال */}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <span className="font-medium">جهة الاتصال:</span> {supplier.contactPerson || 'غير محدد'}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-medium">الهاتف:</span> {supplier.phone}
              </p>
              {supplier.email && (
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">البريد:</span> {supplier.email}
                </p>
              )}
            </div>
          </div>

          {/* التأكيد */}
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-6">
            <p className="text-yellow-800 text-sm text-center">
              هل أنت متأكد من حذف المورد <strong className="font-bold">{supplier.name}</strong>؟
              <br />
              <span className="text-yellow-600">لا يمكن التراجع عن هذه العملية.</span>
            </p>
          </div>
        </div>

        {/* الأزرار */}
        <div className="sticky bottom-0 bg-white p-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleDelete}
              className="flex-1 bg-gradient-to-r from-red-600 to-pink-700 text-white py-3 rounded-lg hover:from-red-700 hover:to-pink-800 font-medium flex items-center justify-center gap-2 transition-all duration-200"
            >
              <FaTrash className="w-4 h-4" />
              <span>نعم، احذف المورد</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 font-medium border border-gray-300 transition-all duration-200"
            >
              إلغاء
            </button>
          </div>
          
          {/* خيار بديل */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              بدلاً من الحذف، يمكنك 
              <button
                onClick={() => {
                  console.log('تعطيل المورد:', supplier.id);
                  onClose();
                }}
                className="text-blue-600 hover:text-blue-800 font-medium mr-1"
              >
                تعطيل المورد مؤقتاً
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}