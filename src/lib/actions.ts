
"use server";

import { optimizeRoute, type OptimizeRouteInput, type OptimizeRouteOutput } from '@/ai/flows/route-optimization';
import { z } from 'zod';

const OptimizeRouteInputSchema = z.object({
  startLocation: z.string(),
  endLocation: z.string(),
  currentTrafficConditions: z.string(),
  otherRelevantFactors: z.string().optional(),
});

interface FormState {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  data?: OptimizeRouteOutput;
}

export async function handleOptimizeRoute(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawFormData = {
    startLocation: formData.get('startLocation') as string,
    endLocation: formData.get('endLocation') as string,
    currentTrafficConditions: formData.get('currentTrafficConditions') as string,
    otherRelevantFactors: formData.get('otherRelevantFactors') as string | undefined,
  };

  const validatedFields = OptimizeRouteInputSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      message: "Validation failed. Please check your inputs.",
      issues: validatedFields.error.issues.map((issue) => issue.message),
    };
  }

  try {
    const result = await optimizeRoute(validatedFields.data as OptimizeRouteInput);
    return { message: "Route optimized successfully!", data: result };
  } catch (error) {
    console.error("Route optimization error:", error);
    return { message: "An error occurred during route optimization. Please try again." };
  }
}
