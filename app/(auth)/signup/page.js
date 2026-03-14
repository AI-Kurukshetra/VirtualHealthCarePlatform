import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import SignupForm from '@/components/forms/signup-form';

export const metadata = {
  title: 'Signup | Virtual Healthcare Platform'
};

export default function SignupPage() {
  return (
    <main className='mx-auto flex min-h-[calc(100vh-73px)] max-w-md items-center p-5'>
      <Card className='w-full'>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Register as patient, provider, or organization admin.</CardDescription>
        <div className='mt-4'>
          <SignupForm />
        </div>
      </Card>
    </main>
  );
}
