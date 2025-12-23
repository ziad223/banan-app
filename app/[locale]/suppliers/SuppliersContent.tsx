'use client';

import { useState } from 'react';
import SuppliersStats from './SuppliersStats';
import SuppliersFilters from './SuppliersFilters';
import SuppliersTable from './SuppliersTable';
import AddSupplierModal from './AddSupplierModal';
import EditSupplierModal from './EditSupplierModal';
import DeleteSupplierModal from './DeleteSupplierModal';

interface SuppliersContentProps {
  initialSuppliers: any[];
  initialStats: {
    total: number;
    active: number;
    totalBalance: number;
    totalCredit: number;
    totalPurchases: number;
  };
}

export default function SuppliersContent({ initialSuppliers, initialStats }: SuppliersContentProps) {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [searchTerm, setSearchTerm] = useState(''); // ← أضفنا
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);

  // بيانات بعد تطبيق البحث
  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // عرض المورد
  const handleViewSupplier = (supplier: any) => {
    setSelectedSupplier(supplier);
    setViewModalOpen(true);
  };

  // تعديل المورد
  const handleEditSupplier = (supplier: any) => {
    setSelectedSupplier(supplier);
    setEditModalOpen(true);
  };

  // حذف المورد
  const handleDeleteSupplier = (supplier: any) => {
    setSelectedSupplier(supplier);
    setDeleteModalOpen(true);
  };

  // إضافة مورد جديد
  const handleAddSupplier = (newSupplier: any) => {
    const id = suppliers.length > 0 ? Math.max(...suppliers.map(s => s.id)) + 1 : 1;
    const supplierToAdd = {
      ...newSupplier,
      id,
      balance: 0,
      totalPurchases: 0,
      status: 'active',
      rating: 4.0,
      createdAt: new Date().toISOString().split('T')[0],
      lastPurchase: '-'
    };
    setSuppliers([...suppliers, supplierToAdd]);
    alert('تم إضافة المورد بنجاح! ✅');
  };

  // تعديل مورد
  const handleUpdateSupplier = (updatedSupplier: any) => {
    setSuppliers(suppliers.map(supplier =>
      supplier.id === updatedSupplier.id ? updatedSupplier : supplier
    ));
    alert('تم تعديل المورد بنجاح! ✅');
  };

  // حذف مورد
  const handleRemoveSupplier = () => {
    if (selectedSupplier) {
      setSuppliers(suppliers.filter(supplier => supplier.id !== selectedSupplier.id));
      alert(`تم حذف المورد ${selectedSupplier.name} بنجاح ✅`);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">الموردين</h1>
        <p className="text-gray-600 mt-2">إدارة قاعدة مورديك ومتابعة المشتريات والمدفوعات</p>
      </div>

      <SuppliersStats stats={initialStats} />

      {/* تمرير searchTerm و setSearchTerm */}
      <SuppliersFilters
        onAdd={() => setAddModalOpen(true)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <SuppliersTable 
        suppliers={filteredSuppliers} // ← استخدمنا البيانات المفلترة
        onView={handleViewSupplier}
        onEdit={handleEditSupplier}
        onDelete={handleDeleteSupplier}
      />

      {/* Modals */}
      <AddSupplierModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddSupplier}
      />

      <EditSupplierModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        supplier={selectedSupplier}
        onEdit={handleUpdateSupplier}
      />

      <DeleteSupplierModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        supplier={selectedSupplier}
        onDelete={handleRemoveSupplier}
      />
    </div>
  );
}
