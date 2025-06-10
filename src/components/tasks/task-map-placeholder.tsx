
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Map } from 'lucide-react';
import Image from 'next/image';

interface TaskMapPlaceholderProps {
  tasks?: Array<{ id: string, pickupLocation: string, deliveryLocation: string }>;
}

export function TaskMapPlaceholder({ tasks = [] }: TaskMapPlaceholderProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl flex items-center">
          <Map className="mr-2 h-6 w-6 text-primary" />
          Interactive Task Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-4 relative overflow-hidden">
          <Image src="https://placehold.co/800x450.png" layout="fill" objectFit="cover" alt="Map placeholder" data-ai-hint="map navigation"/>
          <p className="absolute text-xl font-semibold text-background bg-foreground/50 p-2 rounded">Map Area - Coming Soon</p>
        </div>
        {tasks.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">Key Locations:</h4>
            <ul className="list-disc list-inside text-sm space-y-1">
              {tasks.slice(0, 3).map(task => ( // Show a few tasks as examples
                <li key={task.id}>
                  <strong>Task {task.id.substring(0,4)}:</strong> Pickup at <em>{task.pickupLocation}</em>, Deliver to <em>{task.deliveryLocation}</em>.
                </li>
              ))}
            </ul>
            {tasks.length > 3 && <p className="text-xs text-muted-foreground mt-1">...and {tasks.length - 3} more tasks.</p>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
