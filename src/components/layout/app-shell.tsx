
"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useCart } from '@/contexts/cart-context';
import { Toaster } from "@/components/ui/toaster";
import Image from 'next/image';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
  SidebarMenuBadge,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  Truck,
  MapPin,
  MessageSquare,
  LayoutDashboard,
  Settings,
  Store,
  Compass,
  Map,
} from 'lucide-react';
import type { UserRole } from '@/lib/types';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  roles?: UserRole[];
  badgeGetter?: () => number | null;
}

interface NavGroup {
  label?: string; // Optional label for the group
  items: NavItem[];
  groupRoles?: UserRole[]; // Optional: if the entire group is role-specific (e.g., only for 'driver')
}

const navigationStructure: NavGroup[] = [
  {
    // General items, Dashboard is a common standalone item or could be in an "Overview" group
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['buyer', 'supplier', 'driver'] },
    ]
  },
  {
    label: 'Commerce',
    groupRoles: ['buyer', 'supplier'], // This group is relevant for buyers or suppliers
    items: [
      { href: '/marketplace', label: 'Marketplace', icon: Store, roles: ['buyer', 'supplier'] },
      { href: '/cart', label: 'My Cart', icon: ShoppingCart, roles: ['buyer'], badgeGetter: () => useCart().getCartItemCount() },
      { href: '/my-orders', label: 'My Orders', icon: ShoppingCart, roles: ['buyer'] },
      { href: '/my-products', label: 'My Products', icon: Package, roles: ['supplier'] },
    ]
  },
  {
    label: 'Driver Hub',
    groupRoles: ['driver'], // This group is only for drivers
    items: [
      { href: '/delivery-tasks', label: 'Delivery Tasks', icon: Truck, roles: ['driver'] },
      { href: '/task-map', label: 'Interactive Map', icon: Map, roles: ['driver'] },
      { href: '/route-optimizer', label: 'Route Optimizer', icon: Compass, roles: ['driver'] },
      { href: '/driver-forum', label: 'Driver Forum', icon: MessageSquare, roles: ['driver'] },
    ]
  }
];


export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const { getCartItemCount } = useCart(); // Keep for badgeGetter, but ensure it's called correctly in map
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null; 
  }
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar collapsible="icon" variant="floating" side="left">
        <SidebarHeader className="items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2 text-primary">
              <Image src="/logo.png" alt="Walking The Sahel Logo" width={40} height={40} className="h-10 w-10" />
              <span className="font-headline text-lg font-semibold group-data-[collapsible=icon]:hidden">Walking The Sahel</span>
            </Link>
            <div className="group-data-[collapsible=icon]:hidden">
              <SidebarTrigger />
            </div>
        </SidebarHeader>

        <SidebarContent className="flex-1 overflow-y-auto">
          {navigationStructure.map((group, groupIndex) => {
            // Check if the entire group is role-restricted and if the user has that role
            if (group.groupRoles && (!user.role || !group.groupRoles.includes(user.role))) {
              return null;
            }

            const availableGroupItems = group.items.filter(item =>
              !item.roles || (user.role && item.roles.includes(user.role))
            );

            if (availableGroupItems.length === 0) {
              return null;
            }

            return (
              <SidebarGroup key={group.label || `group-${groupIndex}`}>
                {group.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
                <SidebarMenu>
                  {availableGroupItems.map((item) => {
                    const badgeCount = item.badgeGetter ? item.badgeGetter() : null;
                    return (
                      <SidebarMenuItem key={item.href}>
                        <Link href={item.href}>
                          <SidebarMenuButton
                            asChild
                            isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
                            tooltip={{ children: item.label, side: 'right', align: 'center' }}
                          >
                            <>
                              <item.icon />
                              <span>{item.label}</span>
                              {badgeCount !== null && badgeCount > 0 && (
                                 <SidebarMenuBadge>{badgeCount}</SidebarMenuBadge>
                              )}
                            </>
                          </SidebarMenuButton>
                        </Link>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroup>
            );
          })}
          
          <SidebarGroup className="mt-auto group-data-[collapsible=icon]:hidden">
            <SidebarSeparator />
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarMenu>
               <SidebarMenuItem>
                 <Link href="/settings">
                    <SidebarMenuButton asChild tooltip={{children: "Settings", side:"right", align:"center"}}>
                      <>
                        <Settings/>
                        <span>Settings</span>
                      </>
                    </SidebarMenuButton>
                 </Link>
               </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

        </SidebarContent>

        <SidebarFooter className="border-t border-sidebar-border p-2">
            <div className="flex items-center gap-3 p-2 group-data-[collapsible=icon]:justify-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={`https://placehold.co/100x100.png?text=${getInitials(user.name)}`} alt={user.name} data-ai-hint="user avatar" />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">{user.email}</span>
              </div>
            </div>
            <Button variant="ghost" className="w-full justify-start group-data-[collapsible=icon]:justify-center" onClick={logout} >
              <LogOut className="mr-2 h-4 w-4 group-data-[collapsible=icon]:mr-0" />
              <span className="group-data-[collapsible=icon]:hidden">Logout</span>
            </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex-1 flex flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-4">
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
        </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-0 space-y-4">
          {children}
        </main>
        <Toaster />
      </SidebarInset>
    </div>
  );
}
