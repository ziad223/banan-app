// components/sidebar.tsx (للشاشات الكبيرة فقط)
"use client";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Package, 
  ShoppingCart, 
  Warehouse,
  BarChart3,
  Settings,
  Users,
  CreditCard,
  FileText,
  Layers,
  BellRing,
  Database,
  Shield,
  DollarSign,
  TrendingUp,
  Store,
  ClipboardCheck,
  RefreshCw,
  FileSpreadsheet,
  HelpCircle,
  LucideIcon
} from "lucide-react";
import { Link } from "../../../navigation";

// تعريف الأيقونة المفقودة
const Truck: LucideIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13"/>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
    <circle cx="5.5" cy="18.5" r="2.5"/>
    <circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);

interface SidebarLink {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

interface ModuleSectionProps {
  title: string;
  items: SidebarLink[];
  collapsed: boolean;
}

interface SidebarProps {
  collapsed: boolean;
}

const ModuleSection: React.FC<ModuleSectionProps> = ({ title, items, collapsed }) => {
  const pathname = usePathname();

  return (
    <div className="mb-6">
      {!collapsed && (
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 px-4">
          {title}
        </h3>
      )}
      <ul className="space-y-1">
        {items.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-2 py-3 px-4 rounded-lg transition-all duration-200 group ${
                  active  
                    ? "bg-blue-900 text-white border-r-4 border-blue-400" 
                    : "hover:bg-gray-800 text-gray-300 hover:text-white"
                } ${collapsed ? 'justify-center' : ''}`}
              >
                <Icon 
                  size={20} 
                  className={`${active ? 'text-white' : 'text-gray-400'} ${collapsed ? '' : 'mr-3'}`} 
                />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default function Sidebar({ collapsed }: SidebarProps) {
  const mainModules: SidebarLink[] = [
    { 
      name: "لوحة التحكم", 
      href: "/", 
      icon: Home 
    },
    { 
      name: "نقاط البيع (POS)", 
      href: "/pos", 
      icon: ShoppingCart,
      badge: "جديد"
    },
  ];

  const accountingModule: SidebarLink[] = [
    // { name: "الحسابات العامة", href: "/public-accounts", icon: FileText },
    { name: "العملاء", href: "/clients", icon: Users },
    { name: "الموردين", href: "/suppliers", icon: Truck },
    { name: "الفواتير", href: "/invoices", icon: FileSpreadsheet },
    { name: "المصروفات", href: "/expenses", icon: DollarSign },
    { name: "التقارير المالية", href: "/financial-reports", icon: BarChart3 },
  ];

  const inventoryModule: SidebarLink[] = [
    { name: "المنتجات", href: "/dashboard/inventory/products", icon: Package },
    { name: "الفئات", href: "/dashboard/inventory/categories", icon: Layers },
    { name: "المستودعات", href: "/dashboard/inventory/warehouses", icon: Warehouse },
    { name: "الجرد", href: "/dashboard/inventory/stocktaking", icon: ClipboardCheck },
    { name: "التحويلات", href: "/dashboard/inventory/transfers", icon: RefreshCw },
    { name: "التنبيهات", href: "/dashboard/inventory/alerts", icon: BellRing },
  ];

  const systemModule: SidebarLink[] = [
    { name: "المستخدمون", href: "/dashboard/system/users", icon: Users },
    { name: "الأدوار والصلاحيات", href: "/dashboard/system/roles", icon: Shield },
    { name: "الفروع", href: "/dashboard/system/branches", icon: Store },
    { name: "الاشتراكات", href: "/dashboard/system/subscriptions", icon: CreditCard },
    { name: "سجل العمليات", href: "/dashboard/system/audit-log", icon: Database },
  ];

  const settingsModule: SidebarLink[] = [
    { name: "الإعدادات العامة", href: "/dashboard/settings/general", icon: Settings },
    { name: "الضرائب", href: "/dashboard/settings/taxes", icon: TrendingUp },
    { name: "الدعم الفني", href: "/dashboard/support", icon: HelpCircle },
  ];

  return (
    <aside
      className="!h-screen sidebar  bg-gray-900 overflow-y-auto text-white sticky top-0"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3 gap-2">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="font-bold text-xl">BA</span>
          </div>
          <div>
            <h2 className="text-xl font-bold">Banan App</h2>
            <p className="text-sm text-gray-400">نظام إدارة الأعمال</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        <ModuleSection 
          title="الرئيسية" 
          items={mainModules} 
          collapsed={collapsed}
        />
        <ModuleSection 
          title="المحاسبة" 
          items={accountingModule} 
          collapsed={collapsed}
        />
        <ModuleSection 
          title="المخزون والمستودعات" 
          items={inventoryModule} 
          collapsed={collapsed}
        />
        <ModuleSection 
          title="نظام وإدارة" 
          items={systemModule} 
          collapsed={collapsed}
        />
        <ModuleSection 
          title="الإعدادات والدعم" 
          items={settingsModule} 
          collapsed={collapsed}
        />
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-800">
        <div className="mb-4 p-4 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">الخطة: احترافية</span>
            <span className="text-xs bg-blue-500 px-2 py-1 rounded-full">نشط</span>
          </div>
          <p className="text-xs text-gray-400">تنتهي في 15 ديسمبر 2024</p>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div>
            <p className="font-semibold">نسخة Alpha</p>
            <p className="text-xs text-gray-400">v2.1.0</p>
          </div>
          <button className="text-gray-400 hover:text-white" aria-label="الإعدادات">
            <Settings size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}