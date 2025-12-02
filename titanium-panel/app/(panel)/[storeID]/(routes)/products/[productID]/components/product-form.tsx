'use client';

//> PrismaDB Imports / Fetching
import axios from 'axios';
import { Product, Variant } from '@prisma/client';

//> Hooks
import { useEffect, useRef, useState } from 'react';
import { useDeviceType } from '@/hooks/use-device-type';
import useHideHeader from '@/hooks/use-hideheader';
import { useQuickPickModal } from '@/hooks/use-quickpick-modal';

//> UI Imports
import { motion } from 'framer-motion';
import { Squircle } from '@squircle-js/react';
import Image from 'next/image';
import { redirect, useParams, useRouter } from 'next/navigation';

//> Form UI Imports
import { VariantManagerDialog } from './components/variant-form-dialog';
import { v4 as uuidv4 } from 'uuid';

//> Components
import { Badge } from '@/components/ui/shadcn/badge';
import { Button } from '@/components/ui/shadcn/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card';
import { FormLabel } from '@/components/ui/formlayout/form-label';
import { FormTitle } from '@/components/ui/formlayout/form-title';
import { Input } from '@/components/ui/shadcn/input';
import { ScrollArea } from '@/components/ui/shadcn/scroll-area';
import { Separator } from '@/components/ui/shadcn/separator';
import { Textarea } from '@/components/ui/shadcn/textarea';

//> Icons
import {
  ArrowLeft,
  CloudUpload,
  Image as ImageIcon,
  RefreshCcw,
  Trash,
} from 'lucide-react';

//> Dialogues
import { QuickPickerDialog } from '@/components/dialogues/quick-pick-dialog';

//> Types
import { Decimal } from 'decimal.js';
import { ProductType, VariantListType } from '@/types/data-types';

//> Interfaces
interface ProductFormProps {
  initialData: any;
  params: { storeID: string; productID: string };
}

//#
//# Functions
//#
async function createProduct(product: any) {
  try {
    console.log('Attempting product creation !');
    const response = await axios.post('/api/product', product);
    console.log(response);

    if (response.status === 201) {
      redirect(`/${product.storeID}/products/`);
    }
    return response.data;
  } catch (error) {
    console.error('Error creating product', error);
  }
}

