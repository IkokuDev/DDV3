
import type { Task, TaskStatus } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Package, Calendar, Info, CheckCircle, PlayCircle, AlertCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"


interface TaskListItemProps {
  task: Task;
  onUpdateStatus: (taskId: string, newStatus: TaskStatus) => void;
}

const statusVariantMap: Record<TaskStatus, "default" | "secondary" | "destructive" | "outline"> = {
  Assigned: 'default',
  Accepted: 'secondary',
  'In Progress': 'outline',
  'Pickup Complete': 'outline',
  'Delivery Complete': 'default', // Consider success variant
  Cancelled: 'destructive',
};

const statusColorMap: Record<TaskStatus, string> = {
  Assigned: 'bg-orange-500',
  Accepted: 'bg-yellow-500',
  'In Progress': 'bg-blue-500',
  'Pickup Complete': 'bg-indigo-500',
  'Delivery Complete': 'bg-green-500',
  Cancelled: 'bg-red-500',
};

const statusIconMap: Record<TaskStatus, React.ElementType> = {
  Assigned: AlertCircle,
  Accepted: PlayCircle,
  'In Progress': PlayCircle,
  'Pickup Complete': CheckCircle,
  'Delivery Complete': CheckCircle,
  Cancelled: AlertCircle,
}


export function TaskListItem({ task, onUpdateStatus }: TaskListItemProps) {
  const StatusIcon = statusIconMap[task.status] || Info;

  const nextStatusOptions: Partial<Record<TaskStatus, TaskStatus[]>> = {
    Assigned: ['Accepted', 'Cancelled'],
    Accepted: ['In Progress', 'Cancelled'],
    'In Progress': ['Pickup Complete', 'Cancelled'],
    'Pickup Complete': ['Delivery Complete', 'Cancelled'],
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="font-headline text-xl">Task #{task.id.substring(0,6)} (Order #{task.orderId.substring(0,6)})</CardTitle>
            <CardDescription className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" /> Assigned: {new Date(task.assignedDate).toLocaleDateString()}
            </CardDescription>
          </div>
          <Badge className={`text-white ${statusColorMap[task.status]}`}>
            <StatusIcon className="mr-1 h-3 w-3" />
            {task.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-start text-sm">
          <MapPin className="mr-2 h-4 w-4 text-primary mt-1 flex-shrink-0" />
          <div>
            <span className="font-medium text-foreground/80">Pickup: </span>
            <span className="text-muted-foreground">{task.pickupLocation}</span>
          </div>
        </div>
        <div className="flex items-start text-sm">
          <MapPin className="mr-2 h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
          <div>
            <span className="font-medium text-foreground/80">Delivery: </span>
            <span className="text-muted-foreground">{task.deliveryLocation}</span>
          </div>
        </div>
        {task.estimatedDeliveryDate && (
          <div className="flex items-center text-sm">
            <Calendar className="mr-2 h-4 w-4 text-primary" />
            <span>Est. Delivery: {new Date(task.estimatedDeliveryDate).toLocaleDateString()}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button variant="outline" size="sm">
          <Info className="mr-2 h-4 w-4" /> View Details
        </Button>
        {nextStatusOptions[task.status] && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm">Update Status <MoreHorizontal className="ml-2 h-4 w-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Change Status to:</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {nextStatusOptions[task.status]?.map(newStatus => (
                 <DropdownMenuItem key={newStatus} onClick={() => onUpdateStatus(task.id, newStatus)}>
                   {newStatus}
                 </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardFooter>
    </Card>
  );
}
