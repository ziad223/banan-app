// app/customers/page.tsx
import CustomersContent from './CustomersContent';
import { customersData } from './customers-data';

export default function CustomersPage() {
  // حساب الإحصائيات على السيرفر
  const stats = {
    total: customersData.length,
    customers: customersData.filter(c => c.type === 'customer').length,
    suppliers: customersData.filter(c => c.type === 'supplier').length,
    active: customersData.filter(c => c.status === 'active').length,
    totalBalance: customersData.reduce((sum, c) => sum + c.balance, 0),
    totalCredit: customersData.reduce((sum, c) => sum + c.creditLimit, 0),
    totalPurchases: customersData.reduce((sum, c) => sum + (c.totalPurchases || 0), 0),
    averageRating: parseFloat((customersData.reduce((sum, c) => sum + (c.rating || 0), 0) / customersData.filter(c => c.rating).length).toFixed(1))
  };

  return <CustomersContent initialCustomers={customersData} initialStats={stats} />;
}