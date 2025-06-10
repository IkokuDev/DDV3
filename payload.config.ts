import { buildConfig } from 'payload';
import { mongooseAdapter } from '@payloadcms/db-mongodb';

export default buildConfig({
  collections: [
    // Add your collections here
  ],
  globals: [
    // Add your globals here
  ],
  // Other configurations like admin panel, graphQL, etc. can go here
  db: mongooseAdapter({
    // Replace with your MongoDB connection string
    url: process.env.MONGODB_URI || 'YOUR_MONGODB_URL',
  }),
  // Add your secret key
  secret: process.env.PAYLOAD_SECRET || 'YOUR_SECRET_KEY',
  typescript: {
    outputFile: 'payload-types.ts',
  },
});
