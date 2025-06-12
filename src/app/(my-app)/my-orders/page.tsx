
"use client";

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { PageHeader } from '@/components/shared/page-header';
import { OrderListItem } from '@/components/orders/order-list-item';
import type { Order } from '@/lib/types';
import { useAuth } from '@/hooks/use-auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const mockOrders: Order[] = [
  { id: 'ord123', buyerId: 'user1', items: [{ productId: '1', quantity: 2, price: 15.99 }], totalAmount: 31.98, status: 'Shipped', orderDate: '2023-10-15T10:00:00Z', deliveryAddress: '123 Oasis St, Timbuktu' },
  { id: 'ord124', buyerId: 'user1', items: [{ productId: '3', quantity: 1, price: 8.50 }, { productId: '4', quantity: 1, price: 12.00 }], totalAmount: 20.50, status: 'Processing', orderDate: '2023-10-28T14:30:00Z', deliveryAddress: '456 Dune Rd, Gao' },
  { id: 'ord125', buyerId: 'user1', items: [{ productId: '2', quantity: 1, price: 25.00 }], totalAmount: 25.00, status: 'Delivered', orderDate: '2023-09-01T12:00:00Z', deliveryAddress: '789 River Ave, Niamey' },
  { id: 'ord126', buyerId: 'user1', items: [{ productId: '5', quantity: 1, price: 45.00 }], totalAmount: 45.00, status: 'Pending', orderDate: '2023-10-30T09:15:00Z', deliveryAddress: '101 Savanna Way, N\'Djamena' },
  { id: 'ord127', buyerId: 'user1', items: [{ productId: '6', quantity: 3, price: 9.75 }], totalAmount: 29.25, status: 'Cancelled', orderDate: '2023-10-01T11:00:00Z', deliveryAddress: '202 Sahel Blvd, Bamako' },
];

export default function MyOrdersPage() {
  const { user } = useAuth();
  // In a real app, filter orders by user.buyerId
  const [orders, setOrders] = useState<Order[]>(mockOrders); 

  if (!user || user.role !== 'buyer') {
    return (
      <AppShell>
        <PageHeader title="Access Denied" description="You must be a buyer to view this page." />
      </AppShell>
    );
  }

  const filterOrdersByStatus = (status: string) => {
    if (status === 'all') return orders;
    return orders.filter(order => order.status.toLowerCase() === status.toLowerCase());
  }

  return (
    <AppShell>
      <PageHeader title="My Orders" description="Track your purchases and view order history." />
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        
        {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => (
          <TabsContent key={status} value={status}>
            {filterOrdersByStatus(status).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterOrdersByStatus(status).map((order) => (
                  <OrderListItem key={order.id} order={order} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-xl text-muted-foreground">No orders found with status "{status}".</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </AppShell>
  );
}
