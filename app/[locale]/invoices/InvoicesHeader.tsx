// app/invoices/components/InvoicesHeader.tsx
'use client';

import { FaFileInvoice, FaPlus, FaPrint } from 'react-icons/fa';

interface InvoicesHeaderProps {
  onAdd: () => void;
}

export default function InvoicesHeader({ onAdd }: InvoicesHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">الفواتير</h1>
          <p className="text-gray-600 mt-2">إدارة فواتير المبيعات والمشتريات في نظامك</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onAdd}
            className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <FaPlus className="w-4 h-4" />
            <span className="font-medium">إنشاء فاتورة جديدة</span>
          </button>
          
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          >
            <FaPrint className="w-4 h-4" />
            <span className="font-medium">طباعة التقارير</span>
          </button>
        </div>
      </div>
    </div>
  );
}