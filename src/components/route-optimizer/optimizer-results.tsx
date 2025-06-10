
import type { OptimizeRouteOutput } from '@/ai/flows/route-optimization';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Fuel, MessageCircle, Route } from 'lucide-react';

interface OptimizerResultsProps {
  results: OptimizeRouteOutput;
}

export function OptimizerResults({ results }: OptimizerResultsProps) {
  return (
    <Card className="w-full shadow-xl mt-6">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="h-10 w-10 text-green-600" />
            <div>
                <CardTitle className="font-headline text-2xl">Optimized Route Suggestion</CardTitle>
                <CardDescription>Here's the AI-powered route recommendation.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg flex items-center mb-1">
            <Route className="mr-2 h-5 w-5 text-primary" /> Suggested Route
          </h3>
          <p className="text-muted-foreground bg-muted p-3 rounded-md">{results.suggestedRoute}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-lg flex items-center mb-1">
                <Clock className="mr-2 h-5 w-5 text-primary" /> Estimated Travel Time
              </h3>
              <p className="text-muted-foreground bg-muted p-3 rounded-md">{results.estimatedTravelTime}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg flex items-center mb-1">
                <Fuel className="mr-2 h-5 w-5 text-primary" /> Fuel Consumption Estimate
              </h3>
              <p className="text-muted-foreground bg-muted p-3 rounded-md">{results.fuelConsumptionEstimate}</p>
            </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg flex items-center mb-1">
            <MessageCircle className="mr-2 h-5 w-5 text-primary" /> AI Reasoning
          </h3>
          <p className="text-muted-foreground bg-muted p-3 rounded-md whitespace-pre-line">{results.reasoning}</p>
        </div>
      </CardContent>
    </Card>
  );
}
