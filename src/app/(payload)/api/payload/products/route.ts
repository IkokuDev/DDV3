
// src/app/(payload)/api/payload/products/route.ts
import configPromise from '@payload-config';
import { getPayload } from 'payload';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log("Attempting to handle GET /api/payload/products");
  try {
    console.log("Attempting to get Payload instance for /api/payload/products...");
    const payload = await getPayload({ config: configPromise });
    console.log("Successfully got Payload instance for /api/payload/products.");

    const { searchParams } = new URL(request.url);
    console.log("Search Params for /api/payload/products:", searchParams.toString());

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
    console.log("Constructed 'where' clause for /api/payload/products:", where);

    console.log(`Attempting to find products with page: ${page}, limit: ${limit}, depth: ${depth}, sort: ${sort}, where: ${JSON.stringify(where)}`);
    const data = await payload.find({
      collection: 'products',
      page,
      limit,
      depth,
      sort,
      where,
    });
    console.log("Successfully fetched products:", data.docs.length, "docs found.");
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("------------------------------------------------------");
    console.error("FATAL ERROR in /api/payload/products GET route:");
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
    console.error("------------------------------------------------------");
    return NextResponse.json({ 
      error: "Critical server error fetching products. Check server logs.",
      errorMessage: error.message || "No error message available",
      errorStack: process.env.NODE_ENV === 'development' ? error.stack : "Stack trace hidden in production",
    }, { status: 500 });
  }
}
