//>
//> Imports
//>

import { create } from 'zustand';
import { VariantListType } from '@/types/data-types';
import { Variant } from '@prisma/client';

//@
//@ General State Type
//@

//? APIActionState
type APIActionState = {
  APIstandby: boolean;
  setAPIStandby: (standbyAction: boolean) => void;
  APIpost: boolean;
  setAPIPost: (postAction: boolean) => void;
  APIput: boolean;
  setAPIPut: (putAction: boolean) => void;
  APIdelete: boolean;
  setAPIDelete: (deleteAction: boolean) => void;
};

//? Variants Meta Data State (form operation mode, selected variant type, etc.)
type VariantsMetaDataState = {
  variantOperationMode: string;
  setVariantOperationMode: (variantOperationMode: string) => void;
  variantSelectedType: string;
  setVariantSelectedType: (variantSelectedType: string) => void;
};

//@
//@ Variant Lists State Type
//@

//? Initial Variants Lists State (loaded from the database)
type InitialVariantsListsState = {
  initialVariantsLists: VariantListType[];
  setInitialVariantsLists: (initialVariantsLists: VariantListType[]) => void;
};

//? Variants Lists State (updated by the user)
type VariantListsState = {
  variantLists: VariantListType[];
  setVariantLists: (variantLists: any) => void;
};

//? To Be Deleted Variants State (updated by the user)
type ToBeCreatedVariantsState = {
  toBeCreatedVariants: Variant[];
  setToBeCreatedVariants: (createdVariants: any) => void;
};

//? To Be Deleted Variants State (updated by the user)
type ToBeDeletedVariantsState = {
  toBeDeletedVariantsIDs: string[];
  setToBeDeletedVariantsIDs: (deletedVariantsIDs: string[]) => void;
};

//? To Be Edited Variants State (updated by the user)
type ToBeEditedVariantsState = {
  toBeEditedVariants: Variant[];
  setToBeEditedVariants: (editedVariants: any) => void;
};

//@
//@ Variant Creator State Type
//@

//? Variant Creator Active State (visibility of the variant creator)
type VariantCreatorActiveState = {
  isVariantCreatorActive: boolean;
  setIsVariantCreatorActive: (isActive: boolean) => void;
};

//@
//@ Variant Form State Type
//@

//? Variants Form Active State (visibility of the variant lists)
type VariantsFormActiveState = {
  isVariantsFormActive: boolean;
  setIsVariantFormActive: (isActive: boolean) => void;
};

//
//
//
//
//

//=>
//=> Export Zustand States
//=>

//? API Action State
export const useAPIActionState = create<APIActionState>((set) => ({
  APIstandby: true,
  setAPIStandby: (standbyAction) => set({ APIstandby: standbyAction }),
  APIpost: false,
  setAPIPost: (postAction) => set({ APIpost: postAction }),
  APIput: false,
  setAPIPut: (putAction) => set({ APIput: putAction }),
  APIdelete: false,
  setAPIDelete: (deleteAction) => set({ APIdelete: deleteAction }),
}));

//? Variants Meta Data State
export const useVariantsMetaDataState = create<VariantsMetaDataState>(
  (set) => ({
    variantOperationMode: 'create',
    setVariantOperationMode: (variantOperationMode) =>
      set({ variantOperationMode }),
    variantSelectedType: '',
    setVariantSelectedType: (variantSelectedType) =>
      set({ variantSelectedType }),
  }),
);

//? Initial Variants Lists State (loaded from the database)
export const useInitialVariantsListsState = create<InitialVariantsListsState>(
  (set) => ({
    initialVariantsLists: [],
    setInitialVariantsLists: (initialVariantsLists) =>
      set({ initialVariantsLists }),
  }),
);

//? Variants Lists State (updated by the user)
export const useVariantListsState = create<VariantListsState>((set) => ({
  variantLists: [],
  setVariantLists: (variantLists) => set({ variantLists }),
}));

//? To Be Deleted Variants State (updated by the user)
export const useToBeDeletedVariantsState = create<ToBeDeletedVariantsState>(
  (set) => ({
    toBeDeletedVariantsIDs: [],
    setToBeDeletedVariantsIDs: (deletedVariantsIDs) =>
      set({ toBeDeletedVariantsIDs: deletedVariantsIDs }),
  }),
);

//? To Be Created Variants State (created by the user)
export const useToBeCreatedVariantsState = create<ToBeCreatedVariantsState>(
  (set) => ({
    toBeCreatedVariants: [],
    setToBeCreatedVariants: (createdVariants: any) =>
      set({ toBeCreatedVariants: createdVariants }),
  }),
);

//? To Be Edited Variants State (updated by the user)
export const useToBeEditedVariantsState = create<ToBeEditedVariantsState>(
  (set) => ({
    toBeEditedVariants: [],
    setToBeEditedVariants: (editedVariants: any) =>
      set({ toBeEditedVariants: editedVariants }),
  }),
);

//? Variant Creator Active State (visibility of the variant creator)
export const useVariantCreatorActiveState = create<VariantCreatorActiveState>(
  (set) => ({
    isVariantCreatorActive: true,
    setIsVariantCreatorActive: (isActive) =>
      set({ isVariantCreatorActive: isActive }),
  }),
);

//? Variants Form Active State (visibility of the variant lists)
export const useVariantsFormActiveState = create<VariantsFormActiveState>(
  (set) => ({
    isVariantsFormActive: false,
    setIsVariantFormActive: (isActive) =>
      set({ isVariantsFormActive: isActive }),
  }),
);
