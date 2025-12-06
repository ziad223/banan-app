// app/reports/page.tsx
import SimpleReports from './SimpleReports';
import { reportsData, periods } from './reports-data';

export default function ReportsPage() {
  return <SimpleReports data={reportsData} periods={periods} />;
}