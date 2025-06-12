import type { CollectionConfig } from "payload/types"

export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "id", // Using ID as title, or consider a custom label function if needed
    defaultColumns: ['id', 'user', 'seller', 'total', 'status', 'paymentStatus', 'createdAt'],
    listSearchableFields: ['id', 'user', 'seller'],
  },
  access: {
    read: () => true,
    create: () => true,
    // Add more granular access control as needed
    // update: ({ req: { user } }) => user?.role === 'admin', // Example
    // delete: ({ req: { user } }) => user?.role === 'admin', // Example
  },
  fields: [
    {
      name: "user", // The buyer
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        description: "The user who placed the order (buyer)."
      }
    },
    {
      name: "seller", // The vendor/supplier user
      type: "relationship",
      relationTo: "users", // Assuming sellers are also users, or this could relate to 'vendors' if vendors have their own user accounts separate from general users.
      required: true,
      hasMany: false,
      admin: {
        description: "The user who is selling the products (supplier/vendor)."
      }
    },
    {
      name: "products",
      type: "array",
      required: true,
      minRows: 1,
      labels: {
        singular: 'Product Line Item',
        plural: 'Product Line Items',
      },
      fields: [
        {
          name: "product",
          type: "relationship",
          relationTo: "products",
          required: true,
          hasMany: false,
        },
        {
          name: "quantity",
          type: "number",
          required: true,
          min: 1,
          defaultValue: 1,
        },
        {
          name: "priceAtPurchase", // Store the price at the time of purchase to avoid issues if product price changes later
          type: "number",
          required: true,
          admin: {
            description: "Price of the product per unit at the time of order.",
            readOnly: true, // Typically set programmatically
          }
        }
      ],
    },
    {
      name: "total",
      type: "number",
      required: true,
      min: 0,
      admin: {
        description: "Total amount for the order."
      }
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "PENDING",
      options: [
        { label: "Pending", value: "PENDING" },
        { label: "Payment Held in Escrow", value: "PAYMENT_ESCROWED" },
        { label: "Shipped", value: "SHIPPED" },
        { label: "Delivered", value: "DELIVERED" },
        { label: "Inspection Passed", value: "INSPECTION_PASSED" },
        { label: "Payment Released", value: "PAYMENT_RELEASED" },
        { label: "Disputed", value: "DISPUTED" },
        { label: "Refunded", value: "REFUNDED" },
        { label: "Cancelled", value: "CANCELLED" },
      ],
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: "paymentStatus",
      type: "select",
      required: true,
      defaultValue: "PENDING",
      options: [
        { label: "Pending", value: "PENDING" },
        { label: "Held in Escrow", value: "IN_ESCROW" },
        { label: "Released to Seller", value: "RELEASED" },
        { label: "Refunded to Buyer", value: "REFUNDED" },
      ],
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: "shippingAddress",
      type: "group",
      fields: [
        { name: "street", type: "text", required: true },
        { name: "city", type: "text", required: true },
        { name: "state", type: "text", required: true },
        { name: "zip", type: "text", required: true },
        { name: "country", type: "text", required: true, defaultValue: "Nigeria" } // Example default
      ]
    },
    {
        name: "deliveryInstructions",
        type: "textarea",
    },
    {
      name: "escrowDetails",
      label: "Escrow Information",
      type: "group",
      admin: {
        description: "Details related to the escrow process for this order."
      },
      fields: [
        {
          name: "escrowId",
          type: "text",
          admin: {
            description: "External escrow service reference ID, if applicable.",
          },
        },
        {
          name: "releaseCode",
          type: "text",
          admin: {
            description: "Code required by the buyer to release funds to the seller.",
          },
        },
        {
          name: "inspectionDeadline",
          type: "date",
          admin: {
            description: "Deadline for the buyer to inspect goods and approve or dispute.",
            date: {
              pickerAppearance: 'dayAndTime'
            }
          },
        },
        {
          name: "disputeReason",
          type: "textarea",
          admin: {
            description: "Reason provided if the order is disputed by the buyer.",
            condition: (data, siblingData) => siblingData.status === 'DISPUTED'
          },
        },
      ],
    },
    {
      name: "paymentProvider",
      type: "select",
      defaultValue: "STRIPE", // Assuming Stripe is a primary option
      options: [
        { label: "Stripe", value: "STRIPE" },
        { label: "Paystack", value: "PAYSTACK" }, // Common in Nigeria
        { label: "Flutterwave", value: "FLUTTERWAVE" }, // Common in Africa
        { label: "Bank Transfer", value: "BANK_TRANSFER" },
        { label: "Other", value: "OTHER" },
      ],
    },
    {
      name: "paymentDetails", // Renamed from paymentMetadata for clarity
      type: "group",
      label: "Payment Transaction Details",
      fields: [
        {
          name: "transactionId",
          type: "text",
          admin: {
            description: "Payment provider's transaction ID."
          }
        },
        {
          name: "paymentDate",
          type: "date",
          admin: {
            date: {
                pickerAppearance: 'dayAndTime'
            }
          }
        },
        {
          name: "amountPaid",
          type: "number"
        },
        {
            name: "currency",
            type: "text",
            defaultValue: "NGN"
        },
        {
          name: "providerMetadata", // Specific metadata from provider
          type: "json",
          admin: {
            description: "Additional payment details from the provider (e.g., raw response).",
          },
        }
      ]
    },
    {
        name: "orderNotes",
        type: "array",
        label: "Order History & Notes",
        fields: [
            {
                name: "note",
                type: "textarea",
                required: true,
            },
            {
                name: "user", // User who added the note (admin, buyer, seller)
                type: "relationship",
                relationTo: "users"
            },
            {
                name: "timestamp",
                type: "date",
                defaultValue: () => new Date(),
                admin: {
                    readOnly: true,
                }
            }
        ]
    }
  ],
}
