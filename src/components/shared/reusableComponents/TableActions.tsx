// components/ui/DataTable/TableActions.tsx
'use client';

import { Eye, Edit, Trash2, MoreVertical } from 'lucide-react';

interface TableActionsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  customActions?: React.ReactNode[];
}

export function TableActions({ onView, onEdit, onDelete, customActions }: TableActionsProps) {
  return (
    <div className="flex justify-center gap-2">
      {onView && (
        <button
          onClick={onView}
          className="p-1 hover:bg-gray-100 rounded text-blue-600"
          title="عرض"
        >
          <Eye className="w-4 h-4" />
        </button>
      )}
      
      {onEdit && (
        <button
          onClick={onEdit}
          className="p-1 hover:bg-gray-100 rounded text-green-600"
          title="تعديل"
        >
          <Edit className="w-4 h-4" />
        </button>
      )}
      
      {onDelete && (
        <button
          onClick={onDelete}
          className="p-1 hover:bg-gray-100 rounded text-red-600"
          title="حذف"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
      
      {customActions}
    </div>
  );
}