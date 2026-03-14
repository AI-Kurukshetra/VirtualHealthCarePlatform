import AppShell from '@/components/layout/app-shell';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import analyticsService from '@/services/api/analytics/service';

export const dynamic = 'force-dynamic';

export default async function AnalyticsPage() {
  const kpis = await analyticsService.getKpis();

  return (
    <AppShell title='Reporting & Analytics' subtitle='Usage, productivity, and clinical operational metrics.'>
      <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        <Card>
          <CardTitle>Patients</CardTitle>
          <CardDescription className='text-2xl font-bold text-slate-900'>{kpis.patients}</CardDescription>
        </Card>
        <Card>
          <CardTitle>Providers</CardTitle>
          <CardDescription className='text-2xl font-bold text-slate-900'>{kpis.providers}</CardDescription>
        </Card>
        <Card>
          <CardTitle>Appointments</CardTitle>
          <CardDescription className='text-2xl font-bold text-slate-900'>{kpis.appointments}</CardDescription>
        </Card>
        <Card>
          <CardTitle>Claims</CardTitle>
          <CardDescription className='text-2xl font-bold text-slate-900'>{kpis.claims}</CardDescription>
        </Card>
      </div>
    </AppShell>
  );
}
