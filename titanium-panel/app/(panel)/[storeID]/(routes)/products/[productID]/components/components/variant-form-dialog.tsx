'use client';

//> Imports
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

//> Hooks
import {
  useInitialVariantsListsState,
  useToBeCreatedVariantsState,
  useToBeEditedVariantsState,
  useToBeDeletedVariantsState,
  useVariantCreatorActiveState,
  useVariantsFormActiveState,
  useVariantListsState,
  useVariantsMetaDataState,
  useAPIActionState,
} from '@/hooks/use-variant-manager';

//> UI Imports
import { SimpleVariantForm } from './components/simple-variant-form';
import { VariantCreator } from './components/variant-creator';

import {
  AlertDialog as VariantDialog,
  AlertDialogHeader as VariantDialogHeader,
  AlertDialogTitle as VariantDialogTitle,
  AlertDialogDescription as VariantDialogDescription,
  AlertDialogContent as VariantDialogContent,
  AlertDialogTrigger as VariantDialogTrigger,
  AlertDialogFooter as VariantDialogFooter,
  AlertDialogAction as VariantDialogAction,
  AlertDialogCancel as VariantDialogCancel,
} from './components/variant-manager-dialog';

//> CSS
import './css/variant-form-load.css';

//> Interfaces

import { Button } from '@/components/ui/shadcn/button';
import { ScrollArea } from '@/components/ui/shadcn/scroll-area';

import { X } from 'lucide-react';
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

