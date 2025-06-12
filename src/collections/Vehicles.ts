import type { CollectionConfig } from 'payload/types'

export const Vehicles: CollectionConfig = {
  slug: 'vehicles',
  admin: {
    useAsTitle: 'licensePlate',
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'fleetOwner',
      type: 'relationship',
      relationTo: 'fleet-owners', // This collection will need to be defined
      required: true,
      hasMany: false,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Truck', value: 'TRUCK' },
        { label: 'Van', value: 'VAN' },
        { label: 'Trailer', value: 'TRAILER' }
      ]
    },
    {
      name: 'make',
      type: 'text',
      required: true,
    },
    {
      name: 'model',
      type: 'text',
      required: true,
    },
    {
      name: 'year',
      type: 'number',
      required: true,
      min: 1900,
      max: new Date().getFullYear() + 1, // Ensures current year + 1 is max
    },
    {
      name: 'licensePlate',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'capacity',
      type: 'group',
      fields: [
        {
          name: 'weight',
          type: 'number',
          required: true,
          min: 0,
          label: 'Maximum Weight (kg)',
        },
        {
          name: 'volume',
          type: 'number',
          required: true,
          min: 0,
          label: 'Volume Capacity (m³)',
        }
      ]
    },
    {
      name: 'documents',
      type: 'group',
      fields: [
        {
          name: 'registration',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'insurance',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'inspection',
          type: 'upload',
          relationTo: 'media',
          required: true,
        }
      ]
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'AVAILABLE',
      options: [
        { label: 'Available', value: 'AVAILABLE' },
        { label: 'In Use', value: 'IN_USE' },
        { label: 'Maintenance', value: 'MAINTENANCE' }
      ],
      required: true,
    },
    {
      name: 'maintenanceHistory',
      type: 'array',
      fields: [
        {
          name: 'date',
          type: 'date',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'cost',
          type: 'number',
          required: true,
          min: 0,
        }
      ]
    },
    {
      name: 'assignedDriver',
      type: 'relationship',
      relationTo: 'drivers', // This collection will need to be defined
      hasMany: false,
    }
  ]
}
