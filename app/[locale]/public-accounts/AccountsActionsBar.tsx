// app/accounting/chart-of-accounts/components/AccountsActionsBar.tsx
'use client';

import React from 'react';
import { Search, Filter, Download, Plus } from 'lucide-react';

export default function AccountsActionsBar() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterType, setFilterType] = React.useState('all');

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4 space-x-reverse flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="ابحث باسم الحساب أو الرمز..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">جميع الأنواع</option>
            <option value="asset">الأصول</option>
            <option value="liability">الخصوم</option>
            <option value="equity">حقوق الملكية</option>
            <option value="revenue">الإيرادات</option>
            <option value="expense">المصروفات</option>
          </select>
          
          <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>تصفية</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-3 space-x-reverse">
          <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4" />
            <span>تصدير</span>
          </button>
          
          <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            <Plus className="w-4 h-4" />
            <span>إضافة حساب</span>
          </button>
        </div>
      </div>
    </div>
  );
}