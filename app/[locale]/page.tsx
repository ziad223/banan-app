import Container from "@/components/shared/formcomponents/Container";
import { getHome } from "@/lib/serverActions";
import {
  TrendingUp,
  ShoppingCart,
  Users,
  Package,
  DollarSign,
  Activity,
  CreditCard,
  Store
} from "lucide-react";
import SalesOverviewChart from "@/components/charts/SalesOverviewChart";
import RevenueChart from "@/components/charts/RevenueChart";
import InventoryStatusChart from "@/components/charts/InventoryStatusChart";
import TopProductsChart from "@/components/charts/TopProductsChart";
import QuickActions from "@/components/charts/QuickActions";
import RecentActivity from "@/components/charts/RecentActivity";
import StoreStatus from "@/components/charts/StoreStatus";

interface LayoutProps {
  params: Promise<{ locale: string }>;
}

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}

function StatsCard({ title, value, change, icon, trend }: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30">
          {icon}
        </div>
        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
          trend === 'up' 
            ? 'text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/30' 
            : 'text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/30'
        }`}>
          {change}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
        {value}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
    </div>
  );
}

export default async function Home({ params }: LayoutProps) {
  const { locale } = await params;

  let homeResponse;
  try {
    homeResponse = await getHome(locale);
  } catch (error) {
    console.log(error);
  }

  const statsData = [
    {
      title: "إجمالي المبيعات اليوم",
      value: "24,580 ر.س",
      change: "+12.5%",
      icon: <ShoppingCart className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      trend: 'up' as const
    },
    {
      title: "العملاء النشطين",
      value: "1,248",
      change: "+8.2%",
      icon: <Users className="w-6 h-6 text-green-600 dark:text-green-400" />,
      trend: 'up' as const
    },
    {
      title: "المخزون المتوفر",
      value: "845 منتج",
      change: "-3.1%",
      icon: <Package className="w-6 h-6 text-orange-600 dark:text-orange-400" />,
      trend: 'down' as const
    },
    {
      title: "الإيرادات الشهرية",
      value: "89,420 ر.س",
      change: "+18.7%",
      icon: <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
      trend: 'up' as const
    }
  ];

  const quickActions = [
    { label: "فاتورة بيع جديدة", icon: "receipt", link: "/pos" },
    { label: "إضافة منتج", icon: "add", link: "/inventory/products/new" },
    { label: "تسجيل مصروف", icon: "money", link: "/accounting/expenses" },
    { label: "جرد مخزون", icon: "inventory", link: "/inventory/stocktake" },
    { label: "كشف حساب عميل", icon: "account", link: "/accounting/customers" },
    { label: "تقارير المبيعات", icon: "analytics", link: "/reports/sales" }
  ];

  return (
    <div>
      {/* رأس الصفحة */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              مرحباً بك في Banan App 
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              نظام شامل لإدارة المحلات والمتاجر والمخازن - كل ما تحتاجه في منصة واحدة
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              متجرك الأساسي
            </span>
          </div>
        </div>
      </div>

      {/* بطاقات الإحصائيات السريعة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* الصف الأول من الرسوم البيانية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* مخطط المبيعات */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                نظرة عامة على المبيعات
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                أداء المبيعات خلال آخر 7 أيام
              </p>
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="h-80">
            <SalesOverviewChart />
          </div>
        </div>

        {/* مخطط الإيرادات */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                توزيع الإيرادات
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                حسب الفروع أو فئات المنتجات
              </p>
            </div>
            <CreditCard className="w-5 h-5 text-blue-500" />
          </div>
          <div className="h-80">
            <RevenueChart />
          </div>
        </div>
      </div>

      {/* الصف الثاني من الرسوم البيانية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* حالة المخزون */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                حالة المخزون
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                المنتجات منخفضة المخزون والتنبيهات
              </p>
            </div>
            <Package className="w-5 h-5 text-orange-500" />
          </div>
          <div className="h-80">
            <InventoryStatusChart />
          </div>
        </div>

        {/* أفضل المنتجات مبيعاً */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                أفضل المنتجات مبيعاً
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                أفضل 10 منتجات حسب المبيعات
              </p>
            </div>
            <Activity className="w-5 h-5 text-purple-500" />
          </div>
          <div className="h-80">
            <TopProductsChart />
          </div>
        </div>
      </div>

      {/* الصف الأخير - الإجراءات السريعة والنشاط */}
     

      {/* حالة المتاجر والفروع */}
      <div className="mt-8">
        <StoreStatus />
      </div>
    </div>
  );
}