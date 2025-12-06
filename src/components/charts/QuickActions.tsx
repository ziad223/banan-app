// components/charts/QuickActions.tsx
'use client';

import { useState } from 'react';
import { 
  Receipt, 
  PlusCircle, 
  DollarSign, 
  Package, 
  User, 
  BarChart3,
  ArrowRight,
  ShoppingBag,
  FileText,
  RefreshCw
} from 'lucide-react';

interface QuickAction {
  label: string;
  icon: string;
  link: string;
  description?: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

const iconMap: Record<string, React.ReactNode> = {
  receipt: <Receipt className="w-5 h-5" />,
  add: <PlusCircle className="w-5 h-5" />,
  money: <DollarSign className="w-5 h-5" />,
  inventory: <Package className="w-5 h-5" />,
  account: <User className="w-5 h-5" />,
  analytics: <BarChart3 className="w-5 h-5" />,
  cart: <ShoppingBag className="w-5 h-5" />,
  document: <FileText className="w-5 h-5" />,
  sync: <RefreshCw className="w-5 h-5" />
};

export default function QuickActions({ actions }: QuickActionsProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          الإجراءات السريعة
        </h2>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          اضغط للوصول السريع
        </div>
      </div>
      
      <div className="space-y-3">
        {actions.map((action, index) => (
          <a
            key={index}
            href={action.link}
            className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
              hovered === index
                ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                : 'bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                hovered === index
                  ? 'bg-blue-100 dark:bg-blue-800'
                  : 'bg-gray-100 dark:bg-gray-600'
              }`}>
                {iconMap[action.icon]}
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white block">
                  {action.label}
                </span>
                {action.description && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {action.description}
                  </span>
                )}
              </div>
            </div>
            <ArrowRight className={`w-4 h-4 transition-transform ${
              hovered === index ? 'translate-x-1' : ''
            } text-gray-400`} />
          </a>
        ))}
      </div>

      {/* نصائح سريعة */}
      {/* <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
          نصائح سريعة
        </h3>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex items-start gap-2">
            <div className="w-1 h-1 mt-2 rounded-full bg-gray-400" />
            <span>استخدم Ctrl+S لحفظ العمل السريع</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1 h-1 mt-2 rounded-full bg-gray-400" />
            <span>يمكنك طباعة الفواتير مباشرة من POS</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1 h-1 mt-2 rounded-full bg-gray-400" />
            <span>اضغط F1 للمساعدة السريعة</span>
          </li>
        </ul>
      </div> */}
    </div>
  );
}