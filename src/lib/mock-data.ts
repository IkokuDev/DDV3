
import type { Product } from '@/lib/types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Arabica Coffee Beans',
    description: 'Fair-trade, single-origin Arabica coffee beans from highland farms. Roasted for a rich, aromatic brew.',
    price: 7500.00, // Example price in NGN
    supplier: 'Sahel Roasters',
    category: 'Agric/Livestock',
    imageUrl: 'https://placehold.co/600x400.png',
    dimensions: '20cm x 10cm x 5cm',
    weight: '500g',
    shippingCost: 500.00,
    imageAiHint: 'coffee beans'
  },
  {
    id: '2',
    name: 'Woven Palm Leaf Mats',
    description: 'Durable and versatile woven palm leaf mats, suitable for flooring or traditional roofing. Handcrafted by local artisans.',
    price: 3500.00,
    supplier: 'Artisans United',
    category: 'Building Materials', // Could also be raw material if for further processing
    imageUrl: 'https://placehold.co/600x400.png',
    dimensions: '2m x 1m roll',
    weight: '1.5kg',
    shippingCost: 1000.00,
    imageAiHint: 'woven mats'
  },
  {
    id: '3',
    name: 'Grade A Shea Butter',
    description: 'Pure, unrefined Grade A shea butter, ethically sourced. Excellent for cosmetics, traditional medicine, and soap making.',
    price: 4200.00,
    supplier: 'Naturelle Beauty',
    category: 'Raw Materials',
    imageUrl: 'https://placehold.co/600x400.png',
    dimensions: '15cm x 10cm x 10cm block',
    weight: '1kg',
    shippingCost: 600.00,
    imageAiHint: 'shea butter'
  },
  {
    id: '4',
    name: 'Dried Hibiscus (Zobo Leaves)',
    description: 'Bulk dried hibiscus calyces (Zobo leaves), perfect for producing refreshing Zobo drink, teas, or natural food coloring.',
    price: 2500.00,
    supplier: 'Sahel Flavors',
    category: 'Agric/Livestock',
    imageUrl: 'https://placehold.co/600x400.png',
    dimensions: '30cm x 20cm x 10cm bag',
    weight: '500g',
    shippingCost: 450.00,
    imageAiHint: 'hibiscus flowers'
  },
  {
    id: '5',
    name: 'Hardwood Charcoal Briquettes',
    description: 'Efficient and long-burning hardwood charcoal briquettes. Ideal for cooking and traditional smithing.',
    price: 5500.00,
    supplier: 'EcoFuel Sahel',
    category: 'Fuel Options',
    imageUrl: 'https://placehold.co/600x400.png',
    dimensions: '40cm x 30cm x 20cm bag',
    weight: '5kg',
    shippingCost: 800.00,
    imageAiHint: 'charcoal briquettes'
  },
  {
    id: '6',
    name: 'Laterite Soil (Red Earth)',
    description: 'High-quality laterite soil, rich in iron and aluminum, suitable for traditional rammed earth construction and road surfacing.',
    price: 15000.00, // Price per truckload/cubic meter
    supplier: 'Sahel Sands Co.',
    category: 'Building Materials',
    imageUrl: 'https://placehold.co/600x400.png',
    dimensions: 'Per cubic meter',
    weight: 'Approx 1.5 tons/m³',
    shippingCost: 5000.00,
    imageAiHint: 'laterite soil'
  },
  {
    id: '7',
    name: 'Gum Arabic (Acacia Senegal)',
    description: 'Natural, raw gum arabic lumps from Acacia Senegal trees. Widely used as a stabilizer in food, pharmaceuticals, and traditional inks.',
    price: 8000.00,
    supplier: 'Sahel Gums',
    category: 'Raw Materials',
    imageUrl: 'https://placehold.co/600x400.png',
    dimensions: '20cm x 15cm x 10cm bag',
    weight: '1kg',
    shippingCost: 700.00,
    imageAiHint: 'acacia gum'
  },
  {
    id: '8',
    name: 'Adobe Bricks (Sun-Dried)',
    description: 'Traditional sun-dried adobe bricks, made from local clay and organic binders. Excellent for sustainable and thermal-efficient walls.',
    price: 150.00, // Price per brick
    supplier: 'TerraBuild Sahel',
    category: 'Building Materials',
    imageUrl: 'https://placehold.co/600x400.png',
    dimensions: '30cm x 15cm x 10cm per brick',
    weight: '6kg per brick',
    shippingCost: 50.00, // Per brick, bulk shipping varies
    imageAiHint: 'adobe bricks'
  },
  {
    id: '9',
    name: 'Millet Grain (Sorghum)',
    description: 'Whole millet grain (sorghum), a drought-resistant staple crop in the Sahel. Nutritious and versatile for porridges, flour, and animal feed.',
    price: 1200.00, // Price per kg
    supplier: 'FarmFresh Sahel',
    category: 'Agric/Livestock',
    imageUrl: 'https://placehold.co/600x400.png',
    dimensions: 'Sold per kg',
    weight: '1kg',
    shippingCost: 350.00,
    imageAiHint: 'millet grain'
  },
  {
    id: '10',
    name: 'Cow Dung Fuel Cakes',
    description: 'Dried cow dung cakes, a traditional and renewable fuel source for cooking in many Sahelian communities. Sold in stacks.',
    price: 500.00, // Price per stack
    supplier: 'Rural Energy Sources',
    category: 'Fuel Options',
    imageUrl: 'https://placehold.co/600x400.png',
    dimensions: 'Approx. 30cm diameter per cake',
    weight: 'Varies per stack',
    shippingCost: 200.00,
    imageAiHint: 'dung cakes'
  }
];
