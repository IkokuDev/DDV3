
// src/app/(payload)/api/payload/[...slug]/route.ts
/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import configPromise from '@payload-config';
import '@payloadcms/next/css'
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
  generatePayloadAPI,
} from '@payloadcms/next/routes'
import { getPayload } from 'payload';


// Ensure config is awaited properly before passing to generatePayloadAPI
// This is a common pattern if config itself is async.
// However, generatePayloadAPI expects the config promise directly based on typical Payload setup.

// export const GET = REST_GET(configPromise)
// export const POST = REST_POST(configPromise)
// export const DELETE = REST_DELETE(configPromise)
// export const PATCH = REST_PATCH(configPromise)
// export const PUT = REST_PUT(configPromise)
// export const OPTIONS = REST_OPTIONS(configPromise)

// Simpler approach that uses Payload's default handlers if the above causes issues:
// This re-exports the handlers from Payload's next utilities for a specific collection or global.
// The [...slug] route implies it handles various collections.

const { GET, POST, PUT, PATCH, DELETE, OPTIONS } = generatePayloadAPI(configPromise);
export { GET, POST, PUT, PATCH, DELETE, OPTIONS };


// Fallback or explicit handling if needed:
// Example for GET, you'd replicate for POST, DELETE, PATCH, PUT, OPTIONS
// export async function GET(req: Request, { params }: { params: { slug: string[] } }) {
//   const payload = await getPayload({ config: configPromise });
//   // params.slug will be an array like ['products'] or ['products', 'some-id']
//   // You might need to parse this to determine collection and ID for a generic handler.
//   // Or, rely on Payload's internal routing if generatePayloadAPI handles it.

//   // For a specific collection like 'products':
//   if (params.slug[0] === 'products' && params.slug.length === 1) {
//     const { searchParams } = new URL(req.url);
//     const page = parseInt(searchParams.get('page') || '1', 10);
//     const limit = parseInt(searchParams.get('limit') || '10', 10);
//     const depth = parseInt(searchParams.get('depth') || '0', 10);
//     const sort = searchParams.get('sort') || '-createdAt';
    
//     // Basic where clause construction (example for category)
//     let where: any = {};
//     const category = searchParams.get('category[equals]');
//     if (category) {
//       where.category = { equals: category };
//     }
//     const searchTerm = searchParams.get('search');
//     if (searchTerm) {
//       where.name = { like: searchTerm }; // Adjust field for search
//     }


//     const data = await payload.find({
//       collection: 'products',
//       page,
//       limit,
//       depth,
//       sort,
//       where,
//     });
//     return Response.json(data);
//   }
//   if (params.slug[0] === 'products' && params.slug[1]) {
//     const data = await payload.findByID({
//       collection: 'products',
//       id: params.slug[1],
//       depth: parseInt(new URL(req.url).searchParams.get('depth') || '0', 10),
//     });
//     if (!data) return Response.json({ message: "Not found" }, { status: 404 });
//     return Response.json(data);
//   }

//   // Add similar logic for other collections or use Payload's default REST handlers

//   return Response.json({ message: "Endpoint not specifically handled" }, { status: 400 });
// }
