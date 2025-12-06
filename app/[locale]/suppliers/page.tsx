// app/suppliers/page.tsx
import SuppliersContent from './SuppliersContent';
import { suppliersData } from './suppliers-data';

export default function SuppliersPage() {
  // حساب الإحصائيات على السيرفر
  const stats = {
    total: suppliersData.length,
    active: suppliersData.filter(s => s.status === 'active').length,
    totalBalance: suppliersData.reduce((sum, s) => sum + s.balance, 0),
    totalCredit: suppliersData.reduce((sum, s) => sum + s.creditLimit, 0),
    totalPurchases: suppliersData.reduce((sum, s) => sum + s.totalPurchases, 0),
  };

  return <SuppliersContent initialSuppliers={suppliersData} initialStats={stats} />;
}