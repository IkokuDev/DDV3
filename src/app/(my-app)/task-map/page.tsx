
"use client";

import React from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { PageHeader } from '@/components/shared/page-header';
import { TaskMapPlaceholder } from '@/components/tasks/task-map-placeholder';
import type { Task } from '@/lib/types'; // Assuming tasks might be passed in the future
import { useAuth } from '@/hooks/use-auth';

// Mock data for placeholder, can be removed if not needed for standalone map
const mockTasksForMap: Task[] = [
  { id: 'mapTask1', orderId: 'ordMap1', pickupLocation: 'Central Depot, Timbuktu', deliveryLocation: 'North Outpost, Gao', status: 'Assigned', assignedDate: '2023-11-01T08:00:00Z' },
  { id: 'mapTask2', orderId: 'ordMap2', pickupLocation: 'Southern Market, Niamey', deliveryLocation: 'Western Village, Bamako', status: 'In Progress', assignedDate: '2023-11-01T09:00:00Z' },
];


export default function InteractiveTaskMapPage() {
  const { user } = useAuth();

  if (!user || user.role !== 'driver') {
    return (
      <AppShell>
        <PageHeader title="Access Denied" description="You must be a driver to view the interactive map." />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageHeader
        title="Interactive Delivery Map"
        description="Visualize your active and upcoming delivery tasks."
      />
      <div className="w-full h-[calc(100vh-250px)]"> {/* Adjust height as needed */}
        <TaskMapPlaceholder tasks={mockTasksForMap} />
      </div>
    </AppShell>
  );
}
