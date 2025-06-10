
"use client";

import type { User, UserRole } from '@/lib/types';
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
  setUserRole: (role: UserRole) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Try to load user from localStorage
    try {
      const storedUser = localStorage.getItem('walking-sahel-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to load user from localStorage", error);
      localStorage.removeItem('walking-sahel-user');
    }
    setLoading(false);
  }, []);

  const login = (email: string, role: UserRole) => {
    // Mock login
    const mockUser: User = {
      id: Date.now().toString(),
      name: email.split('@')[0] || 'User',
      email,
      role,
    };
    setUser(mockUser);
    try {
      localStorage.setItem('walking-sahel-user', JSON.stringify(mockUser));
    } catch (error) {
      console.error("Failed to save user to localStorage", error);
    }
    router.push('/dashboard');
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('walking-sahel-user');
    } catch (error) {
      console.error("Failed to remove user from localStorage", error);
    }
    router.push('/login');
  };
  
  const setUserRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      try {
        localStorage.setItem('walking-sahel-user', JSON.stringify(updatedUser));
      } catch (error) {
        console.error("Failed to update user role in localStorage", error);
      }
    }
  };


  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};
