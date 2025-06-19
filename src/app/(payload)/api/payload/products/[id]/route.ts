
// src/app/(payload)/api/payload/products/[id]/route.ts
import configPromise from '@payload-config';
import { getPayload } from 'payload';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
) {
  const context: { params: { id: string } } = request.nextUrl.searchParams as any; // Access context through request.nextUrl
  try {
    const payload = await getPayload({ config: configPromise });
    const { searchParams } = new URL(request.url);
    const depth = parseInt(searchParams.get('depth') || '0', 10);
    const id = context.params.id;

    const product = await payload.findByID({
      collection: 'products',
      id: id,
      depth,
    });

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error: any) {
    console.error(`Error in /api/payload/products/${context.params.id} GET:`, error);
    return NextResponse.json({ error: error.message || "Failed to fetch product" }, { status: 500 });
  }
}
