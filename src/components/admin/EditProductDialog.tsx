
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from 'react-hook-form';
import { Product } from '@/data/products';
import { useToast } from "@/hooks/use-toast";
import { useProducts } from '@/contexts/ProductContext';

interface ProductFormData {
  name: string;
  type: 'kambing' | 'sapi' | 'domba';
  tagNumber: string;
  price: number;
  status: 'tersedia' | 'soldout';
  weight: number;
  description: string;
  image: string;
  video?: string;
}

interface EditProductDialogProps {
  productId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const EditProductDialog = ({ productId, isOpen, onClose }: EditProductDialogProps) => {
  const { getProductById, updateProduct } = useProducts();
  const { toast } = useToast();
  const product = getProductById(productId);
  
  const form = useForm<ProductFormData>({
    defaultValues: {
      name: '',
      type: 'kambing',
      tagNumber: '',
      price: 0,
      status: 'tersedia',
      weight: 0,
      description: '',
      image: '',
      video: ''
    }
  });

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        type: product.type,
        tagNumber: product.tagNumber,
        price: product.price,
        status: product.status,
        weight: product.weight,
        description: product.description,
        image: product.image,
        video: product.video || ''
      });
    }
  }, [product, form]);

  const onSubmit = (data: ProductFormData) => {
    if (!product) return;

    const updatedProduct: Product = {
      ...product,
      name: data.name,
      type: data.type,
      tagNumber: data.tagNumber,
      price: data.price,
      status: data.status,
      weight: data.weight,
      description: data.description,
      image: data.image,
      video: data.video
    };

    updateProduct(productId, updatedProduct);
    onClose();
    
    toast({
      title: "Produk berhasil diupdate",
      description: `${data.name} telah diperbarui.`,
    });
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Produk</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Produk</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: Kambing Etawa Super" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Hewan</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jenis hewan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="kambing">Kambing</SelectItem>
                        <SelectItem value="sapi">Sapi</SelectItem>
                        <SelectItem value="domba">Domba</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tagNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Tag</FormLabel>
                    <FormControl>
                      <Input placeholder="Contoh: KMB001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Harga (IDR)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="3500000" 
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="tersedia">Tersedia</SelectItem>
                        <SelectItem value="soldout">Sold Out</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Berat (kg)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="45" 
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Gambar</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="video"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Video (Opsional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/video.mp4" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Deskripsi lengkap produk..."
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Batal
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                Update Produk
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
