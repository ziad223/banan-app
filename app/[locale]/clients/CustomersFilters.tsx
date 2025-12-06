// app/customers/components/CustomersFilters.tsx
'use client';

import { useState } from 'react';
import { FaSearch, FaPrint, FaPlus, FaFilter } from 'react-icons/fa';

interface CustomersFiltersProps {
  onAdd: () => void;
}

export default function CustomersFilters({ onAdd }: CustomersFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
      <div className="flex flex-col lg:flex-row gap-4 justify-between">
        {/* البحث */}
        <div className="flex-1">
          <div className="relative">
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث بالاسم، الهاتف، أو البريد الإلكتروني..."
              className="w-full pr-10 pl-4 py-3 outline border-[2px] border-gray-300 outline-none rounded-lg "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* الفلاتر */}
        <div className="flex flex-wrap gap-3">
         

          <button
            onClick={() => window.print()}
            className="px-4 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center gap-2"
          >
            <FaPrint />
            <span>طباعة</span>
          </button>

          <button
            onClick={onAdd}
            className="px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 flex items-center gap-2"
          >
            <FaPlus />
            <span>إضافة عميل جديد</span>
          </button>
        </div>
      </div>
    </div>
  );
}