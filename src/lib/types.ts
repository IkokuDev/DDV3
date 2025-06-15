
export type UserRole = 'supplier' | 'buyer' | 'driver';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole | null;
}

// Payload Specific Types (simplified for frontend use)
export interface PayloadMedia {
  id: string;
  alt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
}

export interface PayloadVendor {
  id: string;
  businessName: string;
  user?: string | User; // A vendor might be linked to a user account (ID or populated)
}

// Represents the structure from Payload Products collection
export interface Product {
  id: string;
  name: string;
  description: any; // RichText content (JSON from Payload)
  price: number;
  vendor: PayloadVendor | string; // Populated vendor object (PayloadVendor) or vendor ID (string)
  category?: string; 
  images: Array<{
    image: PayloadMedia | string; 
    id?: string;
  }>;
  priceUnit?: string;
  status?: string;
  inventory?: {
    quantity?: number;
    lowStockThreshold?: number;
    trackingEnabled?: boolean;
    allowBackorders?: boolean;
    reservedQuantity?: number;
  };
  shipping?: {
    weight?: number;
    dimensions?: {
      length?: number;
      width?: number;
      height?: number;
    };
  };
}


export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Completed' | 'Payment Escrowed' | 'Inspection Passed' | 'Payment Released' | 'Disputed' | 'Refunded' ;


export interface Order {
  id: string;
  buyerId: string; 
  items: Array<{ productId: string; quantity: number; price: number }>; 
  totalAmount: number; 
  status: OrderStatus; 
  orderDate: string; 
  deliveryAddress: string; 
}

export type TaskStatus = 'Assigned' | 'Accepted' | 'In Progress' | 'Pickup Complete' | 'Delivery Complete' | 'Cancelled';

export interface Task {
  id: string;
  orderId: string;
  driverId?: string;
  pickupLocation: string;
  deliveryLocation: string;
  status: TaskStatus;
  assignedDate: string;
  estimatedDeliveryDate?: string;
  actualDeliveryDate?: string;
}

export interface ForumPost {
  id: string;
  authorId: string;
  authorName: string;
  title: string;
  content: string;
  createdAt: string;
  commentsCount: number;
  likes: number;
}

export interface ForumComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
}

export interface CartItem {
  id: string; // Product ID
  name: string;
  price: number;
  imageUrl?: string; 
  quantity: number;
  imageAiHint?: string;
  vendorId: string; // ID of the Vendor (from Product.vendor.id)
}
