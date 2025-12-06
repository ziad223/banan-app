// app/expenses/components/ExpensesStats.tsx
'use client';

import { 
  FaMoneyBillWave, 
  FaClock, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaCreditCard, 
  FaCalendarAlt 
} from 'react-icons/fa';

interface ExpensesStatsProps {
  stats: {
    total: number;
    totalAmount: number;
    pending: number;
    approved: number;
    paid: number;
    rejected: number;
    thisMonth: number;
    thisMonthAmount: number;
  };
}

export default function ExpensesStats({ stats }: ExpensesStatsProps) {
  const cards = [
    {
      title: 'إجمالي المصروفات',
      value: `${stats.totalAmount.toLocaleString('ar-SA')} ر.س`,
      description: `${stats.total} مصروف`,
      icon: FaMoneyBillWave,
      color: 'red',
      gradient: 'from-red-50 to-red-100'
    },
    {
      title: 'هذا الشهر',
      value: `${stats.thisMonthAmount.toLocaleString('ar-SA')} ر.س`,
      description: `${stats.thisMonth} مصروف`,
      icon: FaCalendarAlt,
      color: 'purple',
      gradient: 'from-purple-50 to-purple-100'
    },
    {
      title: 'قيد المراجعة',
      value: stats.pending.toString(),
      description: 'في انتظار الموافقة',
      icon: FaClock,
      color: 'yellow',
      gradient: 'from-yellow-50 to-yellow-100'
    },
    {
      title: 'معتمدة',
      value: stats.approved.toString(),
      description: 'مصروفات معتمدة',
      icon: FaCheckCircle,
      color: 'blue',
      gradient: 'from-blue-50 to-blue-100'
    },
    {
      title: 'مدفوعة',
      value: stats.paid.toString(),
      description: 'تم دفعها',
      icon: FaCreditCard,
      color: 'green',
      gradient: 'from-green-50 to-green-100'
    },
    {
      title: 'مرفوضة',
      value: stats.rejected.toString(),
      description: 'مصروفات مرفوضة',
      icon: FaTimesCircle,
      color: 'gray',
      gradient: 'from-gray-50 to-gray-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 mb-6">
      {cards.map((card, index) => (
        <div 
          key={index} 
          className={`p-4 rounded-xl border border-${card.color}-200 bg-gradient-to-r ${card.gradient}`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium mb-1 text-gray-700">{card.title}</p>
              <p className="text-xl font-bold text-gray-900">{card.value}</p>
              <p className="text-xs mt-1 text-gray-600">{card.description}</p>
            </div>
            <div className={`p-2 rounded-lg bg-${card.color}-500 bg-opacity-20`}>
              <card.icon className={`w-5 h-5 text-${card.color}-600`} />
            </div>
          </div>
          
          {/* شريط التقدم (للمصروفات المعتمدة والمدفوعة) */}
          {card.title === 'معتمدة' && (
            <div className="mt-3">
              <div className="h-1 w-full bg-gray-200 rounded-full">
                <div 
                  className="h-1 bg-blue-500 rounded-full" 
                  style={{ width: `${(stats.approved / stats.total) * 100 || 0}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                {((stats.approved / stats.total) * 100 || 0).toFixed(1)}% من إجمالي المصروفات
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}