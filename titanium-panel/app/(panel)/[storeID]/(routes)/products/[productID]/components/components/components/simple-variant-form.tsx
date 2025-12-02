'use client';

//> Imports
import React, { useEffect, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

//> Hooks
import {
  useVariantsFormActiveState,
  useAPIActionState,
  useToBeDeletedVariantsState,
  useVariantListsState,
  useToBeCreatedVariantsState,
  useToBeEditedVariantsState,
} from '@/hooks/use-variant-manager';

//> PrismaDB Imports / Fetching
import { Variant } from '@prisma/client';

//> UI Imports
import { VariantTypeComboBox } from './variant-type-combobox';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/shadcn/button';
import { Input } from '@/components/ui/shadcn/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card';
import { PenIcon, Plus, TrashIcon } from 'lucide-react';
import ColorNamer from 'color-namer';

//> Types
import { VariantListType } from '@/types/data-types';

//> Constants
const PRESET_VARIANT_TYPES = [
  { type: 'Color', label: 'Color' },
  { type: 'Size', label: 'Size' },
  { type: 'Weight', label: 'Weight' },
  { type: 'Volume', label: 'Volume' },
  { type: 'Material', label: 'Material' },
];

//> Main Component
const SimpleVariantForm = ({
  params,
  callBackHandler,
  initialVariantLists: loadedVariantsLists,
}: {
  params: any;
  callBackHandler: (variantsLists: VariantListType[]) => void;
  initialVariantLists: VariantListType[];
}) => {
  // State for managing variants
  const [variantLists, setVariantLists] = useState(loadedVariantsLists);
  const [selectedTypes, setSelectedTypes] = useState(
    loadedVariantsLists.reduce(
      (acc, list) => {
        list.variants.forEach((variant) => {
          acc[variant.ID] = variant.type;
        });
        return acc;
      },
      {} as Record<string, string>,
    ),
  );

  // State from hooks
  const { isVariantsFormActive } = useVariantsFormActiveState();
  const { toBeCreatedVariants } = useToBeCreatedVariantsState();
  const { toBeEditedVariants } = useToBeEditedVariantsState();
  const { toBeDeletedVariantsIDs } = useToBeDeletedVariantsState();

  // Temporary IDs for newly added variants
  const tempVariantsIDs: string[] = [];

  // Initialize local state on load
  useEffect(() => {
    setVariantLists(loadedVariantsLists);
  }, [loadedVariantsLists]);

  // Notify parent component on state change
  useEffect(() => {
    callBackHandler(variantLists);
  }, [variantLists, callBackHandler]);

  // Handle type change for a variant
  const handleTypeChange = useCallback((variantID: string, newType: string) => {
    setSelectedTypes((prev) => ({ ...prev, [variantID]: newType }));
    setVariantLists((prevLists) =>
      prevLists.map((list) => ({
        ...list,
        variants: list.variants.map((variant) =>
          variant.ID === variantID ? { ...variant, type: newType } : variant,
        ),
      })),
    );
  }, []);

  // Add a new variant form field
  const addFormField = useCallback(() => {
    const hexColor = `#${Math.random().toString(16).slice(-6).padStart(6, '0')}`;
    const colorName = ColorNamer(hexColor).basic[0].name;
    const newVariant = {
      ID: uuidv4(),
      type: 'Color',
      value: hexColor,
      code: colorName.charAt(0).toUpperCase() + colorName.slice(1),
      storeID: params.storeID,
      inceptionDate: new Date(),
      lastUpdate: new Date(),
    };
    tempVariantsIDs.push(newVariant.ID);
    toBeCreatedVariants.push(newVariant);

    setVariantLists((prevLists) =>
      prevLists.map((list) => ({
        ...list,
        variants: [...list.variants, newVariant],
      })),
    );
  }, [params.storeID, tempVariantsIDs, toBeCreatedVariants]);

  // Remove a variant form field
  const removeFormField = useCallback((variantID: string) => {
    if (tempVariantsIDs.includes(variantID)) {
      const index = tempVariantsIDs.indexOf(variantID);
      if (index > -1) {
        tempVariantsIDs.splice(index, 1);
        toBeCreatedVariants.splice(
          toBeCreatedVariants.findIndex((v) => v.ID === variantID),
          1,
        );
      }
    } else {
      if (!toBeDeletedVariantsIDs.includes(variantID)) {
        toBeDeletedVariantsIDs.push(variantID);
      }
      const editIndex = toBeEditedVariants.findIndex((v) => v.ID === variantID);
      if (editIndex > -1) {
        toBeEditedVariants.splice(editIndex, 1);
      }
    }

    setVariantLists((prevLists) =>
      prevLists.map((list) => ({
        ...list,
        variants: list.variants.filter((variant) => variant.ID !== variantID),
      })),
    );
  }, []);

  // Individual variant row component
  const SimpleVariantRow = React.memo(
    ({ fetchedVariant, index }: { fetchedVariant: Variant; index: number }) => {
      const { register, handleSubmit, formState } = useForm();
      const { errors } = formState;

      const onSubmit = (data: any) => {
        const currentVariant = variantLists[0].variants[index];
        if (
          currentVariant.value !== data[`variant${index}Value`] ||
          currentVariant.code !== data[`variant${index}Code`]
        ) {
          setVariantLists((prevLists) =>
            prevLists.map((list) => ({
              ...list,
              variants: list.variants.map((variant) =>
                variant.ID === fetchedVariant.ID
                  ? {
                      ...variant,
                      value: data[`variant${index}Value`],
                      code: data[`variant${index}Code`],
                    }
                  : variant,
              ),
            })),
          );
        }
      };

      return (
        <div className="col-span-4">
          <form
            onBlur={handleSubmit(onSubmit)}
            className="grid grid-cols-1 sm:grid-cols-4 gap-4"
          >
            {index < 1 ? (
              <VariantTypeComboBox
                options={PRESET_VARIANT_TYPES}
                type={fetchedVariant.type}
                onSelect={(type) => handleTypeChange(fetchedVariant.ID, type)}
              />
            ) : (
              <span className="hidden sm:block" />
            )}
            <Input
              className={`col-span-1 mt-6 sm:mt-0 text-md`}
              defaultValue={fetchedVariant.value}
              placeholder="#DE5B6C"
              {...register(`variant${index}Value`, {
                required: true,
                onChange: (e) => {
                  console.log(e.target.value);
                },
              })}
            />
            <Input
              defaultValue={fetchedVariant.code}
              style={{
                borderWidth: '2px',
                borderColor: fetchedVariant.value,
              }}
              className={'text-md'}
              placeholder="Fuchsia"
              {...register(`variant${index}Code`, {
                required: true,
                onChange: (e) => {
                  console.log(e.target.value);
                },
              })}
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                removeFormField(fetchedVariant.ID);
              }}
              disabled={index < 2}
            >
              <TrashIcon className="w-4 h-4" />
            </Button>
          </form>
        </div>
      );
    },
  );

  return (
    <>
      {variantLists.map((variantEntry) => (
        <Card
          key={variantEntry.ID}
          className={`bg-muted transition-opacity duration-300 rounded-xl ${
            isVariantsFormActive ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <CardHeader className="bg-primary text-white p-1 rounded-xl drop-shadow-md m-2 sm:m-1">
            <div className="group">
              <div className="flex text-md font-semibold border-2 border-transparent rounded-lg transition-colors duration-200 group-hover:border-secondary focus-within:border-secondary">
                <Input
                  className="p-1 self-center bg-transparent hover:cursor-text group-hover:border-secondary text-md"
                  defaultValue={variantEntry.name}
                  style={{ borderWidth: '0px' }}
                  placeholder="Provide a name"
                  onBlur={(e: { target: { value: any } }) => {
                    const newName = e.target.value;
                    setVariantLists((prevLists) =>
                      prevLists.map((list) =>
                        list.ID === variantEntry.ID
                          ? { ...list, name: newName }
                          : list,
                      ),
                    );
                  }}
                />
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    const inputElement = e.currentTarget
                      .closest('div')
                      ?.querySelector('input');
                    if (inputElement) {
                      inputElement.focus();
                    }
                  }}
                  variant="outline"
                  className="ml-auto w-min h-[80%] flex items-center self-center rounded-sm hover:rounded-tl-none hover:rounded-bl-none group-focus-within:rounded-tl-none group-focus-within:rounded-bl-none group-hover:rounded-tl-none group-hover:rounded-bl-none"
                >
                  <PenIcon className="w-5 h-5 ml-auto text-primary" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent
            style={{ gridTemplateColumns: '1fr 1fr 1fr 0.3fr' }}
            className="grid grid-cols-4 gap-y-2 p-4"
          >
            <span className="hidden sm:block text-sm">Type</span>
            <span className="hidden sm:block text-sm col-span-1">Value</span>
            <span className="hidden sm:block text-sm col-span-1">Name</span>
            <span className="hidden sm:block  col-span-1" />
            {variantEntry.variants.map((variant: Variant, index: number) => (
              <SimpleVariantRow
                key={variant.ID}
                fetchedVariant={variant}
                index={index}
              />
            ))}
            <span className="col-span-1" />
            <div className="flex justify-center col-span-4 md:col-span-2 md:col-start-2 lg:col-span-2 lg:col-start-2">
              <Button
                className="w-full bg-primary hover:bg-slate-800 text-secondary hover:text-secondary rounded-xl mt-6 drop-shadow-md"
                variant="outline"
                onClick={addFormField}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Variant
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export { SimpleVariantForm };
