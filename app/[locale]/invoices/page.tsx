// app/invoices/page.tsx
import InvoicesContent from './InvoicesContent';
import { invoicesData } from './invoices-data';

export default function InvoicesPage() {
  // حساب الإحصائيات على السيرفر
  const stats = {
    total: invoicesData.length,
    totalAmount: invoicesData.reduce((sum, i) => sum + i.total, 0),
    paid: invoicesData.filter(i => i.status === 'paid').length,
    pending: invoicesData.filter(i => i.status === 'pending').length,
    overdue: invoicesData.filter(i => i.status === 'overdue').length,
    thisMonth: invoicesData.filter(i => 
      new Date(i.date).getMonth() === new Date().getMonth() &&
      new Date(i.date).getFullYear() === new Date().getFullYear()
    ).length
  };

  return <InvoicesContent initialInvoices={invoicesData} initialStats={stats} />;
}