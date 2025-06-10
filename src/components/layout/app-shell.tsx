
"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useCart } from '@/contexts/cart-context'; // Import useCart
import { Toaster } from "@/components/ui/toaster";
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
  SidebarMenuBadge, // Import SidebarMenuBadge
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Home,
  Package,
  ShoppingCart, // Keep ShoppingCart for My Orders if needed, or reuse for Cart
  Users,
  LogOut,
  Truck,
  MapPin,
  MessageSquare,
  LayoutDashboard,
  Settings,
  Briefcase,
  Store,
  Compass,
} from 'lucide-react';
import type { UserRole } from '@/lib/types';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  roles?: UserRole[];
  badgeGetter?: () => number | null; // For dynamic badges like cart count
}


export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const { getCartItemCount } = useCart(); // Get cart item count
  const router = useRouter();
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['buyer', 'supplier', 'driver'] },
    { href: '/marketplace', label: 'Marketplace', icon: Store, roles: ['buyer', 'supplier'] }, // Updated roles
    { href: '/cart', label: 'My Cart', icon: ShoppingCart, roles: ['buyer'], badgeGetter: getCartItemCount }, // Cart Nav Item
    { href: '/my-products', label: 'My Products', icon: Package, roles: ['supplier'] },
    { href: '/my-orders', label: 'My Orders', icon: ShoppingCart, roles: ['buyer'] }, // My Orders can also use ShoppingCart
    { href: '/delivery-tasks', label: 'Delivery Tasks', icon: Truck, roles: ['driver'] },
    { href: '/driver-forum', label: 'Driver Forum', icon: MessageSquare, roles: ['driver'] },
    { href: '/route-optimizer', label: 'Route Optimizer', icon: Compass, roles: ['driver'] },
  ];
  

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
    return null; // Or a redirect component, though useEffect handles it
  }
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  const availableNavItems = navItems.filter(item => 
    !item.roles || (user.role && item.roles.includes(user.role))
  );

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar collapsible="icon" variant="sidebar" side="left">
        <SidebarHeader className="items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2 font-headline text-lg font-semibold text-primary group-data-[collapsible=icon]:hidden">
              <Briefcase className="h-6 w-6" />
              <span>Walking The Sahel</span>
            </Link>
            <div className="group-data-[collapsible=icon]:hidden">
              <SidebarTrigger />
            </div>
        </SidebarHeader>

        <SidebarContent className="flex-1 overflow-y-auto">
          <SidebarMenu>
            {availableNavItems.map((item) => {
              const badgeCount = item.badgeGetter ? item.badgeGetter() : null;
              return (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
                      tooltip={{ children: item.label, side: 'right', align: 'center' }}
                    >
                      <a>
                        <item.icon />
                        <span>{item.label}</span>
                        {badgeCount !== null && badgeCount > 0 && (
                           <SidebarMenuBadge>{badgeCount}</SidebarMenuBadge>
                        )}
                      </a>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
          
          <SidebarGroup className="mt-auto group-data-[collapsible=icon]:hidden">
            <SidebarSeparator />
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarMenu>
               <SidebarMenuItem>
                 <Link href="/settings" legacyBehavior passHref>
                    <SidebarMenuButton asChild tooltip={{children: "Settings", side:"right", align:"center"}}>
                      <a><Settings/><span>Settings</span></a>
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
          {/* Breadcrumbs or page title can go here */}
        </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-0 space-y-4">
          {children}
        </main>
        <Toaster />
      </SidebarInset>
    </div>
  );
}
