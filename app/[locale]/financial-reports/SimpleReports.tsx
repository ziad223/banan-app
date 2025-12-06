// app/reports/components/SimpleReports.tsx - التحديث
'use client';

import { useState, useEffect } from 'react';
import StatsCards from './StatsCards';
import MonthlyChart from './MonthlyChart';
import TopLists from './TopLists';
import QuickActions from './QuickActions';

interface SimpleReportsProps {
  data: any;
  periods: any[];
}

export default function SimpleReports({ data, periods }: SimpleReportsProps) {
  const [period, setPeriod] = useState('month');
  const [filteredData, setFilteredData] = useState(data);

  // تحديث البيانات عند تغيير الفترة
  useEffect(() => {
    console.log('تم تغيير الفترة إلى:', period);
    
    // هنا يمكنك جلب البيانات الجديدة من API حسب الفترة
    // حالياً سنستخدم نفس البيانات مع بعض التعديلات للتوضيح
    if (period === 'today') {
      setFilteredData({
        ...data,
        overview: {
          ...data.overview,
          totalSales: 50000,
          totalExpenses: 35000,
          netProfit: 15000,
          growth: 2.5
        },
        monthly: {
          sales: 50000,
          expenses: 35000,
          profit: 15000
        }
      });
    } else if (period === 'week') {
      setFilteredData({
        ...data,
        overview: {
          ...data.overview,
          totalSales: 350000,
          totalExpenses: 280000,
          netProfit: 70000,
          growth: 3.8
        },
        monthly: {
          sales: 350000,
          expenses: 280000,
          profit: 70000
        }
      });
    } else if (period === 'month') {
      setFilteredData(data); // البيانات الأصلية
    } else if (period === 'year') {
      setFilteredData({
        ...data,
        overview: {
          ...data.overview,
          totalSales: data.overview.totalSales,
          totalExpenses: data.overview.totalExpenses,
          netProfit: data.overview.netProfit,
          growth: 15.2
        }
      });
    }
  }, [period, data]);

  return (
    <div className="p-4 md:p-6 min-h-screen bg-gray-50">
      {/* العنوان */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800"> التقارير</h1>
        <p className="text-gray-600">نظرة سريعة على أداء أعمالك</p>
      </div>

      {/* الفترة - محدثة مع onClick صحيح */}
      <div className="flex gap-2 mb-6">
        {periods.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              console.log('تم النقر على:', p.name);
              setPeriod(p.id);
            }}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              period === p.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* البطاقات الإحصائية - مع البيانات المحدثة */}
      <StatsCards data={filteredData} />

      {/* المخطط الشهري - مع البيانات المحدثة */}
      <MonthlyChart data={filteredData} period={period} />

      {/* القوائم */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <TopLists 
          title="أفضل العملاء"
          data={filteredData.topCustomers}
          type="customers"
        />
        <TopLists 
          title="أفضل المنتجات"
          data={filteredData.topProducts}
          type="products"
        />
      </div>

      {/* الإجراءات السريعة */}
      <QuickActions />
    </div>
  );
}