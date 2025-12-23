// app/customers/components/CustomersFilters.tsx
'use client';

import { FaSearch, FaPrint, FaPlus } from 'react-icons/fa';

interface CustomersFiltersProps {
  onAdd: () => void;
  onSearch: (value: string) => void;
}

export default function CustomersFilters({
  onAdd,
  onSearch,
}: CustomersFiltersProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
      <div className="flex flex-col lg:flex-row gap-4 justify-between">
        {/* البحث */}
        <div className="flex-1">
          <div className="relative">
            <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث بالاسم، الهاتف، أو البريد الإلكتروني..."
              className="w-full pr-10 pl-4 py-3 border-2 border-gray-300 rounded-lg outline-none"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>

        {/* أزرار */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center gap-2"
          >
            <FaPrint />
            طباعة
          </button>

          <button
            onClick={onAdd}
            className="px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg flex items-center gap-2"
          >
            <FaPlus />
            إضافة عميل جديد
          </button>
        </div>
      </div>
    </div>
  );
}
