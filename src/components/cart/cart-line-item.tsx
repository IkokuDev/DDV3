
"use client";

import Image from 'next/image';
import type { CartItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Minus, Plus } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import Link from 'next/link';

interface CartLineItemProps {
  item: CartItem;
}

export function CartLineItem({ item }: CartLineItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };

  const handleIncrement = () => {
    handleQuantityChange(item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      handleQuantityChange(item.quantity - 1);
    } else {
      // Optionally ask for confirmation before removing if quantity becomes 0
      removeFromCart(item.id);
    }
  };
  
  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="flex items-center gap-4 py-4 border-b last:border-b-0">
      <Link href={`/marketplace/${item.id}`} className="flex-shrink-0">
        <div className="relative h-20 w-20 rounded-md overflow-hidden bg-muted">
          <Image
            src={item.imageUrl || `https://placehold.co/100x100.png?text=${encodeURIComponent(item.name[0])}`}
            alt={item.name}
            layout="fill"
            objectFit="cover"
            data-ai-hint={item.imageAiHint || "product thumbnail"}
          />
        </div>
      </Link>
      <div className="flex-grow">
        <Link href={`/marketplace/${item.id}`}>
          <h3 className="font-semibold hover:text-primary transition-colors">{item.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">Price: ₦{item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2 w-28">
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleDecrement}>
          <Minus className="h-4 w-4" />
        </Button>
        <Input 
          type="number" 
          value={item.quantity} 
          onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))} 
          className="w-12 h-8 text-center"
          min="1"
        />
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleIncrement}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <p className="font-semibold w-24 text-right">₦{(item.price * item.quantity).toFixed(2)}</p>
      <Button variant="ghost" size="icon" onClick={handleRemove} className="text-muted-foreground hover:text-destructive">
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
}