export function VariantManagerDialog({
  params,
  productID,
  variantLists: importedVariantLists,
}: {
  params: any;
  productID: string;
  variantLists: VariantListType[];
}) {
  const {
    isSmallDevice,
    isMediumDevice,
    isLargeDevice,
    isExtraLargeDevice,
    is2XLargeDevice,
  } = useDeviceType();

  //? State for variants
  const [dialogVariantLists, setDialogVariantLists] =
    useState(importedVariantLists);
  const [dialogVariantsArray, setDialogVariantsArray] = useState<Variant[]>([]);

  const { setIsVariantCreatorActive } = useVariantCreatorActiveState();
  const { isVariantsFormActive, setIsVariantFormActive } =
    useVariantsFormActiveState();

  const { toBeCreatedVariants, setToBeCreatedVariants } =
    useToBeCreatedVariantsState();

  const { toBeEditedVariants, setToBeEditedVariants } =
    useToBeEditedVariantsState();

  const { toBeDeletedVariantsIDs, setToBeDeletedVariantsIDs } =
    useToBeDeletedVariantsState();

  const { variantOperationMode, setVariantOperationMode } =
    useVariantsMetaDataState();

  const {
    APIstandby,
    setAPIStandby,
    APIpost,
    setAPIPost,
    APIput,
    setAPIPut,
    APIdelete,
    setAPIDelete,
  } = useAPIActionState();

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  const [canSave, setCanSave] = useState(false);
  const [hasVariantArrayIncreased, setHasVariantArrayIncreased] =
    useState(false);

  const isUUID = (uuid: string) => {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
    return uuidRegex.test(uuid);
  };

  const isEditing = params.productID !== 'new' && isUUID(params.productID);
  // console.log('Is Editing: ' + isEditing);
  // console.log('Operation Mode: ' + variantOperationMode);

  //#
  useEffect(() => {
    if (toBeCreatedVariants.length === 0) setAPIPost(false);
  }, [toBeCreatedVariants, toBeEditedVariants]);

  //# Effect to determine the operation mode (API, UI)
  useEffect(() => {
    setIsLoading(true);
    if (dialogVariantLists.length === 0) {
      setVariantOperationMode('standby');
      setIsVariantCreatorActive(true);
      setIsVariantFormActive(false);
    } else {
      console.log(dialogVariantLists[0].variants.length);
      if (dialogVariantLists[0].variants.length > dialogVariantsArray.length) {
        setHasVariantArrayIncreased(true);
        setDialogVariantsArray(dialogVariantLists[0].variants);
      }
      setVariantOperationMode('edit');
      setIsVariantCreatorActive(false);
      setIsVariantFormActive(true);
    }
    setIsLoading(false);
  }, [dialogVariantLists]);

  useEffect(() => {
    console.log('variantsArray length: ', dialogVariantsArray.length);
  }, [dialogVariantsArray]);

  //# Callback to update variant lists in the state
  const variantDialogCallBack = useCallback(
    (updatedVariantsLists: VariantListType[]) => {
      console.log('[Dialog Callback]');
      // Compare updated variants with the current dialogVariantLists
      if (!areVariantListsEqual(updatedVariantsLists, dialogVariantLists)) {
        setDialogVariantLists(updatedVariantsLists);
      }
      refreshAPIStates();

      console.log('API States:', { APIstandby, APIpost, APIput, APIdelete });
    },
    [
      dialogVariantLists,
      toBeCreatedVariants,
      toBeEditedVariants,
      toBeDeletedVariantsIDs,
    ],
  );

  //!
  //!

  // Stuck at this bs
  function refreshAPIStates() {
    console.log(hasVariantArrayIncreased);
    console.log(toBeCreatedVariants.length);
    console.log(toBeEditedVariants.length);
    console.log(toBeDeletedVariantsIDs.length);
    const needsPost =
      hasVariantArrayIncreased && toBeCreatedVariants.length >= 1;
    const needsPut = toBeEditedVariants.length >= 1;
    const needsDelete = toBeDeletedVariantsIDs.length >= 1;

    setAPIPost(needsPost);
    setAPIPut(needsPut);
    setAPIDelete(needsDelete);

    // Set APIstandby: standby is true only when no API actions are needed
    const isStandby = !(needsPost || needsPut || needsDelete);
    setAPIStandby(isStandby);

    // Enable the button (canSave should be true when any API actions are needed)
    const canSave = needsPost || needsPut || needsDelete;
    setCanSave(canSave);
  }

  // Function to handle API calls based on actions
  async function handleAPIActions() {
    if (APIstandby) {
      setAPIPost(false);
      setAPIPut(false);
      setAPIDelete(false);
      return;
    }

    if (APIpost) {
      console.log('Creating new variants...');
      // Call API to create new variants
      // console.log(dialogVariantLists[0]);
      await createVariants();
    }

    if (APIput) {
      console.log('Editing existing variants...');
      // Call API to edit existing variants
      await editVariants();
    }

    if (APIdelete) {
      console.log('Deleting variants...');
      // Call API to delete variants
      await deleteVariants();
    }
  }

  // Example API call functions
  async function createVariants() {
    axios
      .post('/api/product/variant', {
        _upVariantsArray: JSON.stringify(dialogVariantLists[0]),
      })
      .then((response) => {
        console.log(response.data);
        setVariantOperationMode('edit');
        setTimeout(() => {
          set;
          refreshAPIStates();
          setIsLoading(false), 500;
        }); //* Ensure minimum display time & reset API POST state
      })
      .catch((error) => {
        //! Handle API state
        console.error('Error creating variant:', error);
        setTimeout(() => setIsLoading(false), 500); //* Ensure minimum display time
      });
  }

  async function editVariants() {
    axios
      .put('/api/product/variant', {
        _upVariantsArray: JSON.stringify(dialogVariantLists[0]),
      })
      .then((response) => {
        console.log(response.data);
        setTimeout(() => setIsLoading(false), 500); //* Ensure minimum display time
      })
      .catch((error) => {
        console.error('Error updating variant:', error);
        setTimeout(() => {
          setToBeEditedVariants([]);
          refreshAPIStates();
          setIsLoading(false), 500;
        }); //* Ensure minimum display time
      });
  }

  async function deleteVariants() {
    axios
      .delete('/api/product/variant', {
        data: {
          variantIDs: JSON.stringify(toBeDeletedVariantsIDs),
        },
      })
      .then((response) => {
        console.log(response.data);
        setVariantOperationMode('edit');
        setTimeout(() => {
          setToBeDeletedVariantsIDs([]);
          refreshAPIStates();
          setIsLoading(false), 500;
        }); //* Ensure minimum display time
      })
      .catch((error) => {
        console.error('Error creating variant:', error);
        setTimeout(() => setIsLoading(false), 500); //* Ensure minimum display time
      });
  }

  // Call the function to handle variant actions
  // handleAPIActions();

  //!
  //!

  const handleSubmit = () => {
    setIsLoading(true);

    handleAPIActions();
  };

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

  return (
    <VariantDialog>
      <VariantDialogTrigger asChild>
        <Button
          variant={'secondaryoutlined'}
          className="m-2 px-2 min-w-[10vh] rounded-xl"
        >
          <ButtonIcon width={20} className="mr-1 hidden sm:flex" />
          {isSmallDevice ||
          isMediumDevice ||
          isLargeDevice ||
          is2XLargeDevice ||
          isExtraLargeDevice
            ? 'Variant Manager'
            : 'Variants'}
        </Button>
      </VariantDialogTrigger>
      <VariantDialogContent className="overflow-y-scroll sm:overflow-y-hidden">
        <LoadingOverlay isLoading={isLoading} />
        <VariantDialogHeader>
          <div className="flex justify-between">
            <VariantDialogTitle className="text-2xl tracking-tighter">
              Variant Manager
            </VariantDialogTitle>
            <VariantDialogCancel className="hover:bg-gray-200 hover:scale-110">
              <X size={16} />
            </VariantDialogCancel>
          </div>
          <VariantDialogDescription
            className={`tracking-tighter ${dialogVariantLists.length === 0 ? 'block' : 'hidden'}`}
          >
            Create and manage your product variants. Variants are unique to{' '}
            <span style={{ textDecoration: 'underline' }}>this product.</span>
          </VariantDialogDescription>
        </VariantDialogHeader>
        <ScrollArea className="flex-grow h-full rounded-3xl shadow-inner overflow-auto max-h-[65vh]">
          <div className="h-full m-4">
            {dialogVariantLists.length === 0 ? (
              <VariantCreator
                params={params}
                productID={productID}
                callBackHandler={variantDialogCallBack}
              />
            ) : (
              <SimpleVariantForm
                params={params}
                callBackHandler={variantDialogCallBack}
                initialVariantLists={dialogVariantLists}
              />
            )}
          </div>
        </ScrollArea>
        <VariantDialogFooter>
          <VariantDialogAction
            disabled={
              !canSave &&
              (variantOperationMode === 'edit' ||
                variantOperationMode === 'create')
            }
            style={{
              display:
                variantOperationMode === 'edit' ||
                variantOperationMode === 'create'
                  ? 'block'
                  : 'none',
            }}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              handleSubmit(); // This would handle the form submission logic
            }}
          >
            {isLoading
              ? 'Please wait...'
              : APIpost && APIput && APIdelete
                ? 'Save Changes'
                : APIpost && !APIput && !APIdelete
                  ? 'Create Variants'
                  : !APIpost && APIput && !APIdelete
                    ? 'Save Changes'
                    : !APIpost && !APIput && APIdelete
                      ? 'Delete Variants'
                      : APIpost && APIput && !APIdelete
                        ? 'Save & Create Variants'
                        : APIpost && APIdelete
                          ? 'Delete & Create Variants'
                          : !APIpost && APIput && APIdelete
                            ? 'Save & Delete Variants'
                            : 'Changes Saved'}
          </VariantDialogAction>
        </VariantDialogFooter>
      </VariantDialogContent>
    </VariantDialog>
  );
}
