// app/reports/components/StatsCards.tsx
'use client';

import { FaMoneyBillWave, FaCreditCard, FaChartLine, FaPercentage } from 'react-icons/fa';

interface StatsCardsProps {
  data: any;
}

export default function StatsCards({ data }: StatsCardsProps) {
  const cards = [
    {
      title: 'المبيعات',
      value: data.overview.totalSales.toLocaleString('ar-SA'),
      change: `+${data.overview.growth}%`,
      icon: FaMoneyBillWave,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'المصروفات',
      value: data.overview.totalExpenses.toLocaleString('ar-SA'),
      change: '-2.3%',
      icon: FaCreditCard,
      color: 'bg-red-500',
      textColor: 'text-red-600'
    },
    {
      title: 'صافي الربح',
      value: data.overview.netProfit.toLocaleString('ar-SA'),
      change: `+${data.overview.growth}%`,
      icon: FaChartLine,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'هامش الربح',
      value: `${data.overview.profitMargin}%`,
      change: '+1.2%',
      icon: FaPercentage,
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg ${card.color}`}>
              <card.icon className="w-5 h-5 text-white" />
            </div>
            <span className={`text-sm font-medium ${card.textColor}`}>
              {card.change}
            </span>
          </div>
          
          <div>
            <p className="text-sm text-gray-600 mb-1">{card.title}</p>
            <p className="text-xl font-bold text-gray-900">{card.value}</p>
            <p className="text-xs text-gray-500 mt-1">ر.س</p>
          </div>
        </div>
      ))}
    </div>
  );
}