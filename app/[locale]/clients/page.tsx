import CustomersContent from './CustomersContent';
import apiServiceCall from '@/lib/apiServiceCall';

export default async function CustomersPage() {
  const response = await apiServiceCall({
    url: 'users',
    method: 'GET',
  });

  const users = response?.data || [];

  // تحويل شكل البيانات لو محتاج
  const customers = users.map((user: any) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    secondaryPhone: user.secondary_phone,
    identityNumber: user.identity_number,
    taxNumber: user.tax_number,
    hall: user.hall,
    balance: Number(user.wallet),
    status: user.status === 1 ? 'active' : 'inactive',
    createdAt: user.created_at?.split('T')[0],
    updatedAt: user.updated_at,
    type: 'customer', // لو عندك supplier بعدين
  }));

  // حساب الإحصائيات
  const stats = {
    total: customers.length,
    customers: customers.length,
    suppliers: 0,
    active: customers.filter(c => c.status === 'active').length,
    totalBalance: customers.reduce((sum, c) => sum + c.balance, 0),
    totalCredit: 0,
    totalPurchases: 0,
    averageRating: 0,
  };

  return (
    <CustomersContent
      initialCustomers={customers}
      initialStats={stats}
    />
  );
}
