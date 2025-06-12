
"use client";

import type { Product, PayloadMedia, PayloadVendor } from '@/lib/types'; // Updated type import
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
// ProductForm is no longer directly used for editing in this simplified version.
// import { ProductForm } from './product-form';
import { MoreHorizontal, Trash2, Edit, ExternalLink } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import Link from 'next/link';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void; // Simplified: just pass the product to the handler
  onDelete: (productId: string) => void;
}

export function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  
  // PAYLOAD_ADMIN_URL - this should ideally come from an environment variable
  const PAYLOAD_ADMIN_URL = process.env.NEXT_PUBLIC_PAYLOAD_ADMIN_URL || '/admin';

  return (
    <Card className="shadow-lg">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                  No products listed yet. Add products via the CMS.
                </TableCell>
              </TableRow>
            )}
            {products.map((product) => {
              const firstImageObj = product.images?.[0]?.image as PayloadMedia | undefined;
              const imageUrl = firstImageObj?.url || `https://placehold.co/100x100.png?text=${encodeURIComponent(product.name?.[0] || 'P')}`;
              const imageAlt = firstImageObj?.alt || product.name || "Product image";
              const categoryDisplay = product.category?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'N/A';
              const statusDisplay = product.status?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'N/A';

              return (
                <TableRow key={product.id}>
                  <TableCell>
                    <Image
                      src={imageUrl}
                      alt={imageAlt}
                      width={50}
                      height={50}
                      className="rounded-md object-cover"
                      data-ai-hint={ (firstImageObj?.alt || product.name || "product thumbnail").split(' ').slice(0,2).join(' ') }
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name || "Unnamed Product"}</TableCell>
                  <TableCell>₦{product.price?.toFixed(2) || '0.00'}</TableCell>
                  <TableCell>{categoryDisplay}</TableCell>
                  <TableCell>{statusDisplay}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onSelect={() => onEdit(product)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit in CMS
                        </DropdownMenuItem>
                         <DropdownMenuSeparator />
                         <AlertDialog>
                          <AlertDialogTrigger asChild>
                             <DropdownMenuItem className="text-destructive focus:text-destructive" onSelect={(e) => e.preventDefault()}>
                                <Trash2 className="mr-2 h-4 w-4" /> Delete (via CMS)
                             </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Product: "{product.name}"?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone here. You will be redirected to the CMS to confirm deletion. Are you sure you want to proceed to the CMS to delete this product?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction asChild className="bg-destructive hover:bg-destructive/90">
                                  <Link href={`${PAYLOAD_ADMIN_URL}/collections/products/${product.id}`} target="_blank" rel="noopener noreferrer" onClick={() => onDelete(product.id)}>
                                    Go to CMS to Delete
                                  </Link>
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

