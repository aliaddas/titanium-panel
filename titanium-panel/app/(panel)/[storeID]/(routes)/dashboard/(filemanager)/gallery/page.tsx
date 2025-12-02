/* eslint-disable react/react-in-jsx-scope */
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card';
import { Separator } from '@/components/ui/shadcn/separator';
import { Button } from '@/components/ui/shadcn/button';
import { ImagePlus, Trash2 } from 'lucide-react';
import Image from 'next/image';

const GalleryPage = () => {
  const galleryItems = [
    {
      title: 'Product 1',
      description: 'Sweet Sativa',
    },

    {
      title: 'Product 2',
      description: 'Blue Indica',
    },

    {
      title: 'Product 3',
      description: 'Melon Hash',
    },
  ];

  const galleryItems2 = [
    {
      title: 'Product 1',
      description: 'Blue Gelato',
    },
    {
      title: 'Product 2',
      description: 'Ketama Puff',
    },
    {
      title: 'Product 3',
      description: 'Banana Fruit',
    },
    {
      title: 'Product 4',
      description: 'Purple Apricot',
    },
    {
      title: 'Product 5',
      description: 'Melon Hash',
    },
  ];

  return (
    <div className="p-2">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-medium tracking-tight">
            Your Image Gallery
          </h2>
          <Separator />
        </CardHeader>
        <CardContent className="pt-6">
          <Button className="flex ml-auto">
            <ImagePlus className="mr-2" />
            Upload New
          </Button>
          <h2 className="text-xl font-medium tracking-tight">Dunks Low (3)</h2>

          <div className="grid grid-cols-5 gap-2">
            {galleryItems.map((route) => (
              <Card>
                <Image
                  src="https://ekicks.eu/cdn/shop/files/Dunklowpanda2_2048x.png?v=1690377997"
                  width={200}
                  height={200}
                  alt=""
                  className="mt-4"
                />
                <CardHeader className=" flex space-evenly">
                  <CardDescription>{route.description}</CardDescription>
                  <Button variant={'outline'} className="pl-auto">
                    <Trash2 />
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </div>

          <h2 className="text-xl font-medium tracking-tight">High Style (5)</h2>
          <div className="grid grid-cols-5 gap-2">
            {galleryItems2.map((route) => (
              <Card>
                <Image
                  src="https://img01.ztat.net/article/spp-media-p1/19acd6aea79647ef84f9669957dddd89/6e11d156497f4b5e9b611a1ac6fffd44.jpg?imwidth=1800&filter=packshot"
                  width={200}
                  height={200}
                  alt=""
                />
                <CardHeader className=" flex space-evenly">
                  <CardDescription>{route.description}</CardDescription>
                  <Button variant={'outline'} className="pl-auto">
                    <Trash2 />
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GalleryPage;
