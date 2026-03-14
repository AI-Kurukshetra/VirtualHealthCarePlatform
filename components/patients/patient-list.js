import { Card } from '@/components/ui/card';

export default function PatientList({ patients = [] }) {
  if (!patients.length) {
    return <Card>No patients found yet.</Card>;
  }

  return (
    <div className='grid gap-3'>
      {patients.map((patient) => (
        <Card key={patient.id}>
          <p className='font-semibold'>{patient.first_name} {patient.last_name}</p>
          <p className='text-sm text-slate-500'>DOB: {patient.date_of_birth}</p>
          <p className='text-sm text-slate-500'>Insurance: {patient.insurance_id}</p>
        </Card>
      ))}
    </div>
  );
}
