// app/reports/data/reports-data.ts
export const reportsData = {
  // بيانات أساسية
  overview: {
    totalSales: 1850000,
    totalExpenses: 1470000,
    netProfit: 380000,
    profitMargin: 20.5,
    growth: 4.3
  },
  
  // بيانات شهرية
  monthly: {
    sales: 240000,
    expenses: 210000,
    profit: 30000
  },
  
  // أفضل 5 عملاء
  topCustomers: [
    { name: 'شركة النور', amount: 185000 },
    { name: 'مكتبة المعرفة', amount: 148000 },
    { name: 'مطعم الشرق', amount: 111000 },
    { name: 'صالون الجمال', amount: 92500 },
    { name: 'شركة الأمل', amount: 74000 }
  ],
  
  // أفضل 5 منتجات
  topProducts: [
    { name: 'منتج أ', amount: 370000 },
    { name: 'منتج ب', amount: 296000 },
    { name: 'منتج ج', amount: 222000 },
    { name: 'منتج د', amount: 185000 },
    { name: 'منتج هـ', amount: 148000 }
  ]
};

export const periods = [
  { id: 'today', name: 'اليوم' },
  { id: 'week', name: 'أسبوع' },
  { id: 'month', name: 'شهر' },
  { id: 'year', name: 'سنة' }
];
