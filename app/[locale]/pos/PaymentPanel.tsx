'use client';

import { CreditCard, Wallet, Banknote, Smartphone, Printer, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

interface PaymentPanelProps {
  totalAmount: number;
  onPayment: (method: string, amount: number) => void;
  onPrint: () => void;
  onSaveDraft: () => void;
}

export default function PaymentPanel({
  totalAmount,
  onPayment,
  onPrint,
  onSaveDraft,
}: PaymentPanelProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>('cash');
  const [paidAmount, setPaidAmount] = useState(totalAmount.toString());

  const paymentMethods = [
    { id: 'cash', label: 'نقدي', icon: Banknote, color: 'text-green-600' },
    { id: 'card', label: 'بطاقة', icon: CreditCard, color: 'text-blue-600' },
    { id: 'wallet', label: 'محفظة', icon: Wallet, color: 'text-purple-600' },
    { id: 'transfer', label: 'تحويل', icon: Smartphone, color: 'text-orange-600' },
  ];

  const handlePayment = () => {
    const amount = parseFloat(paidAmount);
    if (amount >= totalAmount) {
      onPayment(paymentMethod, amount);
    }
  };

  const change = parseFloat(paidAmount) - totalAmount;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-6">
      {/* طرق الدفع */}
      <div>
        <h3 className="font-bold text-lg mb-3 text-gray-800">طريقة الدفع</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {paymentMethods.map((method) => (
            <Button
              key={method.id}
              variant={paymentMethod === method.id ? 'default' : 'outline'}
              className={`flex flex-col items-center justify-center h-24 p-3 ${
                paymentMethod === method.id ? 'bg-blue-50 border-blue-500 text-blue-600' : ''
              }`}
              onClick={() => setPaymentMethod(method.id)}
            >
              <method.icon className={`h-8 w-8 mb-2 ${method.color}`} />
              <span className="text-sm">{method.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* إدخال المبلغ */}
      <div>
        <h3 className="font-bold text-lg mb-2 text-gray-800">المبلغ المدفوع</h3>
        <div className="relative">
          <input
            type="text"
            value={paidAmount}
            onChange={(e) => setPaidAmount(e.target.value)}
            className="w-full text-3xl font-bold pl-4 pr-12 py-4 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-right"
          />
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
            ر.س
          </span>
        </div>
      </div>

      {/* الملخص النهائي */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">المبلغ الإجمالي:</span>
          <span className="font-bold text-lg">{totalAmount.toFixed(2)} ر.س</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">المبلغ المدفوع:</span>
          <span className="font-medium">{parseFloat(paidAmount).toFixed(2)} ر.س</span>
        </div>
        <div className="flex justify-between border-t pt-2">
          <span className="text-gray-600">الباقي:</span>
          <span
            className={`font-bold text-lg ${
              change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {change.toFixed(2)} ر.س
          </span>
        </div>
      </div>

      {/* أزرار الإجراءات */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          className="h-14 flex items-center justify-center gap-2"
          onClick={onSaveDraft}
        >
          حفظ مسودة
        </Button>

        <Button
          variant="outline"
          className="h-14 flex items-center justify-center gap-2"
          onClick={onPrint}
        >
          <Printer className="h-5 w-5" />
          طباعة
        </Button>

        <Button
          className="h-14 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white col-span-2"
          onClick={handlePayment}
          disabled={change < 0}
        >
          <Send className="h-5 w-5" />
          إتمام الدفع وإغلاق الفاتورة
        </Button>
      </div>
    </div>
  );
}
