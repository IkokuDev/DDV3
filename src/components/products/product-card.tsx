
"use client";

import type { Product } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/cart-context'; // Import useCart

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart(); // Use cart context

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent link navigation if button is inside Link
    addToCart(product);
  };

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full group">
      <Link href={`/marketplace/${product.id}`} className="flex flex-col flex-grow cursor-pointer">
        <CardHeader className="p-0">
          <div className="aspect-[4/3] relative w-full">
            <Image
              src={product.imageUrl || `https://placehold.co/600x400.png?text=${encodeURIComponent(product.name)}`}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={product.imageAiHint || "product image"}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="font-headline text-xl mb-1 group-hover:text-primary transition-colors">{product.name}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</CardDescription>
          <p className="text-xs text-muted-foreground">Supplier: <span className="font-medium text-primary">{product.supplier}</span></p>
          {product.category && <p className="text-xs text-muted-foreground mt-1">Category: <Badge variant="outline" className="ml-1">{product.category}</Badge></p>}
        </CardContent>
      </Link>
      <CardFooter className="p-4 flex justify-between items-center border-t bg-card">
        <div className="text-lg font-semibold text-primary">
          ₦{product.price.toFixed(2)}
        </div>
        <Button size="sm" variant="default" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
