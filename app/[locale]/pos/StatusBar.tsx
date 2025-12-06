'use client';

import { useState, useEffect } from 'react';
import { Wifi, WifiOff, User, Store, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function StatusBar() {
  const [isOnline, setIsOnline] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });

  const formatDate = (date: Date) =>
    date.toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-gradient-to-r from-gray-900 to-gray-800 text-white p-3 rounded-t-lg shadow-lg gap-3 sm:gap-0">
      
      {/* حالة الاتصال */}
      <div className="flex items-center space-x-2 space-x-reverse">
        <div className={`p-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}>
          {isOnline ? <Wifi className="h-5 w-5" /> : <WifiOff className="h-5 w-5" />}
        </div>
        <div>
          <p className="text-sm font-medium">{isOnline ? 'متصل' : 'غير متصل'}</p>
          <p className="text-xs text-gray-300">{isOnline ? 'جاهز للعمل' : 'وضع عدم الاتصال'}</p>
        </div>
      </div>

      {/* معلومات الفرع والمستخدم */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <div className="flex items-center space-x-2 space-x-reverse">
          <Store className="h-5 w-5 text-blue-300" />
          <div className="text-right">
            <p className="text-sm font-medium">الفرع الرئيسي</p>
            <p className="text-xs text-gray-300">شارع الملك فهد، الرياض</p>
          </div>
        </div>

        <div className="hidden sm:block h-8 w-px bg-gray-600" />

        <div className="flex items-center space-x-2 space-x-reverse">
          <User className="h-5 w-5 text-green-300" />
          <div className="text-right">
            <p className="text-sm font-medium">محمد أحمد</p>
            <p className="text-xs text-gray-300">مدير مبيعات</p>
          </div>
        </div>
      </div>

      {/* التاريخ والوقت */}
      <div className="text-center">
        <p className="text-lg font-bold">{formatTime(currentTime)}</p>
        <p className="text-sm text-gray-300">{formatDate(currentTime)}</p>
      </div>

      {/* الإجراءات السريعة */}
      <div className="flex flex-wrap items-center gap-2 justify-end sm:justify-start">
        <Button variant="ghost" size="icon" className="relative text-white hover:bg-gray-700">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -left-1 bg-red-500">3</Badge>
        </Button>

        <Button variant="ghost" size="icon" className="text-white hover:bg-gray-700">
          <Settings className="h-5 w-5" />
        </Button>

        <Button variant="outline" className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
          إغلاق اليومية
        </Button>
      </div>
    </div>
  );
}
