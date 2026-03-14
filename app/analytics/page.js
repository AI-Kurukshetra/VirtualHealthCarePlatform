import AppShell from '@/components/layout/app-shell';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import analyticsService from '@/services/api/analytics/service';

export const dynamic = 'force-dynamic';

export default async function AnalyticsPage() {
  const kpis = await analyticsService.getKpis();
  const series = [
    { label: 'Patients', value: kpis.patients, color: 'bg-sky-500' },
    { label: 'Providers', value: kpis.providers, color: 'bg-emerald-500' },
    { label: 'Appointments', value: kpis.appointments, color: 'bg-indigo-500' },
    { label: 'Claims', value: kpis.claims, color: 'bg-amber-500' }
  ];
  const total = series.reduce((sum, item) => sum + item.value, 0);

  return (
    <AppShell title='Reporting & Analytics' subtitle='Usage, productivity, and clinical operational metrics.'>
      <div className='grid gap-5 xl:grid-cols-3'>
        <Card className='xl:col-span-2'>
          <CardTitle>Volume Overview</CardTitle>
          <CardDescription>Live counts visualized as relative bars.</CardDescription>
          <div className='mt-5 space-y-4'>
            {series.map((item) => {
              const share = total === 0 ? 0 : Math.round((item.value / total) * 100);
              const width = Math.max(share, item.value > 0 ? 6 : 0);
              return (
                <div key={item.label}>
                  <div className='mb-1 flex items-center justify-between text-sm'>
                    <span className='font-medium text-slate-700'>{item.label}</span>
                    <span className='font-semibold text-slate-900'>
                      {item.value} ({share}%)
                    </span>
                  </div>
                  <div className='h-2 rounded-full bg-slate-100'>
                    <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${width}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <CardTitle>Distribution</CardTitle>
          <CardDescription>Share by category from current data.</CardDescription>
          <div className='mt-4 space-y-3'>
            {series.map((item) => {
              const share = total === 0 ? 0 : Math.round((item.value / total) * 100);
              return (
                <div key={item.label} className='flex items-center justify-between text-sm'>
                  <div className='flex items-center gap-2'>
                    <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                    <span className='text-slate-700'>{item.label}</span>
                  </div>
                  <span className='font-semibold text-slate-900'>{share}%</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
