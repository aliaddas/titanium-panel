'use client';

//> Imports
import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useTransition,
} from 'react';
import axios from 'axios';

import {
  AlertDialog as QuickPickDialog,
  AlertDialogHeader as QuickPickDialogHeader,
  AlertDialogTitle as QuickPickDialogTitle,
  AlertDialogDescription as QuickPickDialogDescription,
  AlertDialogContent as QuickPickDialogContent,
  AlertDialogTrigger as QuickPickDialogTrigger,
  AlertDialogFooter as QuickPickDialogFooter,
  AlertDialogAction as QuickPickDialogAction,
  AlertDialogCancel as QuickPickDialogCancel,
} from './squirle-dialog-base';

//> CSS
import '../css/squircle-dialog.css';

//> Interfaces

import { Button } from '@/components/ui/shadcn/button';
import { ScrollArea } from '@/components/ui/shadcn/scroll-area';

import { Images, X } from 'lucide-react';
import { ButtonIcon } from '@radix-ui/react-icons';

//? Types
import { VariantListType } from '@/types/data-types';
import { Console } from 'console';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Variant } from '@prisma/client';
import { Squircle } from '@squircle-js/react';
import { areVariantListsEqual } from '@/lib/data-comparators';
import { set } from 'zod';
import { useDeviceType } from '@/hooks/use-device-type';
import { FormLabel } from '../ui/formlayout/form-label';
import prismadb from '@/lib/prismadb';
import { useParams } from 'next/navigation';
import { cp } from 'fs';
import Image from 'next/image';
import { convertBlobPathToFile } from '@/lib/blobpath-to-file';
import { uploadImage } from '@/lib/upload-image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { createSupabaseClient } from '@/lib/supabase-client';

interface QuickPickerDialogProps {
  showPrompt: boolean; // Accept showDialog prop
  setShowPrompt: (value: boolean) => void; // Accept setter for controlling the dialog visibility
}

export function QuickPickerDialog({
  showPrompt,
  setShowPrompt,
}: QuickPickerDialogProps) {
  const {
    isSmallDevice,
    isMediumDevice,
    isLargeDevice,
    isExtraLargeDevice,
    is2XLargeDevice,
  } = useDeviceType();

  useEffect(() => {
    if (showPrompt) {
      // Delayed click to ensure UI updates before triggering the input
      setTimeout(() => {
        imageInputRef.current?.click();
      }, 500);
      setShowPrompt(false); // Reset showPrompt after the prompt is triggered
    }
  }, [showPrompt, setShowPrompt]);

  const parameters = useParams();
  const { productID, storeID } = parameters;

  const LoadingOverlay = ({ isLoading }: { isLoading: boolean }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
      let timeoutId: NodeJS.Timeout;
      let minDisplayTimeoutId: NodeJS.Timeout;

      if (isLoading) {
        setShouldRender(true);
        setIsVisible(true);
      } else {
        minDisplayTimeoutId = setTimeout(() => {
          setIsVisible(false);
          timeoutId = setTimeout(() => setShouldRender(false), 300); //* Delay to allow fade-out animation
        }, 500); //* Minimum display time of 500ms
      }

      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        if (minDisplayTimeoutId) {
          clearTimeout(minDisplayTimeoutId);
        }
      };
    }, [isLoading]);

    if (!shouldRender) {
      return null;
    }

    return (
      <div
        className={`loading-overlay ${isVisible ? 'visible' : ''} rounded-md`}
      >
        <div className="loader" />
      </div>
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
    <QuickPickDialog>
      <QuickPickDialogTrigger id="quickPickUploadButton" asChild>
        <Button
          variant={'default'}
          className="m-2 px-2 min-w-[10vh] rounded-xl bg-nav text-white mr-2"
        >
          <Images className="mr-2" size={18} />
          <FormLabel className="block lg:hidden">Library</FormLabel>
          <FormLabel className="hidden lg:block">Choose from Library</FormLabel>
        </Button>
      </QuickPickDialogTrigger>
      <QuickPickDialogContent className="overflow-y-scroll sm:overflow-y-hidden">
        <LoadingOverlay isLoading={false} />
        <QuickPickDialogHeader>
          <div className="flex justify-between">
            <QuickPickDialogTitle className="text-2xl tracking-tighter">
              QuickPick Library
            </QuickPickDialogTitle>
            <QuickPickDialogCancel className="hover:bg-gray-200 hover:scale-110">
              <X size={16} />
            </QuickPickDialogCancel>
          </div>
          <QuickPickDialogDescription className={`tracking-tighter `}>
            Manage your images and resources{' '}
            <span style={{ textDecoration: 'underline' }}>safely.</span>
          </QuickPickDialogDescription>
        </QuickPickDialogHeader>
        <div className="p-4">
          <input
            type="file"
            multiple
            hidden
            ref={imageInputRef}
            onChange={handleImageChange}
            disabled={isPending}
          />

          <Button
            className="mr-2"
            onClick={() => {
              console.log('Button clicked');
              imageInputRef.current?.click();
            }}
          >
            Pick Image
          </Button>
          <Button
            className="mr-2"
            onClick={() => {
              console.log('Button clicked');
              handleImageUpload(); // Replace with actual file
            }}
          >
            Upload Image(s)
          </Button>
          <Button
            onClick={() => {
              fetchImages();
            }}
          >
            Refresh
          </Button>
          {imagePaths.map((path, index) => (
            <div key={index} className="relative">
              <Image
                src={path}
                alt={`Image ${index}`}
                width={200}
                height={500}
                className="w-[200px] h-auto rounded-lg"
              />
            </div>
          ))}
          <p>Store Images</p>
          <div className="flex flex-wrap gap-2">
            {pickerImageUrls.map(
              (
                path: string | StaticImport,
                index: React.Key | null | undefined,
              ) => (
                <div
                  key={index}
                  className="relative border-2 border-muted p-0.5 rounded-lg"
                >
                  <Image
                    src={path}
                    alt={`Image ${index}`}
                    width={200}
                    height={500}
                    className="w-[200px] h-auto rounded-lg"
                  />
                </div>
              ),
            )}
          </div>
        </div>

        <QuickPickDialogFooter>
          <QuickPickDialogAction
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {}}
          >
            Close
          </QuickPickDialogAction>
        </QuickPickDialogFooter>
      </QuickPickDialogContent>
    </QuickPickDialog>
  );
}
