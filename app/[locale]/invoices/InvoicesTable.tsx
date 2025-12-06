// app/invoices/components/InvoicesTable.tsx
'use client';

import { FaEye, FaPrint, FaTrash, FaFilePdf, FaWhatsapp } from 'react-icons/fa';
import DataTable from '@/components/shared/reusableComponents/Table';

interface InvoicesTableProps {
  invoices: any[];
  onView: (invoice: any) => void;
  onPrint: (invoice: any) => void;
  onDelete: (invoice: any) => void;
}

export default function InvoicesTable({ invoices, onView, onPrint, onDelete }: InvoicesTableProps) {
  const columns = [
    { 
      key: "id",
      header: "رقم الفاتورة",
      sortable: true,
      render: (value: string) => (
        <div className="font-mono font-bold text-blue-600">{value}</div>
      )
    },
    { 
      key: "customerName",
      header: "العميل",
      sortable: true,
      render: (_: any, row: any) => (
        <div>
          <div className="font-medium">{row.customerName}</div>
          <div className="text-xs text-gray-500">{row.customerPhone}</div>
        </div>
      )
    },
    { 
      key: "date",
      header: "التاريخ",
      sortable: true,
      render: (value: string) => (
        <div className="text-sm">{value}</div>
      )
    },
    { 
      key: "dueDate",
      header: "تاريخ الاستحقاق",
      sortable: true,
      render: (value: string, row: any) => {
        const today = new Date();
        const dueDate = new Date(value);
        const isOverdue = dueDate < today && row.status !== 'paid';
        
        return (
          <div className={`text-sm ${isOverdue ? 'text-red-600 font-bold' : ''}`}>
            {value}
            {isOverdue && <div className="text-xs text-red-500">متأخرة</div>}
          </div>
        );
      }
    },
    { 
      key: "type",
      header: "النوع",
      sortable: true,
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'sale' 
            ? 'bg-green-100 text-green-800'
            : 'bg-blue-100 text-blue-800'
        }`}>
          {value === 'sale' ? 'مبيعات' : 'مشتريات'}
        </span>
      )
    },
    { 
      key: "total",
      header: "المبلغ",
      sortable: true,
      render: (value: number) => (
        <div className="font-bold text-gray-800">{value.toLocaleString('ar-SA')} ر.س</div>
      )
    },
    { 
      key: "status",
      header: "الحالة",
      sortable: true,
      render: (value: string, row: any) => {
        const statusColors = {
          paid: 'bg-green-100 text-green-800',
          pending: 'bg-yellow-100 text-yellow-800',
          overdue: 'bg-red-100 text-red-800'
        };
        
        const statusText = {
          paid: 'مدفوعة',
          pending: 'معلقة',
          overdue: 'متأخرة'
        };
        
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[value as keyof typeof statusColors]}`}>
            {statusText[value as keyof typeof statusText]}
            {row.remainingAmount > 0 && (
              <div className="text-xs mt-1">
                {row.paidAmount > 0 ? `${row.paidAmount.toLocaleString('ar-SA')} ر.س مدفوع` : 'لم يدفع شيء'}
              </div>
            )}
          </span>
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
        title="عرض الفاتورة"
      >
        <FaEye className="w-4 h-4" />
      </button>

      {/* زر الطباعة */}
      <button
        onClick={() => onPrint(row)}
        className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
        title="طباعة الفاتورة"
      >
        <FaPrint className="w-4 h-4" />
      </button>

      {/* زر PDF */}
      <button
        onClick={() => console.log('تنزيل PDF:', row.id)}
        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
        title="تحميل PDF"
      >
        <FaFilePdf className="w-4 h-4" />
      </button>

      {/* زر إرسال واتساب */}
      <button
        onClick={() => console.log('إرسال واتساب:', row.id)}
        className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
        title="إرسال عبر واتساب"
      >
        <FaWhatsapp className="w-4 h-4" />
      </button>

      {/* زر الحذف */}
      <button
        onClick={() => onDelete(row)}
        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
        title="حذف الفاتورة"
      >
        <FaTrash className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">قائمة الفواتير</h3>
          <div className="text-sm text-gray-600">
            {invoices.length} فاتورة • إجمالي: {invoices.reduce((sum, i) => sum + i.total, 0).toLocaleString('ar-SA')} ر.س
          </div>
        </div>
      </div>
      
      <DataTable
        columns={columns}
        data={invoices}
        searchable={true}
        actions={actions}
        emptyMessage="لا يوجد فواتير"
        className="mt-0"
      />
    </div>
  );
}