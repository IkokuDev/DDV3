
import { AuthForm } from '@/components/auth/auth-form';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="text-center mb-8">
        {/* Logo removed */}
        <h1 className="font-headline text-4xl font-bold text-primary mt-8">Walking The Sahel</h1>
      </div>
      <AuthForm />
    </div>
  );
}
