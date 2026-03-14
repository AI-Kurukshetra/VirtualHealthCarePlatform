import AppShell from '@/components/layout/app-shell';
import { Card, CardTitle } from '@/components/ui/card';
import AppointmentForm from '@/components/forms/appointment-form';
import AppointmentsList from '@/components/appointments/appointments-list';
import appointmentService from '@/services/api/appointments/service';

export const dynamic = 'force-dynamic';

export default async function AppointmentsPage() {
  const appointments = await appointmentService.list({ limit: 25, offset: 0 });

  return (
    <AppShell title='Appointments' subtitle='Book appointments, track status, and coordinate provider schedules.'>
      <div className='grid gap-5 xl:grid-cols-2'>
        <Card>
          <CardTitle>Book Appointment</CardTitle>
          <div className='mt-4'>
            <AppointmentForm />
          </div>
        </Card>
        <Card>
          <CardTitle>Upcoming Appointments</CardTitle>
          <div className='mt-4'>
            <AppointmentsList appointments={appointments} />
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
