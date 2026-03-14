import AppShell from '@/components/layout/app-shell';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import providerService from '@/services/api/providers/service';

export const dynamic = 'force-dynamic';

export default async function ProvidersPage() {
  const providers = await providerService.list({ limit: 25, offset: 0 });

  return (
    <AppShell title='Providers' subtitle='Manage provider profiles, specialties, and credentialing data.'>
      <div className='space-y-3'>
        <Card>
          <CardTitle>Total Providers</CardTitle>
          <CardDescription>{providers.length} provider records found.</CardDescription>
        </Card>
        {providers.length ? (
          providers.map((provider) => (
            <Card key={provider.id}>
              <CardTitle className='text-base'>{provider.specialization}</CardTitle>
              <CardDescription>
                License: {provider.license_number} | Experience: {provider.years_of_experience} years
              </CardDescription>
            </Card>
          ))
        ) : (
          <Card>
            <CardDescription>No providers found yet.</CardDescription>
          </Card>
        )}
      </div>
    </AppShell>
  );
}
