
import type { CollectionConfig } from 'payload/types';

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'category', 'supplierName'],
    group: 'Shop', // Optional: to group in admin UI
  },
  access: {
    read: () => true, // Everyone can read products
    // More specific access control can be added later if needed
    // For example, only authenticated users with a 'supplier' role can create/update/delete.
    // create: ({ req: { user } }) => !!user && user.roles?.includes('supplier'),
    // update: ({ req: { user } }) => !!user && user.roles?.includes('supplier'),
    // delete: ({ req: { user } }) => !!user && user.roles?.includes('supplier'),
  },
  fields: [
    {
      name: 'name',
      label: 'Product Name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Product Description',
      type: 'textarea', // Using textarea for simplicity, can be 'richText' if editor is set up
    },
    {
      name: 'price',
      label: 'Price (NGN)',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Price in Nigerian Naira.',
      }
    },
    {
      name: 'supplierName',
      label: 'Supplier Name',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of the supplier or their store (e.g., Sahel Roasters).',
      },
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      options: [
        { label: 'Raw Materials', value: 'Raw Materials' },
        { label: 'Building Materials', value: 'Building Materials' },
        { label: 'Agric/Livestock', value: 'Agric/Livestock' },
        { label: 'Fuel Options', value: 'Fuel Options' },
        { label: 'Health Foods', value: 'Health Foods' },
        { label: 'Crafts', value: 'Crafts' },
        { label: 'Other', value: 'Other' },
      ],
      admin: {
        position: 'sidebar',
      }
    },
    {
      name: 'productImage',
      label: 'Product Image',
      type: 'upload',
      relationTo: 'media', // Links to the Media collection
      admin: {
        description: 'Upload the main image for the product.',
      }
    },
    {
      name: 'dimensions',
      label: 'Dimensions (e.g., 20cm x 10cm x 5cm)',
      type: 'text',
    },
    {
      name: 'weight',
      label: 'Weight (e.g., 500g or 1.5kg)',
      type: 'text',
    },
    {
      name: 'shippingCost',
      label: 'Estimated Shipping Cost (NGN)',
      type: 'number',
      min: 0,
      admin: {
        description: 'Estimated base shipping cost for this item.',
      }
    },
    // The 'id' field is automatically managed by Payload.
    // 'imageUrl' and 'imageAiHint' from the old Product type are covered by 'productImage' (Media relation)
    // and the 'alt' text in the Media collection respectively.
  ],
};
