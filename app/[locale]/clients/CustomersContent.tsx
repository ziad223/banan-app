'use client';

import { useState } from 'react';
import CustomersTable from './CustomerTable';
import ViewCustomerModal from './ViewCustomerModal';
import EditCustomerModal from './EditCustomerModal';
import DeleteCustomerModal from './DeleteCustomerModal';

export default function CustomersContent({ initialCustomers, initialStats }: any) {
  const [customers, setCustomers] = useState(initialCustomers);
  const [viewCustomer, setViewCustomer] = useState<any>(null);
  const [editCustomer, setEditCustomer] = useState<any>(null);
  const [deleteCustomer, setDeleteCustomer] = useState<any>(null);

  const handleView = (customer: any) => setViewCustomer(customer);
  const handleEdit = (customer: any) => setEditCustomer(customer);
  const handleDelete = (customer: any) => setDeleteCustomer(customer);

  const updateCustomer = (updated: any) => {
    setCustomers(prev => prev.map(c => c.id === updated.id ? updated : c));
  };

  const removeCustomer = () => {
    setCustomers(prev => prev.filter(c => c.id !== deleteCustomer.id));
    setDeleteCustomer(null);
  };

  return (
    <div>
      <CustomersTable
        customers={customers}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ViewCustomerModal
        isOpen={!!viewCustomer}
        customer={viewCustomer}
        onClose={() => setViewCustomer(null)}
      />

      <EditCustomerModal
        isOpen={!!editCustomer}
        customer={editCustomer}
        onClose={() => setEditCustomer(null)}
        onEdit={updateCustomer}
      />

      <DeleteCustomerModal
        isOpen={!!deleteCustomer}
        customer={deleteCustomer}
        onClose={() => setDeleteCustomer(null)}
        onDelete={removeCustomer}
      />
    </div>
  );
}
