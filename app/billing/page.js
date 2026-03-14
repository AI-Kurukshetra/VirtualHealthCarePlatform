import AppShell from '@/components/layout/app-shell';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import billingService from '@/services/api/billing/service';
import claimsService from '@/services/api/claims/service';

export const dynamic = 'force-dynamic';

export default async function BillingPage() {
  const [billingRecords, claims] = await Promise.all([
    billingService.list({ limit: 10, offset: 0 }),
    claimsService.list({ limit: 10, offset: 0 })
  ]);

  return (
    <AppShell title='Billing & Claims' subtitle='Track invoices, statuses, and claim processing.'>
      <div className='grid gap-4 md:grid-cols-2'>
        <Card>
          <CardTitle>Billing</CardTitle>
          <CardDescription>{billingRecords.length} billing records.</CardDescription>
          <div className='mt-3 space-y-2'>
            {billingRecords.length ? (
              billingRecords.map((record) => (
                <p key={record.id} className='text-sm text-slate-700'>
                  ${Number(record.amount || 0).toFixed(2)} | {record.status}
                </p>
              ))
            ) : (
              <p className='text-sm text-slate-500'>No billing records found.</p>
            )}
          </div>
        </Card>
        <Card>
          <CardTitle>Claims</CardTitle>
          <CardDescription>{claims.length} claims records.</CardDescription>
          <div className='mt-3 space-y-2'>
            {claims.length ? (
              claims.map((claim) => (
                <p key={claim.id} className='text-sm text-slate-700'>
                  {claim.insurance_provider} | {claim.claim_status}
                </p>
              ))
            ) : (
              <p className='text-sm text-slate-500'>No claims found.</p>
            )}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
