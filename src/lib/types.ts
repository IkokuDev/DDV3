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
}

export interface ForumComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
}
