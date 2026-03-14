'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['patient', 'provider', 'admin'])
});

export default function SignupForm() {
  const [serverMessage, setServerMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      role: 'patient'
    }
  });

  async function onSubmit(values) {
    setServerMessage('');
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });

    const payload = await response.json();
    setServerMessage(payload.success ? 'Account created. Verify your email.' : payload.error?.message || 'Signup failed.');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div>
        <label className='mb-1 block text-sm font-medium text-slate-700'>Email</label>
        <Input type='email' placeholder='name@clinic.com' {...register('email')} />
        {errors.email ? <p className='mt-1 text-xs text-danger'>{errors.email.message}</p> : null}
      </div>
      <div>
        <label className='mb-1 block text-sm font-medium text-slate-700'>Password</label>
        <Input type='password' placeholder='Use 8+ characters' {...register('password')} />
        {errors.password ? <p className='mt-1 text-xs text-danger'>{errors.password.message}</p> : null}
      </div>
      <div>
        <label className='mb-1 block text-sm font-medium text-slate-700'>Role</label>
        <select
          {...register('role')}
          className='w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary'
        >
          <option value='patient'>Patient</option>
          <option value='provider'>Provider</option>
          <option value='admin'>Admin</option>
        </select>
      </div>
      <Button type='submit' className='w-full' disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create account'}
      </Button>
      {serverMessage ? <p className='text-sm text-slate-600'>{serverMessage}</p> : null}
    </form>
  );
}