async function updateProduct(product: any) {
  try {
    console.log('Attempting product update !');
    const response = await axios.put('/api/product', product);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating product', error);
  }
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  params,
}) => {
  //? Refs & Data
  const router = useRouter();
  const { storeID = '', productID } = useParams();

  //? Get Modal State
  const onOpen = useQuickPickModal((state) => state.onOpen);
  const isOpen = useQuickPickModal((state) => state.isOpen);

  //? UI State
  const [showPrompt, setShowPrompt] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const {
    isMobile,
    isSmallDevice,
    isMediumDevice,
    isLargeDevice,
    isExtraLargeDevice,
    is2XLargeDevice,
  } = useDeviceType();

  //? UI label texts
  const isEditing = productID !== 'new';
  const formTitle = isEditing ? 'Edit Your Product' : 'Create Your Product';
  const buttonText = !hasChanged
    ? isEditing
      ? 'Changes Saved'
      : 'Add Product'
    : isEditing
      ? 'Update Product'
      : 'Add Product';

  //? Scroll stuff
  const [isScroller, setIsScroller] = useState(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  //? Format the loaded product data
  const productData: ProductType = {
    ID: initialData.ID,
    name: initialData.name,
    description: initialData.description,
    storeID: storeID as string,
    price: new Decimal(initialData.price),
    isFeatured: initialData.isFeatured,
    isArchived: initialData.isArchived,
    variantLists: initialData.variantLists,
    inceptionDate: new Date(initialData.inceptionDate),
    lastUpdate: new Date(initialData.lastUpdate),
    imageURLs: initialData.imageURLs,
    imagePreview: initialData.imagePreview,
  };

  const [productState, setProductState] = useState<ProductType>({
    ID: initialData.ID,
    name: initialData.name,
    description: initialData.description,
    storeID: storeID as string,
    price: new Decimal(initialData.price),
    isFeatured: initialData.isFeatured,
    isArchived: initialData.isArchived,
    variantLists: initialData.variantLists,
    inceptionDate: new Date(initialData.inceptionDate),
    lastUpdate: new Date(initialData.lastUpdate),
    imageURLs: initialData.imageURLs,
    imagePreview: initialData.imagePreview,
  });

  //? Local state for the variantsList object
  const loadedVariantLists: VariantListType[] = productData.variantLists;

  //! DEBUG Logging initial data
  console.log(initialData);

  // make sure data is in string format to prepare for API call

  const formatProductData = (product: ProductType) => ({
    ...product,
    price: product.price.toString(),
    isArchived: product.isArchived.toString(),
    isFeatured: product.isFeatured.toString(),
    variantLists: product.variantLists.map((variantList) => ({
      ...variantList,
      variants: variantList.variants.map((variant) => ({
        ...variant,
        code: variant.code?.toString(),
        inceptionDate: new Date(variant.inceptionDate.toString()),
        lastUpdate: new Date(variant.lastUpdate.toString()),
      })),
    })),
  });

  const handleInputChange = (field: keyof ProductType, value: any) => {
    setProductState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const submitProduct = async () => {
    const isMutated =
      JSON.stringify(initialData) !== JSON.stringify(productState);
    if (isMutated || productID === 'new') {
      const formattedProduct = formatProductData(productState);
      if (productID === 'new') {
        await createProduct(formattedProduct);
      } else {
        await updateProduct(formattedProduct);
      }
    }
  };

  useEffect(() => {
    const isMutated =
      JSON.stringify(initialData) !== JSON.stringify(productState);
    setHasChanged(isMutated);
  }, [productState, initialData]);

  function openQuickPickModal() {
    console.log(isOpen);
    onOpen();
  }

  //
  // IMMAGE GALLERY WIP
  //

  const fakeImageList = [
    //'https://plus.unsplash.com/premium_photo-1675896084254-dcb626387e1e?q=80&w=2735&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //'https://plus.unsplash.com/premium_photo-1664392147011-2a720f214e01?q=80&w=2678&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=2559&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  const UploadCard = () => (
    <Card
      className={`${isMobile ? 'min-w-full' : 'w-[210px]'} h-[150px] sm:w-[450px] sm:h-[250px] md:w-[150px] md:h-[150px] lg:w-[205px] lg:h-[205px] border-dashed border-2 border-blue-300 bg-gray-50 shadow-none p-2 md:p-4 flex flex-col justify-center items-center`}
    >
      <div className="space-y-4 justify-center items-center flex flex-col">
        <Button
          variant="dashed"
          size="sm"
          className="sm:text-xs sm:px-2"
          onClick={() => {
            setShowPrompt(true);
            document.getElementById('quickPickUploadButton')?.click();
          }}
        >
          <CloudUpload className="mr-2 sm:mr-1" size={18} /> Upload{' '}
          {isMobile ? '' : 'Image'}
        </Button>
        <QuickPickerDialog
          showPrompt={showPrompt}
          setShowPrompt={setShowPrompt}
        />
      </div>
      <Separator
        orientation="horizontal"
        className="hidden sm:flex my-4 w-[40%] text-xs text-muted-foreground sm:my-2"
      />
      <CardDescription className="text-center text-xs text-muted-foreground sm:text-[10px] hidden md:block">
        drag and drop an image
      </CardDescription>
    </Card>
  );

  const MainImageCard = ({
    images,
    text,
  }: {
    images: string[];
    text: string;
  }) => {
    const hasImage = images.length > 0;
    return hasImage ? (
      <div className="w-full min-w-[85%] min-h-[350px]  sm:min-w-[69px] sm:min-h-[250px] md:w-[45%] md:min-w-[150px] md:min-h-[150px] lg:min-w-[205px] lg:min-h-[205px] justify-center items-center flex p-1 hover:cursor-pointer hover:shadow-md hover:scale-[101%] transition-all duration-100 border-2 border-gray-200 rounded-xl overflow-hidden relative group">
        <Image
          src={images[0]}
          alt="Product Image"
          className="object-cover h-full w-full rounded-lg"
          width={200}
          height={200}
          unoptimized
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 m-1" />
        <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => console.log('Edit clicked')}
            >
              <RefreshCcw className="h-3 w-3" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => console.log('Delete clicked')}
            >
              <Trash className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    ) : (
      <div className="w-full h-full max-w-[85%] min-h-[275px] sm:min-w-[69px] sm:min-h-[250px] md:min-w-[150px] md:min-h-[150px] lg:min-w-[205px] lg:min-h-[205px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl animate-pulse flex items-center justify-center">
        {text || ''}
      </div>
    );
  };

  const Thumbnail = ({ src }: { src: string }) => (
    <div className="h-[145px] w-[145px] md:h-[75px] md:w-[75px] lg:h-[100px] lg:w-[100px] justify-center items-center flex hover:cursor-pointer hover:shadow-md hover:scale-[102%] transition-all duration-100 p-1 border-2 border-gray-200 rounded-xl overflow-hidden relative group">
      <Image
        src={src}
        alt="Product Image"
        className="object-cover h-full w-full rounded-lg"
        width={100}
        height={100}
        unoptimized
      />
      <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 m-1" />
      <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => console.log('Edit clicked')}
          >
            <RefreshCcw className="h-3 w-3" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => console.log('Delete clicked')}
          >
            <Trash className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );

  const PlaceholderBox = () => (
    <div
      className={`h-full w-full min-h-[120px] min-w-[120px] aspect-square md:min-h-[75px] md:min-w-[75px]  lg:min-h-[100px] lg:min-w-[100px] flex items-center justify-center border-2 border-dashed border-gray-300 text-muted-foreground rounded-xl text-xs text-center px-2 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse `}
    >
      <ImageIcon className={`text-muted-foreground `} size={18} />
    </div>
  );

  const ImageGrid = ({ images }: { images: string[] }) => {
    const gridItems: React.ReactNode[] = [];
    const maxItems = images.length < 4 ? 4 : images.length + 2;

    // Fill real images
    images.forEach((img, index) => {
      gridItems.push(<Thumbnail key={`thumb-${index}`} src={img} />);
    });

    // Add placeholders if needed
    for (let i = images.length; i < maxItems; i++) {
      gridItems.push(<PlaceholderBox key={`placeholder-${i}`} />);
    }

    return (
      <section
        className={`grid ${isMobile ? 'grid-cols-2 gap-2' : 'grid-cols-4 gap-2'}`}
      >
        {gridItems.slice(0, maxItems)}
      </section>
    );
  };

  const animationVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  //* https://claude.ai/chat/0f7ca4f4-d4a0-4839-a45d-85d5afb90cdd
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={animationVariants}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="mb-24 rounded-3xl shadow-[0_5px_10px_2px_rgba(0,0,0,0.1)] w-full sm:w-[92%] md:w-[90%] lg:w-[85%] xl:w-[70%] xl:max-w-[1210px] mx-auto"
    >
      <Squircle
        cornerRadius={25}
        cornerSmoothing={1}
        className="bg-card mx-auto"
      >
        <div className={`sticky top-0 z-10 p-2 md:p-3 rounded-lg border-b`}>
          {isMediumDevice ||
          isLargeDevice ||
          is2XLargeDevice ||
          isExtraLargeDevice ? (
            ''
          ) : (
            <div className="w-[40%] mx-auto mb-2 rounded-full h-[4px] bg-muted-foreground m-4" />
          )}
          <div className="flex justify-between items-center mb-2">
            <Button
              variant="secondaryoutlined"
              onClick={() => router.push(`/${storeID}/products`)}
              className="min-w-[10vw] rounded-xl ml-1 "
            >
              <ArrowLeft className={`md:mr-2 h-4 w-4 hidden sm:flex`} />
              {isSmallDevice ||
              isMediumDevice ||
              isLargeDevice ||
              is2XLargeDevice ||
              isExtraLargeDevice
                ? 'Return to Products'
                : 'Return'}
            </Button>
            <div className="relative text-center p-2">
              <h2 className="text-md font-medium">{formTitle}</h2>
              <p className="text-sm text-muted-foreground">
                Fill in the required fields
              </p>
            </div>
            <VariantManagerDialog
              params={params}
              productID={productData.ID}
              variantLists={loadedVariantLists}
            />
          </div>
        </div>

        {/* Scrollable content area */}
        <ScrollArea
          type="auto"
          ref={scrollAreaRef}
          className="max-h-[calc(100vh-100px)] overflow-y-auto"
        >
          <CardContent className="p-4 mb-4 md:p-6 card-content">
            <div className="flex flex-col md:flex-row gap-6">
              {/* General Details */}
              <div className="flex-[0.5] md:flex-[0.6] space-y-8">
                <section>
                  <Badge
                    variant={'secondary'}
                    className="relative translate-x-[15%] translate-y-7 py-1 px-2 rounded-lg mb-4"
                  >
                    General details
                  </Badge>
                  <Card className="bg-white shadow-none rounded-2xl p-4">
                    <FormLabel size="sm" className="mb-2 text-sm">
                      Title
                    </FormLabel>
                    <Input
                      className="mb-4 m-0 rounded-lg border border-input focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      value={productState.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange('name', e.target.value)
                      }
                    />
                    <FormLabel className="mb-2 mt-2 text-sm">
                      Description
                    </FormLabel>
                    <Textarea
                      className="min-h-[221px] md:min-h-[142px] lg:min-h-[221px] rounded-xl"
                      value={productState.description}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        handleInputChange('description', e.target.value)
                      }
                    />
                  </Card>
                </section>
              </div>

              <div className="w-full md:flex-[0.4] space-y-8 lg:w-auto mx-auto">
                <section>
                  <Badge
                    variant={'secondary'}
                    className="relative translate-x-[15%] translate-y-7 py-1 px-2 rounded-lg mb-4"
                  >
                    Product Images
                  </Badge>
                  <Card className="bg-white rounded-2xl shadow-none p-4 pt-4 space-y-4">
                    <section
                      className={`flex ${
                        isMobile
                          ? 'flex-col space-y-4'
                          : 'flex-row space-x-2 lg:space-x-4'
                      } justify-center items-center mt-3 sm:mt-2 md:mt-0`}
                    >
                      {/* Upload Card */}
                      <UploadCard />

                      {/* Main Image or Placeholder */}
                      <MainImageCard
                        images={productData.imageURLs}
                        text="Add a few images"
                      />
                    </section>

                    <ImageGrid images={productData.imageURLs.slice(1)} />
                  </Card>
                </section>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Pricing */}
              <div className="w-full md:flex-[0.4] space-y-8 lg:w-auto mx-auto">
                <section>
                  <Badge
                    variant={'secondary'}
                    className="relative translate-x-[15%] translate-y-7 py-1 px-2 rounded-lg mb-4"
                  >
                    Pricing
                  </Badge>
                  <Card className="bg-white shadow-none rounded-2xl p-4">
                    <FormLabel className="mb-2 text-sm">Price</FormLabel>
                    <Input
                      type="number"
                      placeholder="Enter price"
                      className="mb-4 m-0 rounded-lg border border-input focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      value={
                        productState.price.isZero()
                          ? ''
                          : productState.price.toString()
                      }
                      onChange={(e: any) => {
                        const value = e.target.value;
                        setProductState((prevState) => ({
                          ...prevState,
                          price: new Decimal(value || '0'),
                        }));
                      }}
                    />
                  </Card>
                </section>
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <Button variant="outline">Discard</Button>
              <Button onClick={submitProduct}>{buttonText}</Button>
            </div>
          </CardContent>
        </ScrollArea>
      </Squircle>
    </motion.div>
  );
};
