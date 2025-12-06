// app/expenses/components/ExpensesChart.tsx
'use client';

import { FaChartPie, FaChartBar } from 'react-icons/fa';
import { useState } from 'react';

interface ExpensesChartProps {
  data: Array<{
    name: string;
    amount: number;
    count: number;
  }>;
}

export default function ExpensesChart({ data }: ExpensesChartProps) {
  const [chartType, setChartType] = useState<'pie' | 'bar'>('bar');
  
  // تحويل الألوان لأسماء فئات Tailwind
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'رواتب': 'bg-blue-500',
      'إيجار': 'bg-purple-500',
      'تسويق': 'bg-green-500',
      'صيانة': 'bg-yellow-500',
      'مواد مكتبية': 'bg-red-500',
      'مصاريف تشغيل': 'bg-indigo-500',
      'نقل': 'bg-pink-500',
      'تطوير': 'bg-teal-500',
      'مصاريف متنوعة': 'bg-gray-500'
    };
    return colors[category] || 'bg-gray-400';
  };

  // حساب النسبة المئوية
  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800">تحليل المصروفات حسب التصنيف</h3>
          <p className="text-gray-600 text-sm">توزيع المصروفات على التصنيفات المختلفة</p>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setChartType('bar')}
            className={`p-2 rounded-lg ${chartType === 'bar' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
            title="رسم أعمدة"
          >
            <FaChartBar className="w-5 h-5" />
          </button>
          <button
            onClick={() => setChartType('pie')}
            className={`p-2 rounded-lg ${chartType === 'pie' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
            title="رسم دائري"
          >
            <FaChartPie className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* الرسم البياني */}
      {chartType === 'bar' ? (
        <div className="space-y-4">
          {data.map((item) => {
            const percentage = (item.amount / totalAmount) * 100;
            
            return (
              <div key={item.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getCategoryColor(item.name)}`}></div>
                    <span className="font-medium text-gray-700">{item.name}</span>
                    <span className="text-xs text-gray-500">({item.count})</span>
                  </div>
                  <div className="text-sm font-bold text-gray-800">
                    {item.amount.toLocaleString('ar-SA')} ر.س
                  </div>
                </div>
                
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getCategoryColor(item.name)} rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{percentage.toFixed(1)}%</span>
                  <span>{item.amount.toLocaleString('ar-SA')} ر.س</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* الدائرة */}
          <div className="relative w-64 h-64">
            {data.map((item, index) => {
              const percentage = (item.amount / totalAmount) * 100;
              const cumulativePercentage = data
                .slice(0, index)
                .reduce((sum, prevItem) => sum + (prevItem.amount / totalAmount) * 360, 0);
              
              return (
                <div
                  key={item.name}
                  className={`absolute inset-0 rounded-full border-8 ${getCategoryColor(item.name)}`}
                  style={{
                    clipPath: `conic-gradient(from ${cumulativePercentage}deg, transparent 0deg ${percentage}deg, transparent ${percentage}deg 360deg)`
                  }}
                ></div>
              );
            })}
            <div className="absolute inset-8 bg-white rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{totalAmount.toLocaleString('ar-SA')} ر.س</div>
                <div className="text-sm text-gray-600">إجمالي المصروفات</div>
              </div>
            </div>
          </div>
          
          {/* المفتاح */}
          <div className="space-y-3">
            {data.map((item) => {
              const percentage = (item.amount / totalAmount) * 100;
              
              return (
                <div key={item.name} className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${getCategoryColor(item.name)}`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">{item.name}</span>
                      <span className="font-bold text-gray-800">{percentage.toFixed(1)}%</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.amount.toLocaleString('ar-SA')} ر.س • {item.count} مصروف
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}