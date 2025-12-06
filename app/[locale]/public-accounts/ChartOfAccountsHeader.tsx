// app/accounting/chart-of-accounts/components/ChartOfAccountsHeader.tsx
import React from 'react';

interface Totals {
  assets: number;
  liabilities: number;
  equity: number;
  revenue: number;
  expenses: number;
}

interface ChartOfAccountsHeaderProps {
  totals: Totals;
}

export default function ChartOfAccountsHeader({ totals }: ChartOfAccountsHeaderProps) {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">الحسابات العامة</h1>
        <p className="text-gray-600 mt-2">شجرة الحسابات المالية للمؤسسة</p>
      </div>
      
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border-r-4 border-blue-500">
          <div className="text-sm text-gray-600">الأصول</div>
          <div className="text-xl font-bold text-gray-800">
            {totals.assets.toLocaleString('ar-SA')} ر.س
          </div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border-r-4 border-red-500">
          <div className="text-sm text-gray-600">الخصوم</div>
          <div className="text-xl font-bold text-gray-800">
            {totals.liabilities.toLocaleString('ar-SA')} ر.س
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-500">
          <div className="text-sm text-gray-600">حقوق الملكية</div>
          <div className="text-xl font-bold text-gray-800">
            {totals.equity.toLocaleString('ar-SA')} ر.س
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border-r-4 border-purple-500">
          <div className="text-sm text-gray-600">الإيرادات</div>
          <div className="text-xl font-bold text-gray-800">
            {totals.revenue.toLocaleString('ar-SA')} ر.س
          </div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border-r-4 border-orange-500">
          <div className="text-sm text-gray-600">المصروفات</div>
          <div className="text-xl font-bold text-gray-800">
            {totals.expenses.toLocaleString('ar-SA')} ر.س
          </div>
        </div>
      </div>
    </div>
  );
}