
"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link'; // Keep Link for navigation

import { AppShell } from '@/components/layout/app-shell';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Product, PayloadMedia, PayloadVendor } from '@/lib/types';
import { useCart } from '@/contexts/cart-context';
import { ShoppingCart, ArrowLeft, Loader2, AlertTriangle, Box, Weight as WeightIcon, Truck as ShippingIcon, Info } from 'lucide-react';
import { RichTextLexical } from '@/components/shared/rich-text-lexical'; // Assuming you'll create this

// Helper function to fetch a single product
async function fetchProductFromPayload(productId: string): Promise<Product | null> {
  try {
    const response = await fetch(`/api/payload/products/${productId}?depth=2`); // depth=2 to populate vendor & images
    if (!response.ok) {
      if (response.status === 404) return null; // Not found
      console.error("Failed to fetch product:", response.statusText);
      throw new Error(`Failed to fetch product. Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching product from Payload:", error);
    return null; // Return null on error
  }
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.productId as string;
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null | undefined>(undefined); // undefined: loading, null: not found
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (productId) {
      setIsLoading(true);
      setError(null);
      fetchProductFromPayload(productId)
        .then(data => {
          setProduct(data);
        })
        .catch(e => {
          setError(e.message || "Failed to load product details.");
          setProduct(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setProduct(null); // No ID, so not found
      setIsLoading(false);
    }
  }, [productId]);

  if (isLoading || product === undefined) {
    return (
      <AppShell>
        <PageHeader title="Loading Product..." />
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </AppShell>
    );
  }

  if (error) {
     return (
      <AppShell>
        <PageHeader title="Error" description="Could not load product details." />
        <div className="text-center py-10 bg-destructive/10 border border-destructive text-destructive p-6 rounded-md">
          <AlertTriangle className="mx-auto h-16 w-16 mb-4" />
          <p className="text-xl font-semibold">Failed to load product</p>
          <p className="mb-6">{error}</p>
          <Button onClick={() => router.push('/marketplace')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Marketplace
          </Button>
        </div>
      </AppShell>
    );
  }

  if (product === null) {
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

  const handleAddToCart = () => {
    addToCart(product);
  };

  const firstImageObj = product.images?.[0]?.image as PayloadMedia | undefined;
  const displayImageUrl = firstImageObj?.url || `https://placehold.co/800x600.png?text=${encodeURIComponent(product.name?.[0] || 'P')}`;
  const displayImageAlt = firstImageObj?.alt || product.name;
  
  const vendorName = typeof product.vendor === 'object' ? product.vendor.businessName : "Unknown Supplier";

  const productDimensions = product.shipping?.dimensions 
    ? `${product.shipping.dimensions.length || 'N/A'}cm x ${product.shipping.dimensions.width || 'N/A'}cm x ${product.shipping.dimensions.height || 'N/A'}cm`
    : 'Not specified';
  const productWeight = product.shipping?.weight ? `${product.shipping.weight}kg` : 'Not specified';
  // Note: shippingCost might need more complex calculation based on Payload data
  const productShippingCost = product.price / 10 || 500; // Placeholder until proper shipping calculation

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
              src={displayImageUrl}
              alt={displayImageAlt}
              layout="fill"
              objectFit="cover"
              data-ai-hint={displayImageAlt.split(' ').slice(0,2).join(' ') || "product image"}
              priority
            />
          </div>
          {/* TODO: Add image gallery if product.images has more than one image */}
        </Card>

        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-3xl">{product.name}</CardTitle>
              {product.category && (
                 <Badge variant="secondary" className="w-fit text-sm mt-1">{product.category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground text-lg mb-4 prose prose-sm max-w-none">
                 <RichTextLexical content={product.description} />
              </div>
              <div className="text-sm text-muted-foreground mb-1">
                Sold by: <span className="font-semibold text-primary">{vendorName}</span>
              </div>
               {product.priceUnit && (
                <div className="text-sm text-muted-foreground">
                  Price Unit: <span className="font-semibold">{product.priceUnit.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                </div>
              )}
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
                <span className="ml-2 text-muted-foreground">{productDimensions}</span>
              </div>
              <div className="flex items-center">
                <WeightIcon className="h-5 w-5 mr-3 text-primary" />
                <span className="font-medium">Weight:</span>
                <span className="ml-2 text-muted-foreground">{productWeight}</span>
              </div>
              <div className="flex items-center">
                <ShippingIcon className="h-5 w-5 mr-3 text-primary" />
                <span className="font-medium">Shipping Cost (Est.):</span>
                <span className="ml-2 text-muted-foreground">₦{productShippingCost.toFixed(2)}</span>
              </div>
              {product.status && (
                 <div className="flex items-center">
                    <Info className="h-5 w-5 mr-3 text-primary" />
                    <span className="font-medium">Status:</span>
                    <Badge variant={product.status === 'active' ? 'default' : 'destructive'} className="ml-2">
                        {product.status.replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                </div>
              )}
              {product.inventory?.quantity !== undefined && (
                 <div className="flex items-center">
                    <Package className="h-5 w-5 mr-3 text-primary" />
                    <span className="font-medium">Available Stock:</span>
                    <span className="ml-2 text-muted-foreground">{product.inventory.quantity}</span>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-3xl font-bold text-primary">
                        ₦{product.price.toFixed(2)}
                    </div>
                    <Button size="lg" className="w-full sm:w-auto text-lg" onClick={handleAddToCart}>
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
