// components/navbar/Navbar.tsx
"use client";
import { useState, useEffect } from "react";
import { Menu, Bell, User, Search, LogOut } from "lucide-react";
import Container from "../shared/formcomponents/Container";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 1024);
    update();
    window.addEventListener("resize", update);
    
    return () => window.removeEventListener("resize", update);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    document.body.style.overflow = !sidebarOpen ? 'hidden' : 'auto';
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed right-0 top-0 h-full w-3/4 transform transition-transform duration-300 z-50 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <SidebarMobile onClose={closeSidebar} />
      </div>

      <div className="w-full h-16 bg-white shadow-md flex items-center justify-between">
        <Container className="flex items-center justify-between px-4 lg:px-6 w-full">
          <div className="flex items-center gap-4">
            {/* Mobile menu button - shown only on mobile */}
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              onClick={toggleSidebar}
            >
              <Menu size={24} />
            </button>

            {/* Desktop search - shown only on desktop */}
            {!isMobile && (
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="ابحث عن أي شيء..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
              </div>
            )}
            
            {/* Mobile search button - shown only on mobile */}
            {isMobile && (
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Search size={24} />
              </button>
            )}
          </div>

          {/* ===== اليمين ===== */}
          <div className="flex items-center gap-4 lg:gap-8">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell size={24} />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>

            <div className="flex items-center gap-2 lg:gap-4">
              {/* User info - hidden on mobile */}
              <div className="hidden lg:block text-start">
                <p className="font-semibold">أحمد محمد</p>
                <p className="text-sm text-gray-500">مدير النظام</p>
              </div>

              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User size={20} className="text-blue-600" />
              </div>

              <button className="p-2 rounded-lg hover:bg-gray-100">
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

// Mobile Sidebar Component
function SidebarMobile({ onClose }: { onClose: () => void }) {
  const { usePathname } = require("next/navigation");
  const pathname = usePathname();
  const { 
    Home, Package, ShoppingCart, Warehouse, BarChart3, Settings, Users, 
    CreditCard, FileText, Layers, BellRing, Database, Shield, DollarSign,
    TrendingUp, Store, ClipboardCheck, RefreshCw, FileSpreadsheet, HelpCircle, X 
  } = require("lucide-react");
  const Link = require("../../../navigation").Link;

  const Truck = (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13"/>
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
      <circle cx="5.5" cy="18.5" r="2.5"/>
      <circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  );

  const sections = [
    {
      title: "الرئيسية",
      items: [
        { name: "لوحة التحكم", href: "/", icon: Home },
        { name: "نقاط البيع (POS)", href: "/pos", icon: ShoppingCart, badge: "جديد" }
      ]
    },
    {
      title: "المحاسبة",
      items: [
        { name: "الحسابات العامة", href: "/public-accounts", icon: FileText },
        { name: "العملاء", href: "/clients", icon: Users },
        { name: "الموردين", href: "/suppliers", icon: Truck },
        { name: "الفواتير", href: "/invoices", icon: FileSpreadsheet },
        { name: "المصروفات", href: "/expenses", icon: DollarSign },
        { name: "التقارير المالية", href: "/financial-reports", icon: BarChart3 }
      ]
    },
    {
      title: "المخزون والمستودعات",
      items: [
        { name: "المنتجات", href: "/dashboard/inventory/products", icon: Package },
        { name: "الفئات", href: "/dashboard/inventory/categories", icon: Layers },
        { name: "المستودعات", href: "/dashboard/inventory/warehouses", icon: Warehouse },
        { name: "الجرد", href: "/dashboard/inventory/stocktaking", icon: ClipboardCheck },
        { name: "التحويلات", href: "/dashboard/inventory/transfers", icon: RefreshCw },
        { name: "التنبيهات", href: "/dashboard/inventory/alerts", icon: BellRing }
      ]
    },
    {
      title: "نظام وإدارة",
      items: [
        { name: "المستخدمون", href: "/dashboard/system/users", icon: Users },
        { name: "الأدوار والصلاحيات", href: "/dashboard/system/roles", icon: Shield },
        { name: "الفروع", href: "/dashboard/system/branches", icon: Store },
        { name: "الاشتراكات", href: "/dashboard/system/subscriptions", icon: CreditCard },
        { name: "سجل العمليات", href: "/dashboard/system/audit-log", icon: Database }
      ]
    },
    {
      title: "الإعدادات والدعم",
      items: [
        { name: "الإعدادات العامة", href: "/dashboard/settings/general", icon: Settings },
        { name: "الضرائب", href: "/dashboard/settings/taxes", icon: TrendingUp },
        { name: "الدعم الفني", href: "/dashboard/support", icon: HelpCircle }
      ]
    }
  ];

  return (
    <aside className="h-screen bg-gray-900 overflow-y-auto text-white w-full" dir="rtl">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="font-bold text-xl">BA</span>
            </div>
            <div>
              <h2 className="text-lg font-bold">Banan App</h2>
              <p className="text-sm text-gray-400">نظام إدارة الأعمال</p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-800"
            aria-label="إغلاق القائمة"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.title} className="mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 px-2">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 ${
                        active  
                          ? "bg-blue-900 text-white border-r-4 border-blue-400" 
                          : "hover:bg-gray-800 text-gray-300 hover:text-white"
                      }`}
                    >
                      <Icon className={active ? 'text-white' : 'text-gray-400'} />
                      <span className="flex-1">{item.name}</span>
                      {item.badge && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}