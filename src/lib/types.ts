
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
  // Add other vendor fields if needed for display
}

// Represents the structure from Payload Products collection
export interface Product {
  id: string;
  name: string;
  description: any; // RichText content (JSON or HTML string depending on fetch)
  price: number;
  vendor: PayloadVendor | string; // Populated vendor object or ID
  category?: string; // value from select
  images: Array<{
    image: PayloadMedia | string; // Populated media object or ID
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
  // Add other top-level fields from your Payload Products collection as needed
  // For nested group fields like ncx, paystar, shipping, variants, specifications, minimumOrder, certificates
  // define them here if you plan to use them directly on the frontend.
  // Example for one:
  shipping?: {
    weight?: number;
    dimensions?: {
      length?: number;
      width?: number;
      height?: number;
    };
    // other shipping fields
  };
  // For simplicity, not all deeply nested fields from Payload are typed here initially.
  // Add them as you need to display them.

  // --- Fields for compatibility with existing simple Product type ----
  // These will be derived in the components from the new structure
  legacyImageUrl?: string; // To be derived from images[0].image.url
  legacySupplierName?: string; // To be derived from vendor.businessName
  legacyDimensions?: string; // To be derived/formatted from shipping.dimensions
  legacyWeight?: string; // To be derived/formatted from shipping.weight
  legacyShippingCost?: number; // Might need a new strategy for this
  legacyImageAiHint?: string; // To be derived from images[0].image.alt
}


export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  buyerId: string; // This would map to user.id in Payload Order
  // sellerId: string; // This would map to seller.id in Payload Order
  items: Array<{ productId: string; quantity: number; price: number }>; // productId maps to product.id in Payload Order.products
  totalAmount: number; // maps to total in Payload Order
  status: OrderStatus; // maps to status in Payload Order
  orderDate: string; // maps to createdAt or a specific orderDate field in Payload Order
  deliveryAddress: string; // maps to shippingAddress fields in Payload Order
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
  imageUrl?: string; // This will use the first image from Product.images
  quantity: number;
  imageAiHint?: string; // This will use alt text from the first image
}
