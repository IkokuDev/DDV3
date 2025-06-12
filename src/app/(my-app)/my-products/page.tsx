
"use client";

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { PageHeader } from '@/components/shared/page-header';
import { ProductTable } from '@/components/products/product-table';
import { ProductForm } from '@/components/products/product-form';
import type { Product } from '@/lib/types';
import { useAuth } from '@/hooks/use-auth';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Ensure Button is imported

// Mock data
const initialProducts: Product[] = [
  { id: 'p1', name: 'Premium Baobab Powder', description: 'Organic Baobab fruit powder, rich in Vitamin C.', price: 18.50, supplier: 'Sahel Naturals', category: 'Health Foods', imageUrl: 'https://placehold.co/600x400.png' },
  { id: 'p2', name: 'Indigo Dyed Fabric', description: 'Hand-dyed indigo fabric, traditional patterns.', price: 32.00, supplier: 'Textile Traditions', category: 'Crafts', imageUrl: 'https://placehold.co/600x400.png' },
];

export default function MyProductsPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>(initialProducts.filter(p => user && p.supplier === `${user.name}'s Store` || p.supplier === 'Sahel Naturals' || p.supplier === 'Textile Traditions')); // simplified filter for demo

  const handleAddProduct = (data: any) => {
    const newProduct: Product = {
      id: `p${products.length + 1}`,
      name: data.name,
      description: data.description,
      price: data.price,
      supplier: user?.name ? `${user.name}'s Store` : 'My Store', // Use actual supplier name
      category: data.category,
      imageUrl: data.imageUrl,
    };
    setProducts([...products, newProduct]);
  };

  const handleEditProduct = (productToEdit: Product, data: any) => {
    setProducts(products.map(p => 
      p.id === productToEdit.id ? { ...p, ...data } : p
    ));
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  if (!user || user.role !== 'supplier') {
     // AppShell handles redirect, but this is a safeguard or for non-AppShell scenarios.
     // Or show a message if preferred.
    return (
      <AppShell>
        <PageHeader title="Access Denied" description="You must be a supplier to view this page." />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageHeader title="My Products" description="Manage your product listings.">
        <ProductForm onSave={handleAddProduct} />
      </PageHeader>
      <ProductTable products={products} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
    </AppShell>
  );
}
