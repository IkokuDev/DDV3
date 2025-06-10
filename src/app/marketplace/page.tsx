
"use client";

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { PageHeader } from '@/components/shared/page-header';
import { ProductCard } from '@/components/products/product-card';
import { mockProducts } from '@/lib/mock-data';
import type { Product } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Inbox } from 'lucide-react';

const categories = [
  { value: "all", label: "All Categories" },
  { value: "Raw Materials", label: "Raw Materials" },
  { value: "Building Materials", label: "Building Materials" },
  { value: "Agric/Livestock", label: "Agric/Livestock" },
  { value: "Fuel Options", label: "Fuel Options" },
];

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentSort, setCurrentSort] = useState('name-asc'); // Default sort
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);

  useEffect(() => {
    let tempProducts = [...mockProducts];

    // Filter by search term
    if (searchTerm) {
      tempProducts = tempProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== 'all') {
      tempProducts = tempProducts.filter(product => product.category === selectedCategory);
    }

    // Sort products
    tempProducts.sort((a, b) => {
      switch (currentSort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    setFilteredProducts(tempProducts);
  }, [searchTerm, selectedCategory, currentSort]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleSortChange = (value: string) => {
    setCurrentSort(value);
  };

  return (
    <AppShell>
      <PageHeader
        title="Marketplace"
        description="Discover unique products from local suppliers."
      />
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search products by name or description..." 
            className="pl-10" 
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex gap-4 flex-col sm:flex-row">
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={currentSort} onValueChange={handleSortChange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <Inbox className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-xl font-semibold text-foreground">No products found</p>
          <p className="text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      )}
    </AppShell>
  );
}
