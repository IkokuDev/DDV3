import sharp from 'sharp'
import {lexicalEditor} from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload';
import { mongooseAdapter } from '@payloadcms/db-mongodb';

export default buildConfig({
  editor: lexicalEditor(),
  collections: [
    // Add your collections here
  ],
  globals: [
    // Add your globals here
  ],
  // Other configurations like admin panel, graphQL, etc. can go here
  db: mongooseAdapter({
    // Replace with your MongoDB connection string
    url: process.env.MONGODB_URI || '',
  }),
  // Add your secret key
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: 'payload-types.ts',
  },sharp,
});
