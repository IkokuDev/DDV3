
"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AppShell } from '@/components/layout/app-shell';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Package, ShoppingCart } from 'lucide-react';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <AppShell>
      <PageHeader
        title="Order Confirmed!"
        description="Thank you for your purchase."
      />
      <div className="flex flex-col items-center justify-center text-center py-10">
        <Card className="w-full max-w-lg shadow-xl">
          <CardHeader className="items-center">
            <CheckCircle className="h-20 w-20 text-green-500 mb-4" />
            <CardTitle className="font-headline text-3xl">Thank You!</CardTitle>
            <CardDescription className="text-lg">
              Your order has been placed successfully.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {orderId ? (
              <p className="text-xl">
                Your Order ID is: <strong className="text-primary">{orderId.substring(0,12)}...</strong>
              </p>
            ) : (
              <p className="text-xl text-destructive">Could not retrieve order ID.</p>
            )}
            <p className="text-muted-foreground">
              You will receive an email confirmation shortly with your order details.
              You can also track your order status in the "My Orders" section.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link href="/my-orders" passHref>
              <Button size="lg" variant="outline">
                <Package className="mr-2 h-5 w-5" /> View My Orders
              </Button>
            </Link>
            <Link href="/marketplace" passHref>
              <Button size="lg">
                <ShoppingCart className="mr-2 h-5 w-5" /> Continue Shopping
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </AppShell>
  );
}


export default function OrderConfirmationPage() {
  // Suspense is required by Next.js when using useSearchParams in a page component
  return (
    <Suspense fallback={<OrderConfirmationLoading />}>
      <OrderConfirmationContent />
    </Suspense>
  );
}

// Optional: A simple loading component for Suspense
function OrderConfirmationLoading() {
  return (
    <AppShell>
      <PageHeader title="Loading Confirmation..." />
      <div className="flex justify-center items-center h-64">
        <p>Loading your order details...</p>
      </div>
    </AppShell>
  );
}
