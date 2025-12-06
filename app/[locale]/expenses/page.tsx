// app/expenses/page.tsx
import ExpensesContent from './ExpensesContent';
import { expensesData, expenseCategories } from './expenses-data';

// دالة لحساب الإحصائيات على السيرفر
function calculateStats(data: any[]) {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  return {
    total: data.length,
    totalAmount: data.reduce((sum, i) => sum + i.amount, 0),
    pending: data.filter(i => i.status === 'pending').length,
    approved: data.filter(i => i.status === 'approved').length,
    paid: data.filter(i => i.status === 'paid').length,
    rejected: data.filter(i => i.status === 'rejected').length,
    thisMonth: data.filter(i => {
      const expenseDate = new Date(i.date);
      return expenseDate.getMonth() === currentMonth && 
             expenseDate.getFullYear() === currentYear;
    }).length,
    thisMonthAmount: data.filter(i => {
      const expenseDate = new Date(i.date);
      return expenseDate.getMonth() === currentMonth && 
             expenseDate.getFullYear() === currentYear;
    }).reduce((sum, i) => sum + i.amount, 0),
    // إحصائيات حسب الفئة
    byCategory: expenseCategories.map(category => ({
      name: category.name,
      amount: data.filter(i => i.category === category.name)
                  .reduce((sum, i) => sum + i.amount, 0),
      count: data.filter(i => i.category === category.name).length
    })).filter(item => item.count > 0)
  };
}

export default function ExpensesPage() {
  const stats = calculateStats(expensesData);
  
  return (
    <ExpensesContent 
      initialExpenses={expensesData} 
      initialStats={stats}
      categories={expenseCategories}
    />
  );
}