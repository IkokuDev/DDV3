
export type UserRole = 'supplier' | 'buyer' | 'driver';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole | null;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  supplier: string; // Supplier name or ID
  imageUrl?: string;
  category?: string;
  dimensions: string; // e.g., "10cm x 5cm x 2cm"
  weight: string; // e.g., "500g"
  shippingCost: number;
  imageAiHint?: string; // For placeholder image generation
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

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
  likes: number; // Added likes field
}

export interface ForumComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
}

