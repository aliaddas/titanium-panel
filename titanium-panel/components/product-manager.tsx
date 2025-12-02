'use client';

import { SetStateAction, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card';
import { Input } from '@/components/ui/shadcn/input';
import { Button } from '@/components/ui/shadcn/button';
import { ScrollArea } from '@/components/ui/shadcn/scroll-area';
import { Plus, Search, Grid, List, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
};

interface ProductManagerProps {
  products?: Product[];
}

export function ProductManagerComponent({
  products = [],
}: ProductManagerProps) {
  const [isGrid, setIsGrid] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Card className="w-full h-[calc(100vh-2rem)] overflow-hidden">
      <CardHeader className="space-y-6 pb-4">
        <CardTitle className="text-2xl font-bold">Product Manager</CardTitle>
        <div className="flex items-center space-x-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 w-full"
              value={searchTerm}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>
          <Button className="flex items-center space-x-2">
            <Plus size={20} />
            <span>New Product</span>
          </Button>
          <Button variant="outline" onClick={() => setIsGrid(!isGrid)}>
            {isGrid ? <List size={20} /> : <Grid size={20} />}
          </Button>
        </div>
      </CardHeader>
      <ScrollArea className="h-[calc(100%-8rem)] px-4 pb-4">
        {filteredProducts.length > 0 ? (
          <div
            className={`grid gap-4 ${isGrid ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}
          >
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className={`flex ${isGrid ? 'flex-col' : 'flex-row'}`}>
                    <div
                      className={`relative ${isGrid ? 'h-48' : 'h-32 w-32'}`}
                    >
                      <Image
                        src={product.image || '/placeholder.svg'}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="p-4 flex-grow">
                      <h3 className="font-semibold text-lg mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">
                          ${(product.price || 0).toFixed(2)}
                        </span>
                        <span
                          className={`text-sm ${(product.stock || 0) > 10 ? 'text-green-500' : 'text-red-500'}`}
                        >
                          {product.stock || 0} in stock
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 p-4 bg-gray-50">
                    <Button variant="outline" size="sm">
                      <Edit size={16} className="mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} className="mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No products found.</p>
          </div>
        )}
      </ScrollArea>
    </Card>
  );
}
