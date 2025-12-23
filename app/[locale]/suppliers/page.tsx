import SuppliersContent from './SuppliersContent';
import apiServiceCall from '@/lib/apiServiceCall';

export default async function SuppliersPage() {
  // جلب البيانات من API
  const response = await apiServiceCall({
    url: 'suppliers', // endpoint الموردين
    method: 'GET',
  });

  const suppliersData = response?.data || [];

  // تحويل البيانات لتنسيق يناسب الـ table
  const suppliers = suppliersData.map((supplier: any) => ({
    id: supplier.id,
    name: supplier.name,
    email: supplier.email,
    phone: supplier.contact_phone,
    secondaryPhone: supplier.secondary_phone,
    company_name: supplier.company_name,
    category_name: supplier.category_name,
    balance: Number(supplier.wallet),
    credit_limit: Number(supplier.credit_limit),
    totalPurchases: Number(supplier.shopping),
    status: supplier.is_active ? 'active' : 'inactive',
    createdAt: supplier.created_at?.split('T')[0],
    updatedAt: supplier.updated_at,
  }));

  // إحصائيات
  const stats = {
    total: suppliers.length,
    active: suppliers.filter(s => s.status === 'active').length,
    totalBalance: suppliers.reduce((sum, s) => sum + s.balance, 0),
    totalCredit: suppliers.reduce((sum, s) => sum + s.credit_limit, 0),
    totalPurchases: suppliers.reduce((sum, s) => sum + s.totalPurchases, 0),
  };

  return <SuppliersContent initialSuppliers={suppliers} initialStats={stats} />;
}
