// app/expenses/components/ExpensesFilters.tsx
'use client';

import { FaSearch, FaCalendarAlt, FaFilter, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

interface ExpensesFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  selectedMonth: string;
  onMonthChange: (value: string) => void;
  categories: any[];
}

export default function ExpensesFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  selectedMonth,
  onMonthChange,
  categories
}: ExpensesFiltersProps) {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const statusOptions = [
    { value: 'all', label: 'جميع الحالات' },
    { value: 'pending', label: 'قيد المراجعة' },
    { value: 'approved', label: 'معتمدة' },
    { value: 'paid', label: 'مدفوعة' },
    { value: 'rejected', label: 'مرفوضة' }
  ];

  const monthOptions = [
    { value: 'all', label: 'جميع الأشهر' },
    { value: '0', label: 'يناير' },
    { value: '1', label: 'فبراير' },
    { value: '2', label: 'مارس' },
    { value: '3', label: 'أبريل' },
    { value: '4', label: 'مايو' },
    { value: '5', label: 'يونيو' },
    { value: '6', label: 'يوليو' },
    { value: '7', label: 'أغسطس' },
    { value: '8', label: 'سبتمبر' },
    { value: '9', label: 'أكتوبر' },
    { value: '10', label: 'نوفمبر' },
    { value: '11', label: 'ديسمبر' }
  ];

  const clearFilters = () => {
    onSearchChange('');
    onCategoryChange('all');
    onStatusChange('all');
    onMonthChange('all');
    setDateFrom('');
    setDateTo('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        {/* البحث */}
        <div className="flex-1">
          <div className="relative">
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="ابحث برقم المصروف أو الوصف أو المورد..."
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
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
              className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-sm"
            />
            <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

          {/* تاريخ إلى */}
          <div className="relative">
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-sm"
            />
            <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

          {/* زر تطبيق الفلاتر */}
          <button
            onClick={() => {
              console.log('تصفية بالتاريخ:', dateFrom, dateTo);
            }}
            className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 flex items-center gap-1 text-sm"
          >
            <FaFilter className="w-4 h-4" />
            <span>تصفية</span>
          </button>

          {/* زر مسح الكل */}
          {(searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all' || selectedMonth !== 'all' || dateFrom || dateTo) && (
            <button
              onClick={clearFilters}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-1 text-sm"
            >
              <FaTimes className="w-4 h-4" />
              <span>مسح الكل</span>
            </button>
          )}
        </div>
      </div>

      {/* إظهار الفلاتر النشطة */}
      {(searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all' || selectedMonth !== 'all' || dateFrom || dateTo) && (
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
            
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                تصنيف: {selectedCategory}
                <button 
                  onClick={() => onCategoryChange('all')}
                  className="mr-1 ml-1 text-purple-600 hover:text-purple-800"
                >
                  ✕
                </button>
              </span>
            )}
            
            {selectedStatus !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                حالة: {statusOptions.find(s => s.value === selectedStatus)?.label}
                <button 
                  onClick={() => onStatusChange('all')}
                  className="mr-1 ml-1 text-green-600 hover:text-green-800"
                >
                  ✕
                </button>
              </span>
            )}
            
            {selectedMonth !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                شهر: {monthOptions.find(m => m.value === selectedMonth)?.label}
                <button 
                  onClick={() => onMonthChange('all')}
                  className="mr-1 ml-1 text-yellow-600 hover:text-yellow-800"
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