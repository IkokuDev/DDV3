
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { PageHeader } from '@/components/shared/page-header';
import { OrderListItem } from '@/components/orders/order-list-item';
import type { Order, OrderStatus } from '@/lib/types';
import { useAuth } from '@/hooks/use-auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, AlertTriangle, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Import Button
import Link from 'next/link'; // Import Link

async function fetchUserOrders(userId: string): Promise<Order[]> {
  try {
    // Construct the query to filter orders by the user (buyer) ID
    // And sort by creation date descending
    const queryParams = new URLSearchParams({
      'where[user][equals]': userId,
      sort: '-createdAt',
      depth: '1', // Populate user (buyer) and seller (vendor) to one level, and products within order.
      limit: '50' // Or some other reasonable limit
    });
    
    const response = await fetch(`/api/payload/orders?${queryParams.toString()}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to fetch user orders:", errorData);
      throw new Error(errorData.message || `Failed to fetch orders. Status: ${response.status}`);
    }
    const data = await response.json();
    return data.docs || [];
  } catch (error) {
    console.error("Error in fetchUserOrders:", error);
    throw error; // Re-throw to be caught by the calling component
  }
}


export default function MyOrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadOrders = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const fetchedOrders = await fetchUserOrders(user.id);
      setOrders(fetchedOrders);
    } catch (e: any) {
      setError(e.message || "Failed to load your orders.");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);


  if (!user || (user.role !== 'buyer' && user.role !== 'supplier' && user.role !== 'driver')) { // Adjusted for broader access, filtering handles specifics
    return (
      <AppShell>
        <PageHeader title="Access Denied" description="You must be logged in to view orders." />
      </AppShell>
    );
  }
  
  // For this page, we primarily show orders where the current user is the buyer.
  // If a supplier view is needed, that would be a different page or logic.
  const buyerOrders = orders.filter(order => typeof order.user === 'object' ? order.user.id === user.id : order.user === user.id);


  const filterOrdersByStatus = (status: string) => {
    if (status === 'all') return buyerOrders;
    return buyerOrders.filter(order => order.status.toUpperCase() === status.toUpperCase());
  }
  
  const orderStatusesForTabs: OrderStatus[] = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'COMPLETED', 'CANCELLED'];


  if (isLoading) {
    return (
      <AppShell>
        <PageHeader title="My Orders" description="Fetching your order history..." />
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </AppShell>
    );
  }

  if (error) {
    return (
      <AppShell>
        <PageHeader title="My Orders" description="Could not load your orders." />
        <div className="text-center py-10 bg-destructive/10 border border-destructive text-destructive p-6 rounded-md">
          <AlertTriangle className="mx-auto h-12 w-12 mb-4" />
          <p className="text-xl font-semibold">Error Loading Orders</p>
          <p>{error}</p>
          <Button onClick={loadOrders} className="mt-4">Try Again</Button>
        </div>
      </AppShell>
    );
  }


  return (
    <AppShell>
      <PageHeader title="My Orders" description="Track your purchases and view order history." />
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-7 mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          {orderStatusesForTabs.map(status => (
             <TabsTrigger key={status} value={status.toLowerCase()}>
               {status.charAt(0) + status.slice(1).toLowerCase().replace(/_/g, ' ')}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {['all', ...orderStatusesForTabs.map(s => s.toLowerCase())].map(statusKey => (
          <TabsContent key={statusKey} value={statusKey}>
            {filterOrdersByStatus(statusKey).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterOrdersByStatus(statusKey).map((order) => (
                  <OrderListItem key={order.id} order={order} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-xl text-muted-foreground mb-4">No orders found with status "{statusKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}".</p>
                {statusKey === 'all' && (
                  <Link href="/marketplace">
                    <Button>Start Shopping</Button>
                  </Link>
                )}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </AppShell>
  );
}
