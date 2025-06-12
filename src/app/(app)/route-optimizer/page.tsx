
"use client";

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { PageHeader } from '@/components/shared/page-header';
import { OptimizerForm } from '@/components/route-optimizer/optimizer-form';
import { OptimizerResults } from '@/components/route-optimizer/optimizer-results';
import type { OptimizeRouteInput, OptimizeRouteOutput } from '@/ai/flows/route-optimization';
import { optimizeRoute } from '@/ai/flows/route-optimization'; // Direct import for client component
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast'; // Import useToast

export default function RouteOptimizerPage() {
  const { user } = useAuth();
  const [results, setResults] = useState<OptimizeRouteOutput | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast(); // Initialize toast

  const handleSubmit = async (data: OptimizeRouteInput) => {
    setIsSubmitting(true);
    setResults(null);
    try {
      const optimizationResult = await optimizeRoute(data);
      setResults(optimizationResult);
      toast({ // Use toast for success
        title: "Route Optimized!",
        description: "The AI has generated a route suggestion.",
      });
    } catch (error) {
      console.error("Optimization error:", error);
      toast({ // Use toast for error
        title: "Optimization Failed",
        description: "An error occurred while optimizing the route. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!user || user.role !== 'driver') {
    return (
      <AppShell>
        <PageHeader title="Access Denied" description="You must be a driver to use the Route Optimizer." />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageHeader
        title="Intelligent Route Optimization"
        description="Leverage AI to find the most efficient driving routes considering real-time conditions."
      />
      <div className="max-w-2xl mx-auto">
        <OptimizerForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        {isSubmitting && (
          <div className="mt-6 text-center">
            <p className="text-lg text-primary flex items-center justify-center">
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary mr-2"></span>
              Optimizing your route, please wait...
            </p>
          </div>
        )}
        {results && <OptimizerResults results={results} />}
      </div>
    </AppShell>
  );
}
