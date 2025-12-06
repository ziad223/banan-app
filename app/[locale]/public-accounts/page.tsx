// app/accounting/chart-of-accounts/page.tsx - صفحة السيرفر الرئيسية
import React from 'react';
import ChartOfAccountsHeader from './ChartOfAccountsHeader';
import AccountsActionsBar from './AccountsActionsBar';
import AccountsTable from './AccountsTable';
import FinancialSummary from './FinancialSummary';

// بيانات ثابتة
const accountsData = [
  {
    id: '1',
    code: '01',
    name: 'الأصول',
    type: 'asset' as const,
    parentId: null,
    balance: 1500000,
    status: 'active' as const,
    isGroup: true,
    level: 0,
    children: [
      {
        id: '11',
        code: '01.01',
        name: 'الأصول المتداولة',
        type: 'asset' as const,
        parentId: '1',
        balance: 800000,
        status: 'active' as const,
        isGroup: true,
        level: 1,
        children: [
          {
            id: '111',
            code: '01.01.01',
            name: 'النقدية',
            type: 'asset' as const,
            parentId: '11',
            balance: 300000,
            status: 'active' as const,
            isGroup: false,
            level: 2
          },
          {
            id: '112',
            code: '01.01.02',
            name: 'البنك',
            type: 'asset' as const,
            parentId: '11',
            balance: 500000,
            status: 'active' as const,
            isGroup: false,
            level: 2
          }
        ]
      },
      {
        id: '12',
        code: '01.02',
        name: 'الأصول الثابتة',
        type: 'asset' as const,
        parentId: '1',
        balance: 700000,
        status: 'active' as const,
        isGroup: true,
        level: 1
      }
    ]
  },
  {
    id: '2',
    code: '02',
    name: 'الخصوم',
    type: 'liability' as const,
    parentId: null,
    balance: 600000,
    status: 'active' as const,
    isGroup: true,
    level: 0
  },
  {
    id: '3',
    code: '03',
    name: 'حقوق الملكية',
    type: 'equity' as const,
    parentId: null,
    balance: 400000,
    status: 'active' as const,
    isGroup: true,
    level: 0
  },
  {
    id: '4',
    code: '04',
    name: 'الإيرادات',
    type: 'revenue' as const,
    parentId: null,
    balance: 2000000,
    status: 'active' as const,
    isGroup: true,
    level: 0
  },
  {
    id: '5',
    code: '05',
    name: 'المصروفات',
    type: 'expense' as const,
    parentId: null,
    balance: 1800000,
    status: 'active' as const,
    isGroup: true,
    level: 0
  }
];

// حساب الإجماليات
const totals = {
  assets: accountsData.find(a => a.type === 'asset')?.balance || 0,
  liabilities: accountsData.find(a => a.type === 'liability')?.balance || 0,
  equity: accountsData.find(a => a.type === 'equity')?.balance || 0,
  revenue: accountsData.find(a => a.type === 'revenue')?.balance || 0,
  expenses: accountsData.find(a => a.type === 'expense')?.balance || 0,
};

const netProfit = totals.revenue - totals.expenses;

export default function ChartOfAccountsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* العنوان والإحصائيات */}
      <ChartOfAccountsHeader 
        totals={totals}
      />

      {/* شريط الإجراءات */}
      <AccountsActionsBar />

      {/* جدول الحسابات */}
      <AccountsTable 
        accounts={accountsData}
      />

      {/* موجز مالي */}
      <FinancialSummary 
        totals={totals}
        netProfit={netProfit}
      />
    </div>
  );
}