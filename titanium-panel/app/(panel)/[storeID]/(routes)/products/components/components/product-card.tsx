import { Badge } from '@/components/ui/shadcn/badge';
import { Button } from '@/components/ui/shadcn/button';
import { FormLabel } from '@/components/ui/formlayout/form-label';
import { FormTitle } from '@/components/ui/formlayout/form-title';
import { useDeviceType } from '@/hooks/use-device-type';
import { Squircle } from '@squircle-js/react';
import { Container, HandCoins } from 'lucide-react';
import { JSX, use, useEffect, useState } from 'react';
import { set } from 'zod';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

interface ProductCardProps {
  product: any;
  selectedProduct: string;
  setSelectedProduct: (productID: string) => void;
  setPreviewImageIndex: (index: number) => void;
  isGrid: boolean;
  router: any;
  params: any;
}

export const ProductCard = ({
  product,
  selectedProduct,
  setSelectedProduct,
  setPreviewImageIndex,
  isGrid,
  router,
  params,
}: ProductCardProps) => {
  const {
    isMobile,
    isSmallDevice,
    isMediumDevice,
    isLargeDevice,
    isExtraLargeDevice,
    is2XLargeDevice,
  } = useDeviceType();

  const cornerRadiusInner = isMobile || isSmallDevice ? 16 : 18;

  const [rerender, setRerender] = useState(0);

  useEffect(() => {}, [rerender]);

  return (
    <Squircle
      key={product.ID}
      cornerRadius={20}
      cornerSmoothing={1}
      className={`relative mb-4 h-full w-full aspect-[1/1.3] group bg-secondary p-[1px] md:p-[1.5px] hover:scale-[103%] hover:bg-muted-foreground hover:cursor-pointer ${selectedProduct === product.ID ? 'scale-[102%] bg-slate-400' : ''} transition-transform-color duration-200`}
    >
      <Squircle
        cornerRadius={19}
        cornerSmoothing={1}
        className={`relative ${selectedProduct === product.ID ? 'bg-slate-50' : 'bg-card'} h-full w-full p-2 flex flex-col transition-transform duration-200`}
      >
        <Squircle
          onClick={() => {
            if (selectedProduct === product.ID) {
              setSelectedProduct('');
            } else {
              setSelectedProduct(product.ID);
              setPreviewImageIndex(0);
            }
            setRerender(rerender + 1);
          }}
          cornerRadius={cornerRadiusInner}
          cornerSmoothing={1}
          className="aspect-[4/3] bg-slate-200 mb-1 md:mb-4 flex items-center justify-center overflow-hidden transition-transform duration-200"
        >
          {product.imageURLs && product.imageURLs.length > 0 ? (
            <Image
              src={product.imageURLs[0]}
              alt={product.name}
              className="object-cover w-full h-full"
              width={isMobile ? 400 : 200}
              height={isMobile ? 300 : 150}
              quality={isMobile ? 90 : 75}
              unoptimized
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full text-center text-gray-500 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 animate-pulse">
              <Container
                size={isMobile ? 40 : 30}
                className="mb-2 text-gray-600"
              />
              <span className="text-sm">Image Missing</span>
            </div>
          )}
        </Squircle>
        <div
          className="flex-grow px-1"
          onClick={() => {
            if (selectedProduct === product.ID) {
              setSelectedProduct('');
            } else {
              setSelectedProduct(product.ID);
              setPreviewImageIndex(0);
            }
            setRerender(rerender + 1);
          }}
        >
          <FormTitle className={isGrid ? 'mb-0' : ''}>{product.name}</FormTitle>
          {isGrid &&
          (isMobile || isSmallDevice) &&
          selectedProduct === product.ID ? (
            <span />
          ) : (
            <FormLabel size="smtr">
              {product.description === null
                ? 'Missing Description'
                : product.description}
            </FormLabel>
          )}
        </div>
        <div className="flex justify-evenly sm:justify-normal sm:space-x-5 b:space-x-2 md:mx-2 mt-1 mb-2 md:mb-0">
          <div className="flex space-x-2 sm:mb-2">
            <FormLabel size="sm">
              {isMobile && isGrid ? (
                <Container size={isMobile ? 18 : 14} />
              ) : (
                'Stock'
              )}
            </FormLabel>
            <Badge variant={'secondary'} size="xs" className="drop-shadow-sm">
              923
            </Badge>
          </div>
          <div className="flex space-x-2 sm:mb-2">
            <FormLabel size="sm">
              {isMobile && isGrid ? (
                <HandCoins size={isMobile ? 18 : 14} />
              ) : (
                'Sold'
              )}
            </FormLabel>
            <Badge variant={'secondary'} size="xs" className="drop-shadow-sm">
              1209
            </Badge>
          </div>
        </div>
        <Button
          size={'xl'}
          variant={'secondaryoutlined'}
          className={`w-[80%] md:w-[85%] ml-auto mr-auto rounded-[18px] shadow-sm hover:scale-[102%] hover:bg-nav/90 hover:text-white px-0 md:px-8 min-h-6 hidden opacity-0 text-center ${
            selectedProduct === product.ID
              ? 'block opacity-100 lg:hidden lg:opacity-0 lg:group-hover:opacity-0 lg:group-hover:hidden'
              : selectedProduct === ''
                ? 'lg:group-hover:opacity-100 lg:group-hover:block'
                : 'lg:group-hover:opacity-0 lg:group-hover:hidden'
          } group-hover:opacity-100 group-hover:block
            hover:opacity-100 hover:block
            transition-all duration-200`}
          onClick={() => {
            router.push(`/${params.storeID}/products/${product.ID}`);
          }}
        >
          View Product
        </Button>
      </Squircle>
    </Squircle>
  );
};
