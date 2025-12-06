// app/accounting/chart-of-accounts/components/AccountsTable.tsx
'use client';

import React from 'react';
import { ChevronRight, Folder, FolderOpen, FileText, MoreVertical, Edit, Trash2 } from 'lucide-react';

type AccountType = 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
type AccountStatus = 'active' | 'inactive';

interface Account {
  id: string;
  code: string;
  name: string;
  type: AccountType;
  parentId: string | null;
  balance: number;
  status: AccountStatus;
  isGroup: boolean;
  level: number;
  children?: Account[];
  currency?: string;
  description?: string;
}

interface AccountsTableProps {
  accounts: Account[];
}

// مكون لعرض الحساب الفردي
const AccountItem = ({ 
  account, 
  expanded = false, 
  onToggle,
  onEdit,
  onDelete
}: { 
  account: Account;
  expanded?: boolean;
  onToggle: (id: string) => void;
  onEdit: (account: Account) => void;
  onDelete: (id: string) => void;
}) => {
  const bgColors = {
    asset: 'bg-blue-50 border-r-4 border-blue-500',
    liability: 'bg-red-50 border-r-4 border-red-500',
    equity: 'bg-green-50 border-r-4 border-green-500',
    revenue: 'bg-purple-50 border-r-4 border-purple-500',
    expense: 'bg-orange-50 border-r-4 border-orange-500'
  };

  const typeLabels = {
    asset: 'أصل',
    liability: 'خِصْم',
    equity: 'حق ملكية',
    revenue: 'إيراد',
    expense: 'مصروف'
  };

  const typeColors = {
    asset: 'text-blue-600 bg-blue-100',
    liability: 'text-red-600 bg-red-100',
    equity: 'text-green-600 bg-green-100',
    revenue: 'text-purple-600 bg-purple-100',
    expense: 'text-orange-600 bg-orange-100'
  };

  return (
    <div className={`mb-1 ${bgColors[account.type]}`}>
      <div className="flex items-center justify-between p-4 hover:bg-opacity-80 transition-colors">
        <div className="flex items-center flex-1">
          <div className="flex items-center w-64">
            {account.isGroup ? (
              <button
                onClick={() => onToggle(account.id)}
                className="p-1 hover:bg-gray-200 rounded mr-2"
              >
                <ChevronRight 
                  className={`w-4 h-4 transition-transform ${expanded ? 'rotate-90' : ''}`} 
                />
                {expanded ? (
                  <FolderOpen className="w-5 h-5 text-blue-600 ml-2" />
                ) : (
                  <Folder className="w-5 h-5 text-blue-600 ml-2" />
                )}
              </button>
            ) : (
              <div className="w-8 mr-2 pl-1">
                <FileText className="w-5 h-5 text-gray-600" />
              </div>
            )}
            
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="font-mono text-sm text-gray-600 w-20">
                  {account.code}
                </span>
                <span className="font-medium text-gray-800 mr-2">
                  {account.name}
                </span>
                <span className={`px-2 py-1 text-xs rounded ${typeColors[account.type]}`}>
                  {typeLabels[account.type]}
                </span>
              </div>
              {account.description && (
                <span className="text-sm text-gray-500 mt-1 mr-24">
                  {account.description}
                </span>
              )}
            </div>
          </div>

          <div className="flex-1 text-right">
            <div className={`font-bold text-lg ${account.balance >= 0 ? 'text-gray-800' : 'text-red-600'}`}>
              {account.balance.toLocaleString('ar-SA')} {account.currency || 'ر.س'}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {account.status === 'active' ? 'نشط' : 'غير نشط'}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 space-x-reverse">
          <button
            onClick={() => onEdit(account)}
            className="p-2 hover:bg-gray-200 rounded-full text-blue-600"
            title="تعديل"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(account.id)}
            className="p-2 hover:bg-gray-200 rounded-full text-red-600"
            title="حذف"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            className="p-2 hover:bg-gray-200 rounded-full text-gray-600"
            title="المزيد"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// مكون لشجرة الحسابات
const AccountsTree = ({ 
  accounts, 
  expandedIds, 
  onToggle,
  onEdit,
  onDelete 
}: { 
  accounts: Account[];
  expandedIds: Set<string>;
  onToggle: (id: string) => void;
  onEdit: (account: Account) => void;
  onDelete: (id: string) => void;
}) => {
  const renderAccounts = (accounts: Account[], parentLevel = 0) => {
    return accounts.map(account => (
      <React.Fragment key={account.id}>
        <div style={{ marginRight: `${parentLevel * 24}px` }}>
          <AccountItem
            account={account}
            expanded={expandedIds.has(account.id)}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
        
        {account.isGroup && expandedIds.has(account.id) && account.children && (
          <div style={{ marginRight: `${(parentLevel + 1) * 24}px` }}>
            {renderAccounts(account.children, parentLevel + 1)}
          </div>
        )}
      </React.Fragment>
    ));
  };

  return <div>{renderAccounts(accounts)}</div>;
};

export default function AccountsTable({ accounts }: AccountsTableProps) {
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(new Set(['1', '11']));

  const toggleAccount = (id: string) => {
    setExpandedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleEditAccount = (account: Account) => {
    // TODO: تنفيذ تعديل الحساب
    console.log('Edit account:', account);
  };

  const handleDeleteAccount = (id: string) => {
    // TODO: تنفيذ حذف الحساب
    if (confirm('هل أنت متأكد من حذف هذا الحساب؟')) {
      console.log('Delete account:', id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="border-b border-gray-200">
        <div className="grid grid-cols-12 p-4 text-sm font-medium text-gray-600 bg-gray-50">
          <div className="col-span-6 text-right">الحساب</div>
          <div className="col-span-4 text-right">الرصيد</div>
          <div className="col-span-2 text-center">الإجراءات</div>
        </div>
      </div>
      
      <AccountsTree
        accounts={accounts}
        expandedIds={expandedIds}
        onToggle={toggleAccount}
        onEdit={handleEditAccount}
        onDelete={handleDeleteAccount}
      />
    </div>
  );
}