// components/charts/TopProductsChart.tsx
'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function TopProductsChart() {
  const data = {
    labels: [
      'لابتوب ديل XPS 13',
      'آيفون 15 برو',
      'سامسونج جالكسي S24',
      'تابلت آيباد برو',
      'سماعات سوني WH-1000XM5',
      'ساعة أبل ووتش 9',
      'كاميرا كانون EOS R6',
      'ماك بوك برو M3',
      'شاشة LG UltraGear',
      'لوحة مفاتيح ميكانيكية'
    ],
    datasets: [
      {
        label: 'الكمية المباعة',
        data: [156, 142, 128, 115, 98, 87, 76, 65, 54, 43],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(14, 165, 233, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(99, 102, 241, 0.8)'
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(139, 92, 246)',
          'rgb(239, 68, 68)',
          'rgb(14, 165, 233)',
          'rgb(236, 72, 153)',
          'rgb(34, 197, 94)',
          'rgb(249, 115, 22)',
          'rgb(99, 102, 241)'
        ],
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
      }
    ]
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        rtl: true,
        titleAlign: 'right',
        bodyAlign: 'right',
        callbacks: {
          label: function(context) {
            return `الكمية: ${context.parsed.x} منتج`;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          callback: function(value) {
            return value + ' منتج';
          }
        }
      },
      y: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12
          }
        }
      }
    }
  };

  return <Bar data={data} options={options} />;
}