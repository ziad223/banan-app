// app/expenses/components/ExpensesTable.tsx
'use client';

import { 
  FaEye, 
  FaTrash, 
  FaCheck, 
  FaTimes, 
  FaFilePdf, 
  FaEdit,
  FaMoneyBillWave
} from 'react-icons/fa';
import DataTable from '@/components/shared/reusableComponents/Table';

interface ExpensesTableProps {
  expenses: any[];
  onView: (expense: any) => void;
  onUpdateStatus: (id: string, status: string) => void;
  onDelete: (expense: any) => void;
}

export default function ExpensesTable({ 
  expenses, 
  onView, 
  onUpdateStatus, 
  onDelete 
}: ExpensesTableProps) {
  const columns = [
    { 
      key: "expenseNumber",
      header: "رقم المصروف",
      sortable: true,
      render: (value: string) => (
        <div className="font-mono font-bold text-red-600">{value}</div>
      )
    },
    { 
      key: "description",
      header: "الوصف",
      sortable: true,
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-xs text-gray-500">{row.vendor}</div>
        </div>
      )
    },
    { 
      key: "category",
      header: "التصنيف",
      sortable: true,
      render: (value: string, row: any) => (
        <div>
          <span className={`px-2 py-1 rounded-full text-xs ${
            value === 'رواتب' ? 'bg-blue-100 text-blue-800' :
            value === 'إيجار' ? 'bg-purple-100 text-purple-800' :
            value === 'تسويق' ? 'bg-green-100 text-green-800' :
            value === 'صيانة' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {value}
          </span>
          {row.subCategory && (
            <div className="text-xs text-gray-500 mt-1">{row.subCategory}</div>
          )}
        </div>
      )
    },
    { 
      key: "date",
      header: "التاريخ",
      sortable: true,
      render: (value: string) => (
        <div className="text-sm">{new Date(value).toLocaleDateString('ar-SA')}</div>
      )
    },
    { 
      key: "amount",
      header: "المبلغ",
      sortable: true,
      render: (value: number) => (
        <div className="font-bold text-gray-800">
          {value.toLocaleString('ar-SA')} ر.س
        </div>
      )
    },
    { 
      key: "paymentMethod",
      header: "طريقة الدفع",
      sortable: true,
      render: (value: string) => {
        const methodColors = {
          cash: 'bg-green-100 text-green-800',
          bank_transfer: 'bg-blue-100 text-blue-800',
          cheque: 'bg-purple-100 text-purple-800',
          card: 'bg-yellow-100 text-yellow-800',
          wallet: 'bg-gray-100 text-gray-800'
        };
        
        const methodNames = {
          cash: 'نقداً',
          bank_transfer: 'تحويل بنكي',
          cheque: 'شيك',
          card: 'بطاقة',
          wallet: 'محفظة'
        };
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${methodColors[value as keyof typeof methodColors]}`}>
            {methodNames[value as keyof typeof methodNames]}
          </span>
        );
      }
    },
    { 
      key: "status",
      header: "الحالة",
      sortable: true,
      render: (value: string, row: any) => {
        const statusColors = {
          pending: 'bg-yellow-100 text-yellow-800',
          approved: 'bg-blue-100 text-blue-800',
          paid: 'bg-green-100 text-green-800',
          rejected: 'bg-red-100 text-red-800',
          cancelled: 'bg-gray-100 text-gray-800'
        };
        
        const statusText = {
          pending: 'قيد المراجعة',
          approved: 'معتمدة',
          paid: 'مدفوعة',
          rejected: 'مرفوضة',
          cancelled: 'ملغاة'
        };
        
        return (
          <div className="flex flex-col gap-1">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[value as keyof typeof statusColors]}`}>
              {statusText[value as keyof typeof statusText]}
            </span>
            {row.approvedBy && (
              <div className="text-xs text-gray-500">
                بواسطة: {row.approvedBy}
              </div>
            )}
          </div>
        );
      }
    },
  ];

  // Actions لكل صف
  const actions = (row: any) => (
    <div className="flex gap-2 justify-center">
      {/* زر العرض */}
      <button
        onClick={() => onView(row)}
        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
        title="عرض التفاصيل"
      >
        <FaEye className="w-4 h-4" />
      </button>

      {/* زر الموافقة (للحالات المعلقة فقط) */}
      {row.status === 'pending' && (
        <>
          <button
            onClick={() => onUpdateStatus(row.id, 'approved')}
            className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
            title="موافقة"
          >
            <FaCheck className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onUpdateStatus(row.id, 'rejected')}
            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
            title="رفض"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </>
      )}

      {/* زر الدفع (للحالات المعتمدة فقط) */}
      {row.status === 'approved' && (
        <button
          onClick={() => onUpdateStatus(row.id, 'paid')}
          className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
          title="تم الدفع"
        >
          <FaMoneyBillWave className="w-4 h-4" />
        </button>
      )}

      {/* زر الحذف */}
      <button
        onClick={() => onDelete(row)}
        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
        title="حذف المصروف"
      >
        <FaTrash className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">قائمة المصروفات</h3>
          <div className="text-sm text-gray-600">
            {expenses.length} مصروف • إجمالي: {expenses.reduce((sum, i) => sum + i.amount, 0).toLocaleString('ar-SA')} ر.س
          </div>
        </div>
      </div>
      
      <DataTable
        columns={columns}
        data={expenses}
        searchable={true}
        actions={actions}
        emptyMessage="لا يوجد مصروفات"
        className="mt-0"
      />
    </div>
  );
}