
import type { Product } from '@/lib/types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Artisan Coffee Beans',
    description: 'Fair-trade, single-origin coffee beans from the Sahel region. Roasted to perfection for a rich, aromatic brew.',
    price: 15.99,
    supplier: 'Sahel Roasters',
    category: 'Agric/Livestock',
    imageUrl: 'https://placehold.co/600x400.png',
    dimensions: '20cm x 10cm x 5cm',
    weight: '500g',
    shippingCost: 5.00,
    imageAiHint: 'coffee beans'
  },
  {
    id: '2',
    name: 'Woven Reed Mats',
    description: 'Strong and versatile woven reed mats, suitable for flooring or light construction applications in traditional Sahel architecture.',
    price: 25.00,
    supplier: 'Artisans United',
    category: 'Building Materials',
    imageUrl: 'https://placehold.co/600x400.png',
    dimensions: '2m x 1m roll',
    weight: '1.5kg',
    shippingCost: 10.00,
    imageAiHint: 'woven mats'
  },
  {
    id: '3',
    name: 'Raw Shea Butter',
    description: 'Pure, unrefined shea butter, ethically sourced. Excellent for skincare, soap making, or as a natural conditioning agent.',
    price: 18.50, // Adjusted price
    supplier: 'Naturelle Beauty',
    category: 'Raw Materials',
    imageUrl: 'https://placehold.co/600x400.png',
    dimensions: '15cm x 10cm x 10cm block',
    weight: '1kg',
    shippingCost: 6.00,
    imageAiHint: 'shea butter'
  },
  {
    id: '4',
    name: 'Dried Hibiscus Flowers',
    description: 'Bulk dried hibiscus flowers, perfect for producing refreshing bissap juice, teas, or natural food coloring.',
    price: 12.00,
    supplier: 'Sahel Flavors',
    category: 'Agric/Livestock',
    imageUrl: 'https://placehold.co/600x400.png',
    dimensions: '30cm x 20cm x 10cm bag',
    weight: '500g',
    shippingCost: 4.50,
    imageAiHint: 'hibiscus flowers'
  },
  {
    id: '5',
    name: 'Charcoal Briquettes',
    description: 'Efficient and long-burning charcoal briquettes made from sustainable sources. Ideal for cooking and heating purposes.',
    price: 22.00, // Adjusted price
    supplier: 'EcoFuel Sahel',
    category: 'Fuel Options',
    imageUrl: 'https://placehold.co/600x400.png',
    dimensions: '40cm x 30cm x 20cm bag',
    weight: '5kg',
    shippingCost: 8.00,
    imageAiHint: 'charcoal briquettes'
  },
  {
    id: '6',
    name: 'Construction Sand',
    description: 'High-quality, clean construction sand, suitable for mortar, concrete, and various building projects. Sold per cubic meter.',
    price: 50.00, // Adjusted price for a larger unit
    supplier: 'Sahel Sands Co.',
    category: 'Building Materials',
    imageUrl: 'https://placehold.co/600x400.png',
    dimensions: 'Per cubic meter',
    weight: 'Approx 1.5 tons/m³',
    shippingCost: 25.00, // Higher due to weight
    imageAiHint: 'construction sand'
  },
  {
    id: '7',
    name: 'Acacia Gum Lumps',
    description: 'Natural, raw acacia gum (gum arabic) lumps. Widely used in food, pharmaceuticals, and various industrial applications.',
    price: 35.00,
    supplier: 'Sahel Gums',
    category: 'Raw Materials',
    imageUrl: 'https://placehold.co/600x400.png',
    dimensions: '20cm x 15cm x 10cm bag',
    weight: '1kg',
    shippingCost: 7.00,
    imageAiHint: 'acacia gum'
  },
  {
    id: '8',
    name: 'Compressed Earth Blocks',
    description: 'Eco-friendly compressed earth blocks (CEB) for sustainable construction. Strong, durable, and provides excellent thermal mass.',
    price: 2.50, // Price per block
    supplier: 'TerraBuild Sahel',
    category: 'Building Materials',
    imageUrl: 'https://placehold.co/600x400.png',
    dimensions: '30cm x 15cm x 10cm per block',
    weight: '8kg per block',
    shippingCost: 1.00, // Per block, bulk shipping varies
    imageAiHint: 'earth blocks'
  },
  {
    id: '9',
    name: 'Groundnut Harvest',
    description: 'Freshly harvested groundnuts (peanuts), available shelled or unshelled. A staple crop in the Sahel, rich in protein and oil.',
    price: 10.50, // Price per kg
    supplier: 'FarmFresh Sahel',
    category: 'Agric/Livestock',
    imageUrl: 'https://placehold.co/600x400.png',
    dimensions: 'Sold per kg',
    weight: '1kg',
    shippingCost: 3.50,
    imageAiHint: 'groundnuts peanuts'
  },
  {
    id: '10',
    name: 'Solar Lanterns',
    description: 'Durable and efficient solar-powered lanterns, providing reliable off-grid lighting. Essential for areas with limited electricity access.',
    price: 18.00,
    supplier: 'Sahel Solar Solutions',
    category: 'Fuel Options', // Considered as an alternative energy/lighting solution
    imageUrl: 'https://placehold.co/600x400.png',
    dimensions: '15cm x 10cm x 10cm',
    weight: '300g',
    shippingCost: 5.00,
    imageAiHint: 'solar lantern'
  }
];
