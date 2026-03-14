'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const schema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  date_of_birth: z.string().min(1),
  gender: z.string().min(1),
  phone: z.string().min(8),
  address: z.string().min(5),
  insurance_id: z.string().min(1)
});

export default function PatientIntakeForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors }
  } = useForm({
    resolver: zodResolver(schema)
  });

  async function onSubmit(values) {
    const response = await fetch('/api/patients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      return;
    }

    reset();
    router.refresh();
  }

  return (
    <form className='grid gap-4 md:grid-cols-2' onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className='mb-1 block text-xs font-medium uppercase text-slate-500'>First name</label>
        <Input {...register('first_name')} />
        {errors.first_name ? <p className='mt-1 text-xs text-danger'>{errors.first_name.message}</p> : null}
      </div>
      <div>
        <label className='mb-1 block text-xs font-medium uppercase text-slate-500'>Last name</label>
        <Input {...register('last_name')} />
      </div>
      <div>
        <label className='mb-1 block text-xs font-medium uppercase text-slate-500'>Date of birth</label>
        <Input type='date' {...register('date_of_birth')} />
      </div>
      <div>
        <label className='mb-1 block text-xs font-medium uppercase text-slate-500'>Gender</label>
        <Input {...register('gender')} />
      </div>
      <div>
        <label className='mb-1 block text-xs font-medium uppercase text-slate-500'>Phone</label>
        <Input {...register('phone')} />
      </div>
      <div>
        <label className='mb-1 block text-xs font-medium uppercase text-slate-500'>Insurance ID</label>
        <Input {...register('insurance_id')} />
      </div>
      <div className='md:col-span-2'>
        <label className='mb-1 block text-xs font-medium uppercase text-slate-500'>Address</label>
        <Input {...register('address')} />
      </div>
      <div className='md:col-span-2'>
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Add patient'}
        </Button>
      </div>
    </form>
  );
}
