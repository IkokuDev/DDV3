
// src/app/(payload)/api/payload/vendors/route.ts
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
    const sort = searchParams.get('sort') || 'businessName';
    
    let where: any = {};
    const userId = searchParams.get('where[user][equals]'); // e.g. where[user][equals]=USER_ID
    if (userId) {
       if (!where.user) where.user = {};
       where.user.equals = userId;
    }
    // Add other query params as needed

    const data = await payload.find({
      collection: 'vendors',
      page,
      limit,
      depth,
      sort,
      where,
    });
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in /api/payload/vendors GET:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch vendors" }, { status: 500 });
  }
}
