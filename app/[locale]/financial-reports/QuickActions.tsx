// app/reports/components/QuickActions.tsx
'use client';

import { FaFilePdf, FaFileExcel, FaPrint, FaDownload } from 'react-icons/fa';

export default function QuickActions() {
  const actions = [
    {
      label: 'تصدير PDF',
      icon: FaFilePdf,
      color: 'bg-red-500',
      onClick: () => alert('جارٍ تصدير PDF...')
    },
    {
      label: 'تصدير Excel',
      icon: FaFileExcel,
      color: 'bg-green-500',
      onClick: () => alert('جارٍ تصدير Excel...')
    },
    {
      label: 'طباعة',
      icon: FaPrint,
      color: 'bg-yellow-500',
      onClick: () => window.print()
    },
    {
      label: 'تحميل',
      icon: FaDownload,
      color: 'bg-blue-500',
      onClick: () => alert('جارٍ تحميل التقرير...')
    }
  ];

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">إجراءات سريعة</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow text-center"
          >
            <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
              <action.icon className="w-6 h-6 text-white" />
            </div>
            <span className="font-medium text-gray-800">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}