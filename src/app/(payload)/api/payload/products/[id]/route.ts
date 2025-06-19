// src/app/(payload)/api/payload/products/[id]/route.ts
import configPromise from '@payload-config';
import { getPayload } from 'payload';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params; // Get id from context.params
  try {
    const payload = await getPayload({ config: configPromise });
    const { searchParams } = new URL(request.url);
    const depth = parseInt(searchParams.get('depth') || '0', 10);

    const product = await payload.findByID({
      collection: 'products',
      id: id,
      depth,
    });

    if (!product) {
      return NextResponse.json({ message: `Product with ID ${id} not found` }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error: any) {
    console.error(`------------------------------------------------------`);
    console.error(`Error in GET /api/payload/products/${id}:`);
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
    if (error.cause) {
      console.error("Cause:", error.cause);
    }
    console.error("Full Error Object:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    console.error(`------------------------------------------------------`);
    return NextResponse.json({ error: `Failed to fetch product with ID ${id}. Check server logs.` }, { status: 500 });
  }
}
