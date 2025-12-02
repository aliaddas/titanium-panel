//>
//> Imports
//>

//> React
import React, { use, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

//> Hooks
import {
  useVariantCreatorActiveState,
  useVariantsFormActiveState,
  useVariantsMetaDataState,
  useInitialVariantsListsState,
  useVariantListsState,
  useAPIActionState,
} from '@/hooks/use-variant-manager';

//>
//> UI Imports
//>

//> CSS
import './css/variant-creator.css';

//> Components
import { Button } from '@/components/ui/shadcn/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/shadcn/carousel';

//> Icons
import { ArrowRightLeft, Plus } from 'lucide-react';

import ColorNamer from 'color-namer';
import { Variant } from '@prisma/client';
import { VariantListType } from '@/types/data-types';

const VariantCreator = ({
  params,
  productID,
  callBackHandler,
}: {
  params: any;
  productID: string;
  callBackHandler: (variantsLists: VariantListType[]) => void;
}) => {
  //?
  //? Variables
  //?

  //? Form

  //? Scroll function
  const scrollNextRef = useRef<(() => void) | null>(null);
  const scrollPrevRef = useRef<(() => void) | null>(null);

  //? UI State
  const { isVariantCreatorActive, setIsVariantCreatorActive } =
    useVariantCreatorActiveState();
  const { isVariantsFormActive, setIsVariantFormActive } =
    useVariantsFormActiveState();
  const { variantOperationMode, setVariantOperationMode } =
    useVariantsMetaDataState();
  const { setAPIStandby, setAPIPost } = useAPIActionState();

  //? Form Data
  const { variantSelectedType, setVariantSelectedType } =
    useVariantsMetaDataState();
  const { initialVariantsLists, setInitialVariantsLists } =
    useInitialVariantsListsState();
  const [variantLists, setVariantLists] = useState<VariantListType[]>([]);

  //#
  //# Actions
  //#

  //# Effect to update parent component when variantLists change
  useEffect(() => {
    callBackHandler(variantLists);
  }, [variantLists, callBackHandler]);

  //# Add Simple Variant List
  const addSimpleVariantList = () => {
    const generatedVariants: Variant[] = Array(2)
      .fill({})
      .map(() => {
        let hexColor = Math.floor(Math.random() * 16777215).toString(16);
        // Pad the hex color string with leading zeros if it's too short
        hexColor = hexColor.padStart(6, '0');
        hexColor = `#${hexColor}`;
        let colorName = ColorNamer(hexColor).basic[0].name;
        colorName = colorName.charAt(0).toUpperCase() + colorName.slice(1);
        return {
          ID: uuidv4(),
          type: 'Color',
          value: hexColor,
          code: colorName,
          storeID: params.storeID,
          inceptionDate: new Date(),
          lastUpdate: new Date(),
        };
      });

    //? Simple Variant List
    const simpleVariantList: VariantListType = {
      ID: uuidv4(),
      name: 'New Variant List',
      storeID: params.storeID,
      productID: productID,
      isComplex: false,
      variants: generatedVariants,
    };
    console.log(simpleVariantList);
    setVariantLists([...variantLists, simpleVariantList]); //* Add to List - UI Reacts
    setVariantOperationMode('create');
  };

  //# Add Complex Variant List
  const addComplexVariantList = () => {
    //? Complex Variant List Template A
    const combinedVariantListA = {
      ID: `temp-${Date.now()}`, // temporary ID for new entries
      name: 'New Variant List A',
      storeID: params.storeID,
      productID: productID,
      isComplex: true,
      variants: [
        {
          ID: `temp-${Date.now()}`,
          type: 'Color',
          value: '#FFFFFF',
          code: 'White',
          storeID: params.storeID,
          inceptionDate: new Date(),
          lastUpdate: new Date(),
        },
        {
          ID: `temp-${Date.now()}`,
          type: 'Color',
          value: '#DE5B6C',
          code: 'Sky Blue',
          storeID: params.storeID,
          inceptionDate: new Date(),
          lastUpdate: new Date(),
        },
      ],
    };

    //? Complex Variant List Template B
    const combinedVariantListB = {
      ID: `temp-${Date.now()}`, // temporary ID for new entries
      name: 'New Variant List B',
      storeID: params.storeID,
      productID: null,
      isComplex: true,
      variants: [
        {
          ID: `temp-${Date.now()}`,
          type: 'Size',
          value: '#FFFFFF',
          code: 'White',
          storeID: params.storeID,
          inceptionDate: new Date(),
          lastUpdate: new Date(),
        },
        {
          ID: `temp-${Date.now()}`,
          type: 'Size',
          value: '#DE5B6C',
          code: 'Sky Blue',
          storeID: params.storeID,
          inceptionDate: new Date(),
          lastUpdate: new Date(),
        },
      ],
    };
    //# Fill form with template data
    setInitialVariantsLists([
      ...initialVariantsLists,
      combinedVariantListA, //* Add to List - UI Reacts
      combinedVariantListB, //* Add to List - UI Reacts
    ]);
  };

  //# Handle Create Variant List
  const handleCreateVariantsList = () => {
    //? Check for hosen variant type
    if (variantSelectedType === 'simple') {
      addSimpleVariantList(); //#
    } else if (variantSelectedType === 'complex') {
      addComplexVariantList(); //#
    }
  };

  return (
    <Carousel
      setScrollNextRef={scrollNextRef}
      setScrollPrevRef={scrollPrevRef}
      className="rounded-lg shadow-inner ml-auto mr-auto w-[80%] justify-center items-center"
    >
      <CarouselContent className="items-center">
        <CarouselItem>
          <div
            className={`p-1 flex justify-center items-center flex-col fade ${isVariantCreatorActive ? 'opacity-100' : 'opacity-0'} select-none`}
          >
            <Card className="max-w-[80%] my-6 border-2 border-muted-foreground border-dashed bg-muted shadow-none">
              <CardHeader className="text-center">
                <CardTitle>No Variants Yet..</CardTitle>
                <CardDescription>
                  Start adding your product variants by pressing the button
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-4 gap-y-2 pt-4">
                <div className="col-span-3">
                  <div className="grid grid-cols-3 gap-4">
                    <span />
                    <div className="flex justify-center">
                      <Button
                        className="p-6"
                        onClick={() => {
                          scrollNextRef.current?.(); //# Scroll to Selection
                        }}
                      >
                        <Plus className="mr-4" />
                        Add New Variant
                      </Button>
                    </div>
                    <span />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div
            //@ Wrapper
            className="p-1 flex justify-center items-center"
          >
            <Card
              //@
              //@ Simple Product Card / Button
              //@

              //? Look & Feel
              className={`flex flex-row w-[60%] my-6 ml-6  bg-gradient-to-b from-muted/50 to-muted border-2 ${variantSelectedType === 'simple' ? 'border-primary' : ''} transition-all hover:cursor-pointer hover:border-muted-foreground ${variantSelectedType === 'simple' ? '' : 'border-dashed'} active:scale-[0.99] select-none`}
              //=> Functions
              onClick={() => {
                if (variantSelectedType !== 'simple') {
                  setVariantSelectedType('simple');
                }
              }}
            >
              <CardHeader className="flex-1 text-center">
                <CardTitle>Simple Product</CardTitle>
                <CardDescription>
                  You need to sell a T-Shirt in a few sizes.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 grid grid-cols-3 gap-4 gap-y-2 pt-4">
                <div className="col-span-3">
                  <div className="grid grid-cols-3 gap-4">
                    <span />
                    <div className="flex justify-center"></div>
                    <span />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div
            //@
            //@ Separator / Divider Element
            //@
            >
              <div className="border-r-2 border-primary mx-8 min-h-[4em] max-h-full w-[2px]" />
              <ArrowRightLeft
                color="
                #10142c"
                className="my-4 ml-auto mr-auto"
                size={28}
              />
              <div className="border-r-2 border-primary mx-8 min-h-[4em] max-h-full w-[2px]" />
            </div>

            <Card
              //@
              //@ Complex Product Card / Button
              //@

              //? Look & Feel
              className={`flex flex-row w-[60%] my-6 mr-6 bg-gradient-to-b from-muted/50 to-muted border-2 ${variantSelectedType === 'complex' ? 'border-primary' : ''} transition hover:cursor-pointer hover:border-muted-foreground ${variantSelectedType === 'complex' ? '' : 'border-dashed'} active:scale-[0.99] select-none`}
              //=> Functions
              onClick={() => {
                if (variantSelectedType !== 'complex') {
                  setVariantSelectedType('complex');
                }
              }}
            >
              <CardHeader className="flex-1 text-center">
                <CardTitle>Complex Product</CardTitle>
                <CardDescription>
                  Your need to sell cakes in a few flavors, shapes, and custom
                  decoration.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 grid grid-cols-3 gap-4 gap-y-2 pt-4">
                <div className="col-span-3">
                  <div className="grid grid-cols-3 gap-4">
                    <span />
                    <div className="flex justify-center"></div>
                    <span />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
      <Button
        onClick={() => {
          scrollPrevRef.current?.(); //# Scroll Back
          setIsVariantCreatorActive(false); //# Disable Creator (Invisible)
          setTimeout(() => {
            handleCreateVariantsList(); //# Create Selected Variant List
          }, 600);
          setTimeout(() => {
            setIsVariantFormActive(true); //# Enable Lists (Visible)
          }, 600);
        }}
        style={{ display: variantSelectedType === '' ? 'none' : 'block' }}
        className="ml-auto mr-auto select-none shadow-md"
      >
        Create{' '}
        {variantSelectedType.charAt(0).toUpperCase() +
          variantSelectedType.slice(1)}{' '}
        Variant
      </Button>
    </Carousel>
  );
};

export { VariantCreator };
