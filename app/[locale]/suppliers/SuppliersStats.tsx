// app/suppliers/components/SuppliersStats.tsx
'use client';

import { FaUsers, FaCheckCircle, FaCreditCard, FaShoppingCart, FaStar } from 'react-icons/fa';

interface SuppliersStatsProps {
  stats: {
    total: number;
    active: number;
    totalBalance: number;
    totalCredit: number;
    totalPurchases: number;
  };
}

export default function SuppliersStats({ stats }: SuppliersStatsProps) {
  const cards = [
    {
      title: 'إجمالي الموردين',
      value: stats.total.toString(),
      description: `${stats.active} نشطين • ${stats.total - stats.active} غير نشطين`,
      icon: FaUsers,
      color: 'blue'
    },
    {
      title: 'إجمالي الرصيد',
      value: `${Math.abs(stats.totalBalance).toLocaleString('ar-SA')} ر.س`,
      description: stats.totalBalance < 0 ? 'دائن للموردين' : 'مدين للموردين',
      icon: FaCreditCard,
      color: stats.totalBalance < 0 ? 'green' : 'red'
    },
    {
      title: 'إجمالي المشتريات',
      value: `${stats.totalPurchases.toLocaleString('ar-SA')} ر.س`,
      description: 'قيمة المشتريات الإجمالية',
      icon: FaShoppingCart,
      color: 'purple'
    },
    {
      title: 'حد الائتمان',
      value: `${stats.totalCredit.toLocaleString('ar-SA')} ر.س`,
      description: `${((Math.abs(stats.totalBalance) / stats.totalCredit) * 100).toFixed(1)}% مستخدم`,
      icon: FaStar,
      color: 'orange'
    }
  ];

  const colorClasses = {
    blue: 'from-blue-50 to-blue-100 border-blue-200 text-blue-700 bg-blue-200',
    green: 'from-green-50 to-green-100 border-green-200 text-green-700 bg-green-200',
    red: 'from-red-50 to-red-100 border-red-200 text-red-700 bg-red-200',
    purple: 'from-purple-50 to-purple-100 border-purple-200 text-purple-700 bg-purple-200',
    orange: 'from-orange-50 to-orange-100 border-orange-200 text-orange-700 bg-orange-200'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {cards.map((card, index) => (
        <div key={index} className={`bg-gradient-to-r p-6 rounded-xl border ${colorClasses[card.color as keyof typeof colorClasses]}`}>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm">{card.title}</p>
              <p className="text-2xl font-bold mt-2">{card.value}</p>
              <p className="text-xs mt-1">
                {card.description}
              </p>
            </div>
            <div className="p-3 rounded-lg">
              <card.icon className="w-8 h-8" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}