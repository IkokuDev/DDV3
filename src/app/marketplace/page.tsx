
"use client";

import { AppShell } from '@/components/layout/app-shell';
import { PageHeader } from '@/components/shared/page-header';
import { ProductCard } from '@/components/products/product-card';
import type { Product } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

// Mock data
const mockProducts: Product[] = [
  { id: '1', name: 'Artisan Coffee Beans', description: 'Fair-trade, single-origin coffee beans from the Sahel region.', price: 15.99, supplier: 'Sahel Roasters', category: 'Groceries', imageUrl: 'https://placehold.co/600x400.png' },
  { id: '2', name: 'Handwoven Basket', description: 'Beautiful and durable basket handcrafted by local artisans.', price: 25.00, supplier: 'Artisans United', category: 'Home Goods', imageUrl: 'https://placehold.co/600x400.png' },
  { id: '3', name: 'Shea Butter Soap', description: 'Natural shea butter soap, nourishing for skin.', price: 8.50, supplier: 'Naturelle Beauty', category: 'Beauty', imageUrl: 'https://placehold.co/600x400.png' },
  { id: '4', name: 'Spiced Hibiscus Tea', description: 'Refreshing and aromatic hibiscus tea with local spices.', price: 12.00, supplier: 'Sahel Flavors', category: 'Groceries', imageUrl: 'https://placehold.co/600x400.png' },
  { id: '5', name: 'Leather Sandals', description: 'Handmade leather sandals, traditional design.', price: 45.00, supplier: 'Crafts of Africa', category: 'Apparel', imageUrl: 'https://placehold.co/600x400.png' },
  { id: '6', name: 'Millet Flour', description: 'Organic millet flour, a staple in Sahelian cuisine.', price: 9.75, supplier: 'FarmFresh Sahel', category: 'Groceries', imageUrl: 'https://placehold.co/600x400.png' },
];

export default function MarketplacePage() {
  return (
    <AppShell>
      <PageHeader
        title="Marketplace"
        description="Discover unique products from local suppliers."
      />
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search products..." className="pl-10" />
        </div>
        <div className="flex gap-4">
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="groceries">Groceries</SelectItem>
              <SelectItem value="home-goods">Home Goods</SelectItem>
              <SelectItem value="beauty">Beauty</SelectItem>
              <SelectItem value="apparel">Apparel</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </AppShell>
  );
}
