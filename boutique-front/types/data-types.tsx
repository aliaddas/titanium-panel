import { Product, VariantList, Variant } from '@prisma/client';

//?
//? Front End Data Types
//?

//@     ProductType{} (1)
//@             /\
//@     Product{} -- VariantListType[] (2)
//@                       /\
//@          Variant List{} -- Variant[]

//@ (1) Proper Product Type
export type ProductType = Product & {
  variantLists: VariantListType[];
  imageURLs: string[];
};

//@ (2) Proper Variant List Type
export type VariantListType = VariantList & {
  variants: Variant[];
};
