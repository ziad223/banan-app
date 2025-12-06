// app/customers/CustomersContent.tsx
'use client';

import { useState } from 'react';
// import CustomersHeader from './CustomersHeader';
import CustomersStats from './CustomerStats';
import CustomersFilters from './CustomersFilters';
import CustomersTable from './CustomerTable';
import AddCustomerModal from './AddCustomerModal';
import EditCustomerModal from './EditCustomerModal';
import DeleteCustomerModal from './DeleteCustomerModal';

interface CustomersContentProps {
  initialCustomers: any[];
  initialStats: any;
}

export default function CustomersContent({ initialCustomers, initialStats }: CustomersContentProps) {
  const [customers, setCustomers] = useState(initialCustomers);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false); // جديد
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  // عرض العميل
  const handleViewCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    setViewModalOpen(true); // فتح Modal العرض
  };

  // تعديل العميل
  const handleEditCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    setEditModalOpen(true);
  };

  // حذف العميل
  const handleDeleteCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    setDeleteModalOpen(true);
  };

  // عرض فواتير العميل
  const handleViewInvoices = () => {
    if (selectedCustomer) {
      // فتح صفحة فواتير العميل
      window.open(`/invoices?customerId=${selectedCustomer.id}`, '_blank');
    }
  };

  // إضافة عميل جديد
  const handleAddCustomer = (newCustomer: any) => {
    const id = customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1;
    const customerToAdd = {
      ...newCustomer,
      id,
      balance: 0,
      totalPurchases: 0,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      lastPurchase: '-'
    };
    setCustomers([...customers, customerToAdd]);
    alert('تم إضافة العميل بنجاح! ✅');
    setAddModalOpen(false);
  };

  // تعديل عميل
  const handleUpdateCustomer = (updatedCustomer: any) => {
    setCustomers(customers.map(customer => 
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    ));
    alert('تم تعديل العميل بنجاح! ✅');
    setEditModalOpen(false);
  };

  // حذف عميل
  const handleRemoveCustomer = () => {
    if (selectedCustomer) {
      setCustomers(customers.filter(customer => customer.id !== selectedCustomer.id));
      alert(`تم حذف العميل ${selectedCustomer.name} بنجاح ✅`);
      setDeleteModalOpen(false);
      setSelectedCustomer(null);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className='mb-5'>
            <h1 className="text-2xl  lg:text-3xl font-bold text-gray-800">
              العملاء والموردين
            </h1>
            <p className="text-gray-600 mt-2">
              إدارة قاعدة عملائك ومورديك في نظام <span className="font-bold text-blue-600">Banan App</span>
            </p>
          </div>
      <CustomersStats stats={initialStats} />
      <CustomersFilters onAdd={() => setAddModalOpen(true)} />
      
      {/* Table هنا ياخد functions من  onView, onEdit, onDelete  */}
      <CustomersTable 
        customers={customers}
        onView={handleViewCustomer}
        onEdit={handleEditCustomer}
        onDelete={handleDeleteCustomer}
      />

      {/* Modals */}
      <AddCustomerModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddCustomer}
      />
      
      <EditCustomerModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        customer={selectedCustomer}
        onEdit={handleUpdateCustomer}
      />
      
      <DeleteCustomerModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        customer={selectedCustomer}
        onDelete={handleRemoveCustomer}
      />
      
    
    </div>
  );
}