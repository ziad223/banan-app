// components/charts/StoreStatus.tsx
'use client';

import { useState } from 'react';
import { 
  Store, 
  Wifi, 
  WifiOff, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  RefreshCw,
  Cpu,
  Database,
  Users
} from 'lucide-react';

interface StoreBranch {
  id: number;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'maintenance';
  salesToday: number;
  inventory: number;
  lastSync: string;
  connection: 'stable' | 'slow' | 'disconnected';
}

export default function StoreStatus() {
  const [branches] = useState<StoreBranch[]>([
    {
      id: 1,
      name: 'المتجر الرئيسي',
      location: 'الرياض - الحي التجاري',
      status: 'online',
      salesToday: 45,
      inventory: 1245,
      lastSync: 'منذ دقيقتين',
      connection: 'stable'
    },
    {
      id: 2,
      name: 'فرع المدينة',
      location: 'جدة - كورنيش',
      status: 'online',
      salesToday: 32,
      inventory: 890,
      lastSync: 'منذ 5 دقائق',
      connection: 'slow'
    },
    {
      id: 3,
      name: 'فرع الخبر',
      location: 'الخبر - الداخلية',
      status: 'offline',
      salesToday: 0,
      inventory: 0,
      lastSync: 'منذ ساعة',
      connection: 'disconnected'
    },
    {
      id: 4,
      name: 'متجر الإنترنت',
      location: 'متصل عن بعد',
      status: 'online',
      salesToday: 18,
      inventory: 1560,
      lastSync: 'الآن',
      connection: 'stable'
    }
  ]);

  const [systemStatus] = useState({
    api: { status: 'healthy', responseTime: '125ms' },
    database: { status: 'healthy', size: '2.4GB' },
    sync: { status: 'syncing', lastSync: 'منذ 2 دقيقة' },
    users: { active: 8, total: 12 }
  });

  const getStatusIcon = (status: StoreBranch['status']) => {
    switch (status) {
      case 'online': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'offline': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'maintenance': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: StoreBranch['status']) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'offline': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getConnectionIcon = (connection: StoreBranch['connection']) => {
    switch (connection) {
      case 'stable': return <Wifi className="w-4 h-4 text-green-500" />;
      case 'slow': return <Wifi className="w-4 h-4 text-yellow-500" />;
      case 'disconnected': return <WifiOff className="w-4 h-4 text-red-500" />;
      default: return <WifiOff className="w-4 h-4 text-gray-500" />;
    }
  };

  const getConnectionColor = (connection: StoreBranch['connection']) => {
    switch (connection) {
      case 'stable': return 'text-green-600 dark:text-green-400';
      case 'slow': return 'text-yellow-600 dark:text-yellow-400';
      case 'disconnected': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            الفروع
        </h2>
     
      </div>

    

      {/* قائمة الفروع */}
      <div>
        <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          حالة الفروع
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                  الفرع
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                  الحالة
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                  المبيعات اليوم
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                  المخزون
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                  الاتصال
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                  آخر مزامنة
                </th>
              </tr>
            </thead>
            <tbody>
              {branches.map((branch) => (
                <tr 
                  key={branch.id}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <Store className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {branch.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {branch.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(branch.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(branch.status)}`}>
                        {branch.status === 'online' && 'متصل'}
                        {branch.status === 'offline' && 'غير متصل'}
                        {branch.status === 'maintenance' && 'صيانة'}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {branch.salesToday}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      فاتورة
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {branch.inventory.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      منتج
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className={`flex items-center gap-2 ${getConnectionColor(branch.connection)}`}>
                      {getConnectionIcon(branch.connection)}
                      <span>
                        {branch.connection === 'stable' && 'مستقر'}
                        {branch.connection === 'slow' && 'بطيء'}
                        {branch.connection === 'disconnected' && 'منقطع'}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {branch.lastSync}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ملخص إحصائي */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {branches.filter(b => b.status === 'online').length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">فروع متصلة</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {branches.reduce((sum, b) => sum + b.salesToday, 0)}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">مبيعات اليوم</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {branches.reduce((sum, b) => sum + b.inventory, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">إجمالي المخزون</div>
          </div>
        </div>
      </div>
    </div>
  );
}