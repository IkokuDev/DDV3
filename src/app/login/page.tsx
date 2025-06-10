
import { AuthForm } from '@/components/auth/auth-form';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="text-center mb-8">
        <h1 className="font-headline text-4xl font-bold text-primary">Walking The Sahel</h1>
      </div>
      <AuthForm />
    </div>
  );
}
