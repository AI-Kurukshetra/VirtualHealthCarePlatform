import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

function formatAppointmentDate(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'UTC'
  }).format(date);
}

export default function AppointmentsList({ appointments = [] }) {
  if (!appointments.length) {
    return <Card>No appointments scheduled.</Card>;
  }

  return (
    <div className='space-y-3'>
      {appointments.map((appointment) => (
        <Card key={appointment.id} className='flex flex-wrap items-center justify-between gap-3'>
          <div>
            <p className='font-semibold'>{appointment.patient_name || 'Unknown Patient'}</p>
            <p className='text-sm text-slate-500'>{formatAppointmentDate(appointment.appointment_date)}</p>
            {appointment.notes ? <p className='text-sm text-slate-500'>{appointment.notes}</p> : null}
          </div>
          <Badge label={appointment.status} status={appointment.status} />
        </Card>
      ))}
    </div>
  );
}
