// src/ai/flows/route-optimization.ts
'use server';
/**
 * @fileOverview An AI agent that suggests the most efficient delivery routes.
 *
 * - optimizeRoute - A function that handles the route optimization process.
 * - OptimizeRouteInput - The input type for the optimizeRoute function.
 * - OptimizeRouteOutput - The return type for the optimizeRoute function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeRouteInputSchema = z.object({
  startLocation: z.string().describe('The starting location for the route.'),
  endLocation: z.string().describe('The destination location for the route.'),
  currentTrafficConditions: z.string().describe('Real-time traffic conditions.'),
  otherRelevantFactors: z.string().describe('Other factors relevant to the route, such as weather or road closures.'),
});
export type OptimizeRouteInput = z.infer<typeof OptimizeRouteInputSchema>;

const OptimizeRouteOutputSchema = z.object({
  suggestedRoute: z.string().describe('The suggested optimized route.'),
  estimatedTravelTime: z.string().describe('The estimated travel time for the suggested route.'),
  fuelConsumptionEstimate: z.string().describe('The estimated fuel consumption for the suggested route.'),
  reasoning: z.string().describe('The AI reasoning for route optimization considering the given factors')
});
export type OptimizeRouteOutput = z.infer<typeof OptimizeRouteOutputSchema>;

export async function optimizeRoute(input: OptimizeRouteInput): Promise<OptimizeRouteOutput> {
  return optimizeRouteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeRoutePrompt',
  input: {schema: OptimizeRouteInputSchema},
  output: {schema: OptimizeRouteOutputSchema},
  prompt: `You are an expert route optimizer specializing in suggesting efficient delivery routes.

You will use the provided information about the start and end locations, real-time traffic conditions, and other relevant factors to suggest the most efficient route for a driver.
Consider all factors to minimize travel time and fuel consumption.

Start Location: {{{startLocation}}}
End Location: {{{endLocation}}}
Current Traffic Conditions: {{{currentTrafficConditions}}}
Other Relevant Factors: {{{otherRelevantFactors}}}

Reason about which information is most relevant to route optimization and provide that reasoning in the 'reasoning' field.
Suggest the best route in the 'suggestedRoute' field. Also estimate the travel time and fuel consumption in the 'estimatedTravelTime' and 'fuelConsumptionEstimate' fields respectively.
`,
});

const optimizeRouteFlow = ai.defineFlow(
  {
    name: 'optimizeRouteFlow',
    inputSchema: OptimizeRouteInputSchema,
    outputSchema: OptimizeRouteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
