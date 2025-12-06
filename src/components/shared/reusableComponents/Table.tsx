// components/ui/DataTable/DataTable.tsx
'use client';

import { useState } from 'react';
import { ChevronUp, ChevronDown, MoreVertical } from 'lucide-react';

export interface Column<T> {
  key: string;
  header: string;
  width?: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  align?: 'right' | 'left' | 'center';
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchable?: boolean;
  onRowClick?: (row: T) => void;
  actions?: (row: T) => React.ReactNode;
  emptyMessage?: string;
  className?: string;
}

export default function DataTable<T extends { id: string }>({
  columns,
  data,
  searchable = false,
  onRowClick,
  actions,
  emptyMessage = 'لا توجد بيانات',
  className = ''
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // البحث والترتيب
  const filteredData = [...data]
    .filter(item =>
      search ? Object.values(item).some(val =>
        String(val).toLowerCase().includes(search.toLowerCase())
      ) : true
    )
    .sort((a, b) => {
      if (!sortKey) return 0;
      
      const aVal = a[sortKey as keyof T];
      const bVal = b[sortKey as keyof T];
      
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(dir => dir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      {/* البحث */}
      {searchable && (
        <div className="p-4 border-b">
       
        </div>
      )}

      {/* الجدول */}
      <div className="overflow-x-auto">
<table className="min-w-max w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`p-3 text-sm font-medium text-gray-600 ${col.width ? `w-${col.width}` : ''}`}
                >
                  <div className={`flex items-center justify-${col.align || 'right'}`}>
                    <span>{col.header}</span>
                    {col.sortable && (
                      <button
                        onClick={() => handleSort(col.key)}
                        className="mr-2"
                      >
                        {/* {sortKey === col.key ? (
                          sortDirection === 'asc' ? (
                            <ChevronUp className="w-4 h-4 text-gray-600" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                          )
                        ) : (
                          <ChevronUp className="w-4 h-4 text-gray-400" />
                        )} */}
                      </button>
                    )}
                  </div>
                </th>
              ))}
              
              {actions && <th className="p-3 text-sm font-medium text-gray-600 text-center">الإجراءات</th>}
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-200">
            {filteredData.map((row) => (
              <tr
                key={row.id}
                className={`hover:bg-gray-50 ${onRowClick ? 'cursor-pointer' : ''}`}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`p-3 ${col.align === 'center' ? 'text-center' : col.align === 'left' ? 'text-left' : 'text-right'}`}
                  >
                    {col.render ? col.render(row[col.key as keyof T], row) : String(row[col.key as keyof T] || '')}
                  </td>
                ))}
                
                {actions && (
                  <td className="p-3 text-center">
                    {actions(row)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* رسالة فارغة */}
      {filteredData.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          {emptyMessage}
        </div>
      )}
    </div>
  );
}