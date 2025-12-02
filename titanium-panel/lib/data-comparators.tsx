import { VariantListType } from '@/types/data-types';

export const areVariantListsEqual = (
  list1: VariantListType[],
  list2: VariantListType[],
): boolean => {
  if (list1.length !== list2.length) return false;

  for (let i = 0; i < list1.length; i++) {
    const vl1 = list1[i];
    const vl2 = list2[i];

    if (
      vl1.ID !== vl2.ID ||
      vl1.name !== vl2.name ||
      vl1.storeID !== vl2.storeID ||
      vl1.productID !== vl2.productID ||
      vl1.isComplex !== vl2.isComplex ||
      vl1.variants.length !== vl2.variants.length
    ) {
      return false;
    }

    for (let j = 0; j < vl1.variants.length; j++) {
      const v1 = vl1.variants[j];
      const v2 = vl2.variants[j];

      if (
        v1.ID !== v2.ID ||
        v1.type !== v2.type ||
        v1.value !== v2.value ||
        v1.code !== v2.code ||
        v1.storeID !== v2.storeID ||
        v1.inceptionDate.getTime() !== v2.inceptionDate.getTime() ||
        v1.lastUpdate.getTime() !== v2.lastUpdate.getTime()
      ) {
        return false;
      }
    }
  }

  return true;
};
