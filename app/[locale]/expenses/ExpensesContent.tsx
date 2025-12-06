// app/expenses/components/ExpensesContent.tsx
'use client';

import { useState, useMemo } from 'react';
import ExpensesHeader from './ExpensesHeader';
import ExpensesStats from './ExpensesStats';
import ExpensesFilters from './ExpensesFilters';
import ExpensesTable from './ExpensesTable';
import CreateExpenseModal from './CreateExpenseModal';
// import ExpenseDetailsModal from './ExpenseDetailsModal';
import ExpensesChart from './ExpensesChart';

interface ExpensesContentProps {
  initialExpenses: any[];
  initialStats: any;
  categories: any[];
}

export default function ExpensesContent({ 
  initialExpenses, 
  initialStats,
  categories 
}: ExpensesContentProps) {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<any>(null);

  // تصفية المصروفات
  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => {
      const matchesSearch = 
        expense.expenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.vendor.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || expense.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || expense.status === selectedStatus;
      
      // تصفية حسب الشهر
      let matchesMonth = true;
      if (selectedMonth !== 'all') {
        const expenseDate = new Date(expense.date);
        const expenseMonth = expenseDate.getMonth();
        matchesMonth = expenseMonth === parseInt(selectedMonth);
      }
      
      return matchesSearch && matchesCategory && matchesStatus && matchesMonth;
    });
  }, [expenses, searchTerm, selectedCategory, selectedStatus, selectedMonth]);

  // حساب الإحصائيات المحدثة
  const updatedStats = useMemo(() => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    return {
      ...initialStats,
      total: filteredExpenses.length,
      totalAmount: filteredExpenses.reduce((sum, i) => sum + i.amount, 0),
      pending: filteredExpenses.filter(i => i.status === 'pending').length,
      approved: filteredExpenses.filter(i => i.status === 'approved').length,
      paid: filteredExpenses.filter(i => i.status === 'paid').length,
      rejected: filteredExpenses.filter(i => i.status === 'rejected').length,
      thisMonth: filteredExpenses.filter(i => {
        const expenseDate = new Date(i.date);
        return expenseDate.getMonth() === currentMonth && 
               expenseDate.getFullYear() === currentYear;
      }).length,
      thisMonthAmount: filteredExpenses.filter(i => {
        const expenseDate = new Date(i.date);
        return expenseDate.getMonth() === currentMonth && 
               expenseDate.getFullYear() === currentYear;
      }).reduce((sum, i) => sum + i.amount, 0),
      byCategory: categories.map(category => ({
        name: category.name,
        amount: filteredExpenses.filter(i => i.category === category.name)
                .reduce((sum, i) => sum + i.amount, 0),
        count: filteredExpenses.filter(i => i.category === category.name).length
      })).filter(item => item.count > 0)
    };
  }, [filteredExpenses, categories, initialStats]);

  // عرض تفاصيل المصروف
  const handleViewExpense = (expense: any) => {
    setSelectedExpense(expense);
    setDetailsModalOpen(true);
  };

  // إنشاء مصروف جديد
  const handleCreateExpense = (newExpense: any) => {
    const expenseNumber = `EXP-2024-${String(expenses.length + 1).padStart(3, '0')}`;
    const expenseToAdd = {
      ...newExpense,
      id: expenseNumber,
      expenseNumber: `${String(expenses.length + 1).padStart(3, '0')}/2024`,
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString().replace('T', ' ').split('.')[0],
      status: 'pending',
      approvedBy: '',
      approvedDate: ''
    };
    setExpenses([expenseToAdd, ...expenses]);
    alert('تم إضافة المصروف بنجاح! ✅');
    setCreateModalOpen(false);
  };

  // تحديث حالة المصروف
  const handleUpdateStatus = (expenseId: string, newStatus: string) => {
    const updatedExpenses = expenses.map(expense => {
      if (expense.id === expenseId) {
        return {
          ...expense,
          status: newStatus,
          approvedBy: newStatus === 'approved' || newStatus === 'rejected' ? 'المسؤول الحالي' : '',
          approvedDate: newStatus === 'approved' || newStatus === 'rejected' ? 
            new Date().toISOString().split('T')[0] : ''
        };
      }
      return expense;
    });
    setExpenses(updatedExpenses);
    alert(`تم تحديث حالة المصروف إلى ${newStatus === 'approved' ? 'معتمد' : 'مرفوض'} ✅`);
  };

  // حذف المصروف
  const handleDeleteExpense = (expense: any) => {
    if (confirm(`هل أنت متأكد من حذف المصروف ${expense.expenseNumber}؟`)) {
      setExpenses(expenses.filter(i => i.id !== expense.id));
      alert('تم حذف المصروف بنجاح ✅');
    }
  };

  // طباعة تقرير المصروفات
  const handlePrintReport = () => {
    console.log('طباعة تقرير المصروفات:', filteredExpenses);
    // يمكن فتح نافذة طباعة
  };

  // تصدير البيانات
  const handleExportData = (format: string) => {
    console.log(`تصدير البيانات بصيغة ${format}:`, filteredExpenses);
    alert(`تم تصدير البيانات بصيغة ${format}`);
  };

    const handleOpenCreateModal = () => {
    console.log('فتح المودال...'); // للتصحيح
    setCreateModalOpen(true);
  };

  // 🔴 التأكد من تمرير الدالة بشكل صحيح
  const handleCloseCreateModal = () => {
    console.log('إغلاق المودال...'); // للتصحيح
    setCreateModalOpen(false);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <ExpensesHeader 
        onAdd={() => setCreateModalOpen(true)}
        onPrint={handlePrintReport}
        onExport={handleExportData}
      />
      
      <ExpensesStats stats={updatedStats} />
      
      <ExpensesChart data={updatedStats.byCategory} />
      
      <ExpensesFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        categories={categories}
                onAdd={handleOpenCreateModal} // ✅ إضافة هذه الخاصية

      />

      <ExpensesTable
        expenses={filteredExpenses}
        onView={handleViewExpense}
        onUpdateStatus={handleUpdateStatus}
        onDelete={handleDeleteExpense}
      />

      {/* Modals */}
    <CreateExpenseModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal} // ✅ استخدام الدالة المخصصة
        onCreate={handleCreateExpense}
        categories={categories}
      />
      
      {/* <ExpenseDetailsModal
        isOpen={isDetailsModalOpen}
        expense={selectedExpense}
        onClose={() => setDetailsModalOpen(false)}
        onUpdateStatus={handleUpdateStatus}
      /> */}
    </div>
  );
}