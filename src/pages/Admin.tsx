import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Product, formatPrice } from '@/data/products';
import { useToast } from "@/hooks/use-toast";
import { useProducts } from '@/contexts/ProductContext';

interface ProductFormData {
  name: string;
  type: 'kambing' | 'sapi' | 'domba';
  price: number;
  weight: string;
  age: string;
  description: string;
  image: string;
  features: string;
  stock: number;
  location: string;
}

const Admin = () => {
  const { products, addProduct, deleteProduct } = useProducts();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ProductFormData>({
    defaultValues: {
      name: '',
      type: 'kambing',
      price: 0,
      weight: '',
      age: '',
      description: '',
      image: '',
      features: '',
      stock: 0,
      location: ''
    }
  });

  const onSubmit = (data: ProductFormData) => {
    const newProduct: Product = {
      id: (Date.now()).toString(),
      name: data.name,
      type: data.type,
      price: data.price,
      weight: data.weight,
      age: data.age,
      description: data.description,
      image: data.image || 'https://images.unsplash.com/photo-1551728088-6d4b1c663c7a?w=500&h=400&fit=crop',
      features: data.features.split(',').map(f => f.trim()),
      stock: data.stock,
      location: data.location
    };

    addProduct(newProduct);
    form.reset();
    setIsAddDialogOpen(false);
    
    toast({
      title: "Produk berhasil ditambahkan",
      description: `${data.name} telah ditambahkan ke katalog.`,
    });
  };

  const handleDelete = (id: string) => {
    const productToDelete = products.find(p => p.id === id);
    deleteProduct(id);
    
    toast({
      title: "Produk berhasil dihapus",
      description: `${productToDelete?.name} telah dihapus dari katalog.`,
      variant: "destructive"
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-emerald-800 mb-2">Admin Panel</h1>
        <p className="text-gray-600">Kelola data produk hewan qurban</p>
      </div>

      {/* Add Product Section */}
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
                      name="stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stok</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="15" 
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
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
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Umur</FormLabel>
                          <FormControl>
                            <Input placeholder="2-3 tahun" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lokasi</FormLabel>
                        <FormControl>
                          <Input placeholder="Bogor, Jawa Barat" {...field} />
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
                    name="features"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fitur (pisahkan dengan koma)</FormLabel>
                        <FormControl>
                          <Input placeholder="Sehat dan Gemuk, Bersertifikat Halal, Gratis Pengiriman" {...field} />
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

      {/* Products Table */}
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
                  <TableHead>Nama</TableHead>
                  <TableHead>Jenis</TableHead>
                  <TableHead>Harga</TableHead>
                  <TableHead>Berat</TableHead>
                  <TableHead>Stok</TableHead>
                  <TableHead>Lokasi</TableHead>
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
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="capitalize">{product.type}</TableCell>
                    <TableCell>{formatPrice(product.price)}</TableCell>
                    <TableCell>{product.weight}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.location}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;
