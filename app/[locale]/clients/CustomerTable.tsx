import { FaEye, FaTrashAlt } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';
import DataTable from '@/components/shared/reusableComponents/Table';

export default function CustomersTable({ customers, onView, onEdit, onDelete }: CustomersTableProps) {
  const columns = [
    { 
      key: "id",
      header: "#",
      sortable: true,
      render: (_: any, row: any) => (
        <div className="text-center font-mono">{row.id}</div>
      )
    },
    { 
      key: "name",
      header: "الاسم",
      sortable: true,
      render: (_: any, row: any) => (
        <div className="text-right">
          <div className="font-bold text-sm text-gray-800">{row.name}</div>
          <div className="text-xs text-gray-500">{row.email}</div>
        </div>
      )
    },
    { 
      key: "phone",
      header: "الهاتف",
      sortable: true,
      render: (value: any) => (
        <div className="font-mono">{value}</div>
      )
    },
    { 
      key: "balance",
      header: "الرصيد",
      sortable: true,
      render: (_: any, row: any) => (
        <div className={`font-bold text-lg ${
          row.balance > 0 ? 'text-red-600' : 
          row.balance < 0 ? 'text-green-600' : 
          'text-gray-600'
        }`}>
          {row.balance.toLocaleString('ar-SA')} ر.س
          {row.balance > 0 && <span className="text-xs text-red-500 block">(مدين)</span>}
          {row.balance < 0 && <span className="text-[10px] text-green-500 block">(دائن)</span>}
        </div>
      )
    },
    { 
      key: "status",
      header: "الحالة",
      sortable: true,
      render: (_: any, row: any) => (
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
          row.status === 'active' 
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {row.status === 'active' ? 'نشط' : 'غير نشط'}
        </span>
      )
    },
  ];

  const actions = (row: any) => (
    <div className="flex gap-2 justify-center">
      <button
        onClick={() => onView(row)}
        className="text-white bg-gradient-to-r from-blue-500 to-indigo-600 w-[30px] h-[30px] rounded-md flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        title="عرض"
      >
        <FaEye size={15} />
      </button>

      <button
        onClick={() => onEdit(row)}
        className="text-white bg-gradient-to-r from-green-500 to-emerald-600 w-[30px] h-[30px] rounded-md flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        title="تعديل"
      >
        <CiEdit size={20} />
      </button>

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
    <DataTable
      columns={columns}
      data={customers}
      searchable={true}
      actions={actions}
      emptyMessage="لا يوجد عملاء"
      className="mt-4"
    />
  );
}
