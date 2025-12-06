// components/charts/RecentActivity.tsx
'use client';

import { useState } from 'react';
import { 
  ShoppingCart, 
  Package, 
  UserPlus, 
  CreditCard,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  MoreVertical
} from 'lucide-react';

interface ActivityItem {
  id: number;
  type: 'sale' | 'purchase' | 'customer' | 'payment' | 'alert' | 'inventory';
  title: string;
  description: string;
  amount?: number;
  time: string;
  status: 'success' | 'warning' | 'error' | 'info';
  user: string;
}

export default function RecentActivity() {
  const [activities] = useState<ActivityItem[]>([
    {
      id: 1,
      type: 'sale',
      title: 'بيع جديد',
      description: 'فاتورة #INV-2024-00128',
      amount: 1250,
      time: 'منذ 5 دقائق',
      status: 'success',
      user: 'أحمد محمد'
    },
    {
      id: 2,
      type: 'inventory',
      title: 'تنبيه مخزون',
      description: 'منتج "لابتوب ديل" أقل من الحد الأدنى',
      time: 'منذ 15 دقيقة',
      status: 'warning',
      user: 'نظام المخزون'
    },
    {
      id: 3,
      type: 'payment',
      title: 'دفعة مستحقة',
      description: 'فاتورة مورد #SUP-2024-045',
      amount: 8500,
      time: 'منذ ساعة',
      status: 'error',
      user: 'محمد علي'
    },
    {
      id: 4,
      type: 'customer',
      title: 'عميل جديد',
      description: 'تم إضافة شركة التقنية المتحدة',
      time: 'منذ 3 ساعات',
      status: 'info',
      user: 'سارة أحمد'
    },
    {
      id: 5,
      type: 'purchase',
      title: 'شراء منتجات',
      description: 'طلب شراء #PUR-2024-089',
      amount: 4500,
      time: 'منذ 5 ساعات',
      status: 'success',
      user: 'خالد سعد'
    }
  ]);

  const getTypeIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'sale': return <ShoppingCart className="w-4 h-4" />;
      case 'purchase': return <Package className="w-4 h-4" />;
      case 'customer': return <UserPlus className="w-4 h-4" />;
      case 'payment': return <CreditCard className="w-4 h-4" />;
      case 'alert': return <AlertCircle className="w-4 h-4" />;
      case 'inventory': return <Package className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: ActivityItem['status']) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'warning': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
      case 'error': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
      case 'info': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
    }
  };

  const getStatusIcon = (status: ActivityItem['status']) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertCircle className="w-4 h-4" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          النشاط الأخير
        </h2>
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
          عرض الكل
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${getStatusColor(activity.status)}`}>
                {getTypeIcon(activity.type)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {activity.title}
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                    {activity.status === 'success' && 'ناجح'}
                    {activity.status === 'warning' && 'تحذير'}
                    {activity.status === 'error' && 'خطأ'}
                    {activity.status === 'info' && 'معلومة'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {activity.description}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {activity.time}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.user}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {activity.amount && (
                <div className="text-right">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {activity.amount.toLocaleString()} ر.س
                  </div>
                  <div className="flex items-center justify-end gap-1 text-xs mt-1">
                    {activity.type === 'sale' ? (
                      <>
                        <TrendingUp className="w-3 h-3 text-green-500" />
                        <span className="text-green-600 dark:text-green-400">مبيعات</span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="w-3 h-3 text-red-500" />
                        <span className="text-red-600 dark:text-red-400">مصروفات</span>
                      </>
                    )}
                  </div>
                </div>
              )}
              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ملخص النشاط */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">24</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">عمليات اليوم</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">18</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">ناجحة</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">4</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">تحت المراجعة</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">2</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">معلقة</div>
          </div>
        </div>
      </div>
    </div>
  );
}