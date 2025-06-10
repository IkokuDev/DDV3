
import type { Order, OrderStatus } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Package, Truck, Info } from 'lucide-react'; // Removed DollarSign

interface OrderListItemProps {
  order: Order;
}

const statusVariantMap: Record<OrderStatus, "default" | "secondary" | "destructive" | "outline"> = {
  Pending: 'default',
  Processing: 'secondary',
  Shipped: 'outline',
  Delivered: 'default', // Consider a success variant if available or custom style
  Cancelled: 'destructive',
};

const statusColorMap: Record<OrderStatus, string> = {
  Pending: 'bg-yellow-500',
  Processing: 'bg-blue-500',
  Shipped: 'bg-purple-500',
  Delivered: 'bg-green-500',
  Cancelled: 'bg-red-500',
};


export function OrderListItem({ order }: OrderListItemProps) {
  const getStatusBadgeVariant = (status: OrderStatus) => {
    if (status === 'Delivered') return 'default'; // Using 'default' which is primary
    if (status === 'Pending') return 'secondary'; // Using 'secondary'
    return statusVariantMap[status] || 'outline';
  };
  
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="font-headline text-xl">Order #{order.id.substring(0, 8)}</CardTitle>
            <CardDescription className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" /> Placed on: {new Date(order.orderDate).toLocaleDateString()}
            </CardDescription>
          </div>
          <Badge 
            // variant={getStatusBadgeVariant(order.status)} 
            className={`text-white ${statusColorMap[order.status]}`}
          >
            {order.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center text-sm">
          <Package className="mr-2 h-4 w-4 text-primary" />
          <span>{order.items.reduce((acc, item) => acc + item.quantity, 0)} items</span>
        </div>
        <div className="flex items-center text-sm">
          {/* <DollarSign className="mr-2 h-4 w-4 text-primary" /> */}
          <span className="font-semibold text-primary mr-1">₦</span>
          <span>Total: {order.totalAmount.toFixed(2)}</span>
        </div>
        <div className="text-sm">
          <p className="font-medium text-foreground/80">Delivery Address:</p>
          <p className="text-muted-foreground">{order.deliveryAddress}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          <Info className="mr-2 h-4 w-4" /> View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
