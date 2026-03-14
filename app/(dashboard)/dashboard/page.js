import AppShell from '@/components/layout/app-shell';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import analyticsService from '@/services/api/analytics/service';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const kpis = await analyticsService.getKpis();
  const stats = [
    { label: 'Active Patients', value: kpis.patients, detail: 'Total patient records' },
    { label: 'Registered Providers', value: kpis.providers, detail: 'Total provider records' },
    { label: 'Appointments', value: kpis.appointments, detail: 'Total appointment records' },
    { label: 'Claims', value: kpis.claims, detail: 'Total claim records' }
  ];

  return (
    <AppShell title='Provider Dashboard' subtitle='Operational overview for digital care delivery.'>
      <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardDescription>{stat.label}</CardDescription>
            <p className='mt-2 text-3xl font-bold text-slate-900'>{stat.value}</p>
            <p className='mt-1 text-xs text-slate-500'>{stat.detail}</p>
          </Card>
        ))}
      </div>
      <Card className='mt-5'>
        <CardTitle>MVP Focus</CardTitle>
        <CardDescription>
          Initial specialty validation should target one care domain such as mental health or primary care.
        </CardDescription>
      </Card>
    </AppShell>
  );
}
