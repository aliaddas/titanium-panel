'use client';

import React, { useEffect, useRef, useState, useTransition } from 'react';

import { useParams, useRouter } from 'next/navigation';
import { Squircle } from '@squircle-js/react';
import { FormTitle } from '@/components/ui/formlayout/form-title';
import { FormLabel } from '@/components/ui/formlayout/form-label';
import { Card } from '@/components/ui/shadcn/card';
import { Button } from '@/components/ui/shadcn/button';
import { CloudUploadIcon, Search } from 'lucide-react';
import { Input } from '@/components/ui/shadcn/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/shadcn/tabs';
import { convertBlobPathToFile } from '@/lib/blobpath-to-file';
import { uploadImage } from '@/lib/upload-image';
import { createSupabaseClient } from '@/lib/supabase-client';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AssetLibrary() {
  const params = useParams();
  const { storeID } = params;
  const router = useRouter();
  const searchParams = new URLSearchParams(window.location.search);
  const category = searchParams.get('category') || 'all';
  const [assets, setAssets] = useState([]);

  const assetType = searchParams.get('type') || 'all';

  interface HandleAssetTypeChangeParams {
    value: string;
  }

  const handleAssetTypeChange = (
    value: HandleAssetTypeChangeParams['value'],
  ): void => {
    router.push(
      `/${params.storeID}/asset-library?type=${value}${category !== 'all' ? `&category=${category}` : ''}`,
    );
  };

  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const [imagePaths, setImagePaths] = useState<string[]>([]);

  const [pickerImageUrls, setPickerImageUrls] = useState<string[]>([]);

  const fetchImages = async () => {
    function getStorage() {
      const { storage } = createSupabaseClient();
      return storage;
    }

    const storage = getStorage();

    const { data } = await storage
      .from('assets')
      .list(`store/${storeID}/images`, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      });
    console.log('Fetched images:', data);

    if (data) {
      const urls = data.map((item) => {
        const publicUrlData = storage
          .from('assets')
          .getPublicUrl(`store/${storeID}/images/${item.name}`);
        console.log('Public URL:', publicUrlData.data.publicUrl);
        return publicUrlData.data.publicUrl;
      });
      setPickerImageUrls(urls);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const filePaths = files.map((file) => URL.createObjectURL(file));
      setImagePaths([...imagePaths, ...filePaths]);
    }
  };

  const [isPending, startTransition] = useTransition();

  const handleImageUpload = () => {
    startTransition(async () => {
      for (const file of imagePaths) {
        const imageFile = await convertBlobPathToFile(file);

        const { imageUrl, error } = await uploadImage({
          file: imageFile,
          bucket: 'assets',
          folder: `store/${storeID}/images`,
        });

        if (error) {
          console.error('Error uploading image:', error);
        } else {
          console.log('Image uploaded:', imageUrl);

          if (imageUrl) {
            setPickerImageUrls((prev) => [...prev, imageUrl]);
          }
        }
      }
    });
  };

  return (
    <div className="flex flex-col sm:w-[92%] md:w-[90%] lg:w-[85%] xl:w-[70%] mx-auto h-full shadow-md rounded-3xl">
      <Squircle
        cornerRadius={20}
        cornerSmoothing={0.5}
        className="bg-card min-h-[85vh] w-full h-full"
      >
        <div className="flex h-full flex-1 overflow-hidden">
          {/* Sidebar */}
          <Card className="w-[20%] min-w-[200px] max-w-[280px] border-2 border-muted p-4 hidden sm:block">
            {/* Future Category Content */}
          </Card>

          {/* Main Panel */}
          <div className="flex-1 flex flex-col gap-4 p-4">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <FormTitle className="text-2xl font-bold">
                Asset Library
              </FormTitle>
              <input
                type="file"
                multiple
                hidden
                ref={imageInputRef}
                onChange={handleImageChange}
                disabled={isPending}
              />
              <Button
                onClick={() => imageInputRef.current?.click()}
                disabled={isPending}
              >
                <CloudUploadIcon size={18} className="mr-2" /> Upload Asset(s)
              </Button>
            </div>

            {/* Search & Tabs */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search assets..."
                  className="pl-8 rounded-xl border-2 border-muted focus-visible:ring-0 focus-visible:border-primary"
                />
              </div>
              <Tabs
                defaultValue={assetType}
                onValueChange={handleAssetTypeChange}
                className="w-full md:w-auto"
              >
                <TabsList className="rounded-xl flex-wrap">
                  {['all', 'image', 'video', 'audio', 'document', 'other'].map(
                    (type) => (
                      <TabsTrigger
                        key={type}
                        className="p-1.5 py-0.5"
                        value={type}
                      >
                        {type[0].toUpperCase() + type.slice(1)}
                      </TabsTrigger>
                    ),
                  )}
                </TabsList>
              </Tabs>
            </div>

            {/* Upload Queue */}
            {imagePaths.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.7 }}
                className="flex flex-col"
              >
                <p>Upload Queue</p>
                <div className="flex flex-wrap bg-muted p-2 mb-2 border-2 rounded-lg gap-2">
                  {imagePaths.map((path, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.7 }}
                      className="relative group"
                    >
                      <Image
                        src={path}
                        alt={`Image ${index}`}
                        width={75}
                        height={75}
                        className="rounded-lg object-cover w-[75px] h-[75px]"
                      />
                      <div className="absolute inset-0 rounded-lg bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            setImagePaths((prev) =>
                              prev.filter((_, i) => i !== index),
                            )
                          }
                        >
                          Delete
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Button
                  className="w-fit"
                  onClick={async () => {
                    await handleImageUpload();
                    setImagePaths([]);
                  }}
                  disabled={isPending}
                >
                  Upload All
                </Button>
              </motion.div>
            )}

            {/* Stored Images */}
            <Card className="w-full border-2 border-muted p-4">
              <p>Store Images</p>
              {pickerImageUrls.length === 0 ? (
                <div className="flex items-center justify-center min-h-[45vh]">
                  <p>No images found</p>
                </div>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mt-2">
                    Click on the image to delete it.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 mt-2">
                    {pickerImageUrls.map((url, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.7 }}
                        className="relative group w-full aspect-square border-2 rounded-xl overflow-hidden"
                      >
                        <Image
                          src={url}
                          alt={`Image ${index}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          className="object-cover"
                          quality={50} // Ensures higher quality images
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto group-hover:cursor-pointer">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                              setPickerImageUrls((prev) =>
                                prev.filter((_, i) => i !== index),
                              )
                            }
                          >
                            Delete
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </Card>
          </div>
        </div>
      </Squircle>
    </div>
  );
}
