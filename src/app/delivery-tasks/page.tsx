
"use client";

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { PageHeader } from '@/components/shared/page-header';
import { TaskListItem } from '@/components/tasks/task-list-item';
import { TaskMapPlaceholder } from '@/components/tasks/task-map-placeholder';
import type { Task, TaskStatus } from '@/lib/types';
import { useAuth } from '@/hooks/use-auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const mockTasks: Task[] = [
  { id: 'task001', orderId: 'ord123', driverId: 'driverX', pickupLocation: 'Sahel Roasters Warehouse, Sector A', deliveryLocation: '123 Oasis St, Timbuktu', status: 'Assigned', assignedDate: '2023-10-29T08:00:00Z', estimatedDeliveryDate: '2023-10-29T14:00:00Z' },
  { id: 'task002', orderId: 'ord124', driverId: 'driverX', pickupLocation: 'Naturelle Beauty HQ, Zone Industrielle', deliveryLocation: '456 Dune Rd, Gao', status: 'In Progress', assignedDate: '2023-10-30T09:00:00Z', estimatedDeliveryDate: '2023-10-30T17:00:00Z' },
  { id: 'task003', orderId: 'ord125', driverId: 'driverX', pickupLocation: 'Artisans United Collective, Market Square', deliveryLocation: '789 River Ave, Niamey', status: 'Delivery Complete', assignedDate: '2023-08-30T10:00:00Z', actualDeliveryDate: '2023-09-01T11:30:00Z' },
  { id: 'task004', orderId: 'ord126', driverId: 'driverX', pickupLocation: 'Crafts of Africa Workshop, Artisan Village', deliveryLocation: '101 Savanna Way, N\'Djamena', status: 'Accepted', assignedDate: '2023-10-30T10:00:00Z', estimatedDeliveryDate: '2023-10-31T12:00:00Z' },
];

export default function DeliveryTasksPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>(mockTasks); // In real app, filter by user.driverId

  const handleUpdateStatus = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  if (!user || user.role !== 'driver') {
    return (
      <AppShell>
        <PageHeader title="Access Denied" description="You must be a driver to view this page." />
      </AppShell>
    );
  }

  const filterTasksByStatus = (status: string) => {
    if (status === 'all') return tasks;
    return tasks.filter(task => task.status.toLowerCase().replace(/\s+/g, '-') === status.toLowerCase());
  }
  
  const activeTasksForMap = tasks.filter(t => t.status !== 'Delivery Complete' && t.status !== 'Cancelled');

  return (
    <AppShell>
      <PageHeader title="My Delivery Tasks" description="Manage and track your assigned deliveries." />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="assigned">Assigned</TabsTrigger>
              <TabsTrigger value="accepted">Accepted</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="delivery-complete">Completed</TabsTrigger>
            </TabsList>
            
            {['all', 'assigned', 'accepted', 'in-progress', 'delivery-complete'].map(status => (
              <TabsContent key={status} value={status}>
                {filterTasksByStatus(status).length > 0 ? (
                   <div className="space-y-4">
                    {filterTasksByStatus(status).map((task) => (
                      <TaskListItem key={task.id} task={task} onUpdateStatus={handleUpdateStatus} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-xl text-muted-foreground">No tasks found with status "{status}".</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
        <div className="lg:col-span-1">
          <TaskMapPlaceholder tasks={activeTasksForMap} />
        </div>
      </div>
    </AppShell>
  );
}
