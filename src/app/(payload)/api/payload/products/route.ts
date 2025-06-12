
// src/app/(payload)/api/payload/products/route.ts
import configPromise from '../../../../../payload.config';
import { getPayload } from 'payload';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise });
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const depth = parseInt(searchParams.get('depth') || '0', 10);
    const sort = searchParams.get('sort') || '-createdAt';
    
    let where: any = {};
    const category = searchParams.get('category[equals]');
    if (category) {
      where.category = { equals: category };
    }
    const searchTerm = searchParams.get('search');
    if (searchTerm) {
      where.name = { like: searchTerm };
    }

    const data = await payload.find({
      collection: 'products',
      page,
      limit,
      depth,
      sort,
      where,
    });
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("------------------------------------------------------");
    console.error("Error in /api/payload/products GET route:");
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
    console.error("Full Error Object:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    console.error("------------------------------------------------------");
    return NextResponse.json({ 
      error: "Failed to fetch products from CMS.",
      details: error.message // Send a generic message to client, but log details server-side
    }, { status: 500 });
  }
}
