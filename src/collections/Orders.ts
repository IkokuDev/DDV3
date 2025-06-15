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
    create: () => true, // Allow creation for authenticated users or define specific logic
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
      name: "seller", // The vendor/supplier
      type: "relationship",
      relationTo: "vendors", // Changed: Relates to Vendors collection
      required: true,
      hasMany: false,
      admin: {
        description: "The vendor who is selling the products."
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
            // This should be set programmatically when order is created
          }
        }
      ],
    },
    {
      name: "total", // Overall order total including items, shipping, fees etc.
      type: "number",
      required: true,
      min: 0,
      admin: {
        description: "Total amount for the order."
      }
    },
    {
      name: "subtotal", // Total of (priceAtPurchase * quantity) for all products
      type: "number",
      required: true,
      admin: {
        description: "Subtotal of all product line items."
      }
    },
    {
      name: "shippingCost",
      type: "number",
      defaultValue: 0,
      admin: {
        description: "Cost of shipping for this order."
      }
    },
    {
      name: "marketplaceCommission",
      type: "number",
      defaultValue: 0,
      admin: {
        description: "Commission for the marketplace platform."
      }
    },
    {
      name: "logisticsServiceFee",
      type: "number",
      defaultValue: 0,
      admin: {
        description: "Fee for logistics services."
      }
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "PENDING",
      options: [
        { label: "Pending", value: "PENDING" }, // Order placed, awaiting payment/processing
        { label: "Processing", value: "PROCESSING" }, // Payment received, order being prepared
        { label: "Payment Escrowed", value: "PAYMENT_ESCROWED" },
        { label: "Shipped", value: "SHIPPED" },
        { label: "Delivered", value: "DELIVERED" },
        { label: "Inspection Passed", value: "INSPECTION_PASSED" },
        { label: "Payment Released", value: "PAYMENT_RELEASED" },
        { label: "Completed", value: "COMPLETED" }, // Order fulfilled and payment released
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
        { label: "Paid", value: "PAID"},
        { label: "Failed", value: "FAILED"},
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
        { name: "country", type: "text", required: true, defaultValue: "Mali" } // Updated default
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
            condition: (_data, siblingData) => siblingData.status === 'DISPUTED' // Corrected condition
          },
        },
      ],
    },
    {
      name: "paymentProvider",
      type: "select",
      // defaultValue: "STRIPE", // Removed default as payment method might not be known upfront
      options: [
        { label: "Stripe", value: "STRIPE" },
        { label: "Paystack", value: "PAYSTACK" },
        { label: "Flutterwave", value: "FLUTTERWAVE" },
        { label: "Bank Transfer", value: "BANK_TRANSFER" },
        { label: "Cash On Delivery", value: "COD"},
        { label: "Other", value: "OTHER" },
      ],
    },
    {
      name: "paymentDetails",
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
            defaultValue: "NGN" // Consider XOF for Mali
        },
        {
          name: "providerMetadata",
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
                name: "user",
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
