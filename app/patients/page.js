import AppShell from '@/components/layout/app-shell';
import { Card, CardTitle } from '@/components/ui/card';
import PatientIntakeForm from '@/components/forms/patient-intake-form';
import PatientList from '@/components/patients/patient-list';
import patientService from '@/services/api/patients/service';

export const dynamic = 'force-dynamic';

export default async function PatientsPage() {
  const patients = await patientService.list({ limit: 25, offset: 0 });

  return (
    <AppShell title='Patients' subtitle='Registration, onboarding, demographics, and insurance details.'>
      <div className='grid gap-5 lg:grid-cols-2'>
        <Card>
          <CardTitle>New Patient Intake</CardTitle>
          <div className='mt-4'>
            <PatientIntakeForm />
          </div>
        </Card>
        <Card>
          <CardTitle>Recent Patients</CardTitle>
          <div className='mt-4'>
            <PatientList patients={patients} />
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
