// app/invoices/InvoicesContent.tsx
'use client';

import { useState } from 'react';
import InvoicesHeader from './InvoicesHeader';
import InvoicesStats from './InvoicesStats';
import InvoicesFilters from './InvoicesFilters';
import InvoicesTable from './InvoicesTable';
import CreateInvoiceModal from './CreateInvoiceModal';

interface InvoicesContentProps {
  initialInvoices: any[];
  initialStats: {
    total: number;
    totalAmount: number;
    paid: number;
    pending: number;
    overdue: number;
    thisMonth: number;
  };
}

export default function InvoicesContent({ initialInvoices, initialStats }: InvoicesContentProps) {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  // تصفية الفواتير
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customerPhone.includes(searchTerm);
    
    const matchesType = selectedType === 'all' || invoice.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || invoice.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // إحصائيات محدثة
  const updatedStats = {
    ...initialStats,
    total: filteredInvoices.length,
    totalAmount: filteredInvoices.reduce((sum, i) => sum + i.total, 0),
    paid: filteredInvoices.filter(i => i.status === 'paid').length,
    pending: filteredInvoices.filter(i => i.status === 'pending').length,
    overdue: filteredInvoices.filter(i => i.status === 'overdue').length
  };

  // عرض الفاتورة
  const handleViewInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
    setViewModalOpen(true);
  };

  // طباعة الفاتورة
  const handlePrintInvoice = (invoice: any) => {
    console.log('طباعة الفاتورة:', invoice.id);
    // يمكن فتح نافذة طباعة
  };

  // إنشاء فاتورة جديدة
  const handleCreateInvoice = (newInvoice: any) => {
    const invoiceNumber = `INV-2024-${String(invoices.length + 1).padStart(3, '0')}`;
    const invoiceToAdd = {
      ...newInvoice,
      id: invoiceNumber,
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    setInvoices([invoiceToAdd, ...invoices]);
    alert('تم إنشاء الفاتورة بنجاح! ✅');
    setCreateModalOpen(false);
  };

  // حذف الفاتورة
  const handleDeleteInvoice = (invoice: any) => {
    if (confirm(`هل أنت متأكد من حذف الفاتورة ${invoice.id}؟`)) {
      setInvoices(invoices.filter(i => i.id !== invoice.id));
      alert('تم حذف الفاتورة بنجاح ✅');
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <InvoicesHeader onAdd={() => setCreateModalOpen(true)} />
      <InvoicesStats stats={updatedStats} />
      
      <InvoicesFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        onAdd={() => setCreateModalOpen(true)}
      />

      <InvoicesTable
        invoices={filteredInvoices}
        onView={handleViewInvoice}
        onPrint={handlePrintInvoice}
        onDelete={handleDeleteInvoice}
      />

      {/* Modals */}
      <CreateInvoiceModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreateInvoice}
      />
      
     
    </div>
  );
}