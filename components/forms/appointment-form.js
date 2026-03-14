'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const schema = z.object({
  patient_name: z.string().min(1),
  appointment_date: z.string().min(1),
  status: z.enum(['scheduled', 'completed', 'cancelled', 'no_show']),
  notes: z.string().optional()
});

export default function AppointmentForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      status: 'scheduled'
    }
  });

  async function onSubmit(values) {
    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      return;
    }

    reset({ status: 'scheduled' });
    router.refresh();
  }

  return (
    <form className='grid gap-4 md:grid-cols-2' onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className='mb-1 block text-xs font-medium uppercase text-slate-500'>Patient name</label>
        <Input {...register('patient_name')} placeholder='Enter patient name' />
      </div>
      <div>
        <label className='mb-1 block text-xs font-medium uppercase text-slate-500'>Appointment Date</label>
        <Input type='datetime-local' {...register('appointment_date')} />
      </div>
      <div>
        <label className='mb-1 block text-xs font-medium uppercase text-slate-500'>Status</label>
        <select
          {...register('status')}
          className='w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary'
        >
          <option value='scheduled'>Scheduled</option>
          <option value='completed'>Completed</option>
          <option value='cancelled'>Cancelled</option>
          <option value='no_show'>No Show</option>
        </select>
      </div>
      <div className='md:col-span-2'>
        <label className='mb-1 block text-xs font-medium uppercase text-slate-500'>Notes</label>
        <Input {...register('notes')} placeholder='Visit notes' />
      </div>
      <div className='md:col-span-2'>
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Book appointment'}
        </Button>
      </div>
    </form>
  );
}
