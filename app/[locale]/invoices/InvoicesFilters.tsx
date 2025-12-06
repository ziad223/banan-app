// app/invoices/components/InvoicesFilters.tsx
'use client';

import { FaSearch, FaCalendarAlt, FaFilter } from 'react-icons/fa';
import { useState } from 'react';

interface InvoicesFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedType: string;
  onTypeChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  onAdd: () => void;
}

export default function InvoicesFilters({
  searchTerm,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedStatus,
  onStatusChange,
  onAdd
}: InvoicesFiltersProps) {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        {/* البحث */}
        <div className="flex-1">
          <div className="relative">
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="ابحث برقم الفاتورة أو اسم العميل..."
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        {/* الفلاتر */}
        <div className="flex flex-wrap gap-2">
      

          {/* تاريخ من */}
          <div className="relative">
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

          {/* تاريخ إلى */}
          <div className="relative">
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

          {/* زر التصفية */}
          <button
            onClick={() => {
              // تطبيق تصفية التاريخ
              console.log('تصفية بالتاريخ:', dateFrom, dateTo);
            }}
            className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex items-center gap-1 text-sm"
          >
            <FaFilter className="w-4 h-4" />
            <span>تصفية</span>
          </button>
        </div>
      </div>

      {/* إظهار الفلاتر النشطة */}
      {(searchTerm || selectedType !== 'all' || selectedStatus !== 'all' || dateFrom || dateTo) && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-600">الفلاتر النشطة:</span>
            
            {searchTerm && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                بحث: {searchTerm}
                <button 
                  onClick={() => onSearchChange('')}
                  className="mr-1 ml-1 text-blue-600 hover:text-blue-800"
                >
                  ✕
                </button>
              </span>
            )}
            
            {selectedType !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                نوع: {selectedType === 'sale' ? 'مبيعات' : 'مشتريات'}
                <button 
                  onClick={() => onTypeChange('all')}
                  className="mr-1 ml-1 text-purple-600 hover:text-purple-800"
                >
                  ✕
                </button>
              </span>
            )}
            
            {selectedStatus !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                حالة: {selectedStatus === 'paid' ? 'مدفوعة' : selectedStatus === 'pending' ? 'معلقة' : 'متأخرة'}
                <button 
                  onClick={() => onStatusChange('all')}
                  className="mr-1 ml-1 text-green-600 hover:text-green-800"
                >
                  ✕
                </button>
              </span>
            )}
            
            {(dateFrom || dateTo) && (
              <button
                onClick={() => {
                  setDateFrom('');
                  setDateTo('');
                }}
                className="text-xs text-red-600 hover:text-red-800 font-medium"
              >
                مسح التاريخ
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}