import type { CollectionConfig } from 'payload'

export const FleetOwners: CollectionConfig = {
  slug: 'fleet-owners',
  admin: {
    useAsTitle: 'companyName'
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
      name: 'companyName',
      type: 'text',
      required: true,
    },
    {
      name: 'businessRegistrationNumber',
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
          name: 'insuranceCertificate',
          type: 'upload',
          relationTo: 'media',
          required: true,
        }
      ]
    }
  ]
}
