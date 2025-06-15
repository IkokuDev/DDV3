
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

export interface PayloadUser { // Can be used for populated user fields
  id: string;
  name?: string; // name might not be a default field on Payload User
  email: string;
}

export interface PayloadVendor {
  id: string;
  businessName: string;
  user?: string | PayloadUser;
}

// Represents the structure from Payload Products collection
export interface Product {
  id:string;
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

export type OrderStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'PAYMENT_ESCROWED'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'INSPECTION_PASSED'
  | 'PAYMENT_RELEASED'
  | 'COMPLETED'
  | 'DISPUTED'
  | 'REFUNDED'
  | 'CANCELLED';

export interface OrderItem {
  product: string | Product; // Product ID or populated Product
  quantity: number;
  priceAtPurchase: number;
  id?: string; // Array item ID from Payload
}

export interface Order {
  id: string;
  user: string | PayloadUser; // Buyer: User ID or populated User
  seller: string | PayloadVendor; // Seller: Vendor ID or populated Vendor
  products: OrderItem[];
  total: number;
  subtotal: number;
  shippingCost?: number;
  marketplaceCommission?: number;
  logisticsServiceFee?: number;
  status: OrderStatus;
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'IN_ESCROW' | 'RELEASED' | 'REFUNDED';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  deliveryInstructions?: string;
  escrowDetails?: {
    escrowId?: string;
    releaseCode?: string;
    inspectionDeadline?: string;
    disputeReason?: string;
  };
  paymentProvider?: string;
  paymentDetails?: {
    transactionId?: string;
    paymentDate?: string;
    amountPaid?: number;
    currency?: string;
    providerMetadata?: any;
  };
  orderNotes?: Array<{
    note: string;
    user?: string | PayloadUser;
    timestamp?: string;
    id?: string;
  }>;
  createdAt: string; // Payload default
  updatedAt: string; // Payload default
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
