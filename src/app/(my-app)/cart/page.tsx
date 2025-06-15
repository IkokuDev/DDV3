
"use client";

import { AppShell } from '@/components/layout/app-shell';
import { PageHeader } from '@/components/shared/page-header';
import { useCart } from '@/contexts/cart-context';
import { CartLineItem } from '@/components/cart/cart-line-item';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { cartItems, getCartTotal, getCartItemCount, clearCart } = useCart();

  if (getCartItemCount() === 0) {
    return (
      <AppShell>
        <PageHeader title="Your Shopping Cart" description="Your cart is currently empty." />
        <div className="text-center py-10">
          <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
          <p className="text-xl text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/marketplace">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </AppShell>
    );
  }

  const cartTotal = getCartTotal();
  // Shipping cost might be determined later or based on selected options. For now, it's a placeholder.
  const shippingCost = cartTotal > 0 ? 500 : 0; 
  const marketplaceCommissionRate = 0.05; // 5%
  const logisticsServiceFeeRate = 0.08; // 8%

  const marketplaceCommission = cartTotal * marketplaceCommissionRate;
  const logisticsServiceFee = cartTotal * logisticsServiceFeeRate;
  
  const grandTotal = cartTotal + shippingCost + marketplaceCommission + logisticsServiceFee;

  return (
    <AppShell>
      <PageHeader title="Your Shopping Cart" description={`You have ${getCartItemCount()} item(s) in your cart.`} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Cart Items</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {cartItems.map(item => (
                <div key={item.id} className="px-6">
                   <CartLineItem item={item} />
                </div>
              ))}
            </CardContent>
            {cartItems.length > 0 && (
              <CardFooter className="pt-4 border-t">
                 <Button variant="outline" onClick={clearCart} className="text-destructive hover:border-destructive hover:text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" /> Clear Cart
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="shadow-lg sticky top-20"> {/* Sticky summary card */}
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₦{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping (Estimate)</span>
                <span>₦{shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Marketplace Commission (5%)</span>
                <span>₦{marketplaceCommission.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Logistics Service Fee (8%)</span>
                <span>₦{logisticsServiceFee.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Grand Total (Approx.)</span>
                <span>₦{grandTotal.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              {/* Updated Link: Directly to checkout, bypassing delivery-options */}
              <Link href="/checkout" className="w-full">
                <Button className="w-full text-lg py-6" size="lg">
                  Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/marketplace" className="w-full">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
