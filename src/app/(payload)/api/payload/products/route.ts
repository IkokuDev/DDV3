
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
      // Example: Search in 'name' and 'description' (if description is simple text or you have a search plugin)
      // For rich text, searching is more complex. For now, let's assume 'name'.
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
    console.error("Error in /api/payload/products GET:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch products" }, { status: 500 });
  }
}

// Add POST, PUT, DELETE etc. for products if needed, or rely on the generic [...slug] handler for those.
