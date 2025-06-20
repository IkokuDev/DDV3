
// src/app/(payload)/api/payload/products/[id]/route.ts
import configPromise from '@payload-config';
import { getPayload } from 'payload';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { [key: string]: string | string[] } }
) {
  const id = params.id as string; // Explicitly cast id to string
  console.log(`Attempting to handle GET /api/payload/products/${id}`);
  try {
    console.log(`Attempting to get Payload instance for /api/payload/products/${id}...`);
    const payload = await getPayload({ config: configPromise });
    console.log(`Successfully got Payload instance for /api/payload/products/${id}.`);
    
    const { searchParams } = new URL(request.url);
    const depth = parseInt(searchParams.get('depth') || '0', 10);
    console.log(`Fetching product with ID: ${id}, depth: ${depth}`);

    const product = await payload.findByID({
      collection: 'products',
      id: id,
      depth,
    });

    if (!product) {
      console.warn(`Product with ID ${id} not found.`);
      return NextResponse.json({ message: `Product with ID ${id} not found` }, { status: 404 });
    }

    console.log(`Successfully fetched product with ID: ${id}`);
    return NextResponse.json(product);
  } catch (error: any) {
    console.error(`------------------------------------------------------`);
    console.error(`FATAL ERROR in GET /api/payload/products/${id}:`);
    console.error("Error Type:", typeof error);
    try {
      console.error("Error Keys:", Object.keys(error));
    } catch (e) {
      console.error("Could not get error keys.");
    }
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
    if (error.cause) {
      console.error("Cause:", error.cause);
    }
    try {
      console.error("Full Error Object (stringified):", JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    } catch (e) {
      console.error("Could not stringify full error object.");
    }
    console.error(`------------------------------------------------------`);
    return NextResponse.json({ 
      error: `Critical server error fetching product with ID ${id}. Check server logs.`,
      errorMessage: error.message || "No error message available",
      errorStack: process.env.NODE_ENV === 'development' ? error.stack : "Stack trace hidden in production",
    }, { status: 500 });
  }
}
