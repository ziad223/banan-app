// app/customers/components/CustomersStats.tsx
'use client';

import { MdPersonAdd } from 'react-icons/md';
import { CiViewList } from 'react-icons/ci';
import { MdAttachMoney } from 'react-icons/md';
import { FaFileInvoiceDollar } from 'react-icons/fa';

interface CustomersStatsProps {
  stats: {
    total: number;
    customers: number;
    suppliers: number;
    active: number;
    totalBalance: number;
    totalCredit: number;
  };
}

export default function CustomersStats({ stats }: CustomersStatsProps) {
  const cards = [
    {
      title: 'إجمالي العملاء',
      value: stats.total.toString(),
      description: `${stats.customers} عميل • ${stats.suppliers} مورد`,
      icon: MdPersonAdd,
      color: 'blue'
    },
    {
      title: 'العملاء النشطين',
      value: stats.active.toString(),
      description: `${((stats.active / stats.total) * 100).toFixed(1)}% من إجمالي العملاء`,
      icon: CiViewList,
      color: 'green'
    },
    {
      title: 'إجمالي الرصيد',
      value: `${stats.totalBalance.toLocaleString('ar-SA')} ر.س`,
      description: stats.totalBalance > 0 ? 'مدين' : 'دائن',
      icon: MdAttachMoney,
      color: 'red'
    },
    {
      title: 'حد الائتمان',
      value: `${stats.totalCredit.toLocaleString('ar-SA')} ر.س`,
      description: `${((Math.abs(stats.totalBalance) / stats.totalCredit) * 100).toFixed(1)}% مستخدم`,
      icon: FaFileInvoiceDollar,
      color: 'purple'
    }
  ];

  const colorClasses = {
    blue: 'from-blue-50 to-blue-100 border-blue-200 text-blue-700 bg-blue-200',
    green: 'from-green-50 to-green-100 border-green-200 text-green-700 bg-green-200',
    red: 'from-red-50 to-red-100 border-red-200 text-red-700 bg-red-200',
    purple: 'from-purple-50 to-purple-100 border-purple-200 text-purple-700 bg-purple-200'
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