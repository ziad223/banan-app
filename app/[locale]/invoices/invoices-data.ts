// app/invoices/data/invoices-data.ts
export const invoicesData = [
  {
    id: 'INV-2024-001',
    customerName: 'أحمد محمد',
    customerPhone: '0551234567',
    date: '2024-01-15',
    dueDate: '2024-02-15',
    type: 'sale',
    status: 'paid',
    items: [
      { name: 'منتج أ', quantity: 2, price: 100, total: 200 },
      { name: 'منتج ب', quantity: 1, price: 150, total: 150 }
    ],
    subtotal: 350,
    tax: 52.5,
    discount: 0,
    total: 402.5,
    paidAmount: 402.5,
    remainingAmount: 0,
    paymentMethod: 'cash',
    notes: 'تم التسليم في نفس اليوم'
  },
  {
    id: 'INV-2024-002',
    customerName: 'مكتبة النور',
    customerPhone: '0567890123',
    date: '2024-01-18',
    dueDate: '2024-02-18',
    type: 'sale',
    status: 'pending',
    items: [
      { name: 'قرطاسية أ', quantity: 10, price: 25, total: 250 },
      { name: 'كتب ب', quantity: 5, price: 80, total: 400 }
    ],
    subtotal: 650,
    tax: 97.5,
    discount: 50,
    total: 697.5,
    paidAmount: 0,
    remainingAmount: 697.5,
    paymentMethod: 'bank_transfer',
    notes: 'ينتظر التحويل البنكي'
  },
  {
    id: 'INV-2024-003',
    customerName: 'شركة الأمل للمواد الغذائية',
    customerPhone: '0112345678',
    date: '2024-01-10',
    dueDate: '2024-02-10',
    type: 'purchase',
    status: 'paid',
    items: [
      { name: 'مواد غذائية أ', quantity: 50, price: 30, total: 1500 },
      { name: 'مواد غذائية ب', quantity: 20, price: 45, total: 900 }
    ],
    subtotal: 2400,
    tax: 360,
    discount: 100,
    total: 2660,
    paidAmount: 2660,
    remainingAmount: 0,
    paymentMethod: 'cheque',
    notes: 'شيك رقم 1234'
  },
  {
    id: 'INV-2024-004',
    customerName: 'مطعم الشرق الأوسط',
    customerPhone: '0534567890',
    date: '2024-01-20',
    dueDate: '2024-01-30',
    type: 'sale',
    status: 'overdue',
    items: [
      { name: 'مستلزمات مطعم أ', quantity: 15, price: 120, total: 1800 },
      { name: 'مستلزمات مطعم ب', quantity: 8, price: 200, total: 1600 }
    ],
    subtotal: 3400,
    tax: 510,
    discount: 200,
    total: 3710,
    paidAmount: 1000,
    remainingAmount: 2710,
    paymentMethod: 'cash',
    notes: 'متأخر في السداد'
  },
  {
    id: 'INV-2024-005',
    customerName: 'صالون الجمال',
    customerPhone: '0587654321',
    date: '2024-01-22',
    dueDate: '2024-02-22',
    type: 'sale',
    status: 'pending',
    items: [
      { name: 'مستحضرات تجميل أ', quantity: 5, price: 180, total: 900 },
      { name: 'مستحضرات تجميل ب', quantity: 3, price: 250, total: 750 }
    ],
    subtotal: 1650,
    tax: 247.5,
    discount: 0,
    total: 1897.5,
    paidAmount: 0,
    remainingAmount: 1897.5,
    paymentMethod: 'cash',
    notes: 'سيدفع نقداً عند الاستلام'
  }
];