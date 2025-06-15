
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
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';
import { CreditCard, ShoppingBag, Truck, ArrowLeft, Lock, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // For this simplified version, delivery cost is estimated directly.
  // In a full app, this would come from the selected delivery option.
  const cartSubtotal = getCartTotal();
  const estimatedDeliveryCost = cartSubtotal > 0 ? 1500 : 0; // Placeholder fixed delivery cost
  const marketplaceCommissionRate = 0.05; // 5%
  const logisticsServiceFeeRate = 0.08; // 8%

  const marketplaceCommission = cartSubtotal * marketplaceCommissionRate;
  const logisticsServiceFee = cartSubtotal * logisticsServiceFeeRate;

  const grandTotal = cartSubtotal + estimatedDeliveryCost + marketplaceCommission + logisticsServiceFee;

  const handlePlaceOrder = async () => {
    if (!user || cartItems.length === 0) {
      toast({
        title: "Cannot Place Order",
        description: "You must be logged in and have items in your cart.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);

    // Simplified: Assume all items are from the first item's vendor.
    // A real app would group by vendorId and create multiple orders if necessary.
    const firstVendorId = cartItems[0]?.vendorId;
    if (!firstVendorId) {
      toast({
        title: "Order Creation Failed",
        description: "Vendor information is missing for cart items.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const orderPayload = {
      user: user.id, // Buyer's user ID
      seller: firstVendorId, // Vendor's ID
      products: cartItems.map(item => ({
        product: item.id,
        quantity: item.quantity,
        priceAtPurchase: item.price,
      })),
      subtotal: cartSubtotal,
      shippingCost: estimatedDeliveryCost,
      marketplaceCommission: marketplaceCommission,
      logisticsServiceFee: logisticsServiceFee,
      total: grandTotal,
      status: "PENDING",
      paymentStatus: "PENDING",
      shippingAddress: { // Mocked shipping address
        street: "123 Sahel Street",
        city: "Bamako",
        state: "Bamako Capital District",
        zip: "00000",
        country: "Mali",
      },
      paymentProvider: "COD", // Default to Cash On Delivery for now
      // deliveryInstructions: "", // Optional
    };

    try {
      const response = await fetch('/api/payload/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to create order. Status: ${response.status}`);
      }

      const newOrder = await response.json();
      
      toast({
        title: "Order Placed Successfully!",
        description: `Your order #${newOrder.doc.id.substring(0,8)} has been placed.`,
      });
      clearCart();
      router.push(`/order-confirmation?orderId=${newOrder.doc.id}`);

    } catch (error: any) {
      console.error("Order placement error:", error);
      toast({
        title: "Order Placement Failed",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center">
                <Truck className="mr-2 h-6 w-6 text-primary" /> Shipping Information (Mocked)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Address: 123 Sahel Street, Bamako, Mali</p>
              <p className="text-muted-foreground">Contact: +223 12 34 56 78</p>
              <Button variant="outline" size="sm" className="mt-2" disabled>Change Address (Disabled)</Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center">
                <CreditCard className="mr-2 h-6 w-6 text-primary" /> Payment Method (Mocked)
              </CardTitle>
              <CardDescription>Payment will be Cash on Delivery (COD). Full payment options coming soon.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg font-semibold text-primary">Selected: Cash on Delivery</p>
              <p className="text-sm text-muted-foreground">
                Please prepare ₦{grandTotal.toFixed(2)} for payment upon delivery.
                Online payment options will be available in a future update.
              </p>
            </CardContent>
             <CardFooter>
                <p className="text-xs text-muted-foreground flex items-center">
                    <Lock className="mr-1 h-3 w-3 text-green-600" /> Transactions are secure.
                </p>
             </CardFooter>
          </Card>
        </div>

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
                <span className="text-muted-foreground">Shipping (Est. Fixed)</span>
                <span>₦{estimatedDeliveryCost.toFixed(2)}</span>
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
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <CreditCard className="mr-2 h-5 w-5" />
                )}
                {isLoading ? 'Processing...' : `Place Order (₦${grandTotal.toFixed(2)})`}
              </Button>
              <Link href="/cart" className="w-full">
                <Button variant="outline" className="w-full" disabled={isLoading}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
