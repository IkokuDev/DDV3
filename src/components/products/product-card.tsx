
"use client";

import type { Product, PayloadMedia, PayloadVendor } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Loader2 } from 'lucide-react'; // Added Loader2
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/cart-context';
import { RichTextLexical } from '@/components/shared/rich-text-lexical'; // Assuming you'll create this

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    addToCart(product);
  };

  const firstImageObj = product.images?.[0]?.image;
  const imageUrl = (typeof firstImageObj === 'object' && firstImageObj?.url) 
    ? firstImageObj.url 
    : `https://placehold.co/600x400.png?text=${encodeURIComponent(product.name?.[0] || 'P')}`;
  
  const imageAlt = (typeof firstImageObj === 'object' && firstImageObj?.alt) 
    ? firstImageObj.alt 
    : product.name;

  const vendorName = typeof product.vendor === 'object' ? product.vendor.businessName : 'Unknown Supplier';

  // Simple text extraction from Lexical JSON for card description
  let simpleDescription = "No description available.";
  if (product.description && product.description.root && product.description.root.children) {
    try {
      simpleDescription = product.description.root.children
        .filter((child: any) => child.type === 'paragraph')
        .flatMap((paragraph: any) => paragraph.children)
        .filter((child: any) => child.type === 'text')
        .map((textNode: any) => textNode.text)
        .join(' ')
        .substring(0, 100) + (product.description.root.children.length > 0 ? '...' : '');
      if (!simpleDescription.trim()) simpleDescription = "View details for more information.";
    } catch (e) {
      // Keep default if parsing fails
    }
  }


  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full group">
      <Link href={`/marketplace/${product.id}`} className="flex flex-col flex-grow cursor-pointer">
        <CardHeader className="p-0">
          <div className="aspect-[4/3] relative w-full bg-muted">
            <Image
              src={imageUrl}
              alt={imageAlt || product.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={(typeof firstImageObj === 'object' && firstImageObj?.alt) ? firstImageObj.alt.split(' ').slice(0,2).join(' ') : "product"}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="font-headline text-xl mb-1 group-hover:text-primary transition-colors">{product.name || "Unnamed Product"}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground mb-2 line-clamp-2">
            {simpleDescription}
          </CardDescription>
          <p className="text-xs text-muted-foreground">Supplier: <span className="font-medium text-primary">{vendorName}</span></p>
          {product.category && <p className="text-xs text-muted-foreground mt-1">Category: <Badge variant="outline" className="ml-1">{product.category}</Badge></p>}
        </CardContent>
      </Link>
      <CardFooter className="p-4 flex justify-between items-center border-t bg-card">
        <div className="text-lg font-semibold text-primary">
          ₦{product.price?.toFixed(2) || '0.00'}
        </div>
        <Button size="sm" variant="default" onClick={handleAddToCart} disabled={!product.id}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
