// app/accounting/chart-of-accounts/components/FinancialSummary.tsx
'use client';

import React from 'react';

interface FinancialSummaryProps {
  totals: {
    assets: number;
    liabilities: number;
    equity: number;
    revenue: number;
    expenses: number;
  };
  netProfit: number;
}

export default function FinancialSummary({ totals, netProfit }: FinancialSummaryProps) {
  const quickActions = [
    { label: 'إنشاء قيد يومي', onClick: () => console.log('Create journal entry') },
    { label: 'كشف حساب عميل', onClick: () => console.log('Customer statement') },
    { label: 'تقرير ميزان المراجعة', onClick: () => console.log('Trial balance report') },
    { label: 'استيراد حسابات', onClick: () => console.log('Import accounts') },
  ];

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="font-bold text-lg text-gray-800 mb-4">ميزان المراجعة</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">إجمالي المدين</span>
            <span className="font-bold text-gray-800">
              {(totals.assets + totals.expenses).toLocaleString('ar-SA')} ر.س
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">إجمالي الدائن</span>
            <span className="font-bold text-gray-800">
              {(totals.liabilities + totals.equity + totals.revenue).toLocaleString('ar-SA')} ر.س
            </span>
          </div>
          <div className="pt-3 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-800">الفرق</span>
              <span className={`font-bold ${netProfit === 0 ? 'text-green-600' : 'text-red-600'}`}>
                {Math.abs(netProfit).toLocaleString('ar-SA')} ر.س
                {netProfit > 0 ? ' (مدين)' : netProfit < 0 ? ' (دائن)' : ' (متوازن)'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="font-bold text-lg text-gray-800 mb-4">إجماليات الأنواع</h3>
        <div className="space-y-3">
          {Object.entries(totals).map(([type, value]) => (
            <div key={type} className="flex justify-between items-center">
              <span className="text-gray-600">
                {type === 'assets' ? 'الأصول' :
                 type === 'liabilities' ? 'الخصوم' :
                 type === 'equity' ? 'حقوق الملكية' :
                 type === 'revenue' ? 'الإيرادات' : 'المصروفات'}
              </span>
              <span className="font-bold text-gray-800">
                {value.toLocaleString('ar-SA')} ر.س
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="font-bold text-lg text-gray-800 mb-4">الإجراءات السريعة</h3>
        <div className="space-y-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className="w-full text-right p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}