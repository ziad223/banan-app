// app/suppliers/components/SuppliersFilters.tsx
'use client';

import { useState } from 'react';
import { FaSearch, FaPrint, FaPlus, FaFilter, FaDownload } from 'react-icons/fa';

interface SuppliersFiltersProps {
  onAdd: () => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export default function SuppliersFilters({ onAdd, searchTerm, setSearchTerm }: SuppliersFiltersProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
      <div className="flex flex-col lg:flex-row gap-4 justify-between">
        {/* البحث بالاسم فقط */}
        <div className="flex-1">
          <div className="relative">
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث بالاسم ..."
              className="w-full cursor-pointer pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* زر إضافة مورد جديد */}
        <button
          onClick={onAdd}
          className="px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 flex items-center gap-2"
        >
          <FaPlus />
          <span>إضافة مورد جديد</span>
        </button>
      </div>
    </div>
  );
}