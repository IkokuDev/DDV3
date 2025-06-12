
"use client";

import { AppShell } from '@/components/layout/app-shell';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { UserRole } from '@/lib/types';

export default function SettingsPage() {
  const { user, setUserRole, logout } = useAuth();

  if (!user) {
    return null; // AppShell handles redirect
  }

  const handleRoleChange = (newRole: string) => {
    if (newRole as UserRole) {
      setUserRole(newRole as UserRole);
    }
  };

  return (
    <AppShell>
      <PageHeader title="Settings" description="Manage your account settings and preferences." />
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Profile Information</CardTitle>
            <CardDescription>Update your personal details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue={user.name} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={user.email} disabled />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Role Management (Demo)</CardTitle>
            <CardDescription>Switch your role for demonstration purposes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="role">Current Role: <span className="font-semibold capitalize">{user.role}</span></Label>
              <Select onValueChange={handleRoleChange} defaultValue={user.role || undefined}>
                <SelectTrigger id="role-switcher" className="w-full mt-2">
                  <SelectValue placeholder="Change role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buyer">Buyer</SelectItem>
                  <SelectItem value="supplier">Supplier</SelectItem>
                  <SelectItem value="driver">Driver</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <p className="text-xs text-muted-foreground">Note: This is a demo feature. In a real application, roles are typically fixed or managed by administrators.</p>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Account Actions</CardTitle>
          </CardHeader>
          <CardContent>
             <Button variant="destructive" onClick={logout}>Log Out</Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
