'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import apiServiceCall from '@/lib/apiServiceCall';

interface DeleteCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: any;
  onDelete: (deletedCustomer: any) => void;
}

export default function DeleteCustomerModal({
  isOpen,
  onClose,
  customer,
  onDelete,
}: DeleteCustomerModalProps) {
  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      apiServiceCall({
        url: `users/${customer.id}`,
        method: 'DELETE',
      }),
    onSuccess: (res) => {
      toast.success(res.message || 'تم حذف العميل بنجاح');
      onDelete(customer);
      onClose();
    },
    onError: (error: any) => {
      toast.error(error?.message || 'حدث خطأ أثناء الحذف');
    },
  });

  if (!isOpen || !customer) return null;

  const handleDelete = () => {
    mutate();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-4 border-b">
          <h3 className="text-lg font-bold text-red-600">تأكيد الحذف</h3>
        </div>

        <div className="p-4">
          <p className="text-gray-700">
            هل أنت متأكد من حذف العميل <strong>{customer.name}</strong>؟
          </p>
          <p className="text-sm text-gray-500 mt-2">رقم الجوال: {customer.phone}</p>
        </div>

        <div className="p-4 border-t flex gap-2">
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            {isPending ? 'جاري الحذف...' : 'نعم، احذف'}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 py-2 rounded hover:bg-gray-400"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}
