// app/suppliers/components/SuppliersFilters.tsx
'use client';

import { useState } from 'react';
import { FaSearch, FaPrint, FaPlus, FaFilter, FaDownload } from 'react-icons/fa';

interface SuppliersFiltersProps {
  onAdd: () => void;
}

export default function SuppliersFilters({ onAdd }: SuppliersFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');

  const categories = ['all', 'مواد غذائية', 'إلكترونيات', 'تكنولوجيا', 'قرطاسية', 'أثاث', 'بناء', 'تغليف'];

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
              className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            className="px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 flex items-center gap-2"
          >
            <FaPlus />
            <span>إضافة مورد جديد</span>
          </button>
        </div>
      </div>
    </div>
  );
}