
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Loader2, LogIn } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [user, loading, router]);

  if (loading || user) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted to-background p-8 text-center">
      <Image 
        src="/logo.png" 
        alt="Walking The Sahel Logo" 
        width={195} 
        height={195} 
        className="mb-6" 
      />
      <h1 className="font-headline text-6xl md:text-7xl font-bold text-primary mb-4">
        Walking The Sahel
      </h1>
      <p className="font-body text-xl md:text-2xl text-foreground/80 max-w-2xl mb-10">
        Your comprehensive platform for marketplace, logistics, and delivery management in the Sahel region.
      </p>
      <div className="space-y-4 md:space-y-0 md:space-x-6">
        <Link href="/login" passHref>
          <Button size="lg" className="text-lg px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <LogIn className="mr-2 h-5 w-5" />
            Get Started - Sign In
          </Button>
        </Link>
         <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            Learn More
          </Button>
      </div>
      <footer className="absolute bottom-8 text-muted-foreground text-sm">
        © {new Date().getFullYear()} Walking The Sahel. All rights reserved.
      </footer>
    </div>
  );
}
