'use client';

import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MonthlyChartProps {
  period: 'today' | 'week' | 'month' | 'year';
}

export default function MonthlyChart({ period }: MonthlyChartProps) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // بيانات تجريبية
    let newData: any[] = [];

    if (period === 'today') {
      newData = [
        { label: '08:00', sales: 20, expenses: 15 },
        { label: '10:00', sales: 35, expenses: 25 },
        { label: '12:00', sales: 50, expenses: 40 },
        { label: '14:00', sales: 45, expenses: 35 },
        { label: '16:00', sales: 60, expenses: 45 },
        { label: '18:00', sales: 40, expenses: 30 },
      ];
    } else if (period === 'week') {
      newData = [
        { label: 'الأحد', sales: 120, expenses: 95 },
        { label: 'الاثنين', sales: 150, expenses: 120 },
        { label: 'الثلاثاء', sales: 180, expenses: 140 },
        { label: 'الأربعاء', sales: 160, expenses: 130 },
        { label: 'الخميس', sales: 200, expenses: 160 },
        { label: 'الجمعة', sales: 90, expenses: 70 },
        { label: 'السبت', sales: 70, expenses: 50 },
      ];
    } else if (period === 'month') {
      newData = [
        { label: 'يناير', sales: 125, expenses: 100 },
        { label: 'فبراير', sales: 138, expenses: 110 },
        { label: 'مارس', sales: 152, expenses: 125 },
        { label: 'أبريل', sales: 145, expenses: 120 },
        { label: 'مايو', sales: 168, expenses: 140 },
        { label: 'يونيو', sales: 175, expenses: 150 },
      ];
    } else if (period === 'year') {
      newData = [
        { label: 'يناير', sales: 125, expenses: 100 },
        { label: 'فبراير', sales: 138, expenses: 110 },
        { label: 'مارس', sales: 152, expenses: 125 },
        { label: 'أبريل', sales: 145, expenses: 120 },
        { label: 'مايو', sales: 168, expenses: 140 },
        { label: 'يونيو', sales: 175, expenses: 150 },
        { label: 'يوليو', sales: 160, expenses: 135 },
        { label: 'أغسطس', sales: 185, expenses: 155 },
        { label: 'سبتمبر', sales: 192, expenses: 160 },
        { label: 'أكتوبر', sales: 210, expenses: 175 },
        { label: 'نوفمبر', sales: 225, expenses: 190 },
        { label: 'ديسمبر', sales: 240, expenses: 200 },
      ];
    }

    setData(newData);
  }, [period]);

  const chartData = {
    labels: data.map(d => d.label),
    datasets: [
      {
        label: 'المبيعات',
        data: data.map(d => d.sales),
        backgroundColor: 'rgba(34,197,94,0.7)',
        borderColor: 'rgba(34,197,94,1)',
        borderWidth: 1,
        tension: 0.4, // للخطوط المنحنية إذا استخدمت Line
      },
      {
        label: 'المصروفات',
        data: data.map(d => d.expenses),
        backgroundColor: 'rgba(239,68,68,0.7)',
        borderColor: 'rgba(239,68,68,1)',
        borderWidth: 1,
        tension: 0.4,
      },
    ],
  };

  const options: any = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { mode: 'index', intersect: false },
      title: { display: true, text: '📊 الأداء المالي' },
    },
    interaction: { mode: 'nearest', axis: 'x', intersect: false },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl mt-5 shadow-md border border-gray-200">
      {/* Bar Chart */}
      <Bar data={chartData} options={options} />

      {/* لو عايز Line Chart بدل Bar */}
      {/* <Line data={chartData} options={options} /> */}
    </div>
  );
}
