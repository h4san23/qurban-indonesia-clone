
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit } from 'lucide-react';
import { formatPrice } from '@/data/products';
import { useToast } from "@/hooks/use-toast";
import { useProducts } from '@/contexts/ProductContext';
import { EditProductDialog } from './EditProductDialog';

export const ProductTable = () => {
  const { products, deleteProduct } = useProducts();
  const { toast } = useToast();
  const [editingProduct, setEditingProduct] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    const productToDelete = products.find(p => p.id === id);
    deleteProduct(id);
    
    toast({
      title: "Produk berhasil dihapus",
      description: `${productToDelete?.name} telah dihapus dari katalog.`,
      variant: "destructive"
    });
  };

  const handleEdit = (id: string) => {
    setEditingProduct(id);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Daftar Produk</CardTitle>
          <CardDescription>
            Total: {products.length} produk
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Gambar</TableHead>
                  <TableHead>Jenis</TableHead>
                  <TableHead>No Tag</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Harga</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Berat</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </TableCell>
                    <TableCell className="capitalize">{product.type}</TableCell>
                    <TableCell className="font-mono text-sm">{product.tagNumber}</TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{formatPrice(product.price)}</TableCell>
                    <TableCell>
                      <Badge variant={product.status === 'tersedia' ? 'default' : 'destructive'}>
                        {product.status === 'tersedia' ? 'Tersedia' : 'Sold Out'}
                      </Badge>
                    </TableCell>
                    <TableCell>{product.weight}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(product.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {editingProduct && (
        <EditProductDialog
          productId={editingProduct}
          isOpen={true}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </>
  );
};
