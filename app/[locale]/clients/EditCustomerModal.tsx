'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import apiServiceCall from '@/lib/apiServiceCall';
import CustomSelect from '@/components/shared/reusableComponents/CustomSelect';

interface EditCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: any;
  onEdit: (customer: any) => void;
}

type FormValues = {
  name: string;
  email: string;
  phone: string;
  secondary_phone?: string;
  identity_number?: string;
  wallet?: string;
  tax_number?: string;
  hall: string;
  password?: string;
  password_confirmation?: string;
};

export default function EditCustomerModal({
  isOpen,
  onClose,
  customer,
  onEdit,
}: EditCustomerModalProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  /* ===== Options ===== */
  const hallsOptions = [
    { value: '1', label: 'القاعة الرئيسية' },
    { value: '2', label: 'القاعة الفرعية' },
  ];

  /* ===== Fill Form ===== */
useEffect(() => {
  if (customer) {
    reset({
      name: customer.name ?? '',
      email: customer.email ?? '',
      phone: customer.phone ?? '',
      secondary_phone: customer.secondary_phone ?? customer.secondaryPhone ?? '',
      identity_number: customer.identity_number ?? customer.identityNumber ?? '',
      wallet: customer.wallet ?? '0.00',
      tax_number: customer.tax_number ?? customer.taxNo ?? '',
      hall: customer.hall ?? '', // نص القاعة مباشرة
      password: '',
      password_confirmation: '',
    });
  }
}, [customer, reset]);


  /* ===== Mutation ===== */
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: any) =>
      apiServiceCall({
        url: `users/update/${customer.id}`,
        method: 'POST',
        body: payload,
      }),
    onSuccess: (res) => {
      toast.success(res.message || 'تم تعديل بيانات العميل بنجاح');
      onEdit(res.data);
      onClose();
    },
    onError: (error: any) => {
      toast.error(error?.message || 'حدث خطأ أثناء التعديل');
    },
  });

  /* ===== Submit ===== */
  const onSubmit = (data: FormValues) => {
    const payload: any = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      secondary_phone: data.secondary_phone || null,
      identity_number: data.identity_number || null,
      wallet: Number(data.wallet || 0),
      tax_number: data.tax_number || null,
      hall: Number(data.hall),
    };

    // كلمة المرور اختيارية
    if (data.password) {
      payload.password = data.password;
      payload.password_confirmation = data.password_confirmation;
    }

    mutate(payload);
  };

  if (!isOpen || !customer) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl overflow-hidden">

        {/* Header */}
        <div className="p-4 border-b bg-gray-50">
          <h3 className="text-xl font-semibold">تعديل بيانات العميل</h3>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              {...register('name', { required: 'الاسم مطلوب' })}
              placeholder="اسم العميل"
              className="border h-[40px] rounded px-2 outline-none"
            />

            <input
              {...register('email', { required: 'البريد الإلكتروني مطلوب' })}
              placeholder="البريد الإلكتروني"
              className="border h-[40px] rounded px-2 outline-none"
            />

            <input
              {...register('phone', { required: 'رقم الجوال مطلوب' })}
              placeholder="رقم الجوال"
              className="border h-[40px] rounded px-2 outline-none"
            />

            <input
              {...register('secondary_phone')}
              placeholder="جوال آخر"
              className="border h-[40px] rounded px-2 outline-none"
            />

            <input
              {...register('identity_number')}
              placeholder="رقم الهوية"
              className="border h-[40px] rounded px-2 outline-none"
            />

            <input
              {...register('tax_number')}
              placeholder="الرقم الضريبي"
              className="border h-[40px] rounded px-2 outline-none"
            />

            <input
              {...register('wallet')}
              placeholder="الرصيد"
              className="border h-[40px] rounded px-2 outline-none"
            />

            <CustomSelect
              control={control}
              name="hall"
              placeholder="اختر القاعة"
              options={hallsOptions}
              error={errors.hall?.message}
            />

            <input
              {...register('password')}
              type="password"
              placeholder="كلمة المرور (اختياري)"
              className="border h-[40px] rounded px-2 outline-none"
            />

           

          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
            >
              {isPending ? 'جاري الحفظ...' : 'حفظ التعديلات'}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 py-2 rounded-lg"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
