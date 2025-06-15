
import type { Order, OrderStatus } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Package, Info, ShoppingBag, Truck, CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';

interface OrderListItemProps {
  order: Order;
}

// Enhanced status styling
const statusStyles: Record<OrderStatus, { color: string; icon: React.ElementType; label: string }> = {
  PENDING: { color: 'bg-yellow-500', icon: AlertCircle, label: 'Pending' },
  PROCESSING: { color: 'bg-blue-500', icon: RefreshCw, label: 'Processing' },
  PAYMENT_ESCROWED: { color: 'bg-cyan-500', icon: ShoppingBag, label: 'Payment Escrowed' },
  SHIPPED: { color: 'bg-purple-500', icon: Truck, label: 'Shipped' },
  DELIVERED: { color: 'bg-teal-500', icon: Package, label: 'Delivered' },
  INSPECTION_PASSED: { color: 'bg-lime-500', icon: CheckCircle, label: 'Inspection Passed' },
  PAYMENT_RELEASED: { color: 'bg-emerald-500', icon: CheckCircle, label: 'Payment Released' },
  COMPLETED: { color: 'bg-green-600', icon: CheckCircle, label: 'Completed' },
  DISPUTED: { color: 'bg-orange-600', icon: AlertCircle, label: 'Disputed' },
  REFUNDED: { color: 'bg-gray-500', icon: RefreshCw, label: 'Refunded' },
  CANCELLED: { color: 'bg-red-600', icon: XCircle, label: 'Cancelled' },
};


export function OrderListItem({ order }: OrderListItemProps) {
  const styleInfo = statusStyles[order.status] || { color: 'bg-gray-400', icon: Info, label: order.status.replace(/_/g, ' ') };
  const StatusIcon = styleInfo.icon;

  const totalItems = order.products.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="font-headline text-xl">Order #{order.id.substring(0, 8)}</CardTitle>
            <CardDescription className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" /> Placed: {new Date(order.createdAt).toLocaleDateString()}
            </CardDescription>
          </div>
          <Badge 
            className={`text-white ${styleInfo.color} whitespace-nowrap`}
          >
            <StatusIcon className="mr-1.5 h-3.5 w-3.5" />
            {styleInfo.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 flex-grow">
        <div className="flex items-center text-sm">
          <Package className="mr-2 h-4 w-4 text-primary" />
          <span>{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
        </div>
        <div className="flex items-center text-sm">
          <span className="font-semibold text-primary mr-1">₦</span>
          <span>Total: {order.total.toFixed(2)}</span>
        </div>
        <div className="text-sm">
          <p className="font-medium text-foreground/80">Shipping To:</p>
          <p className="text-muted-foreground">
            {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state}
          </p>
        </div>
         {/* Display seller information if available */}
        {order.seller && (
          <div className="text-sm">
            <p className="font-medium text-foreground/80">Seller:</p>
            <p className="text-muted-foreground">
              {typeof order.seller === 'object' ? order.seller.businessName : order.seller}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          <Info className="mr-2 h-4 w-4" /> View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
