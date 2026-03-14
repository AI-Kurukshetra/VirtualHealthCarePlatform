'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must have at least 8 characters')
});

export default function LoginForm() {
  const router = useRouter();
  const [serverMessage, setServerMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  async function onSubmit(values) {
    setServerMessage('');
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });
    const payload = await response.json();
    if (payload.success) {
      setServerMessage('Login successful. Redirecting...');
      router.push('/dashboard');
      router.refresh();
      return;
    }

    setServerMessage(payload.error?.message || 'Login failed.');
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
        <Input type='password' placeholder='••••••••' {...register('password')} />
        {errors.password ? <p className='mt-1 text-xs text-danger'>{errors.password.message}</p> : null}
      </div>
      <Button type='submit' className='w-full' disabled={isSubmitting}>
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </Button>
      {serverMessage ? <p className='text-sm text-slate-600'>{serverMessage}</p> : null}
    </form>
  );
}
