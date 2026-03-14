import Link from 'next/link';
import AppShell from '@/components/layout/app-shell';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';

const modules = [
  { href: '/patients', title: 'Patient Management', description: 'Registration, onboarding, profiles, and intake forms.' },
  { href: '/appointments', title: 'Appointment Scheduling', description: 'Calendar slots, booking, reminders, and statuses.' },
  { href: '/consultations', title: 'Video Consultation', description: 'Secure telehealth sessions using WebRTC/Twilio.' },
  { href: '/records', title: 'EHR', description: 'Medical records, clinical notes, and care history.' },
  { href: '/messages', title: 'Messaging', description: 'Secure patient-provider communication and alerts.' },
  { href: '/billing', title: 'Billing & Claims', description: 'Billing events, insurance claims, and payment tracking.' }
];

export default function HomePage() {
  return (
    <AppShell
      title='Virtual Health Platform'
      subtitle='Production-ready, multi-tenant telehealth foundation built with Next.js + Supabase.'
      actions={
        <Link
          href='/dashboard'
          className='inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
        >
          Open Dashboard
        </Link>
      }
    >
      <div className='grid gap-4 md:grid-cols-2'>
        {modules.map((module) => (
          <Link key={module.href} href={module.href}>
            <Card className='h-full transition hover:-translate-y-0.5 hover:shadow-lg'>
              <CardTitle>{module.title}</CardTitle>
              <CardDescription>{module.description}</CardDescription>
            </Card>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
