import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import LoginForm from '@/components/forms/login-form';

export const metadata = {
  title: 'Login | Virtual Healthcare Platform'
};

export default function LoginPage() {
  return (
    <main className='mx-auto flex min-h-[calc(100vh-73px)] max-w-md items-center p-5'>
      <Card className='w-full'>
        <CardTitle>Secure Login</CardTitle>
        <CardDescription>Access your patient, provider, or admin workspace.</CardDescription>
        <div className='mt-4'>
          <LoginForm />
        </div>
      </Card>
    </main>
  );
}
