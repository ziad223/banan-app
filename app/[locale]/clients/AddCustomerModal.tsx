'use client';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import apiServiceCall from '@/lib/apiServiceCall';
import CustomSelect from '@/components/shared/reusableComponents/CustomSelect';

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (customer: any) => void;
}

type FormValues = {
  name: string;
  email: string;
  password: string;
  phone: string;
  secondary_phone?: string;
  identity_number?: string;
  wallet?: string;
  tax_number?: string;
  hall: string;
};

export default function AddCustomerModal({
  isOpen,
  onClose,
  onAdd,
}: AddCustomerModalProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      hall: '',
      wallet: '0',
    },
  });

  const hallsOptions = [
    { value: '1', label: 'القاعة الرئيسية' },
    { value: '2', label: 'القاعة الفرعية' },
  ];

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormValues) =>
      apiServiceCall({
        url: 'users',
        method: 'POST',
        body: data,
      }),
    onSuccess: (res) => {
      toast.success(res.message || 'تم إضافة العميل بنجاح');
      onAdd(res.data);
      reset();
      onClose();
    },
    onError: (error: any) => {
      toast.error(error?.message || 'حدث خطأ أثناء الإضافة');
    },
  });

  const onSubmit = (data: FormValues) => {
    mutate(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white overflow-y-auto max-h-[90%] lg:h-max rounded-xl w-full max-w-2xl">
        {/* Header */}
        <div className="p-4 border-b bg-gray-50">
          <h3 className="text-xl font-semibold">إضافة عميل جديد</h3>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              {...register('name', { required: 'اسم العميل مطلوب' })}
              placeholder="اسم العميل"
              className="input border h-[40px] rounded px-2 outline-none"
            />
            <input
              {...register('email', { required: 'البريد مطلوب' })}
              placeholder="البريد الإلكتروني"
              className="input border h-[40px] rounded px-2 outline-none"
            />
            <input
              {...register('password', { required: 'كلمة المرور مطلوبة' })}
              placeholder="كلمة المرور"
              type="password"
              className="input border h-[40px] rounded px-2 outline-none"
            />
            <input
              {...register('phone', { required: 'رقم الجوال مطلوب' })}
              placeholder="رقم الجوال"
                            className="input border h-[40px] rounded px-2 outline-none"
            />
            <input
              {...register('secondary_phone')}
              placeholder="جوال آخر"
                            className="input border h-[40px] rounded px-2 outline-none"
            />
            <input
              {...register('identity_number')}
              placeholder="رقم الهوية"
                            className="input border h-[40px] rounded px-2 outline-none"
            />
            <input
              {...register('tax_number')}
              placeholder="الرقم الضريبي"
                            className="input border h-[40px] rounded px-2 outline-none"
            />
            <input
              {...register('wallet')}
              placeholder="الرصيد"
                            className="input border h-[40px] rounded px-2 outline-none"
            />

            {/* Halls */}
            <CustomSelect
              control={control}
              name="hall"
              label="القاعة"
              placeholder="اختر القاعة"
              options={hallsOptions}
              error={errors.hall?.message}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-green-600 text-white py-2 rounded-lg"
            >
              {isPending ? 'جاري الحفظ...' : 'حفظ'}
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
