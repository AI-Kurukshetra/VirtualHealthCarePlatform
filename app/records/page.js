import AppShell from '@/components/layout/app-shell';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import RecordList from '@/components/records/record-list';
import medicalRecordService from '@/services/api/medical-records/service';

export const dynamic = 'force-dynamic';

export default async function RecordsPage() {
  const records = await medicalRecordService.list({ limit: 25, offset: 0 });

  return (
    <AppShell title='Electronic Health Records' subtitle='Medical records, clinical notes, allergies, medications, and care plans.'>
      <Card>
        <CardTitle>Medical Records</CardTitle>
        <CardDescription>Secure, organization-scoped access with row-level security.</CardDescription>
        <div className='mt-4'>
          <RecordList records={records} />
        </div>
      </Card>
    </AppShell>
  );
}
