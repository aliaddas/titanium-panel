'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import { motion } from 'framer-motion';

import { Squircle } from '@squircle-js/react';
import { GridIcon, ContainerIcon } from '@radix-ui/react-icons';
import {
  ArrowLeft,
  ArrowRight,
  Container,
  Plus,
  Search,
  X,
  Zap,
} from 'lucide-react';

import { useScrollContext } from '@/providers/scroll-provider';
import { useDeviceType } from '@/hooks/use-device-type';

import { Button } from '@/components/ui/shadcn/button';
import { Input } from '@/components/ui/shadcn/input';
import { ScrollArea } from '@/components/ui/shadcn/scroll-area';
import { Textarea } from '@/components/ui/shadcn/textarea';
import { Badge } from '@/components/ui/shadcn/badge';
import { CardHeader, CardTitle } from '@/components/ui/shadcn/card';
import { FormTitle } from '@/components/ui/formlayout/form-title';
import { FormLabel } from '@/components/ui/formlayout/form-label';

import { ProductCard } from './components/product-card';

import './css/search-cancel.css';

export const ProductModule = ({ products }: { products: any }) => {
  const router = useRouter();
  const params = useParams();
  const { scrollState } = useScrollContext();

  const [isGrid, setIsGrid] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState('');

  const [previewImageIndex, setPreviewImageIndex] = useState(0);

  const [triggerRerender, setTriggerRerender] = useState(0);

  const {
    isMobile,
    isSmallDevice,
    isMediumDevice,
    isLargeDevice,
    isExtraLargeDevice,
    is2XLargeDevice,
  } = useDeviceType();

  const toggleGrid = () => {
    setIsGrid(!isGrid);
  };

  useEffect(() => {}, [triggerRerender, isGrid]);

  const handleRerender = (timeout: number) => {
    setTimeout(() => {
      setTriggerRerender((prev) => prev + 1); // Update state to trigger re-render
    }, timeout);
  };

  const triggerRerenderInChunks = (totalTime: number) => {
    const chunkSize = 10;
    const chunks = Math.ceil(totalTime / chunkSize);

    for (let i = 0; i < chunks; i++) {
      handleRerender(i * chunkSize);
    }
  };

  /*
    % Generates a CSS class string for the product grid layout.
    % Adjusts layout based on:
    % - `isGrid`: Toggles between grid and list views.
    % - `selectedProduct`: Changes column count when a product is selected.
    % Includes responsive spacing and column adjustments for different screen sizes.
   */
  const productModuleGridClass = `
    h-full
    ${isGrid ? 'm-0 md:m-2 mt-2 px-2' : 'm-2 mt-5 px-4'}
    md:mt-2 md:px-0 mb-64
    grid
    ${isGrid ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}
    gap-4 md:gap-2
    md:grid-cols-3
    ${selectedProduct === '' ? 'lg:grid-cols-4 xl:grid-cols-5' : 'xl:grid-cols-4'}
  `;

  const animationVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={animationVariants}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      className="h-full flex gap-4 md:mt-0 pb-18 sm:pb-24 sm:w-[95%] md:w-[93%] lg:w-[90%] xl:w-[85%] mx-auto"
    >
      <motion.div
        className={`min-w-[71%] flex flex-col bg-card rounded-3xl shadow-[0_5px_10px_2px_rgba(0,0,0,0.1)] ${
          selectedProduct &&
          (isLargeDevice || is2XLargeDevice || isExtraLargeDevice)
            ? 'w-2/3'
            : 'w-full'
        }`}
        animate={{
          width: selectedProduct
            ? isLargeDevice || is2XLargeDevice || isExtraLargeDevice
              ? '66.6667%'
              : '100%'
            : '100%',
        }}
        transition={{ duration: 0 }}
      >
        <Squircle cornerRadius={19} cornerSmoothing={1} className="h-full">
          {isMediumDevice ||
          isLargeDevice ||
          is2XLargeDevice ||
          isExtraLargeDevice ? (
            ''
          ) : (
            <div className="w-[35%] mx-auto mt-2 mb-2 rounded-full h-1.5 bg-slate-400" />
          )}

          {/* Header Section (non-scrollable) */}
          <CardHeader className="sticky top-0 z-10 bg-card p-3 px-2 pt-2">
            <CardTitle
              className={`${
                !isMediumDevice || !isLargeDevice || !is2XLargeDevice
                  ? 'flex justify-between'
                  : ''
              }`}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="flex items-center w-full"
              >
                {!isMobile && (
                  <FormLabel
                    size="lg"
                    className="text-xl font-semibold ml-2 sm:p-4 hidden sm:block"
                  >
                    Products
                  </FormLabel>
                )}
                <div className="flex-grow flex items-center space-x-2 justify-between">
                  <Search
                    size={16}
                    className="absolute ml-5 text-muted-foreground"
                  />
                  <Input
                    id="productSearch"
                    type="search"
                    placeholder="Search your product catalog..."
                    className="pl-8 rounded-2xl border-2 border-muted focus-visible:ring-0 focus-visible:border-primary w-full md:w-[50%] h-full min-h-14 sm:h-10 sm:min-h-10"
                  />
                  <Button
                    size={'lg'}
                    className="max-h-40 min-h-14 sm:h-10 sm:min-h-10 sm:min-w-[25%] rounded-2xl drop-shadow-md bg-nav text-white hover:bg-nav/80 hover:scale-105 active:scale-100 transition-transform duration-200"
                    onClick={() =>
                      router.push(`/${params.storeID}/products/new`)
                    }
                  >
                    <Plus size={18} className="sm:mr-2 " />
                    {isMediumDevice ||
                    isLargeDevice ||
                    isExtraLargeDevice ||
                    is2XLargeDevice
                      ? 'New Product'
                      : ''}
                    {isSmallDevice ? 'New' : ''}
                  </Button>
                </div>
              </motion.div>
            </CardTitle>
          </CardHeader>
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[50vh] relative ">
              <Squircle
                cornerRadius={20}
                cornerSmoothing={1}
                className="p-8 bg-muted  w-[95%] sm:w-[85%] md:w-[40%] mx-auto hover:cursor-default select-none"
              >
                <FormTitle className="text-center text-xl">
                  Wow. So empty...
                </FormTitle>
                <div className="text-center mt-4">
                  <div className="font-bold">Let's get you set-up!</div>
                  Press{' '}
                  <Badge
                    className="hover:bg-primary drop-shadow-lg rounded-md mx-1"
                    variant={'default'}
                  >
                    New Product
                  </Badge>
                  {'  '} to start.
                </div>
              </Squircle>
              <Image
                src={'/svg/product-related/add-product-arrow-bl.svg'}
                width={180}
                height={700}
                alt="Add Product Arrow"
                className="absolute top-0 right-4 sm:right-14 md:right-18 lg-right-28 xl:right-32 2xl:right-44"
              />
            </div>
          ) : (
            <ScrollArea className="flex-grow h-full rounded-3xl bg-gradient-to-b from-slate-100 to-transparent shadow-inner relative m-2">
              <div
                onClick={() => {
                  triggerRerenderInChunks(250);
                }}
                className={productModuleGridClass}
              >
                {/* Scrollable Content Section */}
                {!isMobile ? (
                  ''
                ) : (
                  <Button
                    size={'xl'}
                    variant={'secondaryoutlined'}
                    className="absolute top-2 right-2 z-10 px-6 rounded-2xl text-primary drop-shadow-lg"
                    onClick={toggleGrid}
                  >
                    {isGrid ? <ContainerIcon /> : <GridIcon />}
                  </Button>
                )}
                {/*
                //@
                //@ Products Grid
                //@
                */}
                {products.map((product: any) => {
                  return (
                    <ProductCard
                      key={product.ID}
                      product={product}
                      selectedProduct={selectedProduct}
                      setSelectedProduct={setSelectedProduct}
                      setPreviewImageIndex={setPreviewImageIndex}
                      isGrid={isGrid}
                      router={router}
                      params={params}
                    />
                  );
                })}
              </div>
            </ScrollArea>
          )}
        </Squircle>
      </motion.div>
      {selectedProduct &&
        (isLargeDevice || is2XLargeDevice || isExtraLargeDevice) && (
          <motion.div
            className="flex flex-col w-1/3 min-w-[300px] rounded-3xl shadow-[0_5px_10px_2px_rgba(0,0,0,0.1)]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Squircle
              cornerRadius={19}
              cornerSmoothing={1}
              className="h-full bg-card"
            >
              <div className="flex gap-10 p-4">
                <Button
                  onClick={() => {
                    setSelectedProduct('');
                    triggerRerenderInChunks(250);
                  }}
                  size={'lg'}
                  className="rounded-2xl mx-0 px-2 bg-nav text-white hover:bg-nav/80 hover:scale-105 active:scale-100 transition-transform duration-200"
                >
                  <X />
                </Button>
                <Button
                  size={'lg'}
                  variant={'secondaryoutlined'}
                  className="mt-auto rounded-2xl text-primary drop-shadow-md flex-grow"
                  onClick={() => {
                    router.push(
                      `/${params.storeID}/products/${selectedProduct}`,
                    );
                  }}
                >
                  Open full view
                  <ArrowRight />
                </Button>
              </div>

              <ScrollArea
                id=""
                className="flex-grow h-full rounded-3xl bg-slate-50 shadow-inner m-2 mt-4"
              >
                <div className="m-2">
                  <Squircle
                    cornerRadius={22}
                    cornerSmoothing={1}
                    className="shadow-md"
                  >
                    <motion.div
                      key={previewImageIndex}
                      initial={{ opacity: 0, scale: 0.99 }}
                      animate={{ opacity: 1, scale: 1.02 }}
                      exit={{ opacity: 0, scale: 0.99 }}
                      transition={{ duration: 0.4 }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 1 }}
                      className="relative w-full pb-[65%] group rounded-2xl overflow-hidden"
                    >
                      <motion.div
                        key={
                          products.find(
                            (product: any) => product.ID === selectedProduct,
                          )?.imageURLs[previewImageIndex] ||
                          '/placeholder-image.png'
                        }
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0"
                      >
                        {products.find(
                          (product: any) => product.ID === selectedProduct,
                        )?.imageURLs?.length > 0 ? (
                          <>
                            <Image
                              src={
                                products.find(
                                  (product: any) =>
                                    product.ID === selectedProduct,
                                )?.imageURLs[previewImageIndex]
                              }
                              alt="Product Image"
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              quality={100}
                              priority
                              className="aspect-[4/3] rounded-2xl drop-shadow-md pointer-events-none select-none object-cover"
                              style={{ imageRendering: 'auto' }}
                            />
                            <Badge
                              variant="secondary"
                              className="absolute top-0.5 right-0.5 bg-nav text-white rounded-bl-3xl rounded-tl-lg rounded-tr-3xl rounded-br-lg text-md px-5 py-2 pt-3 shadow-[0_8px_16px_rgba(255,255,255,0.2)]"
                            >
                              {
                                products.find(
                                  (product: any) =>
                                    product.ID === selectedProduct,
                                )?.imageURLs.length
                              }
                            </Badge>
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center w-full h-full text-center text-gray-500 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 animate-pulse rounded-2xl">
                            <Container
                              size={isMobile ? 40 : 30}
                              className="mb-2 text-gray-600"
                            />
                            <span className="text-sm">Image Missing</span>
                          </div>
                        )}
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 hover:cursor-grab active:cursor-grabbing transition-opacity duration-500 flex justify-between items-center p-4">
                        <Button
                          onClick={() => {
                            setPreviewImageIndex((prevIndex) =>
                              prevIndex > 0 ? prevIndex - 1 : 0,
                            );
                          }}
                          disabled={previewImageIndex === 0}
                          className="bg-white/80 hover:bg-white hover:scale-105 text-black rounded-full p-6"
                        >
                          <ArrowLeft size={22} />
                        </Button>
                        <Button
                          onClick={() => {
                            setPreviewImageIndex((prevIndex) =>
                              previewImageIndex <
                              (products.find(
                                (product: any) =>
                                  product.ID === selectedProduct,
                              )?.imageURLs.length || 0) -
                                1
                                ? prevIndex + 1
                                : prevIndex,
                            );
                          }}
                          disabled={
                            previewImageIndex ===
                            (products.find(
                              (product: any) => product.ID === selectedProduct,
                            )?.imageURLs.length || 0) -
                              1
                          }
                          className="bg-white/80 hover:bg-white hover:scale-105 text-black rounded-full p-6"
                        >
                          <ArrowRight size={22} />
                        </Button>
                      </div>
                    </motion.div>
                  </Squircle>
                  <CardHeader>
                    <CardTitle className="flex items-center ml-auto mr-auto space-x-2 text-muted-foreground">
                      <span>Quick Edit</span>
                      <Zap size={16} />
                    </CardTitle>
                  </CardHeader>
                  {products
                    .filter((product: any) => product.ID === selectedProduct)
                    .map((product: any) => (
                      <Squircle
                        key={product.ID}
                        cornerRadius={20}
                        cornerSmoothing={1}
                        className="h-max w-full flex flex-col bg-muted p-4"
                      >
                        <FormTitle>Product Name</FormTitle>
                        <motion.div
                          key={product.name}
                          initial={{ scale: 1.04, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Input defaultValue={product.name} />
                        </motion.div>
                        <span className="h-4" />
                        <FormTitle>Description</FormTitle>
                        <motion.div
                          key={product.description}
                          initial={{ scale: 1.04, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Textarea
                            className="lg:min-h-[150px] resize-none"
                            defaultValue={product.description}
                          />
                        </motion.div>
                      </Squircle>
                    ))}
                </div>
              </ScrollArea>
            </Squircle>
          </motion.div>
        )}
    </motion.div>
  );
};
