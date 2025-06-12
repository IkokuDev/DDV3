import type { CollectionConfig } from 'payload/types'

export const Drivers: CollectionConfig = {
  slug: 'drivers',
  admin: {
    useAsTitle: 'name', // Assuming 'name' will be a top-level field or you'll add one.
                       // If 'name' is not a direct field, you might want to adjust this,
                       // or Payload will use the ID. Often a 'name' field is added or
                       // 'user' relationship's display field is used implicitly if configured.
                       // For now, I'll keep it as 'name' assuming one might be added or it's a placeholder.
                       // If user.name is desired, that usually happens automatically if 'user' is the first field.
                       // Let's add a name field for clarity.
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
      // admin: { // If you want to use the related user's email/name as a title part
      //   useAsTitle: false, // Set to false if you have a dedicated 'name' field for the driver
      // }
    },
    {
        name: 'name', // Added a name field for the driver, can be populated from user or entered manually
        type: 'text',
        required: true,
    },
    {
      name: 'fleetOwner',
      type: 'relationship',
      relationTo: 'fleet-owners',
      required: true,
      hasMany: false,
    },
    {
      name: 'licenseNumber',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'licenseExpiry',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'yyyy-MM-dd',
        },
      },
    },
    {
      name: 'experience', // in years
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'documents',
      type: 'group',
      fields: [
        {
          name: 'driverLicense',
          label: "Driver's License Document",
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'medicalCertificate',
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
        { label: 'On Trip', value: 'ON_TRIP' },
        { label: 'Off Duty', value: 'OFF_DUTY' }
      ],
      required: true,
    },
    {
      name: 'assignedVehicle',
      type: 'relationship',
      relationTo: 'vehicles',
      hasMany: false, // A driver is typically assigned to one vehicle at a time
    }
  ]
}
