
"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { OptimizeRouteInput } from '@/ai/flows/route-optimization';
import { Compass, Send } from 'lucide-react';

const routeOptimizationSchema = z.object({
  startLocation: z.string().min(3, "Start location is required"),
  endLocation: z.string().min(3, "End location is required"),
  currentTrafficConditions: z.string().min(5, "Traffic conditions are required"),
  otherRelevantFactors: z.string().optional(),
});

type RouteOptimizationFormData = z.infer<typeof routeOptimizationSchema>;

interface OptimizerFormProps {
  onSubmit: (data: OptimizeRouteInput) => Promise<void>;
  isSubmitting: boolean;
}

export function OptimizerForm({ onSubmit, isSubmitting }: OptimizerFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<RouteOptimizationFormData>({
    resolver: zodResolver(routeOptimizationSchema),
  });

  const handleFormSubmit: SubmitHandler<RouteOptimizationFormData> = async (data) => {
    await onSubmit(data);
  };

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
            <Compass className="h-10 w-10 text-primary" />
            <div>
                <CardTitle className="font-headline text-2xl">Intelligent Route Optimizer</CardTitle>
                <CardDescription>Find the most efficient delivery routes using AI.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="startLocation">Start Location</Label>
            <Input id="startLocation" placeholder="e.g., Main Warehouse, Bamako" {...register("startLocation")} className="mt-1" />
            {errors.startLocation && <p className="text-sm text-destructive mt-1">{errors.startLocation.message}</p>}
          </div>
          <div>
            <Label htmlFor="endLocation">End Location</Label>
            <Input id="endLocation" placeholder="e.g., Client Address, Gao" {...register("endLocation")} className="mt-1" />
            {errors.endLocation && <p className="text-sm text-destructive mt-1">{errors.endLocation.message}</p>}
          </div>
          <div>
            <Label htmlFor="currentTrafficConditions">Current Traffic Conditions</Label>
            <Textarea id="currentTrafficConditions" placeholder="e.g., Heavy traffic on Ring Road, moderate on Highway N1" {...register("currentTrafficConditions")} className="mt-1" />
            {errors.currentTrafficConditions && <p className="text-sm text-destructive mt-1">{errors.currentTrafficConditions.message}</p>}
          </div>
          <div>
            <Label htmlFor="otherRelevantFactors">Other Relevant Factors (Optional)</Label>
            <Textarea id="otherRelevantFactors" placeholder="e.g., Rainy weather, market day near destination" {...register("otherRelevantFactors")} className="mt-1" />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <Compass className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            {isSubmitting ? 'Optimizing...' : 'Optimize Route'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
