
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { PageHeader } from '@/components/shared/page-header';
import { ProductCard } from '@/components/products/product-card';
import type { Product } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Inbox, Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Helper function to fetch products (can be moved to a service file)
async function fetchProductsFromPayload(
  searchTerm: string, 
  category: string, 
  sort: string,
  page: number = 1,
  limit: number = 12
): Promise<{ products: Product[], totalDocs: number, hasNextPage: boolean, hasPrevPage: boolean }> {
  try {
    const queryParams = new URLSearchParams();
    if (searchTerm) queryParams.append('search', searchTerm);
    if (category && category !== 'all') queryParams.append('category[equals]', category);
    
    let sortParam = '';
    if (sort === 'price-asc') sortParam = 'price';
    else if (sort === 'price-desc') sortParam = '-price';
    else if (sort === 'name-asc') sortParam = 'name';
    else if (sort === 'name-desc') sortParam = '-name';
    if (sortParam) queryParams.append('sort', sortParam);

    queryParams.append('page', page.toString());
    queryParams.append('limit', limit.toString());
    queryParams.append('depth', '2');

    const response = await fetch(`/api/payload/products?${queryParams.toString()}`);
    
    if (!response.ok) {
      let errorBody = "";
      try {
        errorBody = await response.text(); // Try to get error message from response body
      } catch (e) {
        // Ignore if body can't be read
      }
      console.error(`Failed to fetch products. Status: ${response.status}, StatusText: "${response.statusText}", Body: "${errorBody}"`);
      throw new Error(`Failed to fetch products. Status: ${response.status}`);
    }
    const data = await response.json();
    return { 
      products: data.docs || [],
      totalDocs: data.totalDocs || 0,
      hasNextPage: data.hasNextPage || false,
      hasPrevPage: data.hasPrevPage || false,
    };
  } catch (error) {
    console.error("Error in fetchProductsFromPayload:", error);
    // Re-throw to be caught by the calling function's catch block
    // This ensures the UI can react to the error (e.g., show an error message)
    if (error instanceof Error && error.message.startsWith('Failed to fetch products. Status:')) {
      throw error; // Re-throw the specific error from above
    }
    throw new Error(`Client-side error fetching products: ${error instanceof Error ? error.message : String(error)}`);
  }
}


const categories = [
  { value: "all", label: "All Categories" },
  { value: "solid_minerals", label: "Solid Minerals" },
  { value: "agric_products", label: "Agriculture" },
  { value: "raw_materials", label: "Building Materials" },
  { value: "petrol_gas", label: "Petrol & Gas" },
];

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentSort, setCurrentSort] = useState('name-asc');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const productsPerPage = 12;

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { products: fetchedProducts, totalDocs, hasNextPage: next, hasPrevPage: prev } = await fetchProductsFromPayload(
        searchTerm, 
        selectedCategory, 
        currentSort,
        currentPage,
        productsPerPage
      );
      setProducts(fetchedProducts);
      setTotalProducts(totalDocs);
      setHasNextPage(next);
      setHasPrevPage(prev);
    } catch (e: any) {
      setError(e.message || "Failed to load products. Check server logs for more details.");
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, selectedCategory, currentSort, currentPage]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1); 
  };

  const handleSortChange = (value: string) => {
    setCurrentSort(value);
    setCurrentPage(1); 
  };
  
  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (hasPrevPage) {
      setCurrentPage(prev => prev - 1);
    }
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

      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-4 text-lg">Loading products...</p>
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

      {!isLoading && !error && products.length === 0 && (
        <div className="text-center py-20">
          <Inbox className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
          <p className="text-2xl font-semibold text-foreground mb-2">No Products Found</p>
          <p className="text-muted-foreground">Try adjusting your search or filters, or check back later.</p>
        </div>
      )}

      {!isLoading && !error && products.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 flex justify-between items-center">
            <Button onClick={handlePrevPage} disabled={!hasPrevPage || isLoading}>
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} (Showing {products.length} of {totalProducts} products)
            </span>
            <Button onClick={handleNextPage} disabled={!hasNextPage || isLoading}>
              Next
            </Button>
          </div>
        </>
      )}
    </AppShell>
  );
}
