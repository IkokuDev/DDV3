// src/app/(payload)/api/payload/[...slug]/route.ts
/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import configPromise from '@payload-config';
import '@payloadcms/next/css';
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from '@payloadcms/next/routes';

// Ensure configPromise is correctly passed to each REST helper.
// These handlers will provide the default REST API behavior for your collections.
export const GET = REST_GET(configPromise);
export const POST = REST_POST(configPromise);
export const DELETE = REST_DELETE(configPromise);
export const PATCH = REST_PATCH(configPromise);
export const PUT = REST_PUT(configPromise);
export const OPTIONS = REST_OPTIONS(configPromise);

// The previous custom logic and specific collection handling in this file
// are now managed by more specific route files (e.g., /api/payload/products/route.ts)
// or handled by Payload's default REST behavior through the helpers above.
