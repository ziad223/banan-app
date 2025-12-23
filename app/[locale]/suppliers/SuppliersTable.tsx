'use client';

import { FaEye, FaPhone, FaStar } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';
import { FaTrashAlt } from 'react-icons/fa';
import DataTable from '@/components/shared/reusableComponents/Table';

interface SuppliersTableProps {
  suppliers: any[];
  onView: (supplier: any) => void;
  onEdit: (supplier: any) => void;
  onDelete: (supplier: any) => void;
}

export default function SuppliersTable({ suppliers, onView, onEdit, onDelete }: SuppliersTableProps) {
  const columns = [
    { key: 'id', header: '#', sortable: true, render: (_: any, row: any) => <div className="text-center font-bold font-mono">{row.id}</div> },
    { key: 'name', header: 'اسم المورد', sortable: true, render: (_: any, row: any) => (
      <div className="text-right">
        <div className="font-bold text-gray-800">{row.name}</div>
        <div className="text-xs text-gray-500">{row.company_name || '-'}</div>
      </div>
    )},
   
    { key: 'email', header: 'البريد الإلكتروني', sortable: true, render: (value: any) => <div className="text-gray-600 text-sm">{value || '-'}</div> },
    { key: 'balance', header: 'الرصيد', sortable: true, render: (_: any, row: any) => (
      <div className={`font-bold text-lg ${row.balance < 0 ? 'text-green-600' : 'text-gray-600'}`}>
        {Math.abs(row.balance).toLocaleString('ar-SA')} ر.س
        {row.balance < 0 && <span className="text-xs text-green-500 block">(دائن)</span>}
        {row.balance > 0 && <span className="text-xs text-red-500 block">(مدين)</span>}
      </div>
    )},
    { key: 'totalPurchases', header: 'إجمالي المشتريات', sortable: true, render: (value: any) => <div className="font-bold text-gray-800">{value.toLocaleString('ar-SA')} ر.س</div> },
    { key: 'credit_limit', header: 'حد الائتمان', sortable: true, render: (value: any) => <div className="font-bold text-gray-800">{value.toLocaleString('ar-SA')} ر.س</div> },
    { key: 'rating', header: 'التقييم', sortable: true, render: (value: any) => (
      <div className="flex items-center gap-1 justify-center">
        <FaStar className="w-4 h-4 text-yellow-500" />
        <span className="font-bold">{value}</span>
        <span className="text-gray-500 text-sm">/5</span>
      </div>
    )},
    { key: 'status', header: 'الحالة', sortable: true, render: (_: any, row: any) => (
      <span className={`px-3 py-1 rounded-full text-xs font-bold ${row.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
        {row.status === 'active' ? 'نشط' : 'غير نشط'}
      </span>
    )},
  ];

  const actions = (row: any) => (
    <div className="flex gap-2 justify-center">
      {/* View */}
      <button
        onClick={() => onView(row)}
        className="text-white bg-gradient-to-r from-blue-500 to-cyan-500 w-[30px] h-[30px] rounded-md flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        title="عرض"
      >
        <FaEye size={15} />
      </button>

      {/* Edit */}
      <button
        onClick={() => onEdit(row)}
        className="text-white bg-gradient-to-r from-green-500 to-emerald-600 w-[30px] h-[30px] rounded-md flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        title="تعديل"
      >
        <CiEdit size={20} />
      </button>

      {/* Delete */}
      <button
        onClick={() => onDelete(row)}
        className="text-white bg-gradient-to-r from-red-500 to-pink-600 w-[30px] h-[30px] rounded-md flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        title="حذف"
      >
        <FaTrashAlt size={15} />
      </button>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">قائمة الموردين</h3>
        <span className="text-sm text-gray-600">{suppliers.length} مورد</span>
      </div>

      <DataTable
        columns={columns}
        data={suppliers}
        searchable={true}
        actions={actions}
        emptyMessage="لا يوجد موردين"
        className="mt-0"
      />
    </div>
  );
}
