
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from 'lucide-react';
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
  weight: string;
  description: string;
  image: string;
  video?: string;
}

export const AddProductDialog = () => {
  const { addProduct } = useProducts();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ProductFormData>({
    defaultValues: {
      name: '',
      type: 'kambing',
      tagNumber: '',
      price: 0,
      status: 'tersedia',
      weight: '',
      description: '',
      image: '',
      video: ''
    }
  });

  const onSubmit = (data: ProductFormData) => {
    const newProduct: Product = {
      id: (Date.now()).toString(),
      name: data.name,
      type: data.type,
      tagNumber: data.tagNumber,
      price: data.price,
      status: data.status,
      weight: data.weight,
      description: data.description,
      image: data.image || 'https://images.unsplash.com/photo-1551728088-6d4b1c663c7a?w=500&h=400&fit=crop',
      video: data.video
    };

    addProduct(newProduct);
    form.reset();
    setIsAddDialogOpen(false);
    
    toast({
      title: "Produk berhasil ditambahkan",
      description: `${data.name} telah ditambahkan ke katalog.`,
    });
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Tambah Produk Baru
        </CardTitle>
        <CardDescription>
          Tambahkan produk hewan qurban baru ke katalog
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Produk
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Tambah Produk Baru</DialogTitle>
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                      <FormLabel>Berat</FormLabel>
                      <FormControl>
                        <Input placeholder="45-50 kg" {...field} />
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
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Batal
                  </Button>
                  <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                    Tambah Produk
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
