// components/dashboard/InventoryStatusChart.tsx
'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function InventoryStatusChart() {
  const data = {
    labels: ['إلكترونيات', 'ملابس', 'أغذية', 'أدوات منزلية', 'مستلزمات مكتبية'],
    datasets: [
      {
        label: 'متوفر',
        data: [120, 85, 200, 150, 90],
        backgroundColor: 'rgb(16, 185, 129)'
      },
      {
        label: 'منخفض',
        data: [15, 30, 8, 25, 40],
        backgroundColor: 'rgb(245, 158, 11)'
      },
      {
        label: 'نفذ',
        data: [5, 10, 2, 8, 15],
        backgroundColor: 'rgb(239, 68, 68)'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        rtl: true
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true
      }
    }
  };

  return <Bar data={data} options={options} />;
}