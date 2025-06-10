
"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { AppShell } from '@/components/layout/app-shell';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { mockProducts } from '@/lib/mock-data';
import type { Product } from '@/lib/types';
import { ShoppingCart, DollarSign, ArrowLeft, Loader2, AlertTriangle, Box, Weight as WeightIcon, Truck as ShippingIcon } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.productId as string;
  
  const [product, setProduct] = useState<Product | undefined | null>(undefined); // undefined: loading, null: not found

  useEffect(() => {
    if (productId) {
      // In a real app, you would fetch product data from an API
      const foundProduct = mockProducts.find(p => p.id === productId);
      setProduct(foundProduct || null); // Set to null if not found
    } else {
      setProduct(null); // No productId, so not found
    }
  }, [productId]);

  if (product === undefined) { // Loading state
    return (
      <AppShell>
        <PageHeader title="Loading Product..." />
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </AppShell>
    );
  }

  if (product === null) { // Not found state
    return (
      <AppShell>
        <PageHeader title="Product Not Found" description="The product you are looking for could not be found." />
        <div className="text-center py-10">
          <AlertTriangle className="mx-auto h-16 w-16 text-destructive mb-4" />
          <p className="text-xl text-muted-foreground mb-6">We couldn't find this product. It might have been removed or the link is incorrect.</p>
          <Button onClick={() => router.push('/marketplace')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Marketplace
          </Button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mb-4">
        <Button variant="outline" onClick={() => router.back()} className="text-sm">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>
      <PageHeader title={product.name} description={`Details for ${product.name}`} />
      
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        <Card className="shadow-lg overflow-hidden">
          <div className="aspect-[4/3] relative w-full bg-muted">
            <Image
              src={product.imageUrl || `https://placehold.co/800x600.png?text=${encodeURIComponent(product.name)}`}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              data-ai-hint={product.imageAiHint || "product image"}
              priority
            />
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-3xl">{product.name}</CardTitle>
              {product.category && (
                <Badge variant="secondary" className="w-fit text-sm">{product.category}</Badge>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-lg mb-4">{product.description}</p>
              <div className="text-sm text-muted-foreground mb-1">
                Sold by: <span className="font-semibold text-primary">{product.supplier}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-headline">Product Specifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center">
                <Box className="h-5 w-5 mr-3 text-primary" />
                <span className="font-medium">Dimensions:</span>
                <span className="ml-2 text-muted-foreground">{product.dimensions}</span>
              </div>
              <div className="flex items-center">
                <WeightIcon className="h-5 w-5 mr-3 text-primary" />
                <span className="font-medium">Weight:</span>
                <span className="ml-2 text-muted-foreground">{product.weight}</span>
              </div>
              <div className="flex items-center">
                <ShippingIcon className="h-5 w-5 mr-3 text-primary" />
                <span className="font-medium">Shipping Cost:</span>
                <span className="ml-2 text-muted-foreground">${product.shippingCost.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-3xl font-bold text-primary flex items-center">
                        <DollarSign className="h-7 w-7 mr-1" />
                        {product.price.toFixed(2)}
                    </div>
                    <Button size="lg" className="w-full sm:w-auto text-lg">
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Add to Cart
                    </Button>
                </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </AppShell>
  );
}
