// app/invoices/components/InvoicesStats.tsx
'use client';

import { FaFileInvoiceDollar, FaCheckCircle, FaClock, FaExclamationTriangle, FaMoneyBillWave, FaCalendarAlt } from 'react-icons/fa';

interface InvoicesStatsProps {
  stats: {
    total: number;
    totalAmount: number;
    paid: number;
    pending: number;
    overdue: number;
    thisMonth: number;
  };
}

export default function InvoicesStats({ stats }: InvoicesStatsProps) {
  const cards = [
    {
      title: 'إجمالي الفواتير',
      value: stats.total.toString(),
      description: `${stats.thisMonth} هذا الشهر`,
      icon: FaFileInvoiceDollar,
      color: 'blue'
    },
    {
      title: 'إجمالي المبلغ',
      value: `${stats.totalAmount.toLocaleString('ar-SA')} ر.س`,
      description: 'مجموع قيمة الفواتير',
      icon: FaMoneyBillWave,
      color: 'purple'
    },
    {
      title: 'مدفوعة',
      value: stats.paid.toString(),
      description: `${((stats.paid / stats.total) * 100 || 0).toFixed(0)}% من إجمالي الفواتير`,
      icon: FaCheckCircle,
      color: 'green'
    },
    {
      title: 'معلقة',
      value: stats.pending.toString(),
      description: 'في انتظار السداد',
      icon: FaClock,
      color: 'yellow'
    },
    {
      title: 'متأخرة',
      value: stats.overdue.toString(),
      description: 'تجاوزت تاريخ الاستحقاق',
      icon: FaExclamationTriangle,
      color: 'red'
    }
  ];

  const colorClasses = {
    blue: 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 text-blue-700',
    green: 'bg-gradient-to-r from-green-50 to-green-100 border-green-200 text-green-700',
    red: 'bg-gradient-to-r from-red-50 to-red-100 border-red-200 text-red-700',
    yellow: 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200 text-yellow-700',
    purple: 'bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200 text-purple-700'
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {cards.map((card, index) => (
        <div 
          key={index} 
          className={`p-4 rounded-xl border ${colorClasses[card.color as keyof typeof colorClasses]}`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium mb-1">{card.title}</p>
              <p className="text-xl font-bold">{card.value}</p>
              <p className="text-xs mt-1 opacity-75">{card.description}</p>
            </div>
            <div className="p-2 rounded-lg bg-white bg-opacity-50">
              <card.icon className="w-5 h-5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}