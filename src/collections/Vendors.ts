import type { CollectionConfig } from 'payload'

export const Vendors: CollectionConfig = {
  slug: 'vendors',
  admin: {
    useAsTitle: 'businessName'
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
    },
    {
      name: 'businessName',
      type: 'text',
      required: true,
    },
    {
      name: 'businessType',
      type: 'select',
      required: true,
      options: [
        { label: 'Solid Minerals', value: 'solid_minerals' },
        { label: 'Agriculture', value: 'agric_products' },
        { label: 'Building Materials', value: 'raw_materials' },
        { label: 'Petrol & Gas', value: 'petrol_gas' }
      ]
    },
    {
      name: 'registrationNumber',
      type: 'text',
      required: true,
    },
    {
      name: 'address',
      type: 'group',
      fields: [
        {
          name: 'street',
          type: 'text',
          required: true,
        },
        {
          name: 'city',
          type: 'text',
          required: true,
        },
        {
          name: 'state',
          type: 'text',
          required: true,
        },
        {
          name: 'zip',
          type: 'text',
          required: true,
        }
      ]
    },
    {
      name: 'documents',
      type: 'group',
      fields: [
        {
          name: 'businessLicense',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'taxCertificate',
          type: 'upload',
          relationTo: 'media',
          required: true,
        }
      ]
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'PENDING',
      options: [
        { label: 'Pending', value: 'PENDING' },
        { label: 'Approved', value: 'APPROVED' },
        { label: 'Suspended', value: 'SUSPENDED' }
      ],
      required: true,
    }
  ]
}
