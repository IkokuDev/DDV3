
"use client";

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/cart-context';
import Link from 'next/link';
import { CreditCard, ShoppingBag, Truck, ArrowLeft, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - in a real app, this would come from delivery options page state or context
  const mockSelectedDelivery = {
    name: 'Standard Delivery',
    cost: 1500,
    eta: '3-5 business days',
  };

  const cartSubtotal = getCartTotal();
  const deliveryCost = mockSelectedDelivery.cost;
  const marketplaceCommissionRate = 0.05; // 5%
  const logisticsServiceFeeRate = 0.08; // 8%

  const marketplaceCommission = cartSubtotal * marketplaceCommissionRate;
  const logisticsServiceFee = cartSubtotal * logisticsServiceFeeRate;

  const grandTotal = cartSubtotal + deliveryCost + marketplaceCommission + logisticsServiceFee;

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    // Simulate API call for order placement
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app:
    // 1. Create order in backend (e.g., Payload CMS)
    // 2. Process payment
    // 3. Handle success/failure
    
    clearCart(); // Clear cart after successful mock order
    setIsLoading(false);
    // For now, let's assume order ID is mock
    router.push(`/order-confirmation?orderId=MOCK_ORDER_12345`); 
  };

  if (cartItems.length === 0 && !isLoading) {
    return (
      <AppShell>
        <PageHeader title="Checkout" description="Your cart is empty." />
        <div className="text-center py-10">
          <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
          <p className="text-xl text-muted-foreground mb-6">Please add items to your cart before proceeding to checkout.</p>
          <Link href="/marketplace">
            <Button size="lg">Browse Marketplace</Button>
          </Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageHeader title="Checkout" description="Review your order and complete your purchase." />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Information Card - Placeholder */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center">
                <Truck className="mr-2 h-6 w-6 text-primary" /> Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* This would typically be a form or display of selected address */}
              <p className="text-muted-foreground">Address: 123 Sahel Street, Bamako, Mali</p>
              <p className="text-muted-foreground">Contact: +223 12 34 56 78</p>
              <Button variant="outline" size="sm" className="mt-2">Change Address</Button>
            </CardContent>
          </Card>

          {/* Payment Method Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center">
                <CreditCard className="mr-2 h-6 w-6 text-primary" /> Payment Method
              </CardTitle>
              <CardDescription>Enter your payment details below. All transactions are secure.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="•••• •••• •••• ••••" className="mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input id="expiryDate" placeholder="MM/YY" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="•••" className="mt-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="cardName">Name on Card</Label>
                <Input id="cardName" placeholder="Full Name" className="mt-1" />
              </div>
            </CardContent>
             <CardFooter>
                <p className="text-xs text-muted-foreground flex items-center">
                    <Lock className="mr-1 h-3 w-3 text-green-600" /> Your payment information is encrypted and secure.
                </p>
             </CardFooter>
          </Card>
        </div>

        {/* Order Summary Card */}
        <div className="lg:col-span-1">
          <Card className="shadow-lg sticky top-20">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm border-b pb-2 last:border-b-0 last:pb-0">
                  <div>
                    <p className="font-medium">{item.name} (x{item.quantity})</p>
                    <p className="text-xs text-muted-foreground">Unit Price: ₦{item.price.toFixed(2)}</p>
                  </div>
                  <p className="font-semibold">₦{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <Separator className="my-3"/>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₦{cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping ({mockSelectedDelivery.name})</span>
                <span>₦{deliveryCost.toFixed(2)}</span>
              </div>
               <div className="flex justify-between">
                <span className="text-muted-foreground">Marketplace Commission (5%)</span>
                <span>₦{marketplaceCommission.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Logistics Service Fee (8%)</span>
                <span>₦{logisticsServiceFee.toFixed(2)}</span>
              </div>
              <Separator className="my-3"/>
              <div className="flex justify-between font-bold text-lg">
                <span>Grand Total</span>
                <span>₦{grandTotal.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 pt-4">
              <Button 
                className="w-full text-lg py-6" 
                size="lg" 
                onClick={handlePlaceOrder}
                disabled={isLoading || cartItems.length === 0}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-5 w-5" /> Place Order (₦{grandTotal.toFixed(2)})
                  </>
                )}
              </Button>
              <Link href="/delivery-options" className="w-full">
                <Button variant="outline" className="w-full" disabled={isLoading}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Delivery Options
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
