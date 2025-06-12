
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { PageHeader } from '@/components/shared/page-header';
import { ProductTable } from '@/components/products/product-table';
// ProductForm is now mainly for triggering and might be simplified or removed if guiding to Payload Admin
// import { ProductForm } from '@/components/products/product-form'; 
import type { Product } from '@/lib/types';
import { useAuth } from '@/hooks/use-auth';
import { PlusCircle, ExternalLink, Loader2, AlertTriangle, Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link'; // For linking to Payload Admin
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Function to fetch products for the current supplier
// This assumes user.id can be linked to a vendor, and products are filtered by that vendor.
// You'll need to adjust the query based on your Payload setup (e.g., if vendor ID is stored on user or via a separate Vendors collection).
async function fetchSupplierProducts(userId: string): Promise<Product[]> {
  try {
    // Step 1: Find the Vendor ID associated with the User ID
    // This query assumes you have a 'vendors' collection where 'user' is a relationship field.
    const vendorResponse = await fetch(`/api/payload/vendors?where[user][equals]=${userId}&depth=0`);
    if (!vendorResponse.ok) {
      console.error("Failed to fetch vendor for user:", vendorResponse.statusText);
      return [];
    }
    const vendorData = await vendorResponse.json();
    if (!vendorData.docs || vendorData.docs.length === 0) {
      console.log("No vendor found for this user.");
      return [];
    }
    const vendorId = vendorData.docs[0].id;

    // Step 2: Fetch products for that Vendor ID
    // This query assumes your 'products' collection has a 'vendor' relationship field.
    const productsResponse = await fetch(`/api/payload/products?where[vendor][equals]=${vendorId}&depth=2&limit=100`);
    if (!productsResponse.ok) {
      console.error("Failed to fetch supplier products:", productsResponse.statusText);
      return [];
    }
    const productsData = await productsResponse.json();
    return productsData.docs || [];
  } catch (error) {
    console.error("Error fetching supplier products:", error);
    return [];
  }
}


export default function MyProductsPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    if (!user || user.role !== 'supplier') {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const fetchedProducts = await fetchSupplierProducts(user.id);
      setProducts(fetchedProducts);
    } catch (e: any) {
      setError(e.message || "Failed to load products.");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // For now, onEdit and onDelete will be messages guiding to Payload admin.
  // Full CRUD operations would require Payload API calls (mutations).
  const handleEditRedirect = (productId: string) => {
    // Redirect to Payload admin edit page (URL structure might vary)
    // Example: /admin/collections/products/:id
    window.open(`/admin/collections/products/${productId}`, '_blank');
  };
  
  const handleDeleteInfo = (productName: string) => {
    alert(`To delete "${productName}", please use the Payload CMS admin panel.`);
  };


  if (!user || user.role !== 'supplier') {
    return (
      <AppShell>
        <PageHeader title="Access Denied" description="You must be a supplier to view this page." />
      </AppShell>
    );
  }

  // PAYLOAD_ADMIN_URL - this should ideally come from an environment variable
  const PAYLOAD_ADMIN_URL = process.env.NEXT_PUBLIC_PAYLOAD_ADMIN_URL || '/admin';


  return (
    <AppShell>
      <PageHeader title="My Products" description="Manage your product listings.">
        <Link href={`${PAYLOAD_ADMIN_URL}/collections/products/create`} passHref legacyBehavior>
          <a target="_blank" rel="noopener noreferrer">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Product via CMS
            </Button>
          </a>
        </Link>
      </PageHeader>

      <Card className="mb-6 shadow-lg">
        <CardHeader>
          <CardTitle>Manage Products in CMS</CardTitle>
          <CardDescription>
            Use the full-featured Payload CMS admin panel to add, edit, and delete your products.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href={`${PAYLOAD_ADMIN_URL}/collections/products`} passHref legacyBehavior>
            <a target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                Open Products in CMS <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </Link>
        </CardContent>
      </Card>
      
      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-4 text-lg">Loading your products...</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="text-center py-10 bg-destructive/10 border border-destructive text-destructive p-6 rounded-md">
          <AlertTriangle className="mx-auto h-12 w-12 mb-4" />
          <p className="text-xl font-semibold">Error Loading Products</p>
          <p>{error}</p>
          <Button onClick={loadProducts} className="mt-4">Try Again</Button>
        </div>
      )}

      {!isLoading && !error && (
        products.length === 0 ? (
           <div className="text-center py-20">
            <Inbox className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
            <p className="text-2xl font-semibold text-foreground mb-2">No Products Listed Yet</p>
            <p className="text-muted-foreground">Click "Add New Product via CMS" to start selling.</p>
          </div>
        ) : (
          <ProductTable 
            products={products} 
            onEdit={(product) => handleEditRedirect(product.id)} 
            onDelete={(productId) => {
              const productName = products.find(p => p.id === productId)?.name || "this product";
              handleDeleteInfo(productName);
            }}
          />
        )
      )}
    </AppShell>
  );
}
