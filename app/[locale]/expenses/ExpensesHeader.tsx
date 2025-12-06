// app/expenses/components/ExpensesHeader.tsx
'use client';

import { FaFileInvoiceDollar, FaPlus, FaPrint, FaFileExcel, FaFilePdf, FaChartLine } from 'react-icons/fa';

interface ExpensesHeaderProps {
  onAdd: () => void;
  onPrint: () => void;
  onExport: (format: string) => void;
}

export default function ExpensesHeader({ onAdd, onPrint, onExport }: ExpensesHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">المصروفات</h1>
          <p className="text-gray-600 mt-2">إدارة وتتبع جميع مصروفات الشركة</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {/* زر إنشاء مصروف جديد */}
          <button
            onClick={onAdd}
            className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-lg hover:from-red-600 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <FaPlus className="w-4 h-4" />
            <span className="font-medium">إضافة مصروف جديد</span>
          </button>
          
          {/* زر التقارير */}
          <button
            onClick={() => console.log('فتح التقارير المتقدمة')}
            className="flex items-center gap-2 px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            <FaChartLine className="w-4 h-4" />
            <span className="font-medium">التقارير</span>
          </button>
          
          {/* زر الطباعة */}
          <button
            onClick={onPrint}
            className="flex items-center gap-2 px-4 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          >
            <FaPrint className="w-4 h-4" />
            <span className="font-medium">طباعة</span>
          </button>
          
          {/* قائمة التصدير */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              <FaFileExcel className="w-4 h-4" />
              <span className="font-medium">تصدير</span>
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <button
                onClick={() => onExport('excel')}
                className="w-full px-4 py-3 text-right hover:bg-gray-50 flex items-center gap-2 text-gray-700"
              >
                <FaFileExcel className="w-4 h-4 text-green-500" />
                <span>تصدير Excel</span>
              </button>
              <button
                onClick={() => onExport('pdf')}
                className="w-full px-4 py-3 text-right hover:bg-gray-50 flex items-center gap-2 text-gray-700 border-t border-gray-100"
              >
                <FaFilePdf className="w-4 h-4 text-red-500" />
                <span>تصدير PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}