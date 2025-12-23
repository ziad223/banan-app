'use client';

interface ViewCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: any;
}

export default function ViewCustomerModal({ isOpen, onClose, customer }: ViewCustomerModalProps) {
  if (!isOpen || !customer) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full  overflow-y-auto max-w-2xl overflow-hidden shadow-xl">
        {/* Header */}
        <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">بيانات العميل</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-lg font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-right">
          <div className="bg-gray-50 p-3 rounded shadow-sm">
            <span className="font-medium text-gray-600">الاسم:</span>
            <p className="mt-1 text-gray-800">{customer.name}</p>
          </div>

          <div className="bg-gray-50 p-3 rounded shadow-sm">
            <span className="font-medium text-gray-600">البريد الإلكتروني:</span>
            <p className="mt-1 text-gray-800">{customer.email}</p>
          </div>

          <div className="bg-gray-50 p-3 rounded shadow-sm">
            <span className="font-medium text-gray-600">رقم الجوال:</span>
            <p className="mt-1 text-gray-800">{customer.phone || '-'}</p>
          </div>

          <div className="bg-gray-50 p-3 rounded shadow-sm">
            <span className="font-medium text-gray-600">جوال آخر:</span>
            <p className="mt-1 text-gray-800">{customer.secondaryPhone || '-'}</p>
          </div>

          <div className="bg-gray-50 p-3 rounded shadow-sm">
            <span className="font-medium text-gray-600">رقم الهوية:</span>
            <p className="mt-1 text-gray-800">{customer.identityNumber || '-'}</p>
          </div>

          <div className="bg-gray-50 p-3 rounded shadow-sm">
            <span className="font-medium text-gray-600">الرقم الضريبي:</span>
            <p className="mt-1 text-gray-800">{customer.taxNumber || '-'}</p>
          </div>

          <div className="bg-gray-50 p-3 rounded shadow-sm">
            <span className="font-medium text-gray-600">الرصيد:</span>
            <p className={`mt-1 font-bold ${customer.balance > 0 ? 'text-red-600' : customer.balance < 0 ? 'text-green-600' : 'text-gray-800'}`}>
              {Number(customer.balance).toLocaleString('ar-SA')} ر.س
            </p>
          </div>

          <div className="bg-gray-50 p-3 rounded shadow-sm">
            <span className="font-medium text-gray-600">القاعة:</span>
            <p className="mt-1 text-gray-800">{customer.hall || '-'}</p>
          </div>

          <div className="bg-gray-50 p-3 rounded shadow-sm">
            <span className="font-medium text-gray-600">الحالة:</span>
            <p className={`mt-1 font-semibold ${customer.status === 'active' ? 'text-green-600' : 'text-gray-500'}`}>
              {customer.status === 'active' ? 'نشط' : 'غير نشط'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}
