
import type { Product } from '@/lib/types';

export const mockProducts: Product[] = [
  { 
    id: '1', 
    name: 'Artisan Coffee Beans', 
    description: 'Fair-trade, single-origin coffee beans from the Sahel region. Roasted to perfection for a rich, aromatic brew.', 
    price: 15.99, 
    supplier: 'Sahel Roasters', 
    category: 'Groceries', 
    imageUrl: 'https://placehold.co/600x400.png', 
    dimensions: '20cm x 10cm x 5cm', 
    weight: '500g', 
    shippingCost: 5.00,
    imageAiHint: 'coffee beans'
  },
  { 
    id: '2', 
    name: 'Handwoven Basket', 
    description: 'Beautiful and durable basket handcrafted by local artisans using traditional weaving techniques and sustainable materials.', 
    price: 25.00, 
    supplier: 'Artisans United', 
    category: 'Home Goods', 
    imageUrl: 'https://placehold.co/600x400.png', 
    dimensions: '30cm diameter x 15cm height', 
    weight: '300g', 
    shippingCost: 7.50,
    imageAiHint: 'woven basket'
  },
  { 
    id: '3', 
    name: 'Shea Butter Soap', 
    description: 'Natural shea butter soap, unscented and deeply nourishing for all skin types. Made with pure, ethically sourced shea butter.', 
    price: 8.50, 
    supplier: 'Naturelle Beauty', 
    category: 'Beauty', 
    imageUrl: 'https://placehold.co/600x400.png', 
    dimensions: '8cm x 5cm x 3cm', 
    weight: '100g', 
    shippingCost: 3.00,
    imageAiHint: 'shea butter'
  },
  { 
    id: '4', 
    name: 'Spiced Hibiscus Tea', 
    description: 'Refreshing and aromatic hibiscus tea blend with a unique mix of local spices. Perfect hot or iced.', 
    price: 12.00, 
    supplier: 'Sahel Flavors', 
    category: 'Groceries', 
    imageUrl: 'https://placehold.co/600x400.png', 
    dimensions: '15cm x 8cm x 4cm', 
    weight: '150g', 
    shippingCost: 4.00,
    imageAiHint: 'hibiscus tea'
  },
  { 
    id: '5', 
    name: 'Leather Sandals', 
    description: 'Handmade leather sandals featuring a traditional Sahelian design. Comfortable and stylish for everyday wear.', 
    price: 45.00, 
    supplier: 'Crafts of Africa', 
    category: 'Apparel', 
    imageUrl: 'https://placehold.co/600x400.png', 
    dimensions: 'Size 42 (EU)', 
    weight: '600g', 
    shippingCost: 8.00,
    imageAiHint: 'leather sandals'
  },
  { 
    id: '6', 
    name: 'Millet Flour', 
    description: 'Organic, stone-ground millet flour, a nutritious staple in Sahelian cuisine. Ideal for porridge, bread, and traditional dishes.', 
    price: 9.75, 
    supplier: 'FarmFresh Sahel', 
    category: 'Groceries', 
    imageUrl: 'https://placehold.co/600x400.png', 
    dimensions: '25cm x 15cm x 8cm', 
    weight: '1kg', 
    shippingCost: 6.00,
    imageAiHint: 'millet flour'
  },
];
