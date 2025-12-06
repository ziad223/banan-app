// app/reports/components/TopLists.tsx
'use client';

import { FaUser, FaBox, FaCrown } from 'react-icons/fa';

interface TopListsProps {
  title: string;
  data: Array<{ name: string; amount: number }>;
  type: 'customers' | 'products';
}

export default function TopLists({ title, data, type }: TopListsProps) {
  const total = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-blue-100">
          {type === 'customers' ? (
            <FaUser className="w-5 h-5 text-blue-600" />
          ) : (
            <FaBox className="w-5 h-5 text-blue-600" />
          )}
        </div>
        <div>
          <h3 className="font-bold text-gray-800">{title}</h3>
          <p className="text-gray-600 text-sm">الأعلى مساهمة</p>
        </div>
      </div>

      <div className="space-y-3">
        {data.slice(0, 5).map((item, index) => {
          const percentage = (item.amount / total) * 100;
          const isTop = index === 0;

          return (
            <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isTop ? 'bg-yellow-100' : 'bg-gray-100'
                }`}>
                  {isTop ? (
                    <FaCrown className="w-4 h-4 text-yellow-600" />
                  ) : (
                    <span className="text-sm font-medium text-gray-600">#{index + 1}</span>
                  )}
                </div>
                <div className="max-w-[120px]">
                  <div className="font-medium text-gray-800 truncate">
                    {item.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {percentage.toFixed(1)}% من الإجمالي
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-bold text-gray-900">
                  {item.amount.toLocaleString('ar-SA')} ر.س
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* الإجمالي */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center">
          <div className="font-medium text-gray-700">الإجمالي</div>
          <div className="text-lg font-bold text-gray-900">
            {total.toLocaleString('ar-SA')} ر.س
          </div>
        </div>
      </div>
    </div>
  );
}