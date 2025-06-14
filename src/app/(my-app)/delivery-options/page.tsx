
"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { AppShell } from '@/components/layout/app-shell';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import { ArrowRight, MapPin, Truck, PackageCheck, User, Compass } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { Separator } from '@/components/ui/separator';
import type { LatLngExpression } from 'leaflet';
import type { MapMarker } from '@/components/maps/leaflet-map'; // Import type

const LeafletMap = dynamic(() => import('@/components/maps/leaflet-map'), {
  ssr: false,
  loading: () => (
    <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
      <Compass className="h-12 w-12 text-muted-foreground animate-pulse" />
      <p className="ml-2">Loading map...</p>
    </div>
  ),
});

interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  eta: string;
  cost: number;
  icon: React.ElementType;
}

const mockDeliveryOptions: DeliveryOption[] = [
  { id: 'standard', name: 'Standard Delivery', description: 'Reliable and cost-effective delivery.', eta: '3-5 business days', cost: 1500, icon: Truck },
  { id: 'express', name: 'Express Delivery', description: 'Get your items faster.', eta: '1-2 business days', cost: 3500, icon: Truck },
  { id: 'pickup', name: 'Local Pickup', description: 'Collect your order from a designated point.', eta: 'Ready in 24 hours', cost: 0, icon: PackageCheck },
];

// Mock Data for Map
const userMockLocation: LatLngExpression = [12.6392, -8.0029]; // Bamako, Mali
const mockDriverLocations: MapMarker[] = [
  { position: [12.6492, -8.0129], popupContent: "Driver Alpha", iconUrl: "https://placehold.co/32x32/003049/white.png?text=D", iconSize: [32,32] },
  { position: [12.6292, -7.9929], popupContent: "Driver Bravo", iconUrl: "https://placehold.co/32x32/003049/white.png?text=D", iconSize: [32,32] },
  { position: [12.6350, -8.0000], popupContent: "Driver Charlie", iconUrl: "https://placehold.co/32x32/003049/white.png?text=D", iconSize: [32,32] },
];

const userLocationMarker: MapMarker = {
    position: userMockLocation,
    popupContent: "Your Estimated Location",
    iconUrl: "https://placehold.co/32x32/f03e3e/white.png?text=U", // Red for user
    iconSize: [32,32]
};

const allMapMarkers = [userLocationMarker, ...mockDriverLocations];


export default function DeliveryOptionsPage() {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(mockDeliveryOptions[0]?.id);
  const { getCartTotal, getCartItemCount } = useCart();

  const cartSubtotal = getCartTotal();
  const selectedDeliveryCost = mockDeliveryOptions.find(opt => opt.id === selectedOption)?.cost || 0;
  const grandTotal = cartSubtotal + selectedDeliveryCost;

  if (getCartItemCount() === 0) {
    return (
      <AppShell>
        <PageHeader title="No Items in Cart" description="Please add items to your cart to select delivery options."/>
        <div className="text-center py-10">
          <Link href="/marketplace">
            <Button size="lg">Browse Marketplace</Button>
          </Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageHeader
        title="Choose Your Delivery Option"
        description="Select how you'd like to receive your order."
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center">
                <MapPin className="mr-2 h-6 w-6 text-primary" /> Delivery Location & Nearby Drivers
              </CardTitle>
              <CardDescription>
                Map shows your approximate location and available drivers (mock data).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LeafletMap center={userMockLocation} zoom={12} markers={allMapMarkers} className="rounded-md" />
              <p className="text-sm text-muted-foreground mt-4">
                This map is for illustrative purposes. Actual driver assignment and route will be determined after order confirmation.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Select Delivery Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
                {mockDeliveryOptions.map((option) => (
                  <Label
                    key={option.id}
                    htmlFor={option.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-md hover:bg-accent has-[input:checked]:bg-primary/10 has-[input:checked]:border-primary transition-all cursor-pointer mb-3 last:mb-0"
                  >
                    <div className="flex items-center mb-2 sm:mb-0">
                      <RadioGroupItem value={option.id} id={option.id} className="mr-3" />
                      <option.icon className="h-6 w-6 mr-3 text-primary" />
                      <div>
                        <span className="font-semibold">{option.name}</span>
                        <p className="text-sm text-muted-foreground">{option.description} (ETA: {option.eta})</p>
                      </div>
                    </div>
                    <span className="font-semibold text-lg text-primary sm:ml-4">₦{option.cost.toFixed(2)}</span>
                  </Label>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="shadow-lg sticky top-20">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cart Subtotal</span>
                <span>₦{cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Cost</span>
                <span>₦{selectedDeliveryCost.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Grand Total</span>
                <span>₦{grandTotal.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              {/* This link will eventually go to a real checkout page */}
              <Link href="/checkout" className="w-full"> 
                <Button className="w-full text-lg py-6" size="lg" disabled={!selectedOption}>
                  Confirm & Proceed to Payment <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/cart" className="w-full">
                <Button variant="outline" className="w-full">
                  Back to Cart
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
