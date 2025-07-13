
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Plus, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Product } from '@/data/products';
import { useToast } from "@/hooks/use-toast";
import { useProducts } from '@/contexts/ProductContext';

interface ProductFormData {
  name: string;
  type: 'kambing' | 'sapi' | 'domba';
  price: number;
  status: 'tersedia' | 'soldout';
  weight: number;
  description: string;
  images: string[];
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
  const [imageUrls, setImageUrls] = useState<string[]>(['']);
  
  const form = useForm<ProductFormData>({
    defaultValues: {
      name: '',
      type: 'kambing',
      price: 0,
      status: 'tersedia',
      weight: 0,
      description: '',
      images: ['']
    }
  });

  useEffect(() => {
    if (product) {
      const urls = product.images.length > 0 ? product.images : [''];
      setImageUrls(urls);
      form.reset({
        name: product.name,
        type: product.type,
        price: product.price,
        status: product.status,
        weight: product.weight,
        description: product.description,
        images: urls
      });
    }
  }, [product, form]);

  const addImageField = () => {
    if (imageUrls.length < 3) {
      const newUrls = [...imageUrls, ''];
      setImageUrls(newUrls);
      form.setValue('images', newUrls);
    }
  };

  const removeImageField = (index: number) => {
    const newUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newUrls);
    form.setValue('images', newUrls);
  };

  const updateImageUrl = (index: number, value: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
    form.setValue('images', newUrls);
  };

  const onSubmit = (data: ProductFormData) => {
    if (!product) return;

    const validImages = imageUrls.filter(url => url.trim() !== '');

    const updatedProduct: Product = {
      ...product,
      name: data.name,
      type: data.type,
      price: data.price,
      status: data.status,
      weight: data.weight,
      description: data.description,
      images: validImages.length > 0 ? validImages : product.images
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

            <div>
              <FormLabel>Foto Produk (Maksimal 3)</FormLabel>
              <div className="space-y-2 mt-2">
                {imageUrls.map((url, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder={`URL Foto ${index + 1}`}
                      value={url}
                      onChange={(e) => updateImageUrl(index, e.target.value)}
                      className="flex-1"
                    />
                    {imageUrls.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeImageField(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                {imageUrls.length < 3 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addImageField}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Foto
                  </Button>
                )}
              </div>
            </div>

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
