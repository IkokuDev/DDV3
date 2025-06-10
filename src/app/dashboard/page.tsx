
"use client";

import { AppShell } from '@/components/layout/app-shell';
import { PageHeader } from '@/components/shared/page-header';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, ShoppingCart, Package, Truck, MessageSquare, Compass, UserCircle } from 'lucide-react';
import type { UserRole } from '@/lib/types';

interface DashboardAction {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  roles: UserRole[];
}

const actions: DashboardAction[] = [
  { title: "Browse Marketplace", description: "Discover products from various suppliers.", href: "/marketplace", icon: ShoppingCart, roles: ['buyer', 'supplier', 'driver'] },
  { title: "Manage My Products", description: "List and manage your products for sale.", href: "/my-products", icon: Package, roles: ['supplier'] },
  { title: "Track My Orders", description: "View and track your placed orders.", href: "/my-orders", icon: ShoppingCart, roles: ['buyer'] },
  { title: "View Delivery Tasks", description: "Manage your assigned delivery tasks.", href: "/delivery-tasks", icon: Truck, roles: ['driver'] },
  { title: "Driver Forum", description: "Connect with other drivers.", href: "/driver-forum", icon: MessageSquare, roles: ['driver'] },
  { title: "Optimize Route", description: "Find the most efficient delivery routes.", href: "/route-optimizer", icon: Compass, roles: ['driver'] },
];

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return null; // or loading state, AppShell handles auth check
  }

  const availableActions = actions.filter(action => user.role && action.roles.includes(user.role));

  return (
    <AppShell>
      <PageHeader
        title={`Welcome, ${user.name}!`}
        description={`Your ${user.role} dashboard overview.`}
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Role</CardTitle>
            <UserCircle className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize font-headline">{user.role}</div>
            <p className="text-xs text-muted-foreground">
              Access relevant tools and features based on your role.
            </p>
          </CardContent>
        </Card>

        {availableActions.map((action) => (
          <Card key={action.href} className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <action.icon className="h-8 w-8 text-primary" />
                <CardTitle className="font-headline text-xl">{action.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{action.description}</p>
              <Link href={action.href} passHref>
                <Button className="w-full">
                  Go to {action.title} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
