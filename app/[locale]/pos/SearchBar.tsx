'use client';

import { Search, Barcode, Filter, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (filter: string) => void;
}

export default function SearchBar({ onSearch, onFilterChange }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'الكل' },
    { id: 'popular', label: 'الأكثر مبيعاً' },
    { id: 'discount', label: 'المخفضة' },
    { id: 'low-stock', label: 'قريب النفاد' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId);
    onFilterChange(filterId);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      {/* شريط البحث */}
      <form onSubmit={handleSearch} className="mb-4">
<div className="flex  sm:flex-row items-center sm:items-stretch gap-2 w-full">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم المنتج ..."
              className="w-full outline-none pr-10 pl-4 py-3 border border-gray-300 rounded-lg text-right focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            )}
          </div>
          
      
          
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 !py-3 text-white">
            بحث
          </Button>
        </div>
      </form>

    <div className="flex flex-col gap-3">
  <div className="flex items-center gap-2">
    <Filter className="h-5 w-5 text-gray-500" />
    <span className="text-gray-700">التصنيفات:</span>
  </div>

  {/* أزرار الفلاتر */}
  <div className="flex flex-wrap gap-2">
    {filters.map((filter) => (
      <Button
        key={filter.id}
        variant={activeFilter === filter.id ? 'default' : 'outline'}
        size="sm"
        onClick={() => handleFilterClick(filter.id)}
        className={`${activeFilter === filter.id ? 'bg-blue-600 text-white' : ''}`}
      >
        {filter.label}
      </Button>
    ))}
  </div>
</div>

    </div>
  );
}