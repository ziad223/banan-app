// components/MobileMenu.tsx
"use client";
import { X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  const menuItems = [
    { name: "لوحة التحكم", href: "/dashboard" },
    { name: "نقاط البيع (POS)", href: "/dashboard/pos" },
    { name: "المنتجات", href: "/dashboard/inventory/products" },
    { name: "الفواتير", href: "/invoices" },
    { name: "المستخدمون", href: "/dashboard/system/users" },
    { name: "الإعدادات", href: "/dashboard/settings/general" },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className="fixed right-0 top-0 h-full w-3/4 max-w-sm bg-gray-900 text-white z-50 lg:hidden shadow-2xl transform transition-transform duration-300 ease-in-out">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="font-bold text-xl">BA</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">Banan App</h2>
                <p className="text-sm text-gray-400">نظام إدارة الأعمال</p>
              </div>
            </div>
            
            <button 
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
              aria-label="إغلاق القائمة"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-5rem)]">
          <nav>
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block py-3 px-4 rounded-lg transition-colors ${
                        active 
                          ? "bg-blue-900 text-white border-r-4 border-blue-400" 
                          : "hover:bg-gray-800 text-gray-300"
                      }`}
                      onClick={onClose}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-8 pt-6 border-t border-gray-800">
            <div className="p-4 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">الخطة: احترافية</span>
                <span className="text-xs bg-blue-500 px-2 py-1 rounded-full">نشط</span>
              </div>
              <p className="text-xs text-gray-400">تنتهي في 15 ديسمبر 2024</p>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">نسخة Alpha</p>
                <p className="text-xs text-gray-400">v2.1.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}