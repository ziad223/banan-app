// components/dashboard/RevenueChart.tsx
'use client';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function RevenueChart() {
  const data = {
    labels: ['المتجر الرئيسي', 'فرع المدينة', 'المتجر الإلكتروني', 'العمليات الخارجية'],
    datasets: [
      {
        data: [40, 25, 20, 15],
        backgroundColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(139, 92, 246)'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        rtl: true
      }
    }
  };

  return <Doughnut data={data} options={options} />;
}