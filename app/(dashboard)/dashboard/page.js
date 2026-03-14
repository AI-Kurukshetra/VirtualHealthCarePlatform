import AppShell from '@/components/layout/app-shell';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import analyticsService from '@/services/api/analytics/service';

export const dynamic = 'force-dynamic';
const DASHBOARD_DIAGRAM_LIMIT = 25;

export default async function DashboardPage() {
  const kpis = await analyticsService.getKpis(undefined, DASHBOARD_DIAGRAM_LIMIT);
  const stats = [
    { label: 'Active Patients', value: kpis.patients, detail: `Latest ${DASHBOARD_DIAGRAM_LIMIT} patient records`, color: 'bg-sky-500' },
    { label: 'Registered Providers', value: kpis.providers, detail: `Latest ${DASHBOARD_DIAGRAM_LIMIT} provider records`, color: 'bg-emerald-500' },
    { label: 'Appointments', value: kpis.appointments, detail: `Latest ${DASHBOARD_DIAGRAM_LIMIT} appointment records`, color: 'bg-indigo-500' },
    { label: 'Claims', value: kpis.claims, detail: `Latest ${DASHBOARD_DIAGRAM_LIMIT} claim records`, color: 'bg-amber-500' }
  ];
  const maxValue = Math.max(...stats.map((item) => item.value), 1);

  return (
    <AppShell title='Provider Dashboard' subtitle='Operational overview for digital care delivery.'>
      <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        {stats.map((stat) => {
          const width = Math.max(Math.round((stat.value / maxValue) * 100), stat.value > 0 ? 8 : 0);
          return (
            <Card key={stat.label}>
              <CardDescription>{stat.label}</CardDescription>
              <div className='mt-3 h-2 rounded-full bg-slate-100'>
                <div className={`h-2 rounded-full ${stat.color}`} style={{ width: `${width}%` }} />
              </div>
              <p className='mt-3 text-2xl font-bold text-slate-900'>{stat.value}</p>
              <p className='mt-1 text-xs text-slate-500'>{stat.detail}</p>
            </Card>
          );
        })}
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
